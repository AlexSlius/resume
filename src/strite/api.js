import Stripe from 'stripe'

import config from "../config/config.json";
import { routersPages } from '../constants/next-routers';

const stripe = new Stripe(config.STRITE_PRIVATE_KEY)

export const stripePaymentIntents = async ({
    items,
    type,
    customerId,
    Router,
    setStateLoad = () => { },
}) => {
    // ${config.DOMAIN} or http://localhost:3000
    let redirectLink = `${config.DOMAIN}/${routersPages['resumeNow']}`;

    setStateLoad(true);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: items,
                quantity: 1,
            },
        ],
        customer: customerId,
        mode: type,
        success_url: `${redirectLink}?success=true`,
        cancel_url: `${redirectLink}?canceled=true`,
    });

    if (session?.url?.length > 0) {
        Router.push(session.url);
    }

    if (!(session?.url?.length > 0)) {
        setStateLoad(false);
    }
}