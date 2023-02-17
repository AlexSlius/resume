export const InputPage = ({
    placeholder = "",
    type = "text",
    value,
    onChange = () => { },
}) => {
    return (
        <div className="form-input">
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete="off"
            />
        </div>
    )
}