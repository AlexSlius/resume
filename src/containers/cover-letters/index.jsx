import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { fetchGetCountrys } from "../../controllers/dependencies"
import { handleUpdateDrawingTrue } from "../../slices/cover/coverDataForm";
import ContactPesonalize from "./personalize";
import Experience from "./experience";

import { QUERY_TAB_COVER } from "../../constants/routes";


const CoverPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { tab } = router.query;
    const {
        auth: {
            autorizate: {
                isAthorized
            }
        }
    } = useSelector(state => state);

    useEffect(() => {
        dispatch(fetchGetCountrys());

        return () => {
            dispatch(handleUpdateDrawingTrue());
        }
    }, []);

    return (
        <>
            {
                (tab == QUERY_TAB_COVER.contact) && (
                    <ContactPesonalize />
                )
            }

            {
                (!!isAthorized && (tab == QUERY_TAB_COVER.experience)) && (
                    <Experience />
                )
            }
        </>
    )
}

export default CoverPage;