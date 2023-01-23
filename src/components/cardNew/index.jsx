import Icon from "../Icon";

import style from "./Style.module.scss"
import addIcon from '/public/images/icons/plus.svg?sprite'

export const CardNew = ({
    titleNwe = "",
    text = "",
    hangleAddNew = () => { },
}) => {
    return (
        <div className={`${style.card_new}`}>
            <div
                className={`${style.card_new__head}`}
                onClick={hangleAddNew}
            >
                <div>
                    <Icon svg={addIcon} />
                    <span>{titleNwe}</span>
                </div>
            </div>
            <div className={`${style.card_new__bot}`}>{text}</div>
        </div>
    )
}