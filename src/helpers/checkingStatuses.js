import { isObject } from "lodash"

export const isRespondServerSuccesss = (obj) => {
    if (!isObject(obj))
        return false;

    return obj?.status == "success";
}

export const isSuccessNewContact = (obj) => {
    if (!isObject(obj))
        return false;

    return obj?.status == "session_data_saved";
}

export const isExist = (obj) => {
    if (!isObject(obj))
        return false;

    return obj?.success == "exist";
}

export const isUpdate = (obj, text = "updated") => {
    if (!isObject(obj))
        return false;

    return obj?.data == text;
}

export const isDelete = (obj) => {
    if (!isObject(obj))
        return false;

    return obj?.data == "delete";
}

export const isError = (obj) => {
    if (isObject(obj)) {
        if (!!obj.error)
            return true;
    }

    return false;
}