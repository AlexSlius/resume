import { SketchPicker } from 'react-color';
import { useState } from "react";

import Icon from "../Icon";

import iconPlusColor from "/public/images/icons/plus-color.svg?sprite";

export const SelectColor = () => {
    const [showz, setShow] = useState(false);

    return (
        <div className="color-it color-select">
            <Icon svg={iconPlusColor} />
            <div className="color-select__btn" onClick={() => setShow(prev => !prev)}></div>
            {
                showz && (
                    <div className='sketch-picker__wrapper'>
                        <SketchPicker />
                    </div>
                )
            }
        </div>
    )
}