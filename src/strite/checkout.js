import { loadStripe } from "@stripe/stripe-js";

import config from "../config/config.json";

export async function striteCheckout({ lineItems }) {
	let stripePromise = null

	const getStripe = () => {
		if (!stripePromise) {
			// config.STRITE_PUBLICK_KEY
			stripePromise = loadStripe("pk_test_51MyvEUEBJR7rLeB2X2JOP0Xwa1zVFBzMSGxQEfWPGQzNrsDAKqvHpsCmG74pXLmdPwWfJ5HGDuMV1Ce88BCS5dDd00CYS3Bhbm");
		}
		return stripePromise
	}

	const stripe = await getStripe();

	await stripe.redirectToCheckout({
		mode: 'payment',
		lineItems,
		successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: window.location.origin
	})

}