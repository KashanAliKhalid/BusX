import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import express from 'express'
import {notFound, errorHandler} from "./middleware/errorMiddleware";

const app =express()
dotenv.config();
connectDB();



notFound();
errorHandler();

const PORT=process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`));
