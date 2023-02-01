import React from "react";
import { isArray } from "lodash";
import style from "./Style.module.scss";
import { Notification } from "./natification";
import { removeItemNotification, removeItemShift } from "../../slices/notifications";

export const Natifications = ({ store }) => {
    const { notificationData } = store.getState();

    const removeNotification = (index) => {
        store.dispatch(removeItemNotification(index));
    }

    React.useEffect(() => {
        if (isArray(notificationData.list)) {
            if (notificationData.list.length > 0) {
                setTimeout(() => {
                    store.dispatch(removeItemShift());
                }, 5e3);
            }
        }
    }, [notificationData.list]);

    return (
        <div className={style.wr}>
            {
                isArray(notificationData.list) && notificationData.list.map((item, index) => (
                    <Notification
                        key={index}
                        data={item}
                        removeNotification={removeNotification}
                    />
                ))
            }
        </div>
    )
}

