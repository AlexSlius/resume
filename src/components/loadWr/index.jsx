import style from "./Style.module.scss";

export const LoadWr = ({
    children,
    isLoad = false,
    style = {},
    classes=''
}) => {
    let classLoad = isLoad ? style.load_bg : '';

    return (
        <div className={`${style.wr} ${classLoad} load-ages ${classes}`} style={style}>
            {children}
        </div>
    )
}