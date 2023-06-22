import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import ContactPesonalize from "./personalize";
import Experience from "./experience";

import { QUERY_TAB_COVER } from "../../constants/routes";

const CoverPage = () => {
    const router = useRouter();
    const { tab } = router.query;
    const {
        auth: {
            autorizate: {
                isAthorized
            }
        }
    } = useSelector(state => state);

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