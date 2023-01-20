import style from "./Style.module.scss"

export const FormHead = ({
    title,
    subTitle
}) => {
    return (
        <div className={`${style.main}`}>
            <div className={`${style.main__title}`}>{title}</div>
            <div className={`${style.main__title_bub}`}>{subTitle}</div>
        </div>
    )
}