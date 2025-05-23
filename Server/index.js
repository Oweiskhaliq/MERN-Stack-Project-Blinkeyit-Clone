import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgon from "morgan";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

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
