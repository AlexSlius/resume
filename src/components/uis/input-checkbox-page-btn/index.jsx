export const InputCheckboxPageBtn = ({
    label = "",
    name,
    checked,
    onChange = () => { },
}) => {
    return (
        <label className="form-checkbox">
            <input type="checkbox" checked={checked} name={name} onChange={onChange} />
            <span>{label}</span>
        </label>
    )
}