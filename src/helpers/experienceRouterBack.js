import { isObject } from "lodash";
import { routersPages } from "../constants/next-routers";


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

    let nameBackStep = !!nameStapUrl ? `${baseUrl}/experience?step=${nameStapUrl}` : !!step ? `${baseUrl}/experience` : `${baseUrl}/personalize`;

    return nameBackStep;
}