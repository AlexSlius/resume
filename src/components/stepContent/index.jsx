import style from "./Style.module.scss";

export const StepContent = ({
    icon = null,
    title = null,
    label = null
}) => {
    return (
        <div className={`${style.wr}`}>
            {
                !!icon && (
                    <div className={`${style.icon}`}>
                        <img src={icon} />
                    </div>
                )
            }
            {
                !!title && (
                    <div className={`${style.title}`}>{title}</div>
                )
            }
            {
                !!label && (
                    <div className={`${style.label}`}>{label}</div>
                )
            }
        </div>
    )
}