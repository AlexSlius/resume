export const SectionPrivacyOfYou = ({
    title,
    des
}) => {
    return (
        <section className="s-rovacy mt-180">
            <div className="containers">
                <div className="s-rovacy__main">
                    <div className="s-rovacy__cont">
                        <h3 className="h3">{title}<i></i></h3>
                        <p>{des}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}