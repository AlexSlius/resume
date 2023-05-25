import { isArray, isObject } from "lodash"

export const jobTitleFromEmployment = (arr = []) => {
    if (!isArray(arr))
        return undefined;

    let obj = arr.find(el => el.title?.length > 0);

    if (!isObject(obj))
        return undefined;

    return { title: obj.title, idJobTitle: undefined };
}