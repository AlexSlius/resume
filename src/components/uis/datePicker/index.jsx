import React, { useEffect, useRef, useState } from 'react';
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
    name,
    formatInput = 'MMM, YYYY',
    formatData = 'M, Y',
    isMindata = true,
    prevData = undefined,
}) => {
    let refSelect = useRef(undefined);
    let useRefData = useRef(undefined);
    let useRefDataNewIn = useRef(undefined);
    let useRefContainer = useRef(undefined);
    let useRefWrContainer = useRef(undefined);
    let refCurentClass = useRef(undefined);
    let refBtn = useRef(undefined);
    let [isHiden, setIsHiden] = useState(true);
    let [clases, setClases] = useState(style.none);
    let prevD = (prevData?.length > 4) ? [false, moment(new Date(prevData)).add(1, 'months').format('MMM, YYYY')] : false;

    useEffect(() => {
        if (typeof window != 'undefined') {

            try {
                if (!!useRefData?.current && !!useRefContainer?.current) {
                    $(useRefData?.current).Zebra_DatePicker({
                        view: 'years',
                        show_icon: false,
                        format: formatData,
                        start_date: new Date(!!selected ? selected : "1994-08-01T00:00:00+03:00"),
                        always_visible: $(useRefContainer?.current),
                        direction: prevD,
                        onSelect: function (data) {
                            onChange((isMindata ? data.replace(",", ", 01,") : data), true);

                            useRefData?.current.blur();
                            useRefDataNewIn?.current.blur();

                            setClases(prev => {
                                refCurentClass.current = `${style.none}'`;
                                return `${style.none}`;
                            });
                        }
                    });
                }
            } catch (error) {
                console.log("eeror calendar: ", error);
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
            !!useRefDataNewIn.current && useRefDataNewIn.current.addEventListener('click', handleFocus);
            !!refBtn.current && refBtn.current.addEventListener('click', handleFocus);

            return () => {
                !!document?.body && document.body.addEventListener('mousedown', handleClickClose);
                !!useRefDataNewIn.current && useRefDataNewIn.current.addEventListener('click', handleFocus);
                !!refBtn.current && refBtn.current.addEventListener('click', handleFocus);
            }
        }
    }, [selected, prevD]);

    return (
        <div className={`${style.wt_cal} ${selected ? "selected_data" : ""}`} ref={refSelect}>
            <div className={`${style.wt_cal_in} ${style.btn_clean}`}>
                <i className={style.wt_cal_in_icon_cal} ref={refBtn}></i>
                <div ref={useRefDataNewIn} className='wr-input'>
                    <Input
                        name={name}
                        label={floatingLabel}
                        value={selected ? moment(new Date(selected)).format(formatInput) : ""}
                        // obj={{ ref: useRefDataNewIn }}
                        valid={selected?.length > 0}
                        isClean={true}
                        disabled={true}
                    />
                </div>
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