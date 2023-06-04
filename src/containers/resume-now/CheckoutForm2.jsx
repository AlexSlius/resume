import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, CardElement, useElements } from '@stripe/react-stripe-js';
import { striteCreateSubscription, stritePaymentIntents } from '../../strite/api';

import { LoadChildrenBtn } from "../../components/loadChildrenBtn";

// import { addItemNotification } from "../../slices/notifications";

export default function CheckoutForm({
    handleCloseModal = () => { },
    updateError = () => { },
    itemCard,
}) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const {
        users: {
            objForm
        }
    } = useSelector(state => state);

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        setLoading(false);
        updateError({
            isShow: true,
            status: "error",
            title: "Payment error",
            discription: error?.message || "",
        });
        setErrorMessage(error?.message);
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
            name: objForm.username,
            email: objForm.username,
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
                        handleError(error);
                    } else {
                        setLoading(false);
                        handleCloseModal();
                        // dispatch(addItemNotification({ text: "" }));
                        updateError({
                            isShow: true,
                            title: "Payment success",
                            discription: "The payment was successful",
                        });
                    }
                } catch (error) {
                    handleError({ message: error });
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
                    updateError({
                        isShow: true,
                        title: "Payment success",
                        discription: "The payment was successful",
                    });
                    // dispatch(addItemNotification({ text: "The subscription is completed" }));
                }
            } catch (error) {
                setLoading(false);
            }
        }
    };

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                padding: "5px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                fontFamily: 'sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        },
        hidePostalCode: true,
    };

    return (
        <form>
            <div className={`wr-form-payments ${loading ? "load" : ""}`}>
                <CardElement id="card-element" options={cardStyle} />
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