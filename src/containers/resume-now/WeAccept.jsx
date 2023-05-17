import Link from "next/link";

import { AccordionComponent } from "../../components/accordion";

import { routersPages } from "../../constants/next-routers";

import style from "./Style.module.scss"

import arrFaqs from "./data/faqs.json";

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
    )
}