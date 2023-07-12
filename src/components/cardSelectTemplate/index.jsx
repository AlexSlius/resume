import Link from "next/link";

import Icon from "../Icon";
import iconEye from "/public/images/icons/eye-white.svg?sprite";


export const CardSelectTemplate = ({
    link = "",
    image,
    name,
    handleLink = () => { },
}) => {
    return (
        <div className="card-selec">
            <div className="card-selec__main">
                <div className="card-selec__wr-img">
                    <img src={image} alt={name} />
                </div>
                <div className="card-selec__hove">
                    <div className="card-selec__btn-top">
                        <button className="button-p button-type-grey button-p_icon button-p_grey">
                            <i>
                                <Icon svg={iconEye} />
                            </i>
                            <span>Preview</span>
                        </button>
                    </div>
                    <Link href={link} onClick={handleLink} className="card-selec-btn-select button-p button-type-standart"><span>Use this template</span></Link>
                </div>
            </div>
        </div>
    )
}