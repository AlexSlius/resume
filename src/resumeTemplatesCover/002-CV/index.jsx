import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv002 = ({
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
        <div className="sv_002 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body_height cv-body---resume page-2">
                    <div className="cv-body-content">
                        {
                            (!!firstName || !!lastName) && (
                                <div className="cv-body-area area-1 ">
                                    <div className="column-left">
                                        <h1 className="cv-heading additional-color-1-text cv-name font-weight-600 font-size-5 line-height-4">
                                            {!!firstName && (firstName)}{` `}
                                            {!!lastName && (lastName)}
                                        </h1>
                                    </div>
                                </div>
                            )
                        }
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                <h2 className="cv-heading heading-type-6 font-size-2 line-height-4 main-color-1-text letter-heading">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="cv-text font-size-1 line-height-1 main-color-1-text letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                            <div className="separator"></div>
                            {
                                (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact || !!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                    <div className="column-right">
                                        <div className="cv-destination">
                                            <div className="cv-destination-block block-block additional-color-2-border">
                                                <div className="destination-details">
                                                    {
                                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                            <>
                                                                <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">TO
                                                                    <span className="line-after-block-heading additional-color-2-border"></span>
                                                                </h3>
                                                                <p className="cv-sender font-size-1 line-height-1 main-color-1-text">
                                                                    {!!applyingCompanyName && (<>{applyingCompanyName}<br /></>)}
                                                                    {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}
                                                                    {!!applyingCompanyTitle && (<> {`Dear ${applyingCompanyTitle}`}<br /></>)}
                                                                    {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}
                                                                </p>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                            <>
                                                                <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">
                                                                    FROM
                                                                    <span className="line-after-block-heading additional-color-2-border"></span>
                                                                </h3>
                                                                <p className="cv-destination font-size-1 line-height-1 main-color-1-text">
                                                                    {!!state && (<>{state}<br /></>)}
                                                                    {!!city && (<>{city}<br /></>)}
                                                                    {!!zipCode && (<>{zipCode}<br /></>)}
                                                                    {!!country && (<>{country}<br /></>)}
                                                                    {!!phone && (<>{phone}<br /></>)}
                                                                    {
                                                                        !!email && (email)
                                                                    }
                                                                </p>
                                                            </>
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