import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Templates from "../templates";

import {
    getResumeDataShare,
    getResumeShareTemplateActive
} from "../../controllers/resumeData";


const ShareResume = ({
    isCover = true,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { idCv, key } = router.query;

    useEffect(() => {
        if (!isCover) {
            dispatch(getResumeDataShare({ idCv, key }));
            dispatch(getResumeShareTemplateActive({ idCv }));
        } else {
            // get cover
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