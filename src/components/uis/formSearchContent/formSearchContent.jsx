import React from "react";
import { isArray } from 'lodash';
import { CFormInput } from "@coreui/react"

import Icon from "../../Icon"

import iconPreloader from "/public/images/icons/preloader-blue.svg?sprite"
import iconSearch from "/public/images/icons/search-grey.svg?sprite"
import iconLeftText from '/public/images/icons/icon-t-left.svg?sprite'

export const FormSearchContent = ({
    isLoad = false,
    keys = "value",
    data,
    labelEmpty = "empty list",
    nTimeMs = 500,
    handleOnClickAddTextList = () => { },
    handleServerRequest = () => { },
}) => {
    const refIdTimeout = React.useRef(null);
    const [textSearch, setTextSearch] = React.useState('');

    React.useEffect(() => {
        if (textSearch.length > 0) {

            if (refIdTimeout.current) {
                clearTimeout(refIdTimeout.current);
            }

            refIdTimeout.current = setTimeout(async () => {
                await handleServerRequest(textSearch);
                clearTimeout(refIdTimeout.current);
            }, nTimeMs);
        }
    }, [textSearch]);

    return (
        <div className={`modal-text search-text-content`}>
            <div className='modal-text__main'>
                <div className='modal-text__head'>
                    <CFormInput
                        onChange={(e) => setTextSearch(e.target.value)}
                        value={textSearch}
                        type="text"
                        placeholder="Filter phrases by keyword and job title"
                        name="search"
                    />
                    <Icon svg={iconSearch} />
                </div>
                <div className='modal-text__content'>
                    {
                        !!textSearch.length && <div className="modal-text__show">Showing {isArray(data) ? data.length : 0} results for <span>{textSearch}</span></div>
                    }
                    <ul className='scroll-style'>
                        {
                            !isLoad ? (
                                isArray(data) ? (
                                    !!data.length ? (
                                        data.map((item, index) => (
                                            <li key={index} onClick={() => handleOnClickAddTextList(item?.[keys] || "")}>
                                                <span className='text-icon-in'>
                                                    <Icon svg={iconLeftText} />
                                                </span>
                                                <div className='text-div-in'>{item?.[keys] || ""}</div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className={`empty-text`}>{labelEmpty}</li>
                                    )
                                ) : (
                                    <li className={`empty-text`}>{labelEmpty}</li>
                                )
                            ) : (
                                <li className='li-load'>
                                    <Icon svg={iconPreloader} />
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}