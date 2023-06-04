import fetch from "isomorphic-unfetch";

import config from "../config/config.json";

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
    // try {
    //     const priceId = data.priceId;

    //     const subscription = await stripe.subscriptions.create({
    //         customer: data.stripeUserId,
    //         items: [{ price: priceId }],
    //         payment_settings: {
    //             payment_method_types: ['card'],
    //         },
    //     });

    //     return subscription;
    // } catch (error) {
    //     console.log("Error get products", error);
    // }
}

// export const striteCreateSubscription = async (data) => {
//     try {
//         const customer = await stripe.customers.create({
//             name: data.name,
//             email: data.email,
//             payment_method: data.paymentMethod,
//             invoice_settings: {
//                 default_payment_method: data.paymentMethod,
//             },
//         });

//         const priceId = data.priceId;

//         const subscription = await stripe.subscriptions.create({
//             customer: customer.id,
//             items: [{ price: priceId }],
//             payment_settings: {
//                 payment_method_types: ['card'],
//             },
//         });

//         return subscription;
//     } catch (error) {
//         console.log("Error get products", error);
//     }
// }

export const stritePaymentIntents = async (data) => {
    try {
        let res = await fetch(`${config.STRITE_API_URL}v1/payment_intents`, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${config.STRITE_PRIVATE_KEY}`
            },
            body: new URLSearchParams({
                'payment_method': data?.id,
                'amount': data?.amount,
                'currency': 'usd',
                'customer': data.stripeUserId,
                'description': 'low_price',
            })
        })

        return await res.json();
    } catch (error) {
        console.log("Error get products", error);
    }
}

// export const stritePaymentIntents = async (data) => {
//     try {
//         let { name, email, paymentMethod } = data.dataAcc;

//         const customer = await stripe.customers.create({
//             name: name,
//             email: email,
//             payment_method: paymentMethod,
//             invoice_settings: {
//                 default_payment_method: paymentMethod,
//             },
//         });

//         let res = await fetch(`${config.STRITE_API_URL}v1/payment_intents`, {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Authorization": `Bearer ${config.STRITE_PRIVATE_KEY}`
//             },
//             body: new URLSearchParams({
//                 'payment_method': data?.id,
//                 'amount': data?.amount,
//                 'currency': 'usd',
//                 'customer': customer.id,
//             })
//         })

//         return await res.json();
//     } catch (error) {
//         console.log("Error get products", error);
//     }
// }