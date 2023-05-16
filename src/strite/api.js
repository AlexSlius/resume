import fetch from "isomorphic-unfetch";

import config from "../config/config.json";

export const striteApiGetPlans = async () => {
    try {
        let res = await fetch(`${config.STRITE_API_URL}v1/products`, {
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


export const stritePaymentIntents = async (data) => {
    // try {
    //     let details;

    //     if (data.id) {
    //         const intent = await stripe.paymentIntents.create(
    //             payment_method: data.id,
    //             amount: 1099,
    //             currency: 'usd',
    //             automatic_payment_methods: { enabled: true },
    //             { expand: ['payment_method'] }
    //         );
    //         details = summarizePaymentMethod(intent.payment_method);
    //     }
    //     // Send the response to the client
    //     response.send(generateResponse(details));
    // } catch (e) {
    //     // Display error on client
    //     return response.send({ error: e.message });
    // }
}
