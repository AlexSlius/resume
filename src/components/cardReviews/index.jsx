export const CardReviews = ({
    ava = "",
    name,
    job,
    des
}) => {
    return (
        <div className="card-revie">
            <div className="card-revie__h">
                <div className="card-revie__left">
                    <div className="card-revie__ava" style={{ backgroundImage: `url(${ava})` }}></div>
                    <div className="card-revie__l-r">
                        <div className="card-revie__name">{name}</div>
                        <div className="card-revie__job">{job}</div>
                    </div>
                </div>
                <div className="card-revie__right">
                    <div className="card-revie__star"></div>
                </div>
            </div>
            <div className="card-revie__des">{des}</div>
        </div>
    )
}