import {Router} from 'express';

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

subscriptionRoter.post('/',(req,res)=>{
    res.send({
        title: 'create a subscriptions'
    })
})

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

subscriptionRoter.get('/user/:id',(req,res)=>{
    res.send({
        title: 'get a users subscriptions'
    })
});

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