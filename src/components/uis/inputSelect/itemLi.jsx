import style from "./Style.module.scss"

export const ItemLi = ({
    item,
    value,
    activeClassItem,
    isFlag,
    keyIcon,
    isUpperCase,
    handleOnClickSelect = () => { },
}) => {
    return (
        <li className={`${style.list__li}`}>
            <button
                className={`${style.button} ${activeClassItem} ${isUpperCase ? style.uper : ""}`}
                type="button"
                onClick={() => handleOnClickSelect(item, !!activeClassItem)}
            >
                {(!!isFlag && !!item[keyIcon]?.length) && <img src={item[keyIcon]} />}
                <span dangerouslySetInnerHTML={{ __html: value }}></span>
            </button>
        </li>
    )
}