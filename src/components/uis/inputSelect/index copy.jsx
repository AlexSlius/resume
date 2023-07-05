import { CFormInput } from "@coreui/react"
import { isArray, isString } from "lodash";
import { useRef, useEffect, useState } from "react"

import Input from "../input";

import { theFirstHeaderCharacter } from "../../../helpers/strings";
import Icon from "../../Icon"

import style from "./Style.module.scss"
import iconPlus from "/public/images/icons/plu-opas.svg?sprite"
import iconPreloader from "/public/images/icons/preloader-blue.svg?sprite"
import deleteIcon from "/public/images/icons/delete.svg??sprite";


export const InputSelect = ({
    handleSaveSelect = () => { },
    handleChallenge = () => { },
    handleOpenChangle = () => { },
    handleAddNew = () => { },
    handleServerRequest = () => { },
    onDelete = () => { },
    handleClickActiveItem = () => { },
    label = undefined,
    placeholder = undefined,
    isLoad = false,
    isBackgraundLoad = false,
    invalid = false,
    isFirstList = true,
    valueState = '',
    name = undefined,
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
    isRequire = false,
    isCap = true,
    onBlur = () => { },
    isDelete = false,
    id = null,
    isValidIn = false,
    validIn = false,
    isUpperCase = false,
    autoComplete = "off",
    isShowUpClick = true,
    isActiveItem = false,
    activeArr = [],
    keyActiveEl = 'id',
}) => {
    const refSelect = useRef(undefined);
    const reIn = useRef(undefined)
    const reWrClick = useRef(undefined)
    const refWr = useRef(undefined)
    const isOneStart = useRef(false)
    const refCurentClass = useRef(undefined)
    const refIdActiveItem = useRef(false)
    const refIdTimeout = useRef(undefined)
    const refMoreThanOne = useRef(false);
    const [showList, setShowlist] = useState(false)
    const [className, setClassName] = useState('')
    const [imgSrc, setImgSrc] = useState(null);
    const [isNoneReuq, setIsNoneReuq] = useState(false);

    // const classBgLoad = isBackgraundLoad ? style.load_bg : ''
    const classBgLoad = '';
    let classDelete = isDelete ? 'btn_delete' : '';

    const isValid = valueState?.id != undefined;
    const dopClass = isIconArrow ? style.iconArrow : '';


    const handleOnChange = (e) => {
        let out = !!isOutDataObj ? { [keyText]: e.target.value } : e.target.value;
        handleSaveSelect({ name, value: firstChildUpCase ? theFirstHeaderCharacter(out) : out });
    }

    const handledOnBlur = () => {
        onBlur();
    }

    const onFocus = () => {
        if (!isFirstList) {
            setShowlist(false);
        }
    }

    const handleOnClickSelect = (data, classActive = false) => {
        refIdActiveItem.current = data?.id;

        if (isFlag) {
            setImgSrc(data[keyIcon]);
        }

        let prop = new Promise(async (resolve, reject) => {
            if (isShowUpClick)
                setClassName('');

            setIsNoneReuq(false);
            resolve(true);
        });

        prop.then(
            function (result) {
                let out = !!isOutDataObj ? data : data[keyText];

                if (classActive) {
                    handleClickActiveItem(data);
                } else {
                    handleSaveSelect({ name, value: out, isClisk: true }, data);
                }

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

    useEffect(() => {
        if (isModal) {
            const handleClick = (e) => {
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
            !!reWrClick.current && reWrClick.current.addEventListener('click', () => { isDelete ? () => { } : handleClick });
            !!document?.body && document.body.addEventListener('mousedown', handleClickClose);

            return () => {
                !!reIn?.current && reIn.current.addEventListener('focus', handleClick);
                !!reWrClick.current && reWrClick.current.addEventListener('click', () => { isDelete ? () => { } : handleClick });
                !!document?.body && document.body.addEventListener('mousedown', handleClickClose);
            }
        }
    }, []);

    useEffect(() => {
        if (isModal) {
            if (className.includes(style.open)) {
                handleOpenChangle();
            }
        }
    }, [className]);

    useEffect(() => {
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

    useEffect(() => {
        if (isOneStart.current) {
            if (isModal) {
                if (!isFirstList && (isArray(data) && data?.length > 0)) {
                    setShowlist(true);
                }

                if ((!!isOutDataObj ? !!valueState[keyText] : !!valueState?.length)) {
                    if (refIdTimeout.current) {
                        clearTimeout(refIdTimeout.current);
                    }

                    refIdTimeout.current = setTimeout(async () => {
                        if (!!isOutDataObj ? !!valueState[keyText].length : !!valueState?.length) {
                            handleServerRequest(!!isOutDataObj ? valueState[keyText] : valueState);
                            // if (isRequire) {
                            //     setIsNoneReuq(false);
                            // }
                        }
                        clearTimeout(refIdTimeout.current);
                    }, nTimeMs);
                }
            }

            // if (isRequire) {
            //     setIsNoneReuq(true);
            // }
        } else {
            isOneStart.current = true;
        }

        if (!!isFlag) {
            if ((!!isOutDataObj ? valueState[keyText] : valueState).length == 0 && (!!imgSrc?.length > 0)) {
                setImgSrc(null);
            }
        }
    }, [(!!isOutDataObj ? valueState[keyText] : valueState)])

    return (
        <div ref={refSelect} className={`${style.mob_select} ${className} dom_mob_select`}>
            <div className={`${style.mod_filed} ${dopClass} ${!!imgSrc ? style.is_flag : ''} ${classBgLoad} ${classDelete}`} ref={reWrClick}>
                <div className={`${style.mod__wr_r}`}>
                    {
                        (!!isFlag && (!!imgSrc?.length > 0) && (!!isOutDataObj ? valueState[keyText] || '' : valueState || '')) && (
                            <div className={`${style.wrpa_click}`}>
                                <img src={imgSrc} />
                            </div>
                        )
                    }

                    <Input
                        onChange={handleOnChange}
                        onBlur={handledOnBlur}
                        onFocus={onFocus}
                        autoComplete={autoComplete}
                        label={label}
                        value={!!isOutDataObj ? valueState[keyText] || '' : valueState || ''}
                        invalid={!!invalid}
                        valid={!isValidIn ? isCouValid ? !!isValid : false : validIn}
                        name={name}
                        className={`${style.contoll} ${(!!isFlag && !!imgSrc?.length > 0) ? style.imput_img : ""}`}
                        placeholder={placeholder}
                        obj={{
                            ref: reIn,
                            ...obj
                        }}
                    />
                </div>

                {
                    isDelete && (
                        <button className="bnt-delet-ite" onClick={() => { onDelete(id) }}>
                            <Icon svg={deleteIcon} />
                        </button>
                    )
                }
            </div>
            {
                isModal && (
                    <div ref={refWr} className={`${style.wr} wrs`}>
                        {
                            showList && (
                                ((!!data?.length || !!isLoad) || (isAddDiv && (!!isOutDataObj ? !!valueState[keyText] : !!valueState))) && (
                                    <div className={`${style.wr__list} `}>
                                        {/*  ${isNoneReuq ? style.none : ""} */}
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
                                                                !refMoreThanOne.current && (
                                                                    <li className={`${style.list__li} ${style.list__li_first}`} onClick={onAddNew}>
                                                                        <span>{!!isOutDataObj ? valueState[keyText] : valueState || ''}</span>
                                                                        <div className={`${style.rig}`}>
                                                                            <button className={`${style.button_add}`} title="Add to list?" type="button">
                                                                                <Icon svg={iconPlus} classNames={[style.button_add_icon]} />
                                                                            </button>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            )
                                                        }
                                                        {
                                                            isArray(data) ? (
                                                                !!data.length ? (
                                                                    data.map((item, index) => {
                                                                        let activeClassItem = '';
                                                                        let textFirst = '';
                                                                        let textLast = '';

                                                                        if (isActiveItem) {
                                                                            if (isArray(activeArr)) {
                                                                                if (!!activeArr.find(el => el[keyActiveEl] == item.id)) {
                                                                                    activeClassItem = style.active;
                                                                                }
                                                                            }
                                                                        } else {
                                                                            if (item[keyName] == (!!isOutDataObj ? valueState[keyText] : valueState)) {
                                                                                activeClassItem = style.active;
                                                                            }
                                                                        }

                                                                        if (isSearch && !isBackgraundLoad && !isLoad) {
                                                                            let textOutItem = isString(item[keyName]) &&
                                                                                item[keyName].toLowerCase().indexOf(!!isOutDataObj ?
                                                                                    valueState[keyText]?.toLowerCase() :
                                                                                    valueState?.toLowerCase(), 0)

                                                                            textOutItem = (textOutItem === 0);

                                                                            if (((!!isOutDataObj ? valueState[keyText]?.length : valueState?.length) > 0) && !textOutItem) {
                                                                                if (!!refMoreThanOne.current) {
                                                                                    refMoreThanOne.current = false;
                                                                                }
                                                                                return;
                                                                            } else if ((!!isOutDataObj ? valueState[keyText]?.length : valueState?.length) == 0 || (!!isOutDataObj ? valueState[keyText] : valueState) == undefined) {
                                                                                textLast = item[keyName];
                                                                                if (!refMoreThanOne.current) {
                                                                                    refMoreThanOne.current = true;
                                                                                }
                                                                            } else if (((!!isOutDataObj ? valueState[keyText]?.length : valueState?.length) > 0) && textOutItem) {
                                                                                textLast = item[keyName].toLowerCase().replace((!!isOutDataObj ? valueState[keyText] : valueState)?.toLowerCase(), '');
                                                                                textFirst = theFirstHeaderCharacter((!!isOutDataObj ? valueState[keyText] : valueState));
                                                                                if (!refMoreThanOne.current) {
                                                                                    refMoreThanOne.current = true;
                                                                                }
                                                                            }
                                                                        } else {
                                                                            textLast = item[keyName];
                                                                            if (!refMoreThanOne.current) {
                                                                                refMoreThanOne.current = true;
                                                                            }
                                                                        }

                                                                        // capitalizeAll
                                                                        return (
                                                                            <li key={index} className={`${style.list__li}`}>
                                                                                <button
                                                                                    className={`${style.button} ${activeClassItem} ${isCap ? style.cap : ''}`}
                                                                                    type="button"
                                                                                    onClick={() => handleOnClickSelect(item, !!activeClassItem)}
                                                                                >
                                                                                    {(!!isFlag && !!item[keyIcon]?.length) && <img src={item[keyIcon]} />}
                                                                                    {!!textFirst && <span>{isUpperCase ? textFirst.toUpperCase() : textFirst}</span>}{isUpperCase ? textLast.toUpperCase() : textLast}
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