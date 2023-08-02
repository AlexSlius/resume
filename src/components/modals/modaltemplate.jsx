import { useEffect, useState } from "react";
import { isArray, isObject } from "lodash";
import Link from "next/link";

import { ModalWrapper } from "./wrapperModal"
import style from "./Style.module.scss";

export const ModalTemplate = ({
    visible,
    onClose,
    hrefLink = "",
    handleLink = () => { },
    item,
    activeClassColor,
}) => {
    const [activeColor, setActiveColor] = useState();
    const [activeimg, setActiveImg] = useState();

    const handleColor = (item) => {
        setActiveColor(item.class);
        setActiveImg(item.color_image);
    }

    useEffect(() => {
        if (item?.colors?.length > 0 && !activeClassColor) {
            setActiveColor(item?.colors[0].class);
            setActiveImg(item?.colors[0].color_image);
        }

        if (activeClassColor) {
            setActiveColor(activeClassColor);
            setActiveImg(item.colors.find(el => (el.class == activeClassColor))?.color_image || "")
        }
    }, [item]);

    return (
        <ModalWrapper
            visible={visible}
            onClose={onClose}
            maxWidth={530}
            dopClass={style.templa}
        >
            <div className={`${style.flex_c_center}`}>
                <div className={`${style.title_teml}`}>San Francisco</div>
                <div className={style.image_teml}>
                    <img src={activeimg ? activeimg : item?.image} alt="temolate image" />
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
                                                onClick={() => handleColor(itemColor)}
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