import Router, { useRouter } from 'next/router'

import Icon from "../../Icon";

import style from "./Style.module.scss"

import backIcon from "/public/images/icons/back.svg?sprite"

export const ButtonBack = ({
    text = "Back",
    link = '',
    isClick = false,
    funClick = () => { },
}) => {
    const router = useRouter();

    let classNoText = text.length ? '' : style.no_text;

    const handleRouter = () => {
        if (isClick) {
            funClick();

            return;
        }
        
        if (link.length > 0) {
            Router.push(link);
        } else {
            router.back()
        }
    }

    return (
        <button className={`${style.btn_back}`} onClick={handleRouter}>
            <Icon svg={backIcon} classNames={[style.btn_back_icon, classNoText]} />
            {text}
        </button>
    )
}