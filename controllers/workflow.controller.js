import {createRequire} from 'module';
const require = createRequire(import.meta.url);
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';

const {serve} = require('@upstash/workflow/express');

export const sendRemainders = serve(async (context)=>{
    const {subscriptionID } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionID);

    if(!subscription || subscription.status !== 'active'){
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`renewal date has passed for subscription ${subscriptionID}`);
    }
    
});

const fetchSubscription= async(context, subscriptionID)=>{
    return await context.run('get subscription', ()=>{
        return Subscription.findByID(subscriptionID).populate('user', 'name email');
    })
}