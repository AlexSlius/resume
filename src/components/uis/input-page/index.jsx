export const InputPage = ({
    placeholder = "",
    type = "text",
    value,
    onChange = () => { },
    handleKeyUpa = () => { },
    isSearch = false,
}) => {
    return (
        <div className={`form-input ${isSearch ? "in-sea" : ""}`}>
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