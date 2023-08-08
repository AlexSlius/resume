import style from "./Style.module.scss";

export const WeAccept = () => {
    return (
        <div className={`${style.cont}`}>
            <div className={`${style.items_payment}`}>
                <span>We accept:</span>
                <div>
                    <img src="/images/icons/icon_visa.svg" />
                    <img src="/images/icons/icon_ma.svg" />
                    <img src="/images/icons/icon_am.svg" />
                    <img src="/images/icons/icon_pa.svg" />
                </div>
            </div>
            <div className={`${style.sub_title} ${style.t_w}`}>
                <p>Upon ordering, you forgo your withdrawal rights and consent to immediate delivery of services and digital products. However, a money-back guarantee can be claimed within the first 14 days post-payment.</p>
            </div>
        </div>
    )
}