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
import { app, server } from './lib/socket/socket.js';

dotenv.config()
colors.enable();
connectDB()

app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
}));

app.use(morgan('dev'))
app.use(cookieParser());
const PORT=process.env.PORT || 3100

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use(errorHandler);

server.listen(PORT,()=>{
    console.log(colors.bgCyan(colors.white(`server is running on port ${PORT}`)));

})