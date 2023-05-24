import {
    CFormCheck
} from "@coreui/react"

import style from "./Style.module.scss"

export const Checked = ({
    id = "def",
    label = '',
    onChange = () => { },
    checkbox,
    defaultChecked = false,
    isBold = false
}) => {
    return (
        <div className={`${style.main} ${isBold ? style.bold : ""}`} >
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