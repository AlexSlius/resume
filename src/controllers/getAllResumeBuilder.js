import {
    fetchGetCategoryStatus,
    getCategoryViewedStatus
} from "./addSections"
import { fetchGetResumeData } from "./resumeData";

export const getAllResumeBuilder = async ({ dispatch, idCv }) => {
    if (idCv != "new" && idCv !== undefined && idCv !== null) {
        await dispatch(fetchGetCategoryStatus({ idCv }));
        await dispatch(getCategoryViewedStatus({ idCv }));
        await dispatch(fetchGetResumeData({ idCv }));
    }
}