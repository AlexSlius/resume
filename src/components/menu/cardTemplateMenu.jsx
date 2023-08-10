import Link from "next/link";

import Icon from "../Icon";
import iconEye from "/public/images/icons/eye-white.svg?sprite";

export const CardTemplateMenu = ({
    scrImg = "",
    handleLink = () => { },
    handlePreview = () => { },
    link = "",
}) => {
    return (
        <div className="sub-card" >
            <img src={scrImg} alt="image template" />
            <div className="card-selec__hove sub-card__hove">
                <div className="card-selec__btn-top">
                    <button className="button-p button-type-grey button-p_icon button-p_grey" onClick={handlePreview}>
                        <i>
                            <Icon svg={iconEye} />
                        </i>
                        <span>Preview</span>
                    </button>
                </div>
                <Link href={link} onClick={handleLink} className="card-selec-btn-select button-p button-type-standart"><span>Use this tempate</span></Link>
            </div>
        </div>
    )
}