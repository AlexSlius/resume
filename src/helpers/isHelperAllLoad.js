import { isArray } from "lodash"
import { isLoader } from "./loadings"

export const isHelperLoad = ({ arr = [] }) => {
    if (isArray(arr)) {
        for (let i = 0; i < arr.length; i++) {
            if (!!isLoader(arr[i]?.status))
                return true;
        }
    }

    return false;
}