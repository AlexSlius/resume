import { isObject } from "lodash"
import moment from "moment";

export const addNewF = (objNew) => {
    if (isObject(objNew)) {
        return {
            ...objNew,
            period_from: objNew.period_from ? moment(new Date(objNew.period_from)) : "",
            period_to: objNew.period_to ? moment(new Date(objNew.period_to)) : "",
        }
    }

    return objNew;
}

export const updateF = (obj, isDateFrom = false) => {
    if (isObject(obj)) {


        if (isDateFrom) {
            let { dateFrom, dateTo, ...objN } = obj;

            return {
                ...objN,
                period_from: dateFrom?.date ? moment(new Date(dateFrom?.date)) : "",
                period_to: dateTo?.date ? moment(new Date(dateTo?.date)) : ""
            }
        } else {
            let { periodFrom, periodTo, ...objN } = obj;

            return {
                ...objN,
                period_from: periodFrom?.date ? moment(new Date(periodFrom?.date)) : "",
                period_to: periodTo?.date ? moment(new Date(periodTo?.date)) : ""
            }
        }
    }

    return obj;
}
