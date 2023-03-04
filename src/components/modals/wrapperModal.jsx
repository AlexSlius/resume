import React from "react";

import Icon from "../Icon";

import style from "./Style.module.scss";
import iconX from "/public/images/icons/x-modal.svg?sprite";


export const ModalWrapper = ({
    children,
    visible = false,
    onClose = () => { },
}) => {
    const onKeydown = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    // if (!visible) return null;

    return (
        <>
            <div className={`${style.hystmodal} ${visible ? style.open : ""}`}>
                <div className={`${style.hystmodal__wrap}`}>
                    <div className={`${style.hystmodal__bg_clos}`} onClick={onClose}></div>
                    <div className={`${style.hystmodal__window}`}>
                        <button data-hystclose className={`${style.hystmodal__close}`} onClick={onClose}>
                            <Icon svg={iconX} />
                        </button>
                        <div className={`${style.main}`}>{children}</div>
                    </div>
                </div>
            </div>

            <div className={`${style.hystmodal__shadow} ${visible ? style.hystmodal__shadow_show : ""}`} onClick={onClose}></div >
        </>
    )
}