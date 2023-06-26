import { isObject } from "lodash";
import { routersPages } from "../constants/next-routers";
import { QUERY_TAB_COVER } from "../constants/routes";


export const backRoter = (arrObj, step, idCv, dataForm) => {
    let nameStapUrl = '';
    let baseUrl = `/${routersPages['coverLetter']}/${idCv}`;
    let {
        // step 2
        questionGraduateFromCollege,
        // step 3 on the 6
        questionCurrentlyInCollegeUniversity,
        // step 11
        questionHaveWorkExperience,
        // step 14
        questionCurrentlyWorking
    } = dataForm;


    if (!isObject(arrObj))
        return nameStapUrl;

    let keys = Object.keys(arrObj)
    let index = keys.findIndex((el) => arrObj[el] == step);

    if (index > 2) {
        nameStapUrl = arrObj[keys[(index - 1)]];
    }

    if ((step == arrObj['professionalSkills']) && questionCurrentlyInCollegeUniversity == "N") {
        // transfer to the second step
        nameStapUrl = arrObj["graduated"];
    }

    if ((step == arrObj['graduatedFinish']) && questionHaveWorkExperience == "N") {
        // transfer to the second step
        nameStapUrl = arrObj["workExperinence"];
    }

    if ((step == arrObj['graduatedTwo']) && questionCurrentlyWorking == "N") {
        // transfer to the second step
        nameStapUrl = arrObj["graduatedStep"];
    }

    let nameBackStep = !!nameStapUrl ? `${baseUrl}?tab=${QUERY_TAB_COVER.experience}&step=${nameStapUrl}` : !!step ? `${baseUrl}?tab=${QUERY_TAB_COVER.experience}` : `${baseUrl}?tab=${QUERY_TAB_COVER.contact}`;

    return nameBackStep;
}