import { isArray, isObject } from "lodash"

export const changeForm = ({
    arrForms = [],
    arrField = {},
    minForm = 1,
}) => {
    let newArr = [];

    if (isArray(arrForms) && isArray(arrField)) {
        if (arrForms.length > minForm) {
            for (let i = 0; i < arrForms.length; i++) {
                let itemForm = arrForms[i];
                let isStatus = true;

                for (let p = 0; p < arrField.length; p++) {
                    if (!!itemForm[arrField[p]]) {
                        isStatus = false;
                        break;
                    }
                }

                if (isStatus) {
                    newArr.push(itemForm.id);
                }
            }
        }
    }

    return { newArr, last: newArr[newArr.length - 1] };
}

export const isObjEmptyForm = (objForm, arrkeys = []) => {
    let status = false;

    if (!isObject(objForm) && !isArray(arrkeys))
        return status;

    for (let i = 0; i < arrkeys.length; i++) {
        if (objForm[arrkeys[i]]?.length > 0)
            status = true;
        break;
    }

    return status;
}