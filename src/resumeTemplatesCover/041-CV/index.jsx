import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv041 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        zipCode,
        state,
        applyingCompanyName,
        applyingCompanyJobTitle,
        applyingCompanyTitle,
        applyingCompanyContact,
        industryHoldExperienceJobTitle,
    } = data;

    return (
        <div className="sv_041 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 main-color-1-background">
                    <div className="cv-body-content">
                        <div className="top-area">
                            <div className="main-info-block main-color-3-border">
                                <h1 className="cv-name font-size-5 line-height-7">{firstName}{' '}{lastName}</h1>
                                {
                                    !!industryHoldExperienceJobTitle && (
                                        <h3 className="cv-prophecy font-size-3 line-height-5 main-color-1-background main-color-4-text">{industryHoldExperienceJobTitle}</h3>
                                    )
                                }
                            </div>
                        </div>
                        <div className="middle-area">
                            <div className="letter-block">
                                <h3 className="letter-heading font-size-2 line-height-1">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="letter-text font-size-1 line-height-4" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                            <div className="addresses-block">
                                {
                                    (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                        <div className="block-to">
                                            <h3 className="block-heading font-size-3 line-height-6">To</h3>
                                            <p className="font-size-2 line-height-3">{`${!!applyingCompanyName ? (applyingCompanyName) : ""} ${!!applyingCompanyJobTitle ? applyingCompanyJobTitle : ""}`}</p>
                                            <p className="font-size-2 line-height-3">{`${!!applyingCompanyTitle ? applyingCompanyTitle : ""} ${!!applyingCompanyContact ? applyingCompanyContact : ""}`}</p>
                                        </div>
                                    )
                                }
                                {
                                    (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                        <div className="block-from">
                                            <h3 className="block-heading font-size-3 line-height-6">From</h3>
                                            {
                                                !!state && (
                                                    <p className="font-size-2 line-height-3">{state}</p>
                                                )
                                            }
                                            {!!phone && (<p className="font-size-2 line-height-3">{phone}</p>)}
                                            {!!email && (<p className="font-size-2 line-height-3">{email}</p>)}
                                            {/* <p className="font-size-2 line-height-3">5th Avenue Street</p> */}
                                            {
                                                (!!city && !!zipCode) && (
                                                    <p className="font-size-2 line-height-3">{`${!!city ? (`${city}, `) : ""} ${!!zipCode ? (`${zipCode}, `) : ""}`}</p>
                                                )
                                            }
                                            {
                                                !!country && (
                                                    <p className="font-size-2 line-height-3">{country}</p>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="bottom-area additional-color-2-background"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
