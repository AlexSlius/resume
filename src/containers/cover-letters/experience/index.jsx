import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import FormExperience from "./FormExperience"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { Progress } from "../../../components/progress";

import employmentIcon from '/public/images/icons/employment.svg?sprite'

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
                interest={6}
                icon={employmentIcon}
            />
            <FormExperience
                dispatch={dispatch}
                storeDate={states}
                idCv={idCv}
            />
        </>
    )
}

export default Contact;