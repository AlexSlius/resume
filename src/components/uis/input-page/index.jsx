
import Icon from '../../Icon';

import iconCloseX from "/public/images/icons/icon_close_x.svg?sprite";

export const InputPage = ({
    placeholder = "",
    type = "text",
    value,
    onChange = () => { },
    handleKeyUpa = () => { },
    handleClean = () => { },
    isSearch = false,
    isClean = false
}) => {
    let cleanValid = isClean ? value?.length > 0 ? "input_clean_btn" : '' : '';

    return (
        <div className={`form-input ${isSearch ? "in-sea" : ""} ${cleanValid}`}>
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onKeyUp={handleKeyUpa}
                autoComplete="off"
            />
            {
                !!cleanValid && (
                    <button onClick={handleClean}>
                        <Icon svg={iconCloseX} />
                    </button>
                )
            }
        </div>
    )
}