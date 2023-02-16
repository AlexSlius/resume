import { CFormInput } from "@coreui/react"
import { isArray, isString } from "lodash";
import React from "react"

import { theFirstHeaderCharacter } from "../../../helpers/strings";

import style from "./Style.module.scss"
import iconPlus from "/public/images/icons/plu-opas.svg?sprite"
import iconPreloader from "/public/images/icons/preloader-blue.svg?sprite"
import Icon from "../../Icon"

export const InputSelect = ({
    handleSaveSelect = () => { },
    handleChallenge = () => { },
    handleOpenChangle = () => { },
    handleAddNew = () => { },
    handleServerRequest = () => { },
    label = '',
    placeholder = '',
    isLoad = false,
    isBackgraundLoad = false,
    invalid = false,
    isFirstList = true,
    valueState = '',
    name = '',
    data = [],
    keyName = "name",
    keyText = "name",
    labelEmpty = "empty list",
    isAddDiv = false,
    obj,
    nTimeMs = 500,
    isOutDataObj = true,
    isCouValid = true,
    isModal = true,
    isIconArrow = false,
    isFlag = false,
    keyIcon = "image",
    isSearch = true,
    firstChildUpCase = true,
}) => {
    const refSelect = React.useRef(undefined);
    const reIn = React.useRef(undefined)
    const reWrClick = React.useRef(undefined)
    const refWr = React.useRef(undefined)
    const isOneStart = React.useRef(false)
    const refCurentClass = React.useRef(undefined)
    const refIdActiveItem = React.useRef(false)
    const refIdTimeout = React.useRef(undefined)
    const [showList, setShowlist] = React.useState(false)
    const [className, setClassName] = React.useState('')
    const [imgSrc, setImgSrc] = React.useState(null);
    const classBgLoad = isBackgraundLoad ? style.load_bg : ''

    const isValid = valueState?.id != undefined;
    const dopClass = isIconArrow ? style.iconArrow : '';

    const handleOnChange = (e) => {
        let out = !!isOutDataObj ? { [keyText]: e.target.value } : e.target.value;
        handleSaveSelect({ name, value: firstChildUpCase ? theFirstHeaderCharacter(out) : out });
    }

    const handledOnBlur = () => {
    }

    const onFocus = () => {
        if (!isFirstList) {
            setShowlist(false);
        }
    }

    const handleOnClickSelect = (data) => {
        refIdActiveItem.current = data?.id;

        if (isFlag) {
            setImgSrc(data[keyIcon]);
        }

        let prop = new Promise(async (resolve, reject) => {
            await setClassName('');
            await resolve(true);
        });

        prop.then(
            function (result) {
                let out = !!isOutDataObj ? data : data[keyText];
                handleSaveSelect({ name, value: out, isClisk: true }, data);
                handleChallenge(data);
            },
            function (error) { }
        )
    }

    const onAddNew = async () => {
        let statusResult = handleAddNew(!!isOutDataObj ? valueState[keyText] : valueState);

        if (!!statusResult) {
            setClassName('');
        }
    }

    React.useEffect(() => {
        if (isModal) {
            const handleClick = (e) => {
                let promis = new Promise(async (resolve, reject) => {
                    // await setShowlist(true);
                    await resolve(true);
                });

                promis.then(
                    function (result) {
                        const cordinate = e.target.getBoundingClientRect();
                        const windowInnerHeight = window.innerHeight;

                        if ((windowInnerHeight - cordinate.bottom) > refWr.current.offsetHeight) {
                            setClassName(prev => {
                                refCurentClass.current = `${prev} ${style.open}`;
                                return `${prev} ${style.open}`;
                            });
                        } else {
                            setClassName(prev => {
                                refCurentClass.current = `${prev} ${style.open_top} ${style.open}`;
                                return `${prev} ${style.open_top} ${style.open}`;
                            });
                        }
                    },
                    function (error) { /* обработает ошибку */ }
                )
            }

            const handleClickClose = (e) => {
                if (refCurentClass.current == undefined)
                    return;

                if (refCurentClass.current.includes(style.open)) {
                    if (!e.composedPath().includes(refSelect.current)) {
                        let promis = new Promise(async (resolve, reject) => {
                            await setClassName('');
                            await resolve(true);
                        });

                        promis.then(
                            function (result) {
                                // setShowlist(false);
                            },
                            function (error) { /* обработает ошибку */ }
                        )
                    }
                }
            }

            // это нужно будет проверить для рендера не сервера
            if (typeof window != 'undefined') {
                setShowlist(true);
            }

            !!reIn?.current && reIn.current.addEventListener('focus', handleClick);
            !!reWrClick.current && reWrClick.current.addEventListener('click', handleClick);
            !!document?.body && document.body.addEventListener('mousedown', handleClickClose);

            return () => {
                !!reIn?.current && reIn.current.addEventListener('focus', handleClick);
                !!reWrClick.current && reWrClick.current.addEventListener('click', handleClick);
                !!document?.body && document.body.addEventListener('mousedown', handleClickClose);
            }
        }
    }, []);

    React.useEffect(() => {
        if (isModal) {
            if (className.includes(style.open)) {
                handleOpenChangle();
            }
        }
    }, [className]);

    React.useEffect(() => {
        if (isFlag) {
            if (isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i][keyName] === valueState) {
                        setImgSrc(data[i][keyIcon]);
                        break;
                    }
                }
            }
        }
    }, [(!!isOutDataObj ? valueState[keyText] : valueState), data])

    React.useEffect(() => {
        if (isOneStart.current) {
            if (isModal) {
                if (!isFirstList && (isArray(data) && data?.length > 0)) {
                    setShowlist(true);
                }

                if ((!!isOutDataObj ? !!valueState[keyText] : !!valueState.length)) {
                    if (refIdTimeout.current) {
                        clearTimeout(refIdTimeout.current);
                    }

                    refIdTimeout.current = setTimeout(async () => {
                        await handleServerRequest(!!isOutDataObj ? valueState[keyText] : valueState);
                        clearTimeout(refIdTimeout.current);
                    }, nTimeMs);
                }
            }
        } else {
            isOneStart.current = true;
        }
    }, [(!!isOutDataObj ? valueState[keyText] : valueState)])

    return (
        <div ref={refSelect} className={`${style.mob_select} ${className} dom_mob_select`}>
            <div className={`${style.mod_filed} ${dopClass} ${!!imgSrc ? style.is_flag : ''}`} ref={reWrClick}>
                {
                    isFlag && (
                        <div className={`${style.wrpa_click}`}>
                            {imgSrc && <img src={imgSrc} />}
                        </div>
                    )
                }

                <CFormInput
                    onChange={handleOnChange}
                    onBlur={handledOnBlur}
                    onFocus={onFocus}
                    ref={reIn}
                    floatingLabel={label}
                    placeholder={placeholder}
                    floatingClassName={style.contoll}
                    invalid={!!invalid}
                    valid={isCouValid ? !!isValid : false}
                    name={name}
                    value={!!isOutDataObj ? valueState[keyText] || '' : valueState || ''}
                    type="text"
                    autocomplete="off"
                    {...obj}
                />
            </div>
            {
                isModal && (
                    <div ref={refWr} className={`${style.wr}`}>
                        {
                            showList && (
                                ((!!data?.length || !!isLoad) || (isAddDiv && (!!isOutDataObj ? !!valueState[keyText] : !!valueState))) && (
                                    <div className={`${style.wr__list} ${classBgLoad}`}>
                                        <ul className={`${style.list} scroll-style`}>
                                            {
                                                isLoad ? (
                                                    <li className={`${style.list__li_load}`}>
                                                        <Icon svg={iconPreloader} />
                                                    </li>
                                                ) : (
                                                    <>
                                                        {
                                                            isAddDiv && !isValid && (!!isOutDataObj ? !!valueState[keyText] : valueState) && (
                                                                <li className={`${style.list__li} ${style.list__li_first}`}>
                                                                    <span>{!!isOutDataObj ? valueState[keyText] : valueState || ''}</span>
                                                                    <div className={`${style.rig}`}>
                                                                        <button className={`${style.button_add}`} onClick={onAddNew} title="Add to list?" type="button">
                                                                            <Icon svg={iconPlus} classNames={[style.button_add_icon]} />
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            )
                                                        }
                                                        {
                                                            isArray(data) ? (
                                                                !!data.length ? (
                                                                    data.map((item, index) => {
                                                                        let activeClassItem = '';
                                                                        let textFirst = '';
                                                                        let textLast = '';

                                                                        if (item[keyName] == (!!isOutDataObj ? valueState[keyText] : valueState)) {
                                                                            activeClassItem = style.active;
                                                                        }

                                                                        if (isSearch) {
                                                                            let textOutItem = isString(item[keyName]) &&
                                                                                item[keyName].toLowerCase().indexOf(!!isOutDataObj ?
                                                                                    valueState[keyText]?.toLowerCase() :
                                                                                    valueState?.toLowerCase(), 0)

                                                                            textOutItem = (textOutItem === 0);

                                                                            if (((!!isOutDataObj ? valueState[keyText]?.length : valueState?.length) > 0) && !textOutItem) {
                                                                                return;
                                                                            } else if ((!!isOutDataObj ? valueState[keyText]?.length : valueState?.length) == 0 || (!!isOutDataObj ? valueState[keyText] : valueState) == undefined) {
                                                                                textLast = item[keyName];
                                                                            } else if (((!!isOutDataObj ? valueState[keyText]?.length : valueState?.length) > 0) && textOutItem) {
                                                                                textLast = item[keyName].toLowerCase().replace((!!isOutDataObj ? valueState[keyText] : valueState)?.toLowerCase(), '');
                                                                                textFirst = theFirstHeaderCharacter((!!isOutDataObj ? valueState[keyText] : valueState));
                                                                            }
                                                                        } else {
                                                                            textLast = item[keyName];
                                                                        }

                                                                        return (
                                                                            <li key={index} className={`${style.list__li}`}>
                                                                                <button
                                                                                    className={`${style.button} 
                                                                        ${activeClassItem}`}
                                                                                    type="button"
                                                                                    onClick={() => handleOnClickSelect(item)}
                                                                                >
                                                                                    {isFlag && <img src={item[keyIcon]} />}
                                                                                    {!!textFirst && <span>{textFirst}</span>}{textLast}
                                                                                </button>
                                                                            </li>
                                                                        )
                                                                    })
                                                                ) : (
                                                                    <>
                                                                        {/* <li className={`${style.list__li} ${style.list__li_no}`}>{labelEmpty}</li> */}
                                                                    </>
                                                                )
                                                            )
                                                                : (
                                                                    <>
                                                                        {/* <li className={`${style.list__li} ${style.list__li_no}`}>{labelEmpty}</li> */}
                                                                    </>
                                                                )
                                                        }
                                                    </>
                                                )
                                            }
                                        </ul>
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}