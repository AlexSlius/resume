import React from "react"

import { CFormInput } from "@coreui/react"

import Icon from "../../Icon"

import style from "./Style.module.scss"
import iconEye from "/public/images/icons/eye.svg?sprite"

export const InputPassword = (props) => {
    let classNames = `${!!props.value?.length > 0 ? "text" : ""}`;
    const [showPassword, setShowPassword] = React.useState(false);

    let classBtnEye = showPassword ? style.open : ''
    let typeField = showPassword ? 'text' : 'password'

    return (
        <div className={`${style.row}`}>
            <CFormInput
                autoComplete="off"
                value={props.value}
                type={typeField}
                floatingLabel={props.label}
                placeholder={props.placeholder}
                className={`${style.in_password} ${classNames}`}
                invalid={props.invalid || false}
                valid={props.valid || false}
                onChange={props.onChange}
            />
            <button type="button" onClick={() => setShowPassword(prev => !prev)} className={`${style.btn_eye} ${classBtnEye}`}>
                <Icon svg={iconEye} />
            </button>
        </div>
    )
}