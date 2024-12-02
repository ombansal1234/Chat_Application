import express from 'express'
import colors from "colors";
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import { connectDB } from './lib/database/db.js'
import { errorHandler } from './lib/errors/errorHandler.js';

dotenv.config()
colors.enable();
connectDB()


const app=express()
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
}));

app.use(morgan('dev'))
app.use(cookieParser());
const PORT=process.env.PORT

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(colors.bgCyan(colors.white(`server is running on port ${PORT}`)));

})