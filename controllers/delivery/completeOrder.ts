import { verify } from "jsonwebtoken";
import { DeliveryEmployee, Order, User } from "../../models";

let completedOrder = async ({ order, token, socket }: any) => {
  verify(
    token,
    process.env.API_SECRET as string,
    async (error: any, decoded: any) => {
      if (error) return socket.emit("completedOrder", { error: error });

      if (!decoded?.deliveryEmployeeId)
        return socket.emit("completedOrder", { error: "not Auth" });

      let employee = await DeliveryEmployee.findById(
        decoded.deliveryEmployeeId
      ).populate(["unCompletedOrders"]);

      if (!employee)
        return socket.emit("completedOrder", { error: "employee not found" });

      let updatedOrder = await Order.findById(order._id);

      if (!updatedOrder)
        return socket.emit("completedOrder", { error: "order not found" });

      let user = await User.findById(order.userId).populate(
        "unCompletedOrders"
      );
      if (!user)
        return socket.emit("completedOrder", { error: "user not found" });

      let found = false;
      employee.unCompletedOrders.forEach((item: any) => {
        if (item._id.valueOf() === order._id) found = true;
      });
      if (!found) return socket.emit("completedOrder", { error: "not Auth" });
      found = false;

      user.unCompletedOrders.forEach((item: any, i: number) => {
        if (item._id.valueOf() === order._id) {
          if (!user) return;
          user.unCompletedOrders.splice(i, 1);
          found = true;
        }
      });
      if (!found)
        return socket.emit("completedOrder", {
          error: "order does not belong to user",
        });

      updatedOrder.status = "completed";
      await updatedOrder.save();
      employee.unCompletedOrders = employee.unCompletedOrders.filter(
        (item: any) => item._id.valueOf() != order._id
      );
      employee.completedOrders.push(updatedOrder._id as any);
      await employee.save();
      user.completedOrders.push(updatedOrder._id as any);
      await user.save();
      socket.broadcast.emit("updateEmployee", employee);
      socket.broadcast.emit("completedOrder", updatedOrder);
      socket.broadcast
        .to(`id${order.userId}`)
        .emit("updateOrder", updatedOrder);
    }
  );
};

export default completedOrder;
