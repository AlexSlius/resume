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
import { fetchGetCategoryStatus } from "./addSections"

export const getAllResumeBuildre = async ({ dispatch, idCv }) => {
    await dispatch(fetchGetCategoryStatus({ idCv }));
    dispatch(getBasicContact(idCv));
    dispatch(fetchGetCvEmployments({ idCv }));
    dispatch(fetchGetCvEducations({ idCv }));
    dispatch(fetchGetSkillslistAll(idCv));
    dispatch(fetchGetExperienceLevel({ idCv }));
    dispatch(fetchGetAllLinks({ idCv }));
    dispatch(fetchGetCvHobie({ idCv }));
    dispatch(fetchGetCvActivitys({ idCv }));
    dispatch(fetchGetCvCourses({ idCv }));
    dispatch(fetchGetCvInternships({ idCv }));
    dispatch(fetchGetCvLanguages({ idCv }));
    dispatch(fetchGetCvReferences({ idCv }));
    dispatch(fetchGetCvCertificates({ idCv }));
}