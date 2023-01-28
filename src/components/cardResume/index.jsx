import Link from "next/link";
import Icon from "../Icon";

import style from "./Style.module.scss";
import iconDownload from "/public/images/icons/icon_download_file.svg?sprite"
import iconMoreHorizontal from "/public/images/icons/more_horizontal.svg?sprite"
import iconEdit from "/public/images/icons/icon-edite.svg?sprite"
import iconShare from "/public/images/icons/icon_share.svg?sprite"

export const CardResume = ({
    label,
    dateUpdate,
    handleEdit = () => { }
}) => {
    return (
        <div className={`${style.card}`}>
            <div className={`${style.card__head}`}>
                <img src="/images/other/img_resume.png" alt="picture resume" />
                <div className={`${style.card__navigation}`}>
                    <div>
                        <button className="btn-download">
                            <Icon svg={iconDownload} />
                        </button>
                    </div>
                    <div>
                        <div className="menus-card">
                            <div className="bnt-menus">
                                <Icon svg={iconMoreHorizontal} />
                            </div>
                            <div className="menus-card_wr">
                                <div className="menus-card_cont">
                                    <ul className="menus-card_ul">
                                        <li className="menus-card_li">
                                            <button className="item-btn-m" onClick={handleEdit}>
                                                <Icon svg={iconEdit} />
                                                <span>Edit</span>
                                            </button>
                                        </li>
                                        <li className="menus-card_li">
                                            <button className="item-btn-m">
                                                <Icon svg={iconShare} />
                                                <span>Share a link</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${style.card_bot}`}>
                <div className={`${style.card_name}`}>{label}</div>
                <div className={`${style.card_date}`}>{dateUpdate}</div>
            </div>
        </div >
    )
}