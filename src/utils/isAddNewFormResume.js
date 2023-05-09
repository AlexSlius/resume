import { isArray } from "lodash"

export const isAddForm = ({
    data,
    dependence,
    setState = () => { },
}) => {
    if (!isArray(data) || !isArray(dependence))
        return false;

    if (data.length == 0)
        return true;

    let status = false

    if (data.length > 0) {
        let endObj = data[data.length - 1];

        for (let p = 0; p < dependence.length; p++) {
            if (!!endObj[dependence[p]]) {
                status = true;
                break;
            }
        }
    }

    if (!status) {
        setState(true);

        setTimeout(() => {
            setState(false);
        }, 1e3);
    }

    return status;
}

export const isFocusForm = ({
    id = null,
    setState = () => { },
    last = false,
    isFocus = false,
}) => {
    if (last && isFocus) {
        setState(id);
        return "focus-from";
    }

    return ''
}

export const lastFormDelete = ({
    data,
    dependence,
}) => {
    if (!isArray(data) || !isArray(dependence))
        return null;

    let obj = null;

    if (data.length == 0)
        return null;

    if (data.length > 0) {
        let endObj = data[data.length - 1];

        for (let p = 0; p < dependence.length; p++) {
            if (!!endObj[dependence[p]]) {
                return obj;
            }
        }

        let lastFrom = data[data.length - 1];
        obj = { status: true, id: lastFrom?.id };
    }

    return obj;
}