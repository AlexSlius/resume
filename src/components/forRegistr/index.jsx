export const ForRegistr = ({
    isError = false,
    isForEmail,
    emailForRegister,
    setShowModalEmail = () => { },
    updateFieldEmailForRegister = () => { },
}) => {
    return (
        <div className="for-regist">
            <div className="for-regist__l">
                <span className={`${isError ? "errore-red" : ""}`}>{isForEmail ? "For registration" : isError ? "Email is mandatory" : "Will be used for registration"} </span>
                {isForEmail && <span className="for-regist__t">{emailForRegister}</span>}
            </div>
            <div className="for-regist__r">
                {
                    isForEmail ? (
                        <button className="for-regist__btn dele" type="button" onClick={updateFieldEmailForRegister}>Delete</button>
                    ) : (
                        <button className="for-regist__btn" type="button" onClick={setShowModalEmail}>{isError ? "Provide" : "I want another"}</button>
                    )
                }
            </div>
        </div>
    )
}