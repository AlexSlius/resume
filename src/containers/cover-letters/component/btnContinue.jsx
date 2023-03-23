import { ButtonIcon } from "../../../components/uis/buttonIcon";

import iconBtnNext from "/public/images/icons/icon-bnt-next.svg?sprite";

export const BtnContinue = ({
    href = '',
    isButton = false,
    label = "Continue"
}) => {
    return (
        <div className="wr-btn-cover">
            <ButtonIcon
                icon={iconBtnNext}
                label={label}
                isButton={isButton}
                className="btn--blue btn-style-min"
                href={href}
            // onHandle={onHanleBtn}
            />
        </div>
    )
}