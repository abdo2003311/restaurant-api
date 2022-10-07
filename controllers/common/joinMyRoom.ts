import { verify } from "jsonwebtoken";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DeliveryEmployee, User } from "../../models";

let joinMyRoom = (token: string, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  verify(
    token,
    process.env.API_SECRET as string,
    async (err: any, decoded: any) => {
      if (!err) {
        if (decoded.userId) {
          let user = await User.findById(decoded.userId);
          if (user) {
            socket.join(`id${decoded.userId}`);
          }
        } else if (decoded.deliveryEmployeeId) {
          let employee = await DeliveryEmployee.findById(
            decoded.deliveryEmployeeId
          );
          if (employee) {
            socket.join(`id${decoded.deliveryEmployeeId}`);
          }
        }
      }
    }
  );
};

export default joinMyRoom;
