import express from 'express';
import {PORT} from './config/env.js'
import authRouter from './Routes/auth.routes.js';
import userRouter from './Routes/user.routes.js';
import subscriptionRoter from './Routes/subscription.route.js';
import connectToDatabases from './Database/mongodb.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRoter);

app.get('/', (req,res)=>{
    res.send("hello world");
})

app.listen(PORT, async ()=>{
    console.log(`listening on port ${PORT}`);
    
    await connectToDatabases();
});

export default app;