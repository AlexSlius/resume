export const InputCheckboxPageBtn = ({
    label = "",
    name,
    onChange = () => { },
    type = "checkbox",
    checked,
}) => {
    return (
        <label className="form-checkbox">
            <input type={type} checked={checked} name={name} onChange={onChange} autoComplete="off" />
            <span>{label}</span>
        </label>
    )
}