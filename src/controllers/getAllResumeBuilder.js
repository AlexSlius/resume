import { getBasicContact } from "./contacts"
import { fetchGetCvEmployments } from "./employments"
import { fetchGetCvEducations } from "./educations"
import { fetchGetSkillslistAll, fetchGetExperienceLevel } from "./skills"
import { fetchGetAllLinks } from "./socials"
import { fetchGetCvHobie } from "./hobies"
import { fetchGetCvActivitys } from "./activitys"
import { fetchGetCvCourses } from "./courses"
import { fetchGetCvInternships } from "./interships"
import { fetchGetCvLanguages } from "./languages"
import { fetchGetCvReferences } from "./references"
import { fetchGetCvCertificates } from "./certificaties"
import { fetchGetCvCarreers } from "./careers";
import { fetchGetCategoryStatus, getCategoryViewedStatus } from "./addSections"

import { fetchGetResumeData } from "./resumeData";

export const getAllResumeBuilder = async ({ dispatch, idCv }) => {
    if (idCv != "new" && idCv !== undefined && idCv !== null) {
        await dispatch(fetchGetCategoryStatus({ idCv }));
        await dispatch(getCategoryViewedStatus({ idCv }));
        await dispatch(fetchGetResumeData({ idCv }));

        // await dispatch(getBasicContact(idCv));
        // await dispatch(fetchGetCvEmployments({ idCv }));
        // await dispatch(fetchGetCvEducations({ idCv }));
        // await dispatch(fetchGetSkillslistAll(idCv));
        // await dispatch(fetchGetExperienceLevel({ idCv }));
        // await dispatch(fetchGetAllLinks({ idCv }));
        // await dispatch(fetchGetCvHobie({ idCv }));
        // await dispatch(fetchGetCvActivitys({ idCv }));
        // await dispatch(fetchGetCvCourses({ idCv }));
        // await dispatch(fetchGetCvInternships({ idCv }));
        // await dispatch(fetchGetCvLanguages({ idCv }));
        // await dispatch(fetchGetCvReferences({ idCv }));
        // await dispatch(fetchGetCvCertificates({ idCv }));
        // await dispatch(fetchGetCvCarreers({ idCv }));
    }
}