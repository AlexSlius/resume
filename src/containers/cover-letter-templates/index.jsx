import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { isArray, isString } from "lodash";

import { ButtonIcon } from "../../components/uis/buttonIcon";
import Icon from "../../components/Icon";
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"

import { updateActiveCoverNew } from "../../slices/cover/coverData";
import { isLoader } from "../../helpers/loadings"

import iconAddNew from "/public/images/icons/icon-add-new-white.svg?sprite";
import iconUploadMore from "/public/images/icons/upload-more.svg?sprite";

import iconAll from "/public/images/icons/icon-btn-all.svg?sprite";
import iconCreative from "/public/images/icons/icon-creative.svg?sprite";
import iconSimple from "/public/images/icons/icon-simple.svg?sprite";
import iconProfessional from "/public/images/icons/icon-professional.svg?sprite";
import iconModern from "/public/images/icons/icon-modern.svg?sprite";

import { routersPages } from "../../constants/next-routers";
import { getCoverTemplates } from "../../controllers/cover/coverData";

export const CoverLetterTemplates = () => {
    const [currentPage, setCurrentPage] = React.useState(2);
    const dispatch = useDispatch();
    const router = useRouter();
    const category = router.query.category;

    const handleCategory = (nameCategory) => {
        Router.push({
            // pathname: `${router.route}`,
            query: { category: nameCategory },
        });
    }

    const {
        auth: {
            autorizate: {
                isAthorized,
            }
        },
        theme: {
            currentResolution
        },
        coverData,
    } = useSelector((state) => state);

    const handleUpload = async () => {
        let res = await dispatch(getCoverTemplates({ page: currentPage, category: (category === "undefined" || category == "all") ? "" : category }));

        if (res?.payload?.items) {
            setCurrentPage(prev => prev + 1)
        }
    };

    return (
        <section className="contact-page">
            <div className="containers text-center">
                <h1 className="h1">
                    Cover letter template<span className="icon-right-top">s</span>
                </h1>
                <p className="bottom-text">
                    Each resume template is expertly designed and follows the exact “resume rules” hiring
                    managers look for. Stand out and get hired faster with field-tested resume templates.
                </p>

                <div className="btn-centers-w mt-40">
                    <ButtonIcon href={routersPages['resumeBuilderNew']} icon={iconAddNew} label="Create my resume" className="btn--blue" />
                </div>

                <div className="wr-resumes">
                    <div className="resumes-tabs">
                        <div className="resumes-tab">
                            <button type="button" className={`resumes-tab-btn ${(category === undefined || category === "all") ? 'active' : ''}`} onClick={() => handleCategory("all")}>
                                <Icon svg={iconAll} />
                                <span>All templates</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button type="button" className={`resumes-tab-btn ${category === 'Creative' ? 'active' : ''}`} onClick={() => handleCategory('Creative')}>
                                <Icon svg={iconCreative} />
                                <span>Creative</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button type="button" className={`resumes-tab-btn ${category === 'Simple' ? 'active' : ''}`} onClick={() => handleCategory('Simple')}>
                                <Icon svg={iconSimple} />
                                <span>Simple</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button type="button" className={`resumes-tab-btn ${category === 'Professional' ? 'active' : ''}`} onClick={() => handleCategory('Professional')}>
                                <Icon svg={iconProfessional} />
                                <span>Professional</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button type="button" className={`resumes-tab-btn ${category === 'Modern' ? 'active' : ''}`} onClick={() => handleCategory('Modern')}>
                                <Icon svg={iconModern} />
                                <span>Modern</span>
                            </button>
                        </div>
                    </div>

                    <div className="items-resumes">
                        {
                            isArray(coverData?.list?.items) && coverData.list.items.map((item, index) => {
                                return (
                                    <div className="item-card-resum" key={index}>
                                        <div className="item-card-resum__head " onClick={() => dispatch(updateActiveCoverNew({ slug: item.slug, id: item.id }))}>
                                            <Link href={`/${routersPages['coverLetterNew']}`}>
                                                <img loading="lazy" src={item.image} />
                                            </Link>
                                        </div>
                                        <div className="item-card-resum__bot">
                                            <div className="item-card-resum__tt" onClick={() => dispatch(updateActiveCoverNew({ slug: item.slug, id: item.id }))}>
                                                <Link href={`/${routersPages['coverLetterNew']}`} className="item-card-resum__titl">{item.name}</Link>
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
                            })
                        }
                    </div>
                </div>
                {
                    ((coverData?.list?.count_pages > 1) && (coverData?.list?.count_pages + 1 > currentPage)) && (
                        <div className="btn-centers-w mt-40">
                            <LoadChildrenBtn isLoad={isLoader(coverData.status)}>
                                <ButtonIcon
                                    icon={iconUploadMore}
                                    label="Upload more"
                                    className="btn--blue"
                                    isButton={true}
                                    onHandle={handleUpload}
                                />
                            </LoadChildrenBtn>
                        </div>
                    )
                }
            </div>
        </section>
    )
}