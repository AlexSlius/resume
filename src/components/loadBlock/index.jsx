import style from "./Style.module.scss";

import Icon from "../Icon"
import iconPreloader from "/public/images/icons/preloader-blue.svg?sprite"

export const LoadBlock = ({
    isMin = false
}) => {
    let classNames = isMin ? style.wr_min : "";

    return (
        <div className={`${style.wr} ${classNames}`}>
            <Icon svg={iconPreloader} />
        </div>
    )
}