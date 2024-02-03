import Stripe from 'stripe'

import config from "../config/config.json";
import { routersPages } from '../constants/next-routers';

const stripe = new Stripe(config.STRITE_PRIVATE_KEY)

export const stripePaymentIntents = async ({
    dataCard,
    items,
    type,
    customerId,
    Router,
    setStateLoad = () => { },
}) => {
    // ${config.DOMAIN} or http://localhost:3000
    let redirectLinkSuccess = `${config.DOMAIN}/${routersPages['dashboard']}`;
    let redirectLink = `${config.DOMAIN}/${routersPages['resumeNow']}`;

    setStateLoad(true);

    let dataBody = {
        line_items: [
            {
                price: items,
                quantity: 1,
            },
        ],
        customer: customerId,
        mode: type,
        metadata: {
            'type': type,
        },
        success_url: `${redirectLinkSuccess}&success=true&session_id={CHECKOUT_SESSION_ID}&price=${dataCard.price}&tariff=${dataCard.dataLayer.tariff}&plan=${dataCard.plan}`,
        cancel_url: `${redirectLink}?canceled=true?session_id={CHECKOUT_SESSION_ID}&price=${dataCard.price}&tariff=${dataCard.dataLayer.tariff}&plan=${dataCard.plan}`,
    }

    if (dataCard.trial)
        dataBody = {
            ...dataBody,
            subscription_data: {
                trial_settings: {
                    end_behavior: {
                        missing_payment_method: 'cancel',
                    },
                },
                trial_period_days: 7,
            },
        }

        console.log('dataBody: ', dataBody);

    const session = await stripe.checkout.sessions.create(dataBody);

    if (session?.url?.length > 0) {
        Router.push(session.url);
    }

    if (!(session?.url?.length > 0)) {
        setStateLoad(false);
    }
}

