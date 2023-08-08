import { AccordionComponent } from "../../components/accordion";

import style from "./Style.module.scss"

import arrFaqs from "./data/faqs.json";

export const Acard = () => {
    return (
        <div>
            <div className={`${style.m_t_f}`}>
                <h2 className={`${style.title}`}>Frequently<br /> Asked Questions</h2>
                {/* <p className={`${style.sub_title}`}>Didn't find what you're looking for? — <Link href={`/${routersPages['faqs']}`} target="_blank">Use our FAQ</Link></p> */}
            </div>
            <div className={`${style.wr_accar}`}>
                <AccordionComponent arr={arrFaqs} />
            </div>
        </div>
    )
}