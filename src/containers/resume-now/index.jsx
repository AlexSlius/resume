import Link from "next/link";
import { useState } from "react";
import { useSelector } from 'react-redux'

import { AccordionComponent } from "../../components/accordion";
import { Header } from "../../components/header";

import { routersPages } from "../../constants/next-routers";

// import { striteCheckout } from "../../strite/checkout";

import style from "./Style.module.scss"

import arrFaqs from "./data/faqs.json";
import arrCard from "./data/cards.json";


import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
// import CheckoutForm from "./CheckoutConfirmation";


const stripePromise = loadStripe('pk_test_51N6cDhDuRixVdUqYgrHMQ28th2SzNwEvvYwN2XhIaGUA6RxCvkYVxYYUvWZlfuO5FKWyuaJgllPRLlebVo7QKDNE00rzzooGTR');

// const CheckoutForm = (e) => {
//     const stripe = useStripe();
//     const elements = useElements();

//     // const handleSubmit = async (event) => {
//     //     event.preventDefault();

//     //     if (!stripe || !elements) {
//     //         return;
//     //     }

//     //     console.log("elements: ", elements);

//     //     console.log("strip: ", stripe);

//     //     elements.submit()

//     //     const result = await stripe.confirmPayment({
//     //         //`Elements` instance that was used to create the Payment Element
//     //         clientSecret: 'pi_3N8R2rDuRixVdUqY0mFAhXSA_secret_Pdgkdyls8vbYZ0k2yTNNwB1Vt',
//     //         elements,
//     //         confirmParams: {
//     //             return_url: "https://example.com/order/123/complete",
//     //         },
//     //     });

//     //     if (result.error) {
//     //         // Show error to your customer (for example, payment details incomplete)
//     //         console.log(result.error.message);
//     //     } else {
//     //         // Your customer will be redirected to your `return_url`. For some payment
//     //         // methods like iDEAL, your customer will be redirected to an intermediate
//     //         // site first to authorize the payment, then redirected to the `return_url`.
//     //     }
//     // };

//     const [errorMessage, setErrorMessage] = useState();
//     const [loading, setLoading] = useState(false);

//     const handleError = (error) => {
//         setLoading(false);
//         setErrorMessage(error.message);
//     }

//     const handleSubmit = async (event) => {
//         // We don't want to let default form submission happen here,
//         // which would refresh the page.
//         event.preventDefault();

//         if (!stripe) {
//             // Stripe.js hasn't yet loaded.
//             // Make sure to disable form submission until Stripe.js has loaded.
//             return;
//         }

//         setLoading(true);

//         // Trigger form validation and wallet collection
//         const { error: submitError } = await elements.submit();

//         if (submitError) {
//             handleError(submitError);
//             return;
//         }

//         // Create the PaymentMethod using the details collected by the Payment Element
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             elements,
//             params: {
//                 // billing_details: {
//                 //     name: 'Jenny Rosen',
//                 // }
//             }
//         });

//         if (error) {
//             // This point is only reached if there's an immediate error when
//             // creating the PaymentMethod. Show the error to your customer (for example, payment details incomplete)
//             handleError(error);
//             return;
//         }

//         // Now that you have a PaymentMethod, you can use it in the following steps to render a confirmation page or run additional validations on the server

//         const rese = await stripe.confirmPayment({
//             clientSecret: 'pi_3N8R2rDuRixVdUqY0mFAhXSA_secret_Pdgkdyls8vbYZ0k2yTNNwB1Vt',
//             confirmParams: {
//                 return_url: 'https://example.com/order/123/complete',
//             },
//         });

//         if (rese?.error) {
//             // This point will only be reached if there is an immediate error when
//             // confirming the payment. Show error to your customer.
//             setLoading(false);
//             setErrorMessage(rese?.error?.message);
//         } else {
//             // Your customer will be redirected to your `return_url`. For some payment
//             // methods like iDEAL, your customer will be redirected to an intermediate
//             // site first to authorize the payment, then redirected to the `return_url`.
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <PaymentElement />
//             <button disabled={!stripe || loading}>Submit</button>
//             {errorMessage && <div>{errorMessage}</div>}
//         </form>
//     )
// };


const ResumeNow = () => {
    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    const handleSub = (price) => {
        // striteCheckout({
        //     lineItems: [
        //         {
        //             price: price,
        //             quantity: 1
        //         }
        //     ]
        // });
    }

    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        paymentMethodCreation: 'manual',
        // Fully customizable with appearance API.
        appearance: {/*...*/ },
    };

    return (
        <>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) && (
                    <Header />
                )
            }

            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
                {/* <Checkou */}
            </Elements>


            <div className={`${style.wr}`}>
                <h2 className={`${style.title}`}>Download Your Attention-Grabbing Resume Now!</h2>
                <p className={`${style.sub_title}`}>To download your resume simply sign up for your Premium Membership. As an added bonus,
                    you’ll gain instant full access to our suite of expertly crafted career services.</p>
                <div className={`${style.items_grid}`}>

                    {
                        arrCard.map((itemCard, index) => (
                            <div className={`${style.card} ${(index == 1) ? style.active : ""}`} key={index}>
                                <div>
                                    <div className={`${style.card_top}`}>
                                        <div className={style.head} style={{ color: itemCard.color }}>{itemCard.name}</div>
                                    </div>
                                    <div className={style.car_center}>
                                        <div className={style.car_price}>
                                            <span>$</span>{itemCard.price}
                                        </div>
                                        <div className={style.car_days}>{itemCard.day}</div>
                                        <div className={style.car_wr_list}>
                                            <ul className="list-check">
                                                {
                                                    itemCard.list.map((itemList, index) => (
                                                        <li key={index}>{itemList}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.car_bot}>
                                    <button className={`bnt-now ${style.bnt_now}`} type="button" onClick={() => handleSub("price_1N6d6aDuRixVdUqYV6DifK3B1")}><span>Upgrade Now</span></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={`${style.cont}`}>
                    <div className={`${style.items_payment}`}>
                        <span>We accept:</span>
                        <div>
                            <img src="/images/icons/icon_visa.svg" />
                            <img src="/images/icons/icon_ma.svg" />
                            <img src="/images/icons/icon_am.svg" />
                            <img src="/images/icons/icon_pa.svg" />
                        </div>
                    </div>
                    <div className={`${style.sub_title} ${style.t_w}`}>
                        <p>By placing an order you waive your right of withdrawal and agree to immediate delivery of the services and
                            related digital products. Within 7 days after the first payment, you can claim the money-back guarantee.</p>
                    </div>
                    <div className={`${style.m_t_f}`}>
                        <h2 className={`${style.title}`}>Frequently Asked Questions</h2>
                        <p className={`${style.sub_title}`}>Didn't find what you're looking for? — <Link href={`/${routersPages['faqs']}`} target="_blank">Use our FAQ</Link></p>
                    </div>
                    <div className={`${style.wr_accar}`}>
                        <AccordionComponent arr={arrFaqs} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResumeNow;