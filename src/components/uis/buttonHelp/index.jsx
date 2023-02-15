import Icon from "../../Icon";

import style from "./Style.module.scss"

import helpIcon from '/public/images/icons/chat-norm.svg?sprite'
import helpIconBlack from '/public/images/icons/chat.svg?sprite'

export const Buttonhelp = ({ href = "#", isBlack = [false] }) => {
    let classe = isBlack ? style.black : '';

    return (
        <a href={href} className={`${style.btn_need} ${classe}`}>
            <Icon svg={isBlack ? helpIconBlack : helpIcon} classNames={[style.btn_need_icon]} />
            Need help?
        </a>
    )
}