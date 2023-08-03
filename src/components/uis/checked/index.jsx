import {
    CFormCheck
} from "@coreui/react"

import style from "./Style.module.scss"

export const Checked = ({
    id = "def",
    label = '',
    onChange = () => { },
    checkbox,
    defaultChecked,
    isBold = false,
    dopClass=''
}) => {
    return (
        <div className={`${style.main} ${isBold ? style.bold : ""} ${dopClass}`} >
            <CFormCheck
                id={id}
                label={label}
                defaultChecked={defaultChecked}
                checked={checkbox}
                onChange={onChange}
            />
        </div>
    )
}