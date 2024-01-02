import { useState } from "react"

export const Switch = ({
    handleOnChange = () => { },
    isChecked = false,
    name = "",
    label = undefined,
    reverse = false
}) => {
    const [load, setLoad] = useState(true);

    const hand = () => {
        if (load) {
            handleOnChange(isChecked ? 0 : 1);
            setLoad(false);

            setTimeout(() => {
                setLoad(true);
            }, 800);
        }
    }

    return (
        <div className={`wr-check ${reverse ? "reverse" : 0}`}>
            <label className="label-switch">
                <input type="checkbox" checked={isChecked} onChange={hand} hidden name={name} />
                <span></span>
            </label>
            {label && <div className="wr-check_label">{label}</div>}
        </div>
    )
}