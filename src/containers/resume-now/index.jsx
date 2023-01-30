import Link from "next/link";

import style from "./Style.module.scss"
import { AccordionComponent } from "../../components/accordion";

const arr = [
    {
        title: "Can I change my plan?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "Do I get full access with the trial?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "What about money back?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    }
];

const ResumeNow = () => {
    return (
        <div className={`${style.wr}`}>
            <h2 className={`${style.title}`}>Download Your Attention-Grabbing Resume Now!</h2>
            <p className={`${style.sub_title}`}>To download your resume simply sign up for your Premium Membership. As an added bonus,
                you’ll gain instant full access to our suite of expertly crafted career services.</p>
            <div className={`${style.items_grid}`}>
                <div className={`${style.card}`}>
                    <div>
                        <div className={`${style.card_top}`}>
                            <div className={style.head}>Low price</div>
                        </div>
                        <div className={style.car_center}>
                            <div className={style.car_price}>
                                <span>$</span>9.90
                            </div>
                            <div className={style.car_days}>7-Day trial subscription</div>
                            <div className={style.car_wr_list}>
                                <ul className="list-check">
                                    <li>Unlimited PDF Downloads</li>
                                    <li>Unlimited Resumes</li>
                                    <li>Unlimited Cover Letters</li>
                                    <li>After 7 days, auto-renews to $24.95</li>
                                    <li>billed every 4 weeks</li>
                                    <li>Cancel any time</li>
                                    <li>7-day money back guarantee*</li>
                                    <li>Free resume critique from an HR expert</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.car_bot}>
                        <button className={`bnt-now ${style.bnt_now}`}><span>Upgrade Now</span></button>
                    </div>
                </div>
                <div className={`${style.card} ${style.active}`}>
                    <div>
                        <div className={`${style.card_top}`}>
                            <div className={style.head}>Best sale</div>
                        </div>
                        <div className={style.car_center}>
                            <div className={style.car_price}>
                                <span>$</span>44.95
                            </div>
                            <div className={style.car_days}>6 mouths</div>
                            <div className={style.car_wr_list}>
                                <ul className="list-check">
                                    <li>Unlimited PDF Downloads</li>
                                    <li>Unlimited Resumes</li>
                                    <li>Unlimited Cover Letters</li>
                                    <li>Cancel any time</li>
                                    <li>7-day money back guarantee*</li>
                                    <li>Free resume critique from an HR expert</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.car_bot}>
                        <button className={`bnt-now ${style.bnt_now}`}><span>Upgrade Now</span></button>
                    </div>
                </div>
                <div className={`${style.card}`}>
                    <div>
                        <div className={`${style.card_top}`}>
                            <div className={`${style.head} ${style.head_g}`}>profit</div>
                        </div>
                        <div className={style.car_center}>
                            <div className={style.car_price}>
                                <span>$</span>74.95
                            </div>
                            <div className={style.car_days}>12 mouths</div>
                            <div className={style.car_wr_list}>
                                <ul className="list-check">
                                    <li>Unlimited PDF Downloads</li>
                                    <li>Unlimited Resumes</li>
                                    <li>Unlimited Cover Letters</li>
                                    <li>Cancel any time</li>
                                    <li>7-day money back guarantee*</li>
                                    <li>Free resume critique from an HR expert</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.car_bot}>
                        <button className={`bnt-now ${style.bnt_now}`}><span>Upgrade Now</span></button>
                    </div>
                </div>
            </div>
            <div className={`${style.cont}`}>
                <div className={`${style.items_payment}`}>
                    <span>We accept:</span>
                    <img src="/images/icons/icon_visa.svg" />
                    <img src="/images/icons/icon_ma.svg" />
                    <img src="/images/icons/icon_am.svg" />
                    <img src="/images/icons/icon_pa.svg" />
                </div>
                <div className={`${style.sub_title} ${style.t_w}`}>
                    <p>By placing an order you waive your right of withdrawal and agree to immediate delivery of the services and
                        related digital products. Within 7 days after the first payment, you can claim the money-back guarantee.</p>
                </div>
                <div className={`${style.m_t_f}`}>
                    <h2 className={`${style.title}`}>Frequently Asked Questions</h2>
                    <p className={`${style.sub_title}`}>Didn't find what you're looking for? — <Link href="/">Use our FAQ</Link></p>
                </div>
                <div className={`${style.wr_accar}`}>
                    <AccordionComponent arr={arr} />
                </div>
            </div>
        </div>
    )
}

export default ResumeNow;