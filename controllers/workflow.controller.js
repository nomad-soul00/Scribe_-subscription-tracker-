import {createRequire} from 'module';
const require = createRequire(import.meta.url);
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';

const {serve} = require('@upstash/workflow/express');

const remainders = [7,5,2,1];   

export const sendRemainders = serve(async (context)=>{
    const {subscriptionID } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionID);

    if(!subscription || subscription.status !== 'active'){
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`renewal date has passed for subscription ${subscriptionID}. Stopping Workflow!!`);
        return;
    }

    for(const daysBefore of remainders){
         const remainderDate = renewalDate.subtract(daysBefore, 'day');

         if(remainderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Remainder${daysBefore} days before`, remainderDate);
         }

         await triggerRemiander(context, `Remainder${daysBefore} days before`);
    }

});

const sleepUntilReminder = async(context,label,date) =>{
    console.log(`Sleeping until ${label} remainder date: ${date}`);
    await context.sleepUntill(label, date.todate());

}

const triggerRemiander = async (context, label)=>{
    return await context.run(label, ()=>{
        console.log(`Triggering ${label} remainder now!!`);
    })
}

const fetchSubscription= async(context, subscriptionID)=>{
    return await context.run('get subscription', ()=>{
        return Subscription.findByID(subscriptionID).populate('user', 'name email');
    })
}