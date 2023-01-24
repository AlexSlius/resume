import { isArray } from "lodash";

export const getIdOfNameCountrys = ({ objArr, nameCountry, keyName = "name" }) => {
    if (isArray(objArr)) {
        for (let i = 0; i < objArr.length; i++) {
            if (objArr[i][keyName] == nameCountry) {
                return objArr[i]['id'];
            }
        }
    }
} 