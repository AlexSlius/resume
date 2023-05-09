import React from "react";
import Icon from "../Icon";
import style from "./Style.module.scss";

export const Progress = ({
    label = "",
    interest = 0,
    icon = null
}) => {
    const [state, setState] = React.useState([0, 0, 0, 0]);

    React.useEffect(() => {
        let copInterest = interest;
        let newArr = [];

        for (let i = 0; i < 4; i++) {
            let min = (copInterest / 25) - i;

            if (min > 1) {
                newArr.push(1);
            } else if ((min <= 1) && (min > 0)) {
                newArr.push(min);
            } else {
                newArr.push(0);
            }
        }

        setState(newArr);
    }, [interest]);

    return (
        <div className={style.wr_prosess}>
            <div className={style.prosess_head}>
                <div className={style.prosess_head_left}>
                    <span className={style.prosess_head_interest}>{Math.round(interest)}%</span>
                    {!!label && <span className={style.prosess_head_label}>{label}</span>}
                </div>
                <div className={style.prosess_head_right}>
                    {!!icon && <Icon svg={icon} classNames={[`${(interest == 100) ? style.active_icon : ""}`, `${style.icon}`]} />}
                </div>
            </div>
            <div className={style.prosess}>
                {
                    [...new Array(4)].map((_, index) => {
                        return (
                            <div className={style.prosess_item} key={index}>
                                <div style={{ width: `${!!state[index] ? (state[index] * 100) : 0}%` }}></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}