import Icon from "../Icon"
import { ModalWrapper } from "./wrapperModal"
import { ButtonIcon } from "../uis/buttonIcon";
import Input from "../uis/input";

import style from "./Style.module.scss";
import iconBlueCheck from "/public/images/icons/icon-blue-chekc.svg?sprite";

export const ModalEmail = ({
    visible,
    onClose,
    onHanleBtn = () => { },
    data = '',
    setState = () => { },
}) => {
    let isError = (data?.length > 0) && !(/\S+@\S+\.\S+/.test(data));

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
                <div className={`${style.title}`}>E-mail for registration</div>
                <div className={`${style.in_in}`}>
                    <Input
                        label="E-mail"
                        value={data}
                        invalid={isError}
                        valid={(data.length > 0) && /\S+@\S+\.\S+/.test(data)}
                        onChange={(e) => setState(e.target.value)}
                        readOnly={false}
                    />
                </div>
                <div className={`${style.wr_btn} ${style.wr_btn_100} ${style.wr_btn_mt_16}`}>
                    <ButtonIcon
                        label="Save"
                        className="btn--blue"
                        isButton={true}
                        disabled={isError || !data?.length}
                        onHandle={onHanleBtn}
                    />
                </div>
            </div>
        </ModalWrapper>
    )
}