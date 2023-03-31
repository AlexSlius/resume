import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import FormPersonalize from "./FormPersonalize"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { Progress } from "../../../components/progress";

import { helperProgress } from "../../../helpers/helperProgress";
import { getCoverLetterById } from "../../../controllers/cover/personalize";

import contactIcon from "/public/images/icons/contact.svg?sprite"


let fieldsName = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "country",
    "city",
    "zipCode",
    "state",
];

const Contact = () => {
    const dispatch = useDispatch();
    const states = useSelector((state) => state);
    const router = useRouter();
    const idCv = router.query.idCv;

    const {
        coverDataForm: {
            coverDataObj,
        },
    } = states;

    // React.useEffect(() => {
    //     if (idCv != "new") {
    //         dispatch(getCoverLetterById(idCv));
    //     }
    // }, []);

    return (
        <>
            <HeadMainContent
                isRows={false}
            />
            <Progress
                label="Information completed"
                interest={helperProgress({ objForms: coverDataObj, arrField: fieldsName })}
                icon={contactIcon}
            />
            <FormPersonalize
                dispatch={dispatch}
                storeDate={states}
                idCv={idCv}
            />
        </>
    )
}

export default Contact;