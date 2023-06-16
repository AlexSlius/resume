import { isObject, isString } from "lodash";

export const getActiveSectionByName = (sectionsObjArr, name) => {
    if (!isObject(sectionsObjArr) || !isString(name))
        return false;

    let { status, position } = sectionsObjArr[name];
    let lengtAll = lengthBotTheCustomSection(sectionsObjArr);

    if (status == "active" && lengtAll == position)
        return true;
}

export const lengthBotTheCustomSection = (sectionsObjArr) => {
    if (!isObject(sectionsObjArr)) {
        return 0;
    }

    return Object.keys(sectionsObjArr).length - 1;
}

export const sectionStatusAllButTheCustomSection = (sectionsObjArr) => {
    if (!isObject(sectionsObjArr)) {
        return false;
    }

    let objArrKey = Object.keys(sectionsObjArr);
    let legbthBotTheCusomeSection = objArrKey.length - 1;
    let arrLe = objArrKey.filter((item) => sectionsObjArr[item].status == "active").length;

    if (arrLe == legbthBotTheCusomeSection)
        return true;

    return false;
}