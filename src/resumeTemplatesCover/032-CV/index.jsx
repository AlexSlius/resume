import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv032 = ({
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
        <div className="sv_032 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 main-color-1-background">
                    <div className="cv-body-content">
                        <div className="top-area">
                            <h1 className="cv-name font-size-6 line-height-6 additional-color-1-text">{firstName}{` `} {lastName}</h1>
                        </div>
                        <div className="middle-area">
                            <div className="letter-block">
                                <h3 className="letter-heading additional-color-1-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="letter-text font-size-1 line-height-1 main-color-3-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="bottom-area additional-color-1-border">
                            <svg className="star-2 additional-color-1-svg-path" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M45 82.9068C42.1997 62.6061 27.3942 47.8003 7.09325 45C27.3938 42.1996 42.1996 27.3938 45 7.09317C47.8004 27.3938 62.6062 42.1996 82.9068 45C62.6062 47.8004 47.8004 62.6062 45 82.9068Z" fill="#F3EEEA" stroke="#7F6A55" strokeWidth="0.960091" />
                            </svg>
                            <div className="addresses-block">
                                {
                                    (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                        <div className="block-to">
                                            <h3 className="block-heading font-size-3 line-height-3 additional-color-1-text">To</h3>
                                            <p className="font-size-1 line-height-1 main-color-3-text">{`${!!applyingCompanyName ? (applyingCompanyName) : ""} ${!!applyingCompanyJobTitle ? applyingCompanyJobTitle : ""}`}</p>
                                            <p className="font-size-1 line-height-1 main-color-3-text">{`${!!applyingCompanyTitle ? applyingCompanyTitle : ""} ${!!applyingCompanyContact ? applyingCompanyContact : ""}`}</p>
                                        </div>
                                    )
                                }
                                {
                                    (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                        <div className="block-from">
                                            <h3 className="block-heading font-size-3 line-height-3 additional-color-1-text">From</h3>
                                            {
                                                !!state && (
                                                    <p className="font-size-1 line-height-1 main-color-3-text">{state}</p>
                                                )
                                            }
                                            {!!phone && (<p className="font-size-1 line-height-1 main-color-3-text">{phone}</p>)}
                                            {!!email && (<p className="font-size-1 line-height-1 main-color-3-text">{email}</p>)}
                                            <p className="font-size-1 line-height-1 main-color-3-text">
                                                {`${!!city && (`${city}, `)} ${!!zipCode && (`${zipCode}, `)} ${!!country && (`${country}`)}`}
                                            </p>
                                        </div>
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

