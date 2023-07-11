import Link from "next/link";

export const SectionLetAi = ({
    link = "",
    btnText
}) => {
    return (
        <section className="let-ai mt-180">
            <div className="containers">
                <div className="let-ai__head">
                    <h2 className="h2 font-600 max-t-570">Let AI write youre resume</h2>
                    <p className="let-ai-t max-text-770">Discover the Premium Difference with Our Resume Builder. We invite you to experience the superior quality of our services without registration or payment. Step into the future of resume creation, empowering your career journey with confidence and trust.</p>
                </div>
                <div className="let-ai_main">
                    <div className="let-ai__block aib">
                        <div className="aib__he">UI/UX Designer</div>
                        <div className="aib__des">
                            <div>Settled any customer disputes in a professional and pleasant manner.</div>
                            <ul>
                                <li>Settled any customer disputes in a professional and pleasant manner.</li>
                                <li>Settled any customer disputes in a professional and pleasant manner.</li>
                            </ul>
                        </div>

                        <div className="aib__item tone">
                            <span>Worked to ensure a positive and hassle-free customer experience.</span>
                        </div>
                        <div className="aib__item ttwo">
                            <span>Settled any customer disputes
                                in a professional and pleasant manner.</span>
                        </div>
                        <div className="aib__item tthree">
                            <span>Identified and maximized sales opportunities, and increased customer retention rates.</span>
                        </div>
                        <div className="aib__item tfour">
                            <span>Settled any customer disputes
                                in a professional and pleasant manner.</span>
                        </div>
                    </div>
                    <div className="aib-b">
                        <div className="aib-b__wrl">
                            <ul className="aib-b__list">
                                <li>Powered by GPT-4</li>
                                <li>Generated in seconds</li>
                                <li>Produces human-like text</li>
                                <li>Nobody’s gonna know</li>
                            </ul>
                        </div>
                        <div className="aib-b__wr-btn">
                            <Link href={link} className="aib-b__btn button-p button-type-standart">{btnText}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}