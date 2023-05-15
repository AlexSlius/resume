import fetch from "isomorphic-unfetch";

import config from "../config/config.json";

export const striteApiGetPlans = async () => {
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
        console.log("Error get plans", error);
    }
}
