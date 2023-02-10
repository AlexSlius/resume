import { isString } from "lodash";

export const isObjDatas = (obj) => {
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