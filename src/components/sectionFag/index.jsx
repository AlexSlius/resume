import Link from "next/link";

import { AccordionComponent } from "../accordion";

import { routersPages } from "../../constants/next-routers";

export const SectionFag = ({
    dataArrAccordion,
    title,
}) => {
    return (
        <section className="sfaq mt-180">
            <div className="containers">
                <h2 className="h2 font-600 max-t-570" dangerouslySetInnerHTML={{ __html: title }}></h2>
                <div className="sfaq__main">
                    <AccordionComponent arr={dataArrAccordion} defaultStart="0" />
                </div>
                <div className="sfaq__wr-btn">
                    <Link className="button-p button-p_min-w  button-p_light_grey" href={`/${routersPages['faqs']}`}>View all</Link>
                </div>
            </div>
        </section>
    )
}