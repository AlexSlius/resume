import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

// import CheckoutSummary from './CheckoutSummary';

export default function CheckoutForm() {
    const stripe = useStripe();

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            clientSecret: 'pi_3N8UeuDuRixVdUqY0KTZ1LUN_secret_oWthFkeuzGJu49nTB3dkcmwfG',
            confirmParams: {
                return_url: 'https://example.com/order/123/complete',
            },
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer.
            setLoading(false);
            setErrorMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* <CheckoutSummary /> */}
            <button type="submit" disabled={!stripe || loading}>
                Submit Payment
            </button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
}

