import Icon from "../Icon"
import { ModalWrapper } from "./wrapperModal"
import { ButtonIcon } from "../uis/buttonIcon";

import style from "./Style.module.scss";
import iconI from "/public/images/icons/icon-i.svg?sprite";
import iconCubArrow from "/public/images/icons/arrow-left-square.svg?sprite";

export const ModalNoAccess = ({
    title = "",
    desc = "",
    visible,
    onClose,
    onHanleBtn = () => { },
}) => {
    return (
        <ModalWrapper
            visible={visible}
            onClose={onClose}
        >
            <div className={`${style.flex_c_center}`}>
                <div className={`${style.icon_center}`}>
                    <Icon svg={iconI} />
                </div>
                <div className={`${style.title}`}>{title}</div>
                <div className={`${style.desc}`}>{desc}</div>
                <div className={`${style.wr_btn}`}>
                    <ButtonIcon
                        icon={iconCubArrow}
                        label="Registration"
                        className="btn--blue"
                        isButton={true}
                        onHandle={onHanleBtn}
                    />
                </div>
            </div>
        </ModalWrapper>
    )
}