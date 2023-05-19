import style from "./Style.module.scss";

import Icon from "../Icon";
import { ButtonIcon } from "../uis/buttonIcon";

import iconSuccess from "/public/images/icons/success-price.svg?sprite";
import iconError from "/public/images/icons/error-price.svg?sprite";
import iconR from "/public/images/icons/icon-arr-btn-r.svg?sprite";

export const NotificationPayment = ({
    type = "success",
    title = "",
    discription = "",
    onHanleBtn = () => { }
}) => {
    let classe = (type == "error") ? style.error : '';
    let nameBtn = (classe.length > 0) ? "Try again" : "Go Home";

    return (
        <div className={`${style.wr} ${classe}`}>
            <div className={style.notification}>
                <div className={`${style.icon}`}>
                    <Icon svg={(classe.length > 0) ? iconError : iconSuccess} />
                </div>
                <div className={`${style.content}`}>
                    <div className={`${style.content_title}`}>{title}</div>
                    <div className={`${style.content_description}`}>{discription}</div>
                </div>
                <div className={`${style.btns}`}>
                    <ButtonIcon
                        label={nameBtn}
                        className="btn--blue"
                        icon={(classe.length > 0) ? null : iconR}
                        isButton={(classe.length > 0) ? true : false}
                        href="/"
                        onHandle={onHanleBtn}
                    />
                </div>
            </div>
        </div>
    )
}