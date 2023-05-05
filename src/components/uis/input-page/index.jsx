export const InputPage = ({
    placeholder = "",
    type = "text",
    value,
    onChange = () => { },
    handleKeyUpa = () => { },
}) => {
    return (
        <div className="form-input">
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onKeyUp={handleKeyUpa}
                autoComplete="off"
            />
        </div>
    )
}