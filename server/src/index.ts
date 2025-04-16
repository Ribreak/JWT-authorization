import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import router from './router/index';
import errorMiddleware from "./middlewares/error-middleware";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        console.log("Starting...");
        await mongoose.connect(process.env.DB_URL || "");
        app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start()