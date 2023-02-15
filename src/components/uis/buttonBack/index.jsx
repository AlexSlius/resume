import { useRouter } from 'next/router'

import Icon from "../../Icon";

import style from "./Style.module.scss"

import backIcon from "/public/images/icons/back.svg?sprite"

export const ButtonBack = ({ text = "Back" }) => {
    const router = useRouter()

    return (
        <button className={`${style.btn_back}`} onClick={() => router.back()}>
            <Icon svg={backIcon} classNames={[style.btn_back_icon]} />
            {text}
        </button>
    )
}