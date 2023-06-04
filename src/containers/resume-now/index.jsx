import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Header } from "../../components/header";
import { WeAccept } from "./WeAccept";
import { Card } from './Card';

import style from "./Style.module.scss"
import arrCard from "./data/cards.json";
import { NotificationPayment } from '../../components/notificationPayment';

const obj = {
    isShow: false,
    status: null,
    title: "Payment success",
    discription: "After 5 failed attempts to enter incorrect payment password, access to the payment services, protected by the payment password, will be temporarily blocked."
};

const ResumeNow = () => {
    const {
        theme: {
            currentResolution
        },
        users: {
            objForm
        }
    } = useSelector((state) => state);
    const [errorModal, setErrorModal] = useState(obj);

    const updateError = (obj) => {
        setErrorModal(prev => ({
            ...prev,
            ...obj,
        }));
    }

    return (
        <>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) && (
                    <Header />
                )
            }

            <div className={`${style.wr}`}>
                <div className={`${style.info_page}`}>
                    <h2 className={`${style.title}`}>Download Your Attention-Grabbing Resume Now!</h2>
                    <p className={`${style.sub_title}`}>To download your resume simply sign up for your Premium Membership. As an added bonus,
                        you’ll gain instant full access to our suite of expertly crafted career services.</p>
                </div>

                {
                    errorModal.isShow && (
                        <NotificationPayment
                            type={errorModal.status}
                            title={errorModal.title}
                            discription={errorModal.discription}
                        />
                    )
                }

                <div className={`${style.items_grid}`}>
                    {
                        arrCard.map((itemCard, index) => (
                            <Card
                                key={index}
                                itemCard={itemCard}
                                index={index}
                                updateError={updateError}
                                objForm={objForm}
                            />
                        ))
                    }
                </div>
                <WeAccept />
            </div>
        </>
    )
}

export default ResumeNow;