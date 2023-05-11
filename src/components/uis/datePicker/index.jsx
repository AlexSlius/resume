import React, { useEffect } from 'react';
import moment from 'moment';
import classnames from 'classnames';

import Input from "../input";
import Icon from '../../Icon';

import iconCloseX from "/public/images/icons/icon_close_x.svg?sprite";
import style from "./Style.module.scss";


export const DatePicker = ({
    onChange,
    selected,
    floatingLabel,
    placeholderText,
    name,
    formatInput = 'MMM, YYYY',
    formatData = 'M, Y'
}) => {
    const refSelect = React.useRef(undefined);
    let useRefData = React.useRef(undefined);
    let useRefDataNewIn = React.useRef(undefined);
    let useRefContainer = React.useRef(undefined);
    let useRefWrContainer = React.useRef(undefined);
    const refCurentClass = React.useRef(undefined);
    const refBtn = React.useRef(undefined);
    const [isHiden, setIsHiden] = React.useState(true);

    const [clases, setClases] = React.useState(style.none);

    useEffect(() => {
        if (typeof window != 'undefined') {
            if (!!useRefData?.current && !!useRefContainer?.current) {
                $(useRefData?.current).Zebra_DatePicker({
                    view: 'years',
                    show_icon: false,
                    format: formatData,
                    start_date: new Date(!!selected ? selected : "1994-08-01T00:00:00+03:00"),
                    always_visible: $(useRefContainer?.current),
                    onSelect: function (data) {
                        // onChange(moment(data).format(formatInput));

                        useRefData?.current.blur();
                        useRefDataNewIn?.current.blur();

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

                //useRefWrContainer.current.offsetHeight
                if ((windowInnerHeight - cordinate.bottom) > 220) {
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
            !!useRefDataNewIn.current && useRefDataNewIn.current.addEventListener('focus', handleFocus);
            !!refBtn.current && refBtn.current.addEventListener('click', handleFocus);

            return () => {
                !!document?.body && document.body.addEventListener('mousedown', handleClickClose);
                !!useRefDataNewIn.current && useRefDataNewIn.current.addEventListener('focus', handleFocus);
                !!refBtn.current && refBtn.current.addEventListener('click', handleFocus);
            }
        }
    }, [selected]);

    return (
        <div className={`${style.wt_cal} ${selected ? "selected_data" : ""}`} ref={refSelect}>
            <div className={`${style.wt_cal_in} ${style.btn_clean}`}>
                <i className={style.wt_cal_in_icon_cal} ref={refBtn}></i>
                <Input
                    name={name}
                    label={floatingLabel}
                    value={selected ? moment(new Date(selected)).format(formatInput) : ""}
                    // value={selected ? selected : ""}
                    // onChange={(e) => { onChange(e.target.value); console.log(e.target.value) }}
                    obj={{ ref: useRefDataNewIn }}
                    valid={selected?.length > 0}
                    isClean={true}
                />
                {
                    (selected?.length > 0) && (
                        <button type="button" className={style.clean} onClick={() => onChange("")}>
                            <Icon svg={iconCloseX} />
                        </button>
                    )
                }
            </div>

            <input type="text" ref={useRefData} className={`${style.ins}`} />
            <div ref={useRefWrContainer} className={classnames('popup', style.wrData, clases)}>
                {
                    isHiden && (
                        <div ref={useRefContainer}></div>
                    )
                }
            </div>
        </div>
    )
}