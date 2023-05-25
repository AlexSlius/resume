import { useState, useEffect, useRef } from "react";
import { isArray } from 'lodash';
import { CFormInput } from "@coreui/react";

import Icon from "../../Icon"

import iconPreloader from "/public/images/icons/preloader-blue.svg?sprite"
import iconSearch from "/public/images/icons/search-grey.svg?sprite"
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
    externalCollback = () => { },
    handleServerRequest = () => { },
    handleUpdateText = () => { },
}) => {
    const refIdTimeout = useRef(null);
    const [textSearch, setTextSearch] = useState('');
    let val = isExternalDate ? externalValue : textSearch;


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
                    <CFormInput
                        onChange={(e) => isExternalDate ? externalCollback(e.target.value) : setTextSearch(e.target.value)}
                        value={val}
                        type="text"
                        placeholder="Filter phrases by keyword"
                    />
                    <Icon svg={iconSearch} />
                </div>
                <div className='modal-text__content modal-text__content_mod'>
                    {
                        !!val.length && <div className="modal-text__show">Showing {isArray(data) ? data.length : 0} results for <span>{val}</span></div>
                    }

                    {
                        !isLoad ? (
                            (isArray(data) && !!(data.length > 0)) ? (
                                <ul className='scroll-style'>
                                    {
                                        data.map((item, index) => {
                                            let isStatus = valueText.includes(item?.[keys]);

                                            return (
                                                <li key={index} onClick={() => handleOnClickAddTextList(item?.[keys] || "")}>
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