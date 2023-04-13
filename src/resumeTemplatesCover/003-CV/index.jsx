import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv003 = ({
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
        <div className="sv_003 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className="cv-chapter-section" data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className={`${stateClasses} cv-body cv-body_height cv-body-2 cv-body---resume page-2 color-scheme-state-color-set-0`}>
                    <div className="cv-body-content">
                        <div className="cv-body-area area-1 additional-color-2-background">
                            <div className="column-left">
                                <h1 className="cv-heading cv-name heading-type-1 main-color-1-text font-size-3 line-height-3">
                                    {!!firstName && (<span className="name-line-1 font-weight-400">{firstName}</span>)} {` `}
                                    {!!lastName && (<span className="name-line-2 font-weight-600">{lastName}</span>)}
                                </h1>
                            </div>
                        </div>
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                <div className="cv-letter">
                                    <h2 className="cv-heading letter-heading heading-type-6 font-size-2-2 line-height-2-2 main-color-1-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                                    {
                                        !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                            <p className="cv-text letter-text font-size-1 line-height-1 main-color-1-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact || !!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                    <div className="column-right">
                                        <div className="cv-destination main-color-1-border">
                                            <div className="cv-destination-block block-block additional-color-2-border">
                                                <div className="destination-details">
                                                    {
                                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                            <div className="block-to">
                                                                <h3 className="cv-heading heading-type-3 font-weight-600 font-size-1 line-height-1 main-color-1-text">
                                                                    TO
                                                                    <span className="line-after-block-heading additional-color-2-border"></span>
                                                                </h3>
                                                                <p className="cv-sender font-size-1 line-height-1 main-color-1-text">
                                                                    {!!applyingCompanyName && (<>{applyingCompanyName}<br /></>)}
                                                                    {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}
                                                                    {!!applyingCompanyTitle && (<> {`Dear ${applyingCompanyTitle}`}<br /></>)}
                                                                    {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}
                                                                </p>
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                            <div className="block-from">
                                                                <h3 className="cv-heading heading-type-3 font-weight-600 font-size-1 line-height-1 main-color-1-text">
                                                                    FROM
                                                                    <span className="line-after-block-heading additional-color-2-border"></span>
                                                                </h3>
                                                                <p className="font-size-1 line-height-1 main-color-1-text">
                                                                    {!!state && (<>{state}<br /></>)}
                                                                    {!!city && (<>{city}<br /></>)}
                                                                    {!!zipCode && (<>{zipCode}<br /></>)}
                                                                    {!!country && (<>{country}<br /></>)}
                                                                    {!!phone && (<>{phone}<br /></>)}
                                                                    {
                                                                        !!email && (email)
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}