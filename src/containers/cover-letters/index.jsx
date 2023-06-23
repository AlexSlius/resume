import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { fetchGetCountrys } from "../../controllers/dependencies"
import { updateItemField } from "../../slices/cover/coverDataForm";
import ContactPesonalize from "./personalize";
import Experience from "./experience";


import { QUERY_TAB_COVER } from "../../constants/routes";


const CoverPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { tab, idCv } = router.query;
    const isNew = (idCv == "new");
    const {
        auth: {
            autorizate: {
                isAthorized
            }
        },
        users: {
            objFormSettings,
        },
    } = useSelector(state => state);

    useEffect(() => {
        dispatch(fetchGetCountrys());
        console.log("fetchGetCountrys: 22");

        if (isNew && isAthorized) {
            let { firstName, lastName, email } = objFormSettings;
            updateItemField({ name: "firstName", value: firstName });
            updateItemField({ name: "lastName", value: lastName });
            updateItemField({ name: "email", value: email });
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