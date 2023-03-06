import style from "./Style.module.scss"

export const TitlePage = ({ titleText }) => {
    return(
        <h2 className={`${style.title}`}>{titleText}</h2>
    )
}

