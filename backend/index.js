import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL, // ✅ dynamic
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);


// ✅ FIXED STARTUP FLOW
const startServer = async () => {
    try {
        await connectDb(); // wait for DB first

        server.listen(port, () => {
            console.log("Server started on port", port);
        });

    } catch (error) {
        console.log("Startup error:", error);
    }
};

startServer();
