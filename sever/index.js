import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgon from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";

const app = express();

// middle wares
app.use(
  cors({
    origin: process.env.FORNTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgon());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
const PORT = 8080 || process.env.PORT;
app.get("/", (request, response) => {
  //sever to client
  response.json({
    message: "Sever is running on " + PORT,
  });
});

// create user route
app.use("/api/user", userRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("sever is listening on Port: ", PORT);
  });
});
