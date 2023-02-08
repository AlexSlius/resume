import React, { useEffect, useState } from "react";

import Icon from "../Icon";
import style from "./Style.module.scss";
import iconStart from "/public/images/icons/icon-starts.svg?sprite";

const activeColor = ({ defColor, index, activeCol }) => {
    let color = defColor;

    if (activeCol == 0) {
        color = defColor;
    } else if (activeCol <= 2) {
        color = "#F63B3B";
    } else if (activeCol <= 3) {
        color = "#FFAD61";
    } else if (activeCol >= 4) {
        color = "#6DC26C";
    }

    if (activeCol >= (index + 1)) {
        return color;
    } else {
        return defColor;
    }
}

export const StartsComponent = ({
    col = 5,
    activeCol = 0,
    defColor = "#DADCE3",
    onHandle = () => { },
    isEdit = true,
}) => {
    const [isMaus, setIsMaus] = useState(false);
    const [indexMaus, setIndexMaus] = useState(0);

    const mouseEnter = (index) => {
        setIsMaus(true);
        setIndexMaus(index);
    }

    const mouseOut = () => {
        setIsMaus(false);
        setIndexMaus(0);
    }

    return (
        <div className={`${style.wr_star} ${!isEdit ? style.no_edit : ""}`}>
            <ul>
                {
                    [...Array(col).keys()].map((_, index) => {
                        return (
                            <li
                                key={index}
                                style={{ fill: activeColor({ defColor, index, activeCol: isMaus ? indexMaus : activeCol }) }}
                                onClick={() => onHandle(index + 1)}
                                onMouseEnter={() => mouseEnter(index + 1)}
                                onMouseLeave={() => mouseOut()}
                            >
                                <Icon svg={iconStart} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}