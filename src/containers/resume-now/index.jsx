import Link from "next/link";
import { useSelector } from 'react-redux'

import { AccordionComponent } from "../../components/accordion";
import { Header } from "../../components/header";

import { routersPages } from "../../constants/next-routers";

import style from "./Style.module.scss"

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
    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    return (
        <>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) && (
                    <Header />
                )
            }
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
                                    <span>$</span>399.00
                                </div>
                                <div className={style.car_days}>Forever</div>
                                <div className={style.car_wr_list}>
                                    <ul className="list-check">
                                        <li>Unlimited PDF Downloads</li>
                                        <li>Unlimited Resumes</li>
                                        <li>Unlimited Cover Letters</li>
                                        <li>Cancel any time</li>
                                        <li>7-day money-back guarantee*</li>
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
                                    <span>$</span>1.95
                                </div>
                                <div className={style.car_days}>7-Day trial subscription</div>
                                <div className={style.car_wr_list}>
                                    <ul className="list-check">
                                        <li>Unlimited PDF Downloads</li>
                                        <li>Unlimited Resumes</li>
                                        <li>Unlimited Cover Letters</li>
                                        <li>After 7 days, auto-renews to $19.95</li>
                                        <li>Billed every 4 weeks</li>
                                        <li>Cancel any time</li>
                                        <li>7-day money-back guarantee*</li>
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
                                    <span>$</span>69.95
                                </div>
                                <div className={style.car_days}>12 months</div>
                                <div className={style.car_wr_list}>
                                    <ul className="list-check">
                                        <li>Unlimited PDF Downloads</li>
                                        <li>Unlimited Resumes</li>
                                        <li>Unlimited Cover Letters</li>
                                        <li>Cancel any time</li>
                                        <li>7-day money-back guarantee*</li>
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
                        <div>
                            <img src="/images/icons/icon_visa.svg" />
                            <img src="/images/icons/icon_ma.svg" />
                            <img src="/images/icons/icon_am.svg" />
                            <img src="/images/icons/icon_pa.svg" />
                        </div>
                    </div>
                    <div className={`${style.sub_title} ${style.t_w}`}>
                        <p>By placing an order you waive your right of withdrawal and agree to immediate delivery of the services and
                            related digital products. Within 7 days after the first payment, you can claim the money-back guarantee.</p>
                    </div>
                    <div className={`${style.m_t_f}`}>
                        <h2 className={`${style.title}`}>Frequently Asked Questions</h2>
                        <p className={`${style.sub_title}`}>Didn't find what you're looking for? — <Link href={`/${routersPages['faqs']}`} target="_blank">Use our FAQ</Link></p>
                    </div>
                    <div className={`${style.wr_accar}`}>
                        <AccordionComponent arr={arr} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResumeNow;