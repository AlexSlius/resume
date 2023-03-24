import { isArray, isString } from "lodash";

export const helperProgress = ({
    objForms = {},
    arrField = [],
}) => {
    let areFilled = 0;

    if (isArray(arrField)) {
        for (let i = 0; i < arrField.length; i++) {
            let valueItem = objForms[arrField[i]];

            if (isString(valueItem)) {
                if (valueItem.length > 0) {
                    areFilled += 1;
                }
            }
        }

        return ((areFilled * 100) / arrField.length).toFixed(0);
    }

    return 0;
}