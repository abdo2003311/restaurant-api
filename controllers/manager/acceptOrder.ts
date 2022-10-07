import { DeliveryEmployee, Order } from "../../models";
import authManager from "./authManager";

let acceptOrder = async (
  data: { token: any; deliveryEmployee: any; order: any },
  socket: any
) => {
  let { token, deliveryEmployee, order } = data;
  let isManager = await authManager(token);
  if (isManager) {
    if (deliveryEmployee) {
      if (deliveryEmployee._id) {
        let updatedOrder = await Order.findById(order._id);
        let employee = await DeliveryEmployee.findById(deliveryEmployee._id);
        if (updatedOrder) {
          updatedOrder.status = "accepted";
          await updatedOrder.save();
          employee?.unCompletedOrders.push(order);
          await employee?.save();
          socket
            .to(`id${deliveryEmployee._id}`)
            .emit("givenOrder", updatedOrder);
          socket.to(`id${order.userId}`).emit("updateOrder", updatedOrder);
          socket.emit("acceptedOrder", "done");
        }
      }
    }
  }
};

export default acceptOrder;
