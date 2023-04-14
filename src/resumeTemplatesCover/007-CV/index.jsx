import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv007 = ({
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
        <div className="sv_007 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div className="cv-body cv-body-2 cv-body_height">
                    <div className="cv-body-content">
                        <div className="column-left">
                            <div className="cv-destination">
                                <div className="cv-destination-block">
                                    <div className="destination-details">
                                        {
                                            (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                <>
                                                    <p className="headint-type-3 heading-to font-weight-900 font-size-2 line-height-3">TO</p>
                                                    <p className="font-size-1 line-height-1"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                        {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}</p>
                                                    <p className="font-size-1 line-height-1">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                                </>
                                            )
                                        }
                                        {
                                            (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                <>
                                                    <p className="heading-type-3 heading-from font-weight-900 font-size-2 line-height-3">FROM</p>
                                                    {!!state && (<p className="font-size-1 line-height-1">{state}<br /></p>)}
                                                    {!!city && (<p className="font-size-1 line-height-1">{city}<br /></p>)}
                                                    {!!zipCode && (<p className="font-size-1 line-height-1">{zipCode}<br /></p>)}
                                                    {!!country && (<p className="font-size-1 line-height-1">{country}<br /></p>)}
                                                    {!!phone && (<p className="font-size-1 line-height-1">{phone}<br /></p>)}
                                                    {!!email && (<p className="font-size-1 line-height-1">{email}</p>)}
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column-right">
                            <h1 className="cv-name font-size-5 line-height-6">
                                {
                                    !!firstName.length && (
                                        <span className="text-line-1 font-weight-300">{firstName}&nbsp;</span>
                                    )
                                }
                                {
                                    !!lastName.length && (
                                        <span className="text-line-2 font-weight-900">{` ${firstName}`}</span>
                                    )
                                }
                            </h1>
                            <div className="letter-wrapper additional-color-2-background">
                                <div className="black-line main-color-1-background"></div>
                                <h2 className="cv-heading font-weight-600 font-size-2 line-height-3">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="nine-points nine-points-1">
                        <div className="inner-wrapper">
                            <div className="point p1 additional-color-1-background"></div>
                            <div className="point p2 additional-color-1-background"></div>
                            <div className="point p3 additional-color-1-background"></div>
                            <div className="point p4 additional-color-1-background"></div>
                            <div className="point p5 additional-color-1-background"></div>
                            <div className="point p6 additional-color-1-background"></div>
                            <div className="point p7 additional-color-1-background"></div>
                            <div className="point p8 additional-color-1-background"></div>
                            <div className="point p9 additional-color-1-background"></div>
                        </div>
                    </div>

                    <div className="nine-points nine-points-2">
                        <div className="inner-wrapper">
                            <div className="point p1 additional-color-1-background"></div>
                            <div className="point p2 additional-color-1-background"></div>
                            <div className="point p3 additional-color-1-background"></div>
                            <div className="point p4 additional-color-1-background"></div>
                            <div className="point p5 additional-color-1-background"></div>
                            <div className="point p6 additional-color-1-background"></div>
                            <div className="point p7 additional-color-1-background"></div>
                            <div className="point p8 additional-color-1-background"></div>
                            <div className="point p9 additional-color-1-background"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}