import { verify } from "jsonwebtoken";
import { deliveryEmployees } from "./data/deliveryEmployees";
import { meals } from "./data/meals";
import { users } from "./data/users";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import e, { urlencoded, json } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import {
  employeeRouter,
  managerRouter,
  mealsRouter,
  ordersRouter,
  usersRouter,
} from "./routers";
import { User, Meal, Cart, DeliveryEmployee, Order } from "./models";
import { acceptOrder, joinMyRoom } from "./controllers";
require("dotenv").config();

const app = express();
const httpServer = createServer(app);

const PORT: string = process.env.PORT as string;
const DATABASE: string = process.env.DATABASE as string;

app.use(urlencoded({ extended: false }), json());
app.use(express.static("public"));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("tiny"));

mongoose.connect(
  DATABASE,
  { useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true } as any,
  () => console.log("connected to db")
);

let creatingDb = async () => {
  await Meal.deleteMany();
  await User.deleteMany();
  await DeliveryEmployee.deleteMany();
  await Order.deleteMany();
  await Cart.deleteMany();
  meals.forEach(async (meal) => {
    await Meal.create(meal);
  });
  users.forEach(async (user) => {
    let cart = await Cart.create({ meals: [] });
    await User.create({
      username: user.username,
      password: user.password,
      email: user.email,
      cart: cart._id,
    });
  });
  deliveryEmployees.forEach(async (deliveryEmployee) => {
    await DeliveryEmployee.create({
      username: deliveryEmployee.username,
      password: deliveryEmployee.password,
    });
  });
};
creatingDb();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  socket.on("joinMyRoom", ({ token }) => {
    if (token) {
      joinMyRoom(token, socket);
    }
  });
  socket.on("acceptOrder", async (data) => {
    acceptOrder(data, socket);
  });
  socket.on("makeOrder", (data) => {
    socket.broadcast.emit("madeOrder", data.data);
  });
  socket.on("completedOrder", async ({ order, token }) => {
    verify(
      token,
      process.env.API_SECRET as string,
      async (err: any, decoded: any) => {
        if (!err) {
          if (decoded?.deliveryEmployeeId) {
            let employee = await DeliveryEmployee.findById(
              decoded.deliveryEmployeeId
            ).populate(["unCompletedOrders", "completedOrders"]);
            let updatedOrder = await Order.findById(order._id);
            if (updatedOrder && employee) {
              updatedOrder.status = "completed";
              await updatedOrder.save();
              employee.unCompletedOrders = employee.unCompletedOrders.filter(
                (item: any) => item._id.valueOf() != order._id
              );
              employee.completedOrders.push(updatedOrder._id as any);
              await employee.save();
              socket.broadcast.emit("completedOrder", updatedOrder);
              socket.broadcast
                .to(`id${order.userId}`)
                .emit("updateOrder", updatedOrder);
            }
          }
        }
      }
    );
  });
});
httpServer.listen(PORT, () => console.log(`app listening on port ${PORT}`));

app.use("/api/meals", mealsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);
app.use("/api/manager", managerRouter);
app.use("/api/delivery", employeeRouter);
