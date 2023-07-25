import Icon from "../Icon"
import { ModalWrapper } from "./wrapperModal"
import { LoadChildrenBtn } from "../loadChildrenBtn";
import { ButtonIcon } from "../uis/buttonIcon";
import Input from "../uis/input";

import style from "./Style.module.scss";
import iconBlueCheck from "/public/images/icons/icon-blue-chekc.svg?sprite";


export const ModalCodeAuth = ({
    visible,
    onClose,
    onHanleBtn = () => { },
    data = '',
    setState = () => { },
    emailText = "",
    load = false,
}) => {
    return (
        <ModalWrapper
            visible={visible}
            onClose={onClose}
            maxWidth={330}
        >
            <div className={`${style.flex_c_center}`}>
                <div className={`${style.icon_center} ${style.icon_center_mod}`}>
                    <Icon svg={iconBlueCheck} />
                </div>
                <div className={`${style.title}`}>Code from mail {emailText}</div>
                <div className={`${style.in_in}`}>
                    <Input
                        label="Code"
                        value={data}
                        type="number"
                        onChange={(e) => setState(e.target.value.trim())}
                    />
                </div>
                <div className={`${style.wr_btn} ${style.wr_btn_100} ${style.wr_btn_mt_16}`}>
                    <LoadChildrenBtn isLoad={load}>
                        <ButtonIcon
                            label="Send"
                            className="btn--blue"
                            isButton={true}
                            disabled={(data?.length < 6)}
                            onHandle={onHanleBtn}
                        />
                    </LoadChildrenBtn>
                </div>
            </div>
        </ModalWrapper>
    )
}