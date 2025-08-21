import express from 'express';
import {PORT} from './config/env.js'
import authRouter from './Routes/auth.routes.js';
import userRouter from './Routes/user.routes.js';
import subscriptionRoter from './Routes/subscription.route.js';
import connectToDatabases from './Database/mongodb.js';
import errorMiddleWare from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRoter);
 
app.use(errorMiddleWare);

app.get('/', (req,res)=>{
    res.send("hello world");
})

app.listen(PORT, async ()=>{
    console.log(`listening on port ${PORT}`);
    
    await connectToDatabases();
});

export default app;