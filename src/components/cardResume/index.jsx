import { useState, useRef, useEffect } from "react";
import Icon from "../Icon";

import style from "./Style.module.scss";
import iconDownload from "/public/images/icons/icon_download_file.svg?sprite"
import iconMoreHorizontal from "/public/images/icons/more_horizontal.svg?sprite"
import iconEdit from "/public/images/icons/icon-edite.svg?sprite"
import iconShare from "/public/images/icons/icon_share.svg?sprite"
import iconDeleteRed from "/public/images/icons/delete_red.svg?sprite"

export const CardResume = ({
    label,
    id = null,
    image = null,
    dateUpdate,
    handleEdit = () => { },
    handlekeyUp = () => { },
    handleBlur = () => { },
    handleShare = () => { },
    handleDelete = () => { },
    handleDewnload = () => { },
}) => {
    const refIdTimeout = useRef(undefined);
    const [stateName, setStateName] = useState(label);
    const [focus, setFocus] = useState(false);

    const handleUpdateServer = async () => {
        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            handleBlur(stateName, id);
            clearTimeout(refIdTimeout.current);
        }, 100);
    }

    const onBlud = () => {
        // handleBlur(stateName, id);
        setFocus(false);
    }

    useEffect(() => {
        if (focus)
            handleUpdateServer();
    }, [stateName]);

    return (
        <div className={`${style.card}`}>
            <div className={`${style.card__head}`}>
                <img src={image} alt="picture resume" onClick={handleEdit} />
                <div className={`${style.card__navigation}`}>
                    <div>
                        <button className="btn-download" onClick={handleDewnload}>
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
                                            <button className="item-btn-m" onClick={handleShare}>
                                                <Icon svg={iconShare} />
                                                <span>Share a link</span>
                                            </button>
                                        </li>
                                        <li className="menus-card_li">
                                            <button className="item-btn-m red" onClick={handleDelete}>
                                                <Icon svg={iconDeleteRed} />
                                                <span>Delete</span>
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
                <div className={`${style.card_name}`}>
                    <div>
                        <input
                            type="text"
                            onChange={(e) => setStateName(e.target.value)}
                            value={stateName}
                            onFocus={() => setFocus(true)}
                            // onKeyUp={(e) => handlekeyUp(e, stateName, id)}
                            onBlur={() => onBlud()}
                        />
                    </div>
                </div>
                <div className={`${style.card_date}`}>{dateUpdate}</div>
            </div>
        </div >
    )
}