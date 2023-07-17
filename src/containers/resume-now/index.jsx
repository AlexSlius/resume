import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router, { useRouter } from "next/router";

import { Header } from "../../components/header";
import { WeAccept } from "./WeAccept";
import { Card } from './Card';

import style from "./Style.module.scss"
import arrCard from "./data/cards.json";
import { NotificationPayment } from '../../components/notificationPayment';
import { stripePaymentIntents } from '../../strite/api';

const obj = {
    isShow: false,
    status: null,
    title: "Payment success",
    discription: "After 5 failed attempts to enter incorrect payment password, access to the payment services, protected by the payment password, will be temporarily blocked."
};

const ResumeNow = () => {
    const router = useRouter();
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

    const handleSubmit = (dataCard, setStateLoad) => {
        if (dataCard?.dataLayer?.event) {
            dataLayer.push({
                'event': dataCard?.dataLayer?.event,
                'tariff': dataCard?.dataLayer?.tariff,
                'tariff_price': dataCard?.dataLayer?.tariff_price
            });
        }

        stripePaymentIntents({
            dataCard,
            items: dataCard.plan,
            type: dataCard.type,
            customerId: objForm.stripeUserId,
            Router,
            setStateLoad
        })
    }

    useEffect(() => {
        // if (router.query?.canceled == 'true') {
        //     updateError({
        //         isShow: true,
        //         status: 'error',
        //         title: 'Payment error'
        //     })
        //     return;
        // }
    }, []);

    return (
        <>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) && (
                    <Header />
                )
            }

            <div className={`${style.wr}`}>
                <div className={`${style.info_page}`}>
                    <h2 className={`${style.title}`}>Get access to premium Resumes and Cover Letters</h2>
                    <p className={`${style.sub_title}`}>Unlock your career potential with our Premium Membership! Gain exclusive access to advanced features, personalized templates, and priority support. Elevate your job application today!
                    </p>
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
                                handleSubmit={(setStateLoad) => handleSubmit(itemCard, setStateLoad)}
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