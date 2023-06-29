import Icon from "../../Icon"
import Input from "../input";

import style from "./Style.module.scss"
import deleteIcon from "/public/images/icons/delete.svg??sprite";

export const Head = ({
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
    isSearch
}) => {
    return (
        <div className={`${style.mod_filed} ${dopClass} ${!!imgSrc ? style.is_flag : ''} ${classDelete}`} ref={reWrClick}>
            <div className={`${style.mod__wr_r}`}>
                {
                    (!!isFlag && (!!imgSrc?.length > 0) && (!!isOutDataObj ? valueState[keyText] || '' : valueState || '')) && (
                        <div className={`${style.wrpa_click}`}>
                            <img src={imgSrc} />
                        </div>
                    )
                }

                <Input
                    onChange={isSearch ? handleOnChange : () => { }}
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
    )
}