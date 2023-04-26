import Link from "next/link";

import Icon from "../../Icon";

export const ButtonIcon = ({
    href = "#",
    icon,
    label,
    className = "",
    isButton = false,
    onHandle = () => { },
    disabled,
}) => {
    return (
        isButton ? (
            <button
                disabled={disabled}
                className={`${className} form-btn btns minp`}
                onClick={onHandle}
            >
                {icon ? <Icon svg={icon} /> : null}
                <span>{label}</span>
            </button>
        ) : (
            <Link
                href={href}
                className={`${className} form-btn btns minp`}
            >
                {!!icon && <Icon svg={icon} />}
                <span>{label}</span>
            </Link >
        )
    )
}