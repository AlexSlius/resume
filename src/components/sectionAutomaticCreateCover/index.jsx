import Link from "next/link"

export const SectionAutCreateCover = ({
    link = ""
}) => {
    return (
        <section className="mt-180 autcover">
            <div className="containers">
                <div className="autcover__h">
                    <h2 className="autcover_h2 h2 font-600">Automatic creation cover letter</h2>
                    <p className="autcover_des">In three simple steps, create the perfect document to impress hiring managers and employers. Minimum time, maximum professional quality.</p>
                    <div className="autcover__wr-btn">
                        <Link href={link} className="button-p button-type-standart">Create Cover Letter</Link>
                    </div>
                </div>
                <div className="autcover__main">
                    <div>
                        <img src="/images/page/cover-automatic.png" alt="cover automatic cover" />
                        <div className="autcover-item autcover-item_one">
                            <span>We will write the text ourselves</span>
                        </div>
                        <div className="autcover-item autcover-item_two">
                            <span>We will write the text ourselves</span>
                        </div>
                        <div className="autcover-item autcover-item_three">
                            <span>We will write the text ourselves</span>
                        </div>
                        <div className="autcover-item autcover-item_four">
                            <span>We will write the text ourselves</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}