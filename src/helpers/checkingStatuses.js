import { isObject } from "lodash"

export const isRespondServerSuccesss = (obj) => {
    if (!isObject(obj))
        return false;

    return obj?.status == "success";
}