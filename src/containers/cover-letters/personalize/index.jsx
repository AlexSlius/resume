import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import FormPersonalize from "./FormPersonalize"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { Progress } from "../../../components/progress";

import contactIcon from "/public/images/icons/contact.svg?sprite"

const Contact = () => {
    const dispatch = useDispatch();
    const states = useSelector((state) => state);
    const router = useRouter();
    const idCv = router.query.idCv;

    return (
        <>
            <HeadMainContent
                isRows={false}
            />
            <Progress
                label="Information completed"
                interest={24}
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