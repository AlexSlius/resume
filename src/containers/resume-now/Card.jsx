import { useState } from "react";

import style from "./Style.module.scss";
import { LoadChildrenBtn } from "../../components/loadChildrenBtn";

export const Card = ({
    itemCard,
    index,
    handleSubmit,
}) => {
    const [loadBtn, setLoadBtn] = useState(false);

    return (
        <div className={`${style.card} ${(index == 1) ? style.active : ""}`} key={index}>
            <div>
                <div className={style.head}>{itemCard.name}</div>
                <div className={style.car_center}>
                    <div className={style.car_price}>
                        {itemCard.isСurrency ? <span>$</span> : ""}{itemCard.price}
                    </div>
                    <div className={style.car_days}>{itemCard.day}</div>
                    <div className={style.car_wr_list}>
                        <ul className="list-check">
                            {
                                itemCard.list.map((itemList, index) => (
                                    <li key={index}>{itemList}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.car_bot}>
                <LoadChildrenBtn isLoad={loadBtn}>
                    <button
                        className={`button-p ${style.bnt_now}`}
                        type="button"
                        onClick={() => handleSubmit(setLoadBtn)}
                    >
                        <span>Upgrade Now</span>
                    </button>
                </LoadChildrenBtn>
            </div>
        </div>
    )
}