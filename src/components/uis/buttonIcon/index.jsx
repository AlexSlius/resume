import Link from "next/link";

import Icon from "../../Icon";

export const ButtonIcon = ({
    href = "#",
    icon,
    label,
    className = "",
    isButton = false,
    onHandle = () => { }
}) => {
    return (
        isButton ? (
            <button
                className={`${className} form-btn btns minp`}
                onClick={onHandle}
            >
                <Icon svg={icon} />
                <span>{label}</span>
            </button>
        ) : (
            <Link
                href={href}
                className={`${className} form-btn btns minp`}
            >
                <Icon svg={icon} />
                <span>{label}</span>
            </Link >
        )
    )
}