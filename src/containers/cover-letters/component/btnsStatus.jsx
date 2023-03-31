import { ButtonIcon } from "../../../components/uis/buttonIcon";

import iconBtnNext from "/public/images/icons/icon-bnt-next.svg?sprite";
import iconClos from "/public/images/icons/icon-btn-clos.svg?sprite";

export const BtnsStatus = ({
    textBtnCont = "Yes",
    onHanlebtn = () => { },
}) => {
    return (
        <div className="wr-btn-cover">
            <ButtonIcon
                icon={iconBtnNext}
                label={textBtnCont}
                isButton={true}
                className="btn--blue btn-style-min"
                onHandle={() => onHanlebtn("Y")}
            />
            <ButtonIcon
                icon={iconClos}
                label="No"
                isButton={true}
                className="btn--grey-two btn-style-min"
                onHandle={() => onHanlebtn("N")}
            />
        </div>
    )
}