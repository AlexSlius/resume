import Link from "next/link";
import { isArray } from "lodash";
import { useEffect, useState } from "react";

import Icon from "../Icon";
import iconEye from "/public/images/icons/eye-white.svg?sprite";

import { routersPages } from "../../constants/next-routers";

export const ItemCardResum = ({
    item,
    keyRouter = "resumeBuilderNew",
    updateActiveResumeNew = () => { },
    handlePreview = () => { },
}) => {
    const [activeColor, setActiveColor] = useState();
    const [activeimg, setActiveImg] = useState();

    const handleColor = (item) => {
        setActiveColor(item.class);
        setActiveImg(item.color_image);
    }

    useEffect(() => {
        if (item?.colors?.length > 0) {
            setActiveColor(item?.colors[0].class);
            setActiveImg(item?.colors[0].color_image);
        }
    }, [item]);

    return (
        <div className="item-card-resum">
            <div className="item-card-resum__head">
                <img loading="lazy" src={activeimg ? activeimg : item?.image} alt="temolate image" />
                <div className="doc-btn"  >
                    <div className="item-card-resum__btn-top">
                        <button
                            className="button-p button-type-grey button-p_icon button-p_grey"
                            onClick={() => { handlePreview(item, activeColor) }}
                        >
                            <i>
                                <Icon svg={iconEye} />
                            </i>
                            <span>Preview</span>
                        </button>
                    </div>
                    <Link href={`/${routersPages[keyRouter]}`} onClick={() => updateActiveResumeNew({ slug: item.slug, id: item.id, template_class: activeColor })} className="card-selec-btn-select button-p button-type-standart">
                        <span>Use this template</span>
                    </Link>
                </div>
            </div>
            <div className="item-card-resum__bot">
                <div className="item-card-resum__tt" >
                    <Link href={`/${routersPages[keyRouter]}`} className="item-card-resum__titl" onClick={() => updateActiveResumeNew({ slug: item.slug, id: item.id, template_class: activeColor })}>{item.name}</Link>
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
                {
                    isArray(item.colors) && (
                        <div className="card-color">
                            {
                                item.colors.map((itemColor, index) => (
                                    <div
                                        className={`card-color__item ${(activeColor == itemColor.class) ? "active" : ""}`}
                                        key={index}
                                        style={{ backgroundColor: itemColor.color }}
                                        onClick={() => handleColor(itemColor)}
                                    ></div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}