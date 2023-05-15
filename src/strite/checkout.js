import { loadStripe } from "@stripe/stripe-js";

import config from "../config/config.json";

export async function striteCheckout({ lineItems }) {
	let stripePromise = null

	const getStripe = () => {
		if (!stripePromise) {
			// config.STRITE_PUBLICK_KEY
			stripePromise = loadStripe("pk_test_51N6cDhDuRixVdUqYgrHMQ28th2SzNwEvvYwN2XhIaGUA6RxCvkYVxYYUvWZlfuO5FKWyuaJgllPRLlebVo7QKDNE00rzzooGTR");
		}
		return stripePromise
	}

	const stripe = await getStripe();

	console.log("stripe: ", stripe);

	await stripe.redirectToCheckout({
		mode: 'payment',
		lineItems,
		successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: window.location.origin
	})

}