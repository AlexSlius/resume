import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { stritePaymentIntents } from '../../strite/api';

import { LoadChildrenBtn } from "../../components/loadChildrenBtn";

import { addItemNotification } from "../../slices/notifications";

export default function CheckoutForm({ amount = 1, handleCloseModal = () => { } }) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

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

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        // Create the PaymentMethod using the details collected by the Payment Element
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            elements,
            // params: {
            //     billing_details: {
            //         name: 'Jenny Rosen',
            //     }
            // }
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // creating the PaymentMethod. Show the error to your customer (for example, payment details incomplete)
            handleError(error);
            return;
        }

        // Now that you have a PaymentMethod, you can use it in the following steps to render a confirmation page or run additional validations on the server

        let resa = await stritePaymentIntents({ ...paymentMethod, amount: amount * 100 });

        if (resa?.client_secret) {
            try {
                const { error } = await stripe.confirmPayment({
                    clientSecret: resa.client_secret,
                    redirect: 'if_required'
                    // confirmParams: {
                    //     return_url: 'https://example.com/order/123/complete',
                    // },
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
                    setLoading(false);
                    handleCloseModal();
                    dispatch(addItemNotification({ text: "The payment was successful" }));
                }
            } catch (error) {
                console.log("error confirmPayment: ", error)
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`wr-form-payments ${loading ? "load" : ""}`}>
                <PaymentElement />
            </div>
            {errorMessage && <div className='error-div-payme'>{errorMessage}</div>}
            <div className='wr-bot-payme'>
                <LoadChildrenBtn isLoad={loading}>
                    <button
                        className={`btns btn--blue`}
                        disabled={!stripe || loading}
                        type='submit'
                    >
                        <span>Submit</span>
                    </button>
                </LoadChildrenBtn>
            </div>

        </form>
    );
}