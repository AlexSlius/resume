import { useState, useEffect, useRef } from "react";
import { isArray, isString } from 'lodash';

import Icon from "../../Icon"
import { InputSelect } from "../../uis/inputSelect"

import iconPreloader from "/public/images/icons/preloader-blue.svg?sprite"
import iconLeftText from '/public/images/icons/icon-t-left.svg?sprite'
import iconOkText from '/public/images/icons/icon-ok-text.svg?sprite'
import iconEmpty from "/public/images/icons/icon-empty-list.svg?sprite"

export const FormSearchContent = ({
    isLoad = false,
    valueText = "",
    keys = "value",
    data,
    labelEmpty = "Empty list",
    nTimeMs = 500,
    isExternalDate = false,
    externalValue = "",
    listVariant = [],
    externalCollback = () => { },
    handleServerRequest = () => { },
    handleUpdateText = () => { },
    handleGet = () => { },
    limit = 100,
    length = 0
}) => {
    const refIdTimeout = useRef(null);
    const [textSearch, setTextSearch] = useState('');
    let val = isExternalDate ? externalValue : textSearch;
    let isMaxLimit = length < limit;

    const handleOnClickAddTextList = (value) => {
        handleUpdateText(value);
    }

    useEffect(() => {
        if (val.length > 0) {

            if (refIdTimeout.current) {
                clearTimeout(refIdTimeout.current);
            }

            refIdTimeout.current = setTimeout(async () => {
                await handleServerRequest(val);
                clearTimeout(refIdTimeout.current);
            }, nTimeMs);
        }
    }, [textSearch, externalValue]);

    return (
        <div className={`modal-text search-text-content`}>
            <div className='modal-text__main'>
                <div className='modal-text__head'>
                    <InputSelect
                        placeholder="Filter phrases by keyword"
                        valueState={val}
                        data={listVariant}
                        handleSaveSelect={(obj, data) => isExternalDate ? externalCollback(obj.value, data) : setTextSearch(obj.value)}
                        handleServerRequest={handleGet}
                        isOutDataObj={false}
                        isAcitveCurrent={false}
                        isIconDandruff={true}
                        isOnlyDown={true}
                    />

                </div>
                <div className='modal-text__content modal-text__content_mod'>
                    {
                        !!val.length && <div className="modal-text__show">Showing {isArray(data) ? data.length : 0} results </div> // for <span>{val}</span>
                    }

                    {
                        !isLoad ? (
                            (isArray(data) && !!(data.length > 0)) ? (
                                <ul className='scroll-style'>
                                    {
                                        data.map((item, index) => {
                                            let isStatus = (isString(valueText) && (valueText?.includes(item?.[keys]))) || false;

                                            return (
                                                <li
                                                    key={index}
                                                    onClick={() => isStatus ? "" : handleOnClickAddTextList(item?.[keys] || "")}
                                                    className={(!isMaxLimit && !isStatus) ? "poiner_none" : ""}
                                                >
                                                    <span className='text-icon-in'>
                                                        <Icon svg={isStatus ? iconOkText : iconLeftText} />
                                                    </span>
                                                    <div className='text-div-in' dangerouslySetInnerHTML={{ __html: item?.[keys] || "" }}></div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ) : (
                                <div className={`empty-text empty-text__mod`}>
                                    <div><Icon svg={iconEmpty} /></div>
                                    <div>{labelEmpty}</div>
                                </div>
                            )
                        ) : (
                            <div className='li-load'>
                                <Icon svg={iconPreloader} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}