import Icon from "../../Icon"

import style from "./Style.module.scss"
import iconPlus from "/public/images/icons/plu-opas.svg?sprite"

export const AddList = ({
    onAddNew,
    isOutDataObj,
    valueState,
    keyText
}) => {
    return (
        <li className={`${style.list__li} ${style.list__li_first}`} onClick={onAddNew}>
            <span>{!!isOutDataObj ? valueState[keyText] : valueState || ''}</span>
            <div className={`${style.rig}`}>
                <button className={`${style.button_add}`} title="Add to list?" type="button">
                    <Icon svg={iconPlus} classNames={[style.button_add_icon]} />
                </button>
            </div>
        </li>
    )
}