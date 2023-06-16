import * as React from 'react';
import {
    ContentState,
    Editor,
    EditorState,
    convertFromHTML,
    convertToRaw,
} from 'draft-js';

import { convertToHTML } from "draft-convert"
import { CFormInput } from "@coreui/react"

import Icon from "../../Icon"

import iconPlus from "/public/images/icons/plu-opas.svg?sprite"
import iconSearch from "/public/images/icons/search-grey.svg?sprite"
import iconX from '/public/images/icons/icon-x.svg?sprite';
import iconOkText from '/public/images/icons/icon-ok-text.svg?sprite'
import iconLeftText from '/public/images/icons/icon-t-left.svg?sprite'
import { isArray } from 'lodash';

const TextEditor = ({
    handleServerRequest = () => { },
    handleServeDispatchContent = () => { },
    devValue = '',
    data = [],
    nTimeMs = 500,
    labelEmpty = "Empty list",
    isLoad = false,
    isAddModal = false,
    keys = "name",
    defParams = "",
    updatenIsNew = null
}) => {
    const [state, setState] = React.useState(() => EditorState.createEmpty());

    const refStart = React.useRef(false);
    const refMod = React.useRef(undefined);
    const editorRef = React.useRef(null);
    const reBtn = React.useRef(undefined);
    const refWr = React.useRef(undefined);
    const refCurentClass = React.useRef(undefined);
    const refIdTimeout = React.useRef(null);
    const refTriger = React.useRef(undefined);
    const refIdDispatchTimeout = React.useRef(null);
    const [modalClass, setmodalClass] = React.useState('');
    const [textSearch, setTextSearch] = React.useState('');

    let isOpen = modalClass.includes('open') ? true : false;

    const focusEditor = () => {
        editorRef.current.focus();
    }

    const handleOnClickAddTextList = (text) => {
        const getHtmlEdit = convertToHTML(state.getCurrentContent());
        let htm = `${getHtmlEdit} <ul><li>${text}</li></ul>`

        const blocksFromHTML = convertFromHTML(htm);

        const states = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );

        setState(EditorState.createWithContent(states));
    }

    const handleChange = (state) => {
        let contentHtml = convertToHTML(state.getCurrentContent());

        if (contentHtml === '<ul><li></li></ul>') {
            let blocksFromHTML = convertFromHTML("<p></p>");
            const states = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setState(EditorState.createWithContent(states));
        } else {
            setState(state);
        }
    }

    React.useEffect(() => {
        const blocksFromHTML = convertFromHTML(devValue || "");

        const states = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );

        setState(EditorState.createWithContent(states));

        if (isAddModal) {
            const handleClick = (e) => {
                const cordinate = e.target.getBoundingClientRect();
                const windowInnerHeight = window.innerHeight;

                if (refCurentClass.current?.includes("open")) {
                    setmodalClass('');
                    refCurentClass.current = '';
                    return;
                }

                if ((windowInnerHeight - cordinate.bottom) > refWr.current.offsetHeight) {
                    setmodalClass(prev => {
                        refCurentClass.current = `${prev} open`;
                        return `${prev} open`;
                    });
                } else {
                    setmodalClass(prev => {
                        refCurentClass.current = `${prev} pos_bot open`;
                        return `${prev} pos_bot open`;
                    });
                }
            }

            const handleClickClose = (e) => {
                if (refCurentClass.current == undefined)
                    return;

                if (refCurentClass.current.includes('open')) {
                    if (!e.composedPath().includes(refMod.current)) {
                        let promis = new Promise(async (resolve, reject) => {
                            setmodalClass('');
                            resolve(true);
                        });

                        promis.then(
                            function (result) { },
                            function (error) { /* обработает ошибку */ }
                        )
                    }
                }
            }

            !!reBtn?.current && reBtn.current.addEventListener('click', handleClick);
            !!document?.body && document.body.addEventListener('mousedown', handleClickClose);

            return () => {
                !!reBtn?.current && reBtn.current.addEventListener('click', handleClick);
                !!document?.body && document.body.addEventListener('mousedown', handleClickClose);
            }
        }
    }, []);

    React.useEffect(() => {
        let blocksFromHTML = convertFromHTML(devValue || "");

        const states = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );

        setState(EditorState.createWithContent(states));
    }, [updatenIsNew]); // devValue

    React.useEffect(() => {
        if (isAddModal) {
            if (textSearch.length > 0) {

                if (refIdTimeout.current) {
                    clearTimeout(refIdTimeout.current);
                }

                refIdTimeout.current = setTimeout(async () => {
                    handleServerRequest(textSearch, !!textSearch?.length);
                    clearTimeout(refIdTimeout.current);
                }, nTimeMs);
            }
        }
    }, [textSearch]);

    React.useEffect(() => {
        if (refTriger.current === undefined) {
            refTriger.current = "one render";
        } else {
            if (refIdDispatchTimeout.current) {
                clearTimeout(refIdDispatchTimeout.current);
            }

            refIdDispatchTimeout.current = setTimeout(async () => {
                let contentHtml = convertToHTML(state.getCurrentContent());

                if (refStart.current) {
                    if (contentHtml.length > 7) {
                        handleServeDispatchContent(contentHtml);
                    } else {
                        handleServeDispatchContent("<p></p>");
                    }
                } else {
                    refStart.current = true;
                }

                clearTimeout(refIdDispatchTimeout.current);
            }, nTimeMs);
        }
    }, [state.getCurrentContent()]);

    React.useEffect(() => {
        setTextSearch('');
        if (isOpen) {
            handleServerRequest(defParams ? defParams : textSearch, !!textSearch?.length);
        }
    }, [modalClass]);

    return (
        <div className='wr-text-edit'>
            {
                isAddModal && (
                    <>
                        <div className='t-wr-btn'>
                            <button className='wr-btn' ref={reBtn}>
                                <span>Pre-written phrases</span>
                                <Icon svg={isOpen ? iconX : iconPlus} />
                            </button>
                        </div>
                        <div ref={refWr} className={`modal-text ${modalClass}`}>
                            <div className='modal-text__main' ref={refMod}>
                                <div className='modal-text__head'>
                                    <CFormInput
                                        onChange={(e) => setTextSearch(e.target.value)}
                                        value={textSearch}
                                        type="text"
                                        placeholder="Filter phrases by keyword"
                                    />
                                    <Icon svg={iconSearch} />
                                </div>
                                <div className='modal-text__content'>
                                    <ul className='scroll-style'>
                                        {
                                            isArray(data) ? (
                                                !!data.length ? (
                                                    data.map((item, index) => {
                                                        let isStatus = convertToHTML(state.getCurrentContent())?.includes(item?.[keys]);

                                                        return (
                                                            <li key={index} onClick={() => handleOnClickAddTextList(item?.[keys] || "")}>
                                                                <span className='text-icon-in'>
                                                                    <Icon svg={isStatus ? iconOkText : iconLeftText} />
                                                                </span>
                                                                <div className='text-div-in'>{item?.[keys] || ""}</div>
                                                            </li>
                                                        )
                                                    })
                                                ) : (
                                                    <li className={`empty-text`}>{labelEmpty}</li>
                                                )
                                            ) : (
                                                <li className={`empty-text`}>{labelEmpty}</li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </>
                )
            }
            <div onClick={focusEditor}>
                <Editor
                    ref={editorRef}
                    editorState={state}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default TextEditor;