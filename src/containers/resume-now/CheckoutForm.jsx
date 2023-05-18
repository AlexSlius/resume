import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStripe, CardElement, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { striteCreateSubscription, stritePaymentIntents } from '../../strite/api';

import { LoadChildrenBtn } from "../../components/loadChildrenBtn";

import { addItemNotification } from "../../slices/notifications";

export default function CheckoutForm({
    handleCloseModal = () => { },
    itemCard,
}) {
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
        event.preventDefault();

        if (!stripe) {
            return;
        }

        setLoading(true);

        // create a payment method
        const { error, paymentMethod } = await stripe?.createPaymentMethod({
            type: 'card',
            card: elements?.getElement(CardElement),
        });

        if (error) {
            handleError(error);
            return;
        }

        let data = {
            paymentMethod: paymentMethod.id,
            name: "Alex",
            email: "dog27.98@gmail.com",
        }

        if (!!itemCard?.isOne) {
            let resa = await stritePaymentIntents({ ...paymentMethod, dataAcc: data, amount: itemCard.price * 100 });

            if (resa?.client_secret) {
                try {
                    const { error } = await stripe.confirmPayment({
                        clientSecret: resa.client_secret,
                        redirect: 'if_required'
                    });

                    if (error) {
                        setLoading(false);
                        setErrorMessage(error.message);
                    } else {
                        setLoading(false);
                        handleCloseModal();
                        dispatch(addItemNotification({ text: "The payment was successful" }));
                    }
                } catch (error) {
                    console.log("error confirmPayment: ", error)
                }
            }
        } else {
            try {
                let resSub = await striteCreateSubscription({
                    ...data,
                    priceId: itemCard.plan,
                });

                if (resSub?.id) {
                    setLoading(false);
                    handleCloseModal();
                    dispatch(addItemNotification({ text: "The subscription is completed" }));
                }
            } catch (error) {
                setLoading(false);
            }
        }
    };

    return (
        <form>
            <div className={`wr-form-payments ${loading ? "load" : ""}`}>
                <CardElement />
            </div>
            {errorMessage && <div className='error-div-payme'>{errorMessage}</div>}
            <div className='wr-bot-payme'>
                <LoadChildrenBtn isLoad={loading}>
                    <button
                        className={`btns btn--blue`}
                        disabled={!stripe || loading}
                        type='button'
                        onClick={handleSubmit}
                    >
                        <span>Submit</span>
                    </button>
                </LoadChildrenBtn>
            </div>

        </form>
    );
}