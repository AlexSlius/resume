import * as React from 'react';
import { Editor } from 'draft-js';
import { useEditorApi } from './context';

import iconPlus from "/public/images/icons/plu-opas.svg?sprite"
import iconPreloader from "/public/images/icons/preloader-blue.svg?sprite"
import iconX from '/public/images/icons/icon-x.svg?sprite';
import Icon from "../../Icon"

const TextEditor = () => {
    const editorRef = React.useRef(null);
    const { state, onChange } = useEditorApi();

    function focusEditor() {
        editorRef.current.focus();
    }

    return (
        <div className='wr-text-edit'>
            <div className='t-wr-btn'>
                <button className='wr-btn'>
                    <span>Pre-written phrases</span>
                    <Icon svg={iconPlus} />
                </button>
            </div>
            <div onClick={focusEditor}>
                <Editor
                    editorKey="foobaz"
                    ref={editorRef}
                    editorState={state}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default TextEditor;