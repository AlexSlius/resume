import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { isArray, isString } from "lodash";

import { ButtonIcon } from "../../components/uis/buttonIcon";
import Icon from "../../components/Icon";
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"

import { updateActiveResumeNew } from "../../slices/resumeData";
import { isLoader } from "../../helpers/loadings"

import iconAddNew from "/public/images/icons/icon-add-new-white.svg?sprite";
import iconUploadMore from "/public/images/icons/upload-more.svg?sprite";

import iconAll from "/public/images/icons/icon-btn-all.svg?sprite";
import iconCreative from "/public/images/icons/icon-creative.svg?sprite";
import iconSimple from "/public/images/icons/icon-simple.svg?sprite";
import iconProfessional from "/public/images/icons/icon-professional.svg?sprite";
import iconModern from "/public/images/icons/icon-modern.svg?sprite";

import { routersPages } from "../../constants/next-routers";
import { getResumesTemplates } from "../../controllers/resumeData";

export const JobWinningPage = () => {
    const [currentPage, setCurrentPage] = React.useState(2);
    const dispatch = useDispatch();
    const [stateCategory, setStateCategory] = React.useState(null);

    const handleCategory = (nameCategory) => {
        setStateCategory(nameCategory);
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
        resumeData,
    } = useSelector((state) => state);

    const handleUpload = async () => {
        let res = await dispatch(getResumesTemplates({ page: currentPage }));

        if (res?.payload?.items) {
            setCurrentPage(prev => prev + 1)
        }
    };

    return (
        <section className="contact-page">
            <div className="containers text-center">
                <h1 className="h1">
                    Job-winning resume template<span className="icon-right-top">s</span>
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
                            <button className={`resumes-tab-btn ${stateCategory === null ? 'active' : ''}`} onClick={() => handleCategory(null)}>
                                <Icon svg={iconAll} />
                                <span>All templates</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button className={`resumes-tab-btn ${stateCategory === 'Creative' ? 'active' : ''}`} onClick={() => handleCategory('Creative')}>
                                <Icon svg={iconCreative} />
                                <span>Creative</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button className={`resumes-tab-btn ${stateCategory === 'Simple' ? 'active' : ''}`} onClick={() => handleCategory('Simple')}>
                                <Icon svg={iconSimple} />
                                <span>Simple</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button className={`resumes-tab-btn ${stateCategory === 'Professional' ? 'active' : ''}`} onClick={() => handleCategory('Professional')}>
                                <Icon svg={iconProfessional} />
                                <span>Professional</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button className={`resumes-tab-btn ${stateCategory === 'Modern' ? 'active' : ''}`} onClick={() => handleCategory('Modern')}>
                                <Icon svg={iconModern} />
                                <span>Modern</span>
                            </button>
                        </div>
                    </div>

                    <div className="items-resumes">
                        {
                            isArray(resumeData?.list?.items) && resumeData.list.items.map((item, index) => {

                                if (isString(stateCategory)) {
                                    if (item.category != stateCategory)
                                        return <></>
                                }

                                return (
                                    <div className="item-card-resum" key={index}>
                                        <div className="item-card-resum__head " onClick={() => dispatch(updateActiveResumeNew({ slug: item.slug, id: item.id }))}>
                                            <Link href={`/${routersPages['resumeBuilderNew']}`}>
                                                <img loading="lazy" src={item.image} />
                                            </Link>
                                        </div>
                                        <div className="item-card-resum__bot">
                                            <div className="item-card-resum__tt" onClick={() => dispatch(updateActiveResumeNew({ slug: item.slug, id: item.id }))}>
                                                <Link href={`/${routersPages['resumeBuilderNew']}`} className="item-card-resum__titl">{item.name}</Link>
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
                    ((resumeData?.list?.count_pages > 1) && (resumeData?.list?.count_pages + 1 > currentPage)) && (
                        <div className="btn-centers-w mt-40">
                            <LoadChildrenBtn isLoad={isLoader(resumeData.status)}>
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