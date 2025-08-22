import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        await workflowClient.trigger({
            url: `${SERVER_URL}`
        })

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            subscription
        });
 
    }catch(error){
        next(error);
    }
}

export const getUserSubscriptions = async(req,res,next)=>{
    try{
        if(req.user.id !== req.params.id){
            const error = new Error('You are not authorized to view this user\'s subscriptions');
            error.status = 403;
            throw error;
        }

        const subscriptoins = await Subscription.find({user: req.params.id});

        res.status(200).json({
            success: true,
            data: subscriptoins
        });

    }catch(error){
        next(error);
    }
}