import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import {buffer} from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SK);
const endpointSecret = process.env.STRIPE_CLI_WS;

export default async function handler(req, res){
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } 
    catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
        const data = event.data;
        const orderId = data.object.metadata.orderId;
        const paid = data.object.payment_status === 'paid';
        if(orderId && paid){
            await Order.findByIdAndUpdate(orderId,{paid:true,});
        }
        // Then define and call a function to handle the event payment_intent.succeeded
        
        break;
        // ... handle other event types
        default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok');
}

export const config = {
    api: {bodyParser: false,}
};