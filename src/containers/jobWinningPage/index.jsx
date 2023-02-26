import Link from "next/link";
import React from "react";
import { useSelector } from 'react-redux'
import { isArray } from "lodash";

import { ButtonIcon } from "../../components/uis/buttonIcon";
import Icon from "../../components/Icon";

import iconAddNew from "/public/images/icons/icon-add-new-white.svg?sprite";
import iconUploadMore from "/public/images/icons/upload-more.svg?sprite";

import iconAll from "/public/images/icons/icon-btn-all.svg?sprite";
import iconCreative from "/public/images/icons/icon-creative.svg?sprite";
import iconSimple from "/public/images/icons/icon-simple.svg?sprite";
import iconProfessional from "/public/images/icons/icon-professional.svg?sprite";
import iconModern from "/public/images/icons/icon-modern.svg?sprite";

import { routersPages } from "../../constants/next-routers";

export const JobWinningPage = () => {
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
                            <button className="resumes-tab-btn active">
                                <Icon svg={iconAll} />
                                <span>All templates</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button className="resumes-tab-btn">
                                <Icon svg={iconCreative} />
                                <span>Creative</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button className="resumes-tab-btn">
                                <Icon svg={iconSimple} />
                                <span>Simple</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button className="resumes-tab-btn">
                                <Icon svg={iconProfessional} />
                                <span>Professional</span>
                            </button>
                        </div>
                        <div className="resumes-tab">
                            <button className="resumes-tab-btn">
                                <Icon svg={iconModern} />
                                <span>Modern</span>
                            </button>
                        </div>
                    </div>

                    <div className="items-resumes">
                        {
                            isArray(resumeData?.list) && resumeData.list.map((item, index) => (
                                <div className="item-card-resum" key={index}>
                                    <div className="item-card-resum__head">
                                        <Link href="#">
                                            <img loading="lazy" src={item.image} />
                                        </Link>
                                    </div>
                                    <div className="item-card-resum__bot">
                                        <div className="item-card-resum__tt">
                                            <div className="item-card-resum__titl">{item.name}</div>
                                            <div className="item-card-resum__types">
                                                <div className="item-type type-ptf">PDF</div>
                                                <div className="item-type type-docx">DOCX</div>
                                            </div>
                                        </div>
                                        <p className="item-card-resum__desk">Striking modern header, professional two
                                            column template structure.</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="btn-centers-w mt-40">
                    <ButtonIcon icon={iconUploadMore} label="Upload more" className="btn--blue" />
                </div>
            </div>
        </section>
    )
}