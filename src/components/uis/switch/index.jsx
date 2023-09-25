export const Switch = ({
    handleOnChange = () => { },
    isChecked = false,
    name = "",
    label = undefined,
    reverse = false
}) => {
    return (
        <div className={`wr-check ${reverse ? "reverse" : 0}`}>
            <label className="label-switch">
                <input type="checkbox" checked={isChecked} onChange={() => handleOnChange(isChecked ? 0 : 1)} hidden name={name} />
                <span></span>
            </label>
            {label && <div className="wr-check_label">{label}</div>}
        </div>
    )
}