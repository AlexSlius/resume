import Link from "next/link";
import { isArray } from "lodash";

import { routersPages } from "../../constants/next-routers";

export const ItemCardResum = ({
    item,
    keyRouter = "resumeBuilderNew",
    updateActiveResumeNew = () => { },
}) => {
    return (
        <div className="item-card-resum">
            <div className="item-card-resum__head " onClick={() => updateActiveResumeNew({ slug: item.slug, id: item.id })}>
                <Link href={`/${routersPages[keyRouter]}`}>
                    <img loading="lazy" src={item.image} />
                </Link>
                <div className="doc-btn"  >
                    <Link href={`/${routersPages[keyRouter]}`} className="document__btn btns btn--blue">Use this template</Link>
                </div>
            </div>
            <div className="item-card-resum__bot">
                <div className="item-card-resum__tt" onClick={() => updateActiveResumeNew({ slug: item.slug, id: item.id })}>
                    <Link href={`/${routersPages[keyRouter]}`} className="item-card-resum__titl">{item.name}</Link>
                    {
                        (isArray(item?.types) && item.types.length > 0) && (
                            <div className="item-card-resum__types">
                                {
                                    item.types.map((itemType, index) => (
                                        <div key={index} className="item-type type-ptf" style={{ background: itemType.background }}>{itemType.name}</div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                {
                    !!item?.description && (
                        <p className="item-card-resum__desk">{item?.description}</p>
                    )
                }
            </div>
        </div>
    )
}