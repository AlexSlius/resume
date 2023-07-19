import Link from "next/link"

export const SectionAutCreateCover = ({
    link = ""
}) => {
    return (
        <section className="mt-180 autcover">
            <div className="containers">
                <div className="autcover__h">
                    <h2 className="autcover_h2 h2 font-600">Finally, it is easy</h2>
                    <p className="autcover_des">Just a couple of easy spent requiring almost no writing, and you will get a professional cover letter</p>
                    <div className="autcover__wr-btn">
                        <Link href={link} className="button-p button-type-standart">Create Cover Letter</Link>
                    </div>
                </div>
                <div className="autcover__main">
                    <div>
                        <img src="/images/page/cover-automatic.png" alt="cover automatic cover" />
                        <div className="autcover-item autcover-item_one">
                            <span>You won’t have to write it, we will do it for you.</span>
                        </div>
                        <div className="autcover-item autcover-item_two">
                            <span>Just make simple and easy choices.</span>
                        </div>
                        <div className="autcover-item autcover-item_three">
                            <span>Automatically generated, persuasive text.</span>
                        </div>
                        <div className="autcover-item autcover-item_four">
                            <span>Written by the best HR professionals.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}