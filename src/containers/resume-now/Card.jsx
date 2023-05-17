import { useState } from "react";
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

import CheckoutForm from "./CheckoutForm";
// import CheckoutForm from "./CheckoutConfirmation";
// import { striteCheckout } from "../../strite/checkout";

const stripePromise = loadStripe('pk_test_51MyvEUEBJR7rLeB2X2JOP0Xwa1zVFBzMSGxQEfWPGQzNrsDAKqvHpsCmG74pXLmdPwWfJ5HGDuMV1Ce88BCS5dDd00CYS3Bhbm');

import style from "./Style.module.scss";
import { ModalPayments } from '../../components/modals/modalPayments';

export const Card = ({ itemCard, index }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const options = {
        mode: 'payment',
        amount: !!itemCard.isСurrency ? itemCard.price : 1,
        currency: 'usd',
        paymentMethodCreation: 'manual',
        // Fully customizable with appearance API.
        appearance: {/*...*/ },
    };

    return (
        <>
            {
                !!itemCard.isСurrency && (
                    <ModalPayments
                        visible={openModal}
                        onClose={handleCloseModal}
                    >
                        <div>
                            <div style={{ textAlign: "center", paddingBottom: "20px", fontSize: 24 }}><b>${itemCard.price}</b></div>
                            <Elements
                                stripe={stripePromise}
                                options={options}
                            >
                                <CheckoutForm
                                    amount={itemCard.price}
                                    handleCloseModal={handleCloseModal}
                                />
                            </Elements>
                        </div>
                    </ModalPayments>
                )
            }

            <div className={`${style.card} ${(index == 1) ? style.active : ""}`} key={index}>
                <div>
                    <div className={`${style.card_top}`}>
                        <div className={style.head} style={{ color: itemCard.color }}>{itemCard.name}</div>
                    </div>
                    <div className={style.car_center}>
                        <div className={style.car_price}>
                            {itemCard.isСurrency ? <span>$</span> : ""}{itemCard.price}
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
                    <button
                        className={`bnt-now ${style.bnt_now}`}
                        disabled={index == 1}
                        type="button"
                        onClick={handleOpenModal}
                    >
                        <span>Upgrade Now</span>
                    </button>
                </div>
            </div>
        </>
    )
}