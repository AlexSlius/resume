import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormCarreer from "./CareerObjectiveForm";

const Socials = () => {
    const dispatch = useDispatch();
    const states = useSelector((state) => state);
    const router = useRouter();
    const idCv = router.query.idCv;

    return (
        <>
            <HeadMainContent
                title={'Summary'}
                description={`This section will usually be one of the first things a hiring manager reads. It tells them,
            “Here’s who I am, and here’s what I can do for your company”.`}
            >
            </HeadMainContent>
            <FormCarreer
                dispatch={dispatch}
                states={states}
                idCv={idCv}
            />
        </>
    )
}

export default Socials;