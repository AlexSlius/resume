import { useState } from "react";
import { ButtonIcon } from "../../../components/uis/buttonIcon";

import iconBtnNext from "/public/images/icons/icon-bnt-next.svg?sprite";
import { LoadChildrenBtn } from "../../../components/loadChildrenBtn";

export const BtnContinue = ({
    href = '',
    isButton = false,
    label = "Continue",
    onHanleBtn = () => { },
    isload = undefined,
}) => {
    const [loadBtn, isLoadBtn] = useState(false);

    return (
        <div className="wr-btn-cover">
            <LoadChildrenBtn isLoad={(isload === undefined) ? loadBtn : isload}>
                <ButtonIcon
                    icon={iconBtnNext}
                    label={label}
                    isButton={isButton}
                    className="btn--blue btn-style-min"
                    href={href}
                    onHandle={() => { isLoadBtn(true); onHanleBtn(); }}
                />
            </LoadChildrenBtn>
        </div>
    )
}