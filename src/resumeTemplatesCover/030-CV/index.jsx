import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv030 = ({
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
        <div className="sv_030 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section font-size-scheme-state-small line-height-scheme-state-small color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 main-color-2-background">
                    <div className="ellipse-line"></div>
                    <div className="cv-body-content">
                        <div className="top-area">
                            <h1 className="cv-name font-size-5 line-height-9">{firstName}{` `} {lastName}</h1>
                        </div>
                        <div className="middle-area">
                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00004 0.484375C5.00004 3.26358 7.02129 5.28483 9.8005 5.28483C7.02129 5.28483 5.00004 7.30608 5.00004 10.0853C5.00004 7.30608 2.97887 5.28483 0.199585 5.28483C2.97879 5.28483 5.00004 3.26358 5.00004 0.484375Z" fill="black" />
                            </svg>
                            <div className="letter-block">
                                <h3 className="letter-heading font-size-4 line-height-8">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="letter-text font-size-1 line-height-3" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="bottom-area">
                            <div className="addresses-block">
                                {
                                    (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                        <div className="block-to">
                                            <h3 className="block-heading font-size-3 line-height-7">To</h3>
                                            <p className="font-size-1 line-height-1">{`${applyingCompanyName} ${applyingCompanyJobTitle}`}</p>
                                            <p className="font-size-1 line-height-1">{`${applyingCompanyTitle} ${applyingCompanyContact}`}</p>
                                        </div>
                                    )
                                }
                                {
                                    (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                        <div className="block-from">
                                            <h3 className="block-heading font-size-3 line-height-7">From</h3>
                                            {
                                                !!state && (
                                                    <p className="font-size-1 line-height-1">{state}</p>
                                                )
                                            }
                                            {!!phone && (<p className="font-size-1 line-height-1">{phone}</p>)}
                                            {!!email && (<p className="font-size-1 line-height-1">{email}</p>)}
                                            <p className="font-size-1 line-height-1">
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

