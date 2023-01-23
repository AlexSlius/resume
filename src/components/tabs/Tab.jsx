import style from "./Style.module.scss"

export const Tab = ({
    label = '',
    onClick = () => { },
    isActive = false,
    data
}) => {
    let classBtn = isActive ? style.active : '';

    return (
        <div className={`${style.tab}`}>
            <button className={`${style.tab_btn} ${classBtn}`} onClick={() => onClick(data)}>{label}</button>
        </div>
    )
}