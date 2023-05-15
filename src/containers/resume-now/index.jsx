import Link from "next/link";
import { useSelector } from 'react-redux'

import { AccordionComponent } from "../../components/accordion";
import { Header } from "../../components/header";

import { routersPages } from "../../constants/next-routers";

import { striteCheckout } from "../../strite/checkout";

import style from "./Style.module.scss"

import arrFaqs from "./data/faqs.json";
import arrCard from "./data/cards.json";


const ResumeNow = () => {
    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    const handleSub = (price) => {
        striteCheckout({
            lineItems: [
                {
                    price: price,
                    quantity: 1
                }
            ]
        });
    }

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

                    {
                        arrCard.map((itemCard, index) => (
                            <div className={`${style.card} ${(index == 1) ? style.active : ""}`} key={index}>
                                <div>
                                    <div className={`${style.card_top}`}>
                                        <div className={style.head} style={{ color: itemCard.color }}>{itemCard.name}</div>
                                    </div>
                                    <div className={style.car_center}>
                                        <div className={style.car_price}>
                                            <span>$</span>{itemCard.price}
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
                                    <button className={`bnt-now ${style.bnt_now}`} type="button" onClick={() => handleSub("price_1N6d6aDuRixVdUqYV6DifK3B")}><span>Upgrade Now</span></button>
                                </div>
                            </div>
                        ))
                    }
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
                        <AccordionComponent arr={arrFaqs} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResumeNow;