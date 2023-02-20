import React, { Component, useEffect } from 'react';
import moment from 'moment';
import { CFormInput } from "@coreui/react"

import style from "./Style.module.scss";

export const DatePicker = ({
    onChange,
    selected,
    floatingLabel,
    placeholderText,
    name
}) => {
    const refSelect = React.useRef(undefined);
    let useRefData = React.useRef(undefined);
    let useRefDataNewIn = React.useRef(undefined);
    let useRefContainer = React.useRef(undefined);
    let useRefWrContainer = React.useRef(undefined);
    const refCurentClass = React.useRef(undefined);
    const [isHiden, setIsHiden] = React.useState(true);

    const [clases, setClases] = React.useState(style.none);

    useEffect(() => {
        if (typeof window != 'undefined') {
            if (!!useRefData.current) {
                $(useRefData.current).Zebra_DatePicker({
                    view: 'years',
                    format: 'M, d, Y',
                    start_date: new Date(!!selected ? selected : null),
                    always_visible: $(useRefContainer.current),

                    onSelect: function (data) {
                        onChange(moment(data).format());
                        useRefDataNewIn.current.blur();

                        setClases(prev => {
                            refCurentClass.current = `${style.none}'`;
                            return `${style.none}`;
                        });
                    }
                });
            }

            const handleFocus = (e) => {
                const cordinate = e.target.getBoundingClientRect();
                const windowInnerHeight = window.innerHeight;

                if ((windowInnerHeight - cordinate.bottom) > useRefWrContainer.current.offsetHeight) {
                    setClases(prev => {
                        refCurentClass.current = `${style.open}`;
                        return `${style.open}`;
                    });
                } else {
                    setClases(prev => {
                        refCurentClass.current = `${style.open_top} ${style.open}`;
                        return `${style.open_top} ${style.open}`;
                    });
                }
            }

            const handleClickClose = (e) => {
                if (refCurentClass.current == undefined)
                    return;

                if (refCurentClass.current.includes(style.open)) {
                    if (!e.composedPath().includes(refSelect.current)) {
                        setClases(`${style.none}`);
                    }
                }
            }

            !!document?.body && document.body.addEventListener('mousedown', handleClickClose);
            !!useRefDataNewIn.current && useRefDataNewIn.current.addEventListener('focus', handleFocus)

            return () => {
                !!document?.body && document.body.addEventListener('mousedown', handleClickClose);
                !!useRefDataNewIn.current && useRefDataNewIn.current.addEventListener('focus', handleFocus);
            }
        }
    }, []);

    return (
        <div className={`${style.wt_cal}`} ref={refSelect}>
            <CFormInput
                ref={useRefDataNewIn}
                name={name}
                value={selected ? moment(new Date(selected)).format('MMM, YYYY') : ""}
                floatingLabel={floatingLabel}
                placeholder={placeholderText}
            />
            <input type="text" ref={useRefData} className={`${style.ins}`} />
            <div ref={useRefWrContainer} className={`${style.wrData} ${clases}`}>
                {
                    isHiden && (
                        <div ref={useRefContainer}></div>
                    )
                }
            </div>
        </div>
    )
}