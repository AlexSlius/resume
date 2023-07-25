import { isArray } from "lodash";
import { useRef, useEffect, useState } from "react"

import { theFirstHeaderCharacter } from "../../../helpers/strings";

import style from "./Style.module.scss"

import { ItemLi } from "./itemLi";
import { Head } from "./head";
import { AddList } from "./addLi";
import { mathcesSelect } from "../../../utils/selectMatches";


export const InputSelect = ({
    handleSaveSelect = () => { },
    handleChallenge = () => { },
    handleAddNew = () => { },
    handleServerRequest = () => { },
    onDelete = () => { },
    handleClickActiveItem = () => { },
    label = undefined,
    placeholder = undefined,
    invalid = false,
    isFirstList = true,
    valueState = '',
    name = undefined,
    data = [],
    keyName = "name",
    isKyrentName = false,
    keyText = "name",
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
    isIconDandruff = false,
    firstChildUpCase = true,
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
    isStaticData = false,
    isAcitveCurrent = true,
    isOnlyDown = false,
}) => {
    const refSelect = useRef(undefined);
    const reIn = useRef(undefined)
    const reWrClick = useRef(undefined)
    const refWr = useRef(undefined)
    const isOneStart = useRef(false)
    const refCurentClass = useRef(undefined)
    const refIdActiveItem = useRef(false)
    const refIdTimeout = useRef(undefined)
    const [showList, setShowlist] = useState(false)
    const [className, setClassName] = useState('')
    const [imgSrc, setImgSrc] = useState(null);
    const [isNoneReuq, setIsNoneReuq] = useState(false);

    const classDelete = isDelete ? 'btn_delete' : '';
    const keyNameDev = `${keyName}_d`;

    const isValid = valueState?.id != undefined;
    const dopClass = isIconArrow ? style.iconArrow : '';
    const {
        data: mathDatasList,
        marhIsAdd
    } = mathcesSelect({
        arrList: data,
        keyName,
        keyText,
        valueState,
        isOutDataObj,
        isSearch,
        isStaticData,
        keyNameDev,
    });

    const handleOnChange = (e) => {
        let out = !!isOutDataObj ? { [keyText]: e.target.value.trim() } : e.target.value.trim();
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

                if (!isOnlyDown) {
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

                if (isOnlyDown) {
                    setClassName(prev => {
                        refCurentClass.current = `${prev} ${style.open}`;
                        return `${prev} ${style.open}`;
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

                if (refIdTimeout.current) {
                    clearTimeout(refIdTimeout.current);
                }

                refIdTimeout.current = setTimeout(async () => {
                    handleServerRequest(!!isOutDataObj ? valueState[keyText] : valueState);
                    clearTimeout(refIdTimeout.current);
                }, nTimeMs);
            }
        } else {
            isOneStart.current = true;
        }

        if (!!isFlag) {
            if ((!!isOutDataObj ? valueState[keyText] : valueState).length == 0 && (!!imgSrc?.length > 0)) {
                setImgSrc(null);
            }
        }
    }, [(!!isOutDataObj ? valueState[keyText] : valueState)]);

    return (
        <div ref={refSelect} className={`${style.mob_select} ${className} dom_mob_select`}>
            <Head
                {...{
                    dopClass,
                    imgSrc,
                    classDelete,
                    reWrClick,
                    isFlag,
                    isOutDataObj,
                    valueState,
                    keyText,
                    handleOnChange,
                    handledOnBlur,
                    autoComplete,
                    label,
                    invalid,
                    isValidIn,
                    isCouValid,
                    isValid,
                    validIn,
                    placeholder,
                    reIn,
                    name,
                    obj,
                    isDelete,
                    onDelete,
                    onFocus,
                    id,
                    isSearch,
                    isIconDandruff,
                }}
            />
            {
                isModal && (
                    <div ref={refWr} className={`${style.wr} wrs`}>
                        {
                            showList && (
                                (!!data?.length || (isAddDiv && (!!isOutDataObj ? !!valueState[keyText] : !!valueState))) && (
                                    <div className={`${style.wr__list} `}>
                                        <ul className={`${style.list} scroll-style`}>
                                            {
                                                isAddDiv && !isValid && (!!isOutDataObj ? !!valueState[keyText] : valueState) && (
                                                    marhIsAdd && (
                                                        <AddList
                                                            {...{
                                                                onAddNew,
                                                                isOutDataObj,
                                                                valueState,
                                                                keyText
                                                            }}
                                                        />
                                                    )
                                                )
                                            }
                                            {
                                                isArray(data) ? (
                                                    mathDatasList.map((item, index) => {
                                                        if (!item[keyName])
                                                            return null;

                                                        let activeClassItem = '';

                                                        if (isActiveItem) {
                                                            if (isArray(activeArr)) {
                                                                if (!!activeArr.find(el => el[keyActiveEl] == item.id)) {
                                                                    activeClassItem = style.active;
                                                                }
                                                            }
                                                        } else {
                                                            if (isAcitveCurrent)
                                                                if (item[keyName] == (!!isOutDataObj ? valueState[keyText] : valueState)) {
                                                                    activeClassItem = style.active;
                                                                }
                                                        }

                                                        return (
                                                            <ItemLi
                                                                key={index}
                                                                {...{
                                                                    item,
                                                                    value: isKyrentName ? item[keyName] : item[keyNameDev],
                                                                    activeClassItem,
                                                                    isFlag,
                                                                    keyIcon,
                                                                    isUpperCase,
                                                                    handleOnClickSelect
                                                                }}
                                                            />
                                                        )
                                                    })
                                                ) : null
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