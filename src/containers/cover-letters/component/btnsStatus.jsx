import { useState } from "react";
import { ButtonIcon } from "../../../components/uis/buttonIcon";

import iconBtnNext from "/public/images/icons/icon-bnt-next.svg?sprite";
import iconClos from "/public/images/icons/icon-btn-clos.svg?sprite";
import { LoadChildrenBtn } from "../../../components/loadChildrenBtn";

export const BtnsStatus = ({
    textBtnCont = "Yes",
    onHanlebtn = () => { },
}) => {
    const [loadBtnN, setLoadBtnN] = useState(false);
    const [loadBtnY, setLoadBtnY] = useState(false);

    return (
        <div className="wr-btn-cover">
            <LoadChildrenBtn isLoad={loadBtnY}>
                <ButtonIcon
                    icon={iconBtnNext}
                    label={textBtnCont}
                    isButton={true}
                    className="btn--blue btn-style-min"
                    onHandle={() => { onHanlebtn("Y"); setLoadBtnY(true) }}
                />
            </LoadChildrenBtn>
            <LoadChildrenBtn isLoad={loadBtnN}>
                <ButtonIcon
                    icon={iconClos}
                    label="No"
                    isButton={true}
                    className="btn--grey-two btn-style-min"
                    onHandle={() => { onHanlebtn("N"); setLoadBtnN(true) }}
                />
            </LoadChildrenBtn>
        </div>
    )
}