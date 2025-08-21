import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRoter = Router();

subscriptionRoter.get('/',(req,res)=>{
    res.send({
        title: 'get all subscriptions'
    })
})

subscriptionRoter.get('/:id',(req,res)=>{
    res.send({
        title: 'get subscriptions details'
    })
})

subscriptionRoter.post('/',authorize, createSubscription)

subscriptionRoter.put('/:id',(req,res)=>{
    res.send({
        title: 'update a subscriptions'
    })
});

subscriptionRoter.delete('/:id',(req,res)=>{
    res.send({
        title: 'get all subscriptions'
    })
});

subscriptionRoter.get('/user/:id',authorize, getUserSubscriptions);

subscriptionRoter.put('/:id/cancel',(req,res)=>{
    res.send({
        title: 'Cancel subscriptions'
    })
});

subscriptionRoter.get('/upcoming-renewals',(req,res)=>{
    res.send({
        title: 'get upcoming renewals'
    })
})

    

export default subscriptionRoter;