import fetch from "isomorphic-unfetch";

import config from "../config/config.json";
import { descriptionLowPrice } from "../constants/stripte";

import Stripe from 'stripe'

const stripe = new Stripe(config.STRITE_PRIVATE_KEY)

// get product by id
export const striteApiGetProductById = async () => {
    try {
        let res = await fetch(`${config.STRITE_API_URL}v1/products/${config.STRITE_ID_PRODUCT}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.STRITE_PRIVATE_KEY}`
            }
        })

        return await res.json();
    } catch (error) {
        console.log("Error get products", error);
    }
}

// get plans by id product
export const striteApiGetPlans = async (idProduct) => {
    try {
        let res = await fetch(`${config.STRITE_API_URL}v1/plans`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.STRITE_PRIVATE_KEY}`
            }
        })

        return await res.json();
    } catch (error) {
        console.log("Error get products", error);
    }
}

export const striteCreateSubscription = async (data) => {
    try {
        const priceId = data.priceId;

        const subscription = await stripe.subscriptions.create({
            customer: data.stripeUserId,
            items: [{ price: priceId }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
        });

        return subscription;
    } catch (error) {
        console.log("Error get products", error);
    }
}

export const stritePaymentIntents = async (data) => {
    try {
        let res = await fetch(`${config.STRITE_API_URL}v1/payment_intents`, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${config.STRITE_PRIVATE_KEY}`
            },
            body: new URLSearchParams({
                'payment_method': data?.idPm,
                'amount': data?.amount,
                'currency': 'usd',
                'customer': data.stripeUserId,
                'description': descriptionLowPrice,
            })
        })

        return await res.json();
    } catch (error) {
        console.log("Error get products", error);
    }
}


// export const striteWebHook = async (data) => {
//     try {
//         let resumHook = await stripe.webhooks.constructEvent({
//             payload: 'https://api.resulon.com/stripe/webhook',
//             header: '',
//             secret: '',

//         });

//         const subscription = await stripe.subscriptions.create({
//             customer: data.stripeUserId,
//             items: [{ price: priceId }],
//             payment_behavior: 'default_incomplete',
//             payment_settings: { save_default_payment_method: 'on_subscription' },
//             expand: ['latest_invoice.payment_intent'],
//         });

//         return subscription;
//     } catch (error) {
//         console.log("Error strite web hook", error);
//     }
// }