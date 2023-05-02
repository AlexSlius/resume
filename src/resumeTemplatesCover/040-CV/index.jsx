import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv040 = ({
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
    } = data;

    return (
        <div className="sv_040 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 main-color-1-background">
                    <div className="cv-body-content">
                        <div className="top-area">
                            <div className="column-left additional-color-1-border">
                                <h1 className="cv-name font-size-6 line-height-6 font-weight-300">{!!firstName && (<>{firstName} <br /></>)} {lastName}</h1>
                            </div>
                            <div className="column-right additional-color-1-border">
                                <div className="addresses-block">
                                    {
                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                            <div className="block-to">
                                                <h3 className="block-heading font-size-1 line-height-1 font-weight-400 main-color-3-text">To</h3>
                                                <p className="font-size-2 line-height-2 font-weight-400">{`${!!applyingCompanyName ? (applyingCompanyName) : ""} ${!!applyingCompanyJobTitle ? applyingCompanyJobTitle : ""}`}</p>
                                                <p className="font-size-2 line-height-2 font-weight-400">{`${!!applyingCompanyTitle ? applyingCompanyTitle : ""} ${!!applyingCompanyContact ? applyingCompanyContact : ""}`}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                            <div className="block-from">
                                                <h3 className="block-heading font-size-1 line-height-1 font-weight-400 main-color-3-text">From</h3>
                                                {
                                                    !!state && (
                                                        <p className="font-size-2 line-height-2 font-weight-400">{state}</p>
                                                    )
                                                }
                                                {!!phone && (<p className="font-size-2 line-height-2 font-weight-400">{phone}</p>)}
                                                {!!email && (<p className="font-size-2 line-height-2 font-weight-400">{email}</p>)}
                                                <p className="font-size-2 line-height-2 font-weight-400">
                                                    {`${!!city ? (`${city}, `) : ""} ${!!zipCode ? (`${zipCode}, `) : ""} ${!!country ? (`${country}`) : ""}`}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="center-block additional-color-1-border">
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="middle-area additional-color-1-border">
                            <div className="letter-block">
                                <h3 className="letter-heading font-size-5 line-height-5 font-weight-400">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

