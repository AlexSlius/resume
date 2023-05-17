import fetch from "isomorphic-unfetch";

import config from "../config/config.json";

export const striteApiGetPlans = async () => {
    try {
        let res = await fetch(`${config.STRITE_API_URL}v1/products`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                // ${config.STRITE_PRIVATE_KEY}
                "Authorization": `Bearer sk_test_51MyvEUEBJR7rLeB2ZmuGNbMwtbBRH43RuE2YIoSkvoGN494JFNtPeBl6n1AibQGEtrnA6Bg2xWOLOaBZzmqDizGD00uBqI72WB`
            }
        })

        return await res.json();
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
                "Authorization": `Bearer sk_test_51MyvEUEBJR7rLeB2ZmuGNbMwtbBRH43RuE2YIoSkvoGN494JFNtPeBl6n1AibQGEtrnA6Bg2xWOLOaBZzmqDizGD00uBqI72WB`
            },
            body: new URLSearchParams({
                'payment_method': data?.id,
                'amount': data?.amount,
                'currency': 'usd'
            })
        })

        return await res.json();
    } catch (error) {
        console.log("Error get products", error);
    }
}
