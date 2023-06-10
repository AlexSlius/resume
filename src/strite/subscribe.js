
import { isArray } from "lodash";
import arrCard from "../containers/resume-now/data/cards.json";
import { descriptionLowPrice } from "../constants/stripte";

export const isActiveSubscribe = (objForm) => {
    // trial, subscriptions,  payments

    if (!isArray(arrCard) || !objForm?.id)
        return false;

    if (!(isArray(objForm?.subscriptions) && objForm?.subscriptions?.length > 0) && !(isArray(objForm?.payments) && objForm?.payments?.length > 0))
        return false;

    for (let i = 0; i < arrCard.length; i++) {
        let dataCard = arrCard[i];

        // если есть тестовая подписка на 7 дней то дальше не проверяем
        if (!!dataCard.trial) {
            if (!!objForm.trial) {
                return true;
            }
        }

        // если unlimited == Y - это полная покупка
        if (!!(objForm?.unlimited == "Y")) {
            return true;
        }

        // проверка подписок
        if (isArray(objForm?.subscriptions) && objForm.subscriptions?.length > 0) {
            let isSub = false;

            for (let p = 0; p < objForm.subscriptions.length; p++) {
                let subscription = objForm.subscriptions[p];
                let { plan } = subscription;

                if (plan == dataCard.plan) {
                    isSub = true;
                    break;
                }
            }

            if (!!isSub)
                return true;
        }

        // проверка полной покупкипо полю "description"
        if (isArray(objForm?.payments) && objForm.payments?.length > 0) {
            let isPay = false;

            for (let p = 0; p < objForm.payments.length; p++) {
                let payment = objForm.payments[p];
                let { description, status } = payment;

                if ((description == descriptionLowPrice) && (status == "succeeded")) {
                    isPay = true;
                    break;
                }
            }

            if (!!isPay)
                return true;
        }
    }

    return false;
}