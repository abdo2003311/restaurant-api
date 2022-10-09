import { DeliveryEmployee, Order } from "../../models";
import isManager from "./isManager";

let acceptOrder = async (
  data: { token: any; deliveryEmployee: any; order: any },
  socket: any
) => {
  let { token, deliveryEmployee, order } = data;
  let CheckisManager = await isManager(token);

  if (!CheckisManager) {
    socket.emit("acceptedOrder", { error: "un Auth" });
    return;
  }
  if (!deliveryEmployee) {
    socket.emit("acceptedOrder", {
      error: "no delivery employee provided",
    });
    return;
  }

  if (!deliveryEmployee._id) {
    socket.emit("acceptedOrder", {
      error: "no delivery employee id provided",
    });
    return;
  }
  let updatedOrder = await Order.findById(order._id);
  let employee = await DeliveryEmployee.findById(deliveryEmployee._id);
  if (!updatedOrder) {
    socket.emit("acceptedOrder", {
      error: "order not found",
    });
    return;
  }
  if (updatedOrder.status === "accepted") {
    socket.emit("acceptedOrder", {
      error: "already accepted",
    });
    return;
  }
  if (!employee) {
    socket.emit("acceptedOrder", {
      error: "employee not found",
    });
    return;
  }
  updatedOrder.status = "accepted";
  await updatedOrder.save();
  employee.unCompletedOrders.push(order);
  await employee.save();
  socket.to(`id${deliveryEmployee._id}`).emit("givenOrder", updatedOrder);
  socket.to(`id${order.userId}`).emit("updateOrder", updatedOrder);
  socket.emit("acceptedOrder", { order: updatedOrder, employee: employee });
};

export default acceptOrder;
