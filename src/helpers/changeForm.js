import { isArray } from "lodash"

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