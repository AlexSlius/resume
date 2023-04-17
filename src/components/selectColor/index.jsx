import { SketchPicker } from 'react-color';
import { useState, useEffect, useRef } from "react";

import Icon from "../Icon";

import iconPlusColor from "/public/images/icons/plus-color.svg?sprite";

export const SelectColor = () => {
    const [showz, setShow] = useState(false);
    const refDiv = useRef();
    const refClass = useRef(false);

    const open = () => {
        setShow(prev => !prev);
        refClass.current = true;
    }

    useEffect(() => {
        let handleClickClose = (e) => {

            if (refClass.current == true)
                if (!e.composedPath().includes(refDiv.current)) {
                    setShow(false);
                }
        }

        !!document?.body && document.body.addEventListener('mousedown', handleClickClose);

        return () => {
            !!document?.body && document.body.addEventListener('mousedown', handleClickClose);
        }
    }, []);

    return (
        <div className="color-it color-select" ref={refDiv}>
            <Icon svg={iconPlusColor} />
            <div className="color-select__btn" onClick={open}></div>
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