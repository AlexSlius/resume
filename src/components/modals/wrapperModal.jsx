import React from "react";

import Icon from "../Icon";

import style from "./Style.module.scss";
import iconX from "/public/images/icons/x-modal2.svg?sprite";


export const ModalWrapper = ({
    children,
    visible = false,
    onClose = () => { },
    maxWidth = 360,
    dopClass =''
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

    return (
        <>
            <div className={`${style.hystmodal} ${visible ? style.open : ""} ${dopClass}`}>
                <div className={`${style.hystmodal__wrap}`}>
                    <div className={`${style.hystmodal__bg_clos}`} onClick={onClose}></div>
                    <div className={`${style.hystmodal__window}`} style={{ maxWidth: maxWidth }}>
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