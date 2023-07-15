import { useEffect, useState } from "react";
import { isArray } from "lodash";
import Link from "next/link";

import { ModalWrapper } from "./wrapperModal"
import style from "./Style.module.scss";

export const ModalTemplate = ({
    visible,
    onClose,
    hrefLink = "",
    handleLink = () => { },
    item,
}) => {
    const [activeColor, setActiveColor] = useState();

    useEffect(() => {
        if (item?.colors?.length > 0)
            setActiveColor(item?.colors[0].class);
    }, [item]);

    return (
        <ModalWrapper
            visible={visible}
            onClose={onClose}
            maxWidth={530}
        >
            <div className={`${style.flex_c_center}`}>
                <div className={`${style.title_teml}`}>San Francisco</div>
                <div className={style.image_teml}>
                    <img src={item?.image} alt="temolate image" />
                </div>
                <div className={style.bot}>
                    <div className={style.colors}>
                        {
                            isArray(item?.colors) && (
                                <div className="card-color card-color_t">
                                    {
                                        item.colors.map((itemColor, index) => (
                                            <div
                                                className={`card-color__item ${(activeColor == itemColor.class) ? "active" : ""}`}
                                                key={index}
                                                style={{ backgroundColor: itemColor.color }}
                                                onClick={() => setActiveColor(itemColor.class)}
                                            ></div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className={style.btne}>
                        <Link href={hrefLink} onClick={() => { handleLink({ slug: item.slug, id: item.id, template_class: activeColor }) }} className="button-p button-type-standart"><span>Use this tempate</span></Link>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}