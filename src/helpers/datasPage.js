import { isObject, isString } from "lodash";

export const isObjDatas = (obj) => {
    if (!isObject(obj))
        return false

    let arrKeys = Object.keys(obj);

    for (let i = 0; i < arrKeys.length; i++) {
        let item = obj[arrKeys[i]];

        if (isString(item)) {
            if (item.length > 0)
                return true;
        }
    }

    return false;
}

let exceptionsKeys = ["id", "userId", "cvId", "position", "titleId"]

export const isObjDatasKeys = (obj) => {
    if (!isObject(obj))
        return false

    let arrKeys = Object.keys(obj);

    for (let i = 0; i < arrKeys.length; i++) {
        if (exceptionsKeys.includes(arrKeys[i])) {
            continue;
        }

        let item = obj[arrKeys[i]];

        if (isString(item)) {
            if (item.length > 0)
                return true;
        }
    }

    return false;
}