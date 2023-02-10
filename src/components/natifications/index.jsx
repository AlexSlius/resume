import React from "react";
import { isArray } from "lodash";
import { useSelector, useDispatch } from "react-redux";

import style from "./Style.module.scss";
import { Notification } from "./natification";
import { removeItemNotification, removeItemShift } from "../../slices/notifications";


const Natifications = ({ store }) => {
    const dispatch = useDispatch();
    const { notificationData } = useSelector(state => state);

    const removeNotification = (index) => {
        dispatch(removeItemNotification(index));
    }

    React.useEffect(() => {
        if (isArray(notificationData.list)) {
            if (notificationData.list.length > 0) {
                setTimeout(() => {
                    dispatch(removeItemShift());
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

export default Natifications;