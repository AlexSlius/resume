import Icon from "../Icon";

import iconSuccessfull from "/public/images/icons/icon_successfull.svg?sprite"
import iconWar from "/public/images/icons/icon_war.svg?sprite"
import iconErr from "/public/images/icons/icon_err.svg?sprite"

import style from "./Style.module.scss";

export const Notification = ({
    data,
    index,
    removeNotification = () => { },
}) => {
    let IconSvg = iconSuccessfull;
    let className = "";

    switch (data?.type) {
        case 'war':
            IconSvg = iconWar;
            className = style.war;
            break;
        case 'err':
            IconSvg = iconErr;
            className = style.err;
            break;
    }

    const remove = () => {
        removeNotification(index);
    }

    return (
        <div className={`${style.item} ${className}`} onClick={remove}>
            <Icon svg={IconSvg} />
            <div>{data?.text}</div>
        </div>
    )
}
