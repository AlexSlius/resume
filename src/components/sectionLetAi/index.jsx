import Link from "next/link";

export const SectionLetAi = ({
    link = "",
    btnText
}) => {
    return (
        <section className="let-ai mt-180">
            <div className="containers">
                <div className="let-ai__head">
                    <h2 className="h2 font-600 max-t-570">Building is better than writing</h2>
                    <p className="let-ai-t max-text-770">Don’t spend your time and effort on reminding all essential tasks, how not to miss some relevant skills, or composing a unique summary. With the help of generative AI, our experienced HR professionals created a large database of high-quality content ready to be used by you.</p>
                </div>
                <div className="let-ai_main">
                    <div className="let-ai__block aib">
                        <div className="aib__he">UI/UX Designer</div>
                        <div className="aib__des">
                            <ul>
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
                                <li>REady in seconds</li>
                                <li>Verified by HR professionals</li>
                                <li>Unique and relevant</li>
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