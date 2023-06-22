import { isObject } from "lodash";
import { routersPages } from "../constants/next-routers";
import { QUERY_TAB_COVER } from "../constants/routes";


export const backRoter = (arrObj, step, idCv) => {
    let nameStapUrl = '';
    let baseUrl = `/${routersPages['coverLetter']}/${idCv}`;

    if (!isObject(arrObj))
        return nameStapUrl;

    let keys = Object.keys(arrObj)
    let index = keys.findIndex((el) => arrObj[el] == step);

    if (index > 2) {
        nameStapUrl = arrObj[keys[(index - 1)]];
    }

    let nameBackStep = !!nameStapUrl ? `${baseUrl}?tab=${QUERY_TAB_COVER.experience}&step=${nameStapUrl}` : !!step ? `${baseUrl}?tab=${QUERY_TAB_COVER.experience}` : `${baseUrl}?tab=${QUERY_TAB_COVER.contact}`;

    return nameBackStep;
}