import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Templates from "../templates";

import {
    getResumeDataShare,
    getResumeShareTemplateActive
} from "../../controllers/resumeData";

import {
    getCoverShareTemplateActive
} from "../../controllers/cover/coverData";

import {
    getCoverDataShare
} from "../../controllers/cover/personalize";


const ShareResume = ({
    isCover = true,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { idCv, key } = router.query;

    useEffect(() => {
        if (!isCover) {
            // get resume
            dispatch(getResumeDataShare({ idCv, key }));
            dispatch(getResumeShareTemplateActive({ idCv }));
        } else {
            // get cover
            dispatch(getCoverDataShare({ idCv, key }));
            dispatch(getCoverShareTemplateActive({ idCv }));
        }
    }, []);

    return (
        <div className="page-share">
            <div className="page-share__container">
                <Templates isCover={isCover} isPageView={true} />
            </div>
        </div>
    )
}

export default ShareResume;