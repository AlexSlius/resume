import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import FormPersonalize from "./FormPersonalize"
// import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const Contact = () => {
    const dispatch = useDispatch();
    const states = useSelector((state) => state);
    const router = useRouter();
    const idCv = router.query.idCv;

    return (
        <>
            {/* <HeadMainContent
            title={'Contact Section'}
         /> */}
            <FormPersonalize
                dispatch={dispatch}
                storeDate={states}
                idCv={idCv}
            />
        </>
    )
}

export default Contact;