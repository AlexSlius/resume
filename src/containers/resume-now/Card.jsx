import { useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from "./CheckoutForm";
import { ModalPayments } from '../../components/modals/modalPayments';

// import { isActiveSubscribe } from "../../strite/subscribe";
import config from "../../config/config.json";

const stripePromise = loadStripe(config.STRITE_PUBLICK_KEY, {
    locale: 'en'
});

import style from "./Style.module.scss";


export const Card = ({
    itemCard,
    index,
    updateError = () => { },
    objForm,
}) => {
    const [openModal, setOpenModal] = useState(false);
    // let isSubscribe = isActiveSubscribe(objForm);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <>
            {/* {
                !isSubscribe && ( */}
            <ModalPayments
                visible={openModal}
                onClose={handleCloseModal}
            >
                <div>
                    <div style={{ textAlign: "center", paddingBottom: "20px", fontSize: 24 }}><b>{itemCard.isСurrency ? <span>$</span> : ""}{itemCard.price}</b></div>
                    <Elements
                        stripe={stripePromise}
                    >
                        <CheckoutForm
                            itemCard={itemCard}
                            handleCloseModal={handleCloseModal}
                            updateError={updateError}
                            objForm={objForm}
                        />
                    </Elements>
                </div>
            </ModalPayments>
            {/* )
            } */}

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
                        // disabled={isSubscribe}
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