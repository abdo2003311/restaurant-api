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
  adminRouter,
  employeeRouter,
  managerRouter,
  mealsRouter,
  ordersRouter,
  usersRouter,
} from "./routers";
import { User, Meal, Cart, DeliveryEmployee, Order } from "./models";
import { acceptOrder, completeOrder, joinMyRoom } from "./controllers";
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

let connectingToDb = async () => {
  await mongoose.connect(
    DATABASE,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true,
    } as any,
    () => console.log("connected to db")
  );

  setTimeout(async () => {
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
  }, 7000);
};

connectingToDb();

const io = new Server(httpServer, {
  cors: {
    origin: "https://react-restaurant.onrender.com",
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
  socket.on(
    "completedOrder",
    async ({ token, order }) => await completeOrder({ token, order, socket })
  );
});
httpServer.listen(PORT, () => console.log(`app listening on port ${PORT}`));

app.use("/api/meals", mealsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);
app.use("/api/manager", managerRouter);
app.use("/api/delivery", employeeRouter);
app.use("/api/admin", adminRouter);
