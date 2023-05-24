import React from "react";
import { useSelector } from 'react-redux';
import { isArray } from 'lodash';
import { CFormInput } from "@coreui/react";
import { convertToHTML } from "draft-convert";

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
    handleServerRequest = () => { },
    handleUpdateText = () => { },
}) => {
    const refIdTimeout = React.useRef(null);
    const [textSearch, setTextSearch] = React.useState('');

    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    const handleOnClickAddTextList = (value) => {
        handleUpdateText(value);
    }

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
                        placeholder="Filter phrases by keyword"
                    />
                    <Icon svg={iconSearch} />
                </div>
                <div className='modal-text__content modal-text__content_mod'>
                    {
                        !!textSearch.length && <div className="modal-text__show">Showing {isArray(data) ? data.length : 0} results for <span>{textSearch}</span></div>
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