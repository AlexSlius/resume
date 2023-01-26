import { cleanSlise as cleanSliseContact } from "./contact"
import { cleanSlise as cleanSliseEmployment } from "./employment"
import { cleanSlise as cleanSliseEducation } from "./education"
import { cleanSlise as cleanSliseSkills } from "./skills"
import { cleanSlise as cleanSliseSocials } from "./socials"
import { cleanSlise as cleanSliseHobies } from "./hobies"
import { cleanSlise as cleanSliseActivity } from "./activity"
import { cleanSlise as cleanSliseCourses } from "./courses"
import { cleanSlise as cleanSliseIntersnhips } from "./intersnhips"
import { cleanSlise as cleanSliseLanguages } from "./languages"
import { cleanSlise as cleanSliseReference } from "./reference"
import { cleanSlise as cleanSliseCertificaties } from "./certificaties"

export const cleanResumeSlices = async (dispatch) => {
    await dispatch(cleanSliseContact());
    await dispatch(cleanSliseEmployment());
    await dispatch(cleanSliseEducation());
    await dispatch(cleanSliseSkills());
    await dispatch(cleanSliseSocials());
    await dispatch(cleanSliseHobies());
    await dispatch(cleanSliseActivity());
    await dispatch(cleanSliseCourses());
    await dispatch(cleanSliseIntersnhips());
    await dispatch(cleanSliseLanguages());
    await dispatch(cleanSliseReference());
    await dispatch(cleanSliseCertificaties());
}