export const Switch = ({
    handleOnChange = () => { },
    isChecked = false,
    name = "",
    label = undefined,
}) => {
    return (
        <div className={`wr-check`}>
            <label className="label-switch">
                <input type="checkbox" checked={isChecked} onChange={() => handleOnChange(isChecked ? 0 : 1)} hidden name={name} />
                <span></span>
            </label>
            {label && <div className="wr-check_label">{label}</div>}
        </div>
    )
}