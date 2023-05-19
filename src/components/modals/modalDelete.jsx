import { CButton } from "@coreui/react"

import Icon from "../Icon"
import { ModalWrapper } from "./wrapperModal"
import { ButtonIcon } from "../uis/buttonIcon";

import style from "./Style.module.scss";
import iconIDelete from "/public/images/icons/icon-i-delete.svg?sprite";

export const ModalDelete = ({
    title = "",
    desc = "",
    visible,
    onClose,
    onHanleBtnDelete = () => { },
    maxWidth = 330
}) => {
    const handleClose = () => {
        onClose();
    }

    return (
        <ModalWrapper
            visible={visible}
            onClose={onClose}
            maxWidth={maxWidth}
        >
            <div className={`${style.flex_c_center}`}>
                <div className={`${style.icon_center} ${style.icon_center_mod}`}>
                    <Icon svg={iconIDelete} />
                </div>
                <div className={`${style.title}`}>{title}</div>
                <div className={`${style.desc}`}>{desc}</div>
                <div className={`${style.wr_btn_two}`}>
                    <ButtonIcon
                        label="Delete"
                        className="btn--blue"
                        isButton={true}
                        onHandle={onHanleBtnDelete}
                    />
                    <CButton
                        className='btn-grend'
                        color="secondary"
                        variant="outline"
                        onClick={handleClose}
                    >
                        Cancel
                    </CButton>
                </div>
            </div>
        </ModalWrapper>
    )
}