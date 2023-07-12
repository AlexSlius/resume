import Link from "next/link";
import { isArray } from "lodash"
import { CardSelectTemplate } from "../cardSelectTemplate"

export const SectionSelectTemplates = ({
    title,
    data,
    linkAll = '',
    linkTemplateNew = "",
    handleLink = () => { },
}) => {
    return (
        <section className="ss-teml mt-180">
            <div className="containers">
                <h2 className="h2 font-600 max-t-570" dangerouslySetInnerHTML={{ __html: title }}></h2>
                <div className="teml-main">
                    {
                        isArray(data) && data.map((item, index) => (
                            (index < 8) && (
                                <CardSelectTemplate
                                    key={index}
                                    {...item}
                                    link={linkTemplateNew}
                                    handleLink={() => handleLink(item)}
                                />
                            )
                        ))
                    }
                </div>
                <div className="ss-teml__wr-btn">
                    <Link href={linkAll} className="button-p button-p_light_grey"><span>See more templates</span></Link>
                </div>
            </div>
        </section>
    )
}
