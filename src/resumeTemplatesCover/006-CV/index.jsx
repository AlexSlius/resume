import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv006 = ({
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
        <div className="sv_006 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div className="cv-body cv-body-2 cv-body_height">
                    <div className="cv-body-content">
                        <div className="cv-body-area top-area">
                            <div className="profile-information additional-color-1-border">
                                <h1 className="cv-name font-weight-700 font-size-3 line-height-4">
                                    {firstName}{` `} {lastName}
                                </h1>
                            </div>
                        </div>
                        <div className="cv-body-area middle-area">
                            <h2 className="cv-heading main-color-1-text font-size-2 line-height-3">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                            {
                                !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                    <p className="cv-text main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                )
                            }
                        </div>
                        <div className="cv-body-area bottom-area additional-color-1-background">
                            <div className="cv-destination">
                                <div className="cv-destination-block">
                                    <div className="destination-details">
                                        {
                                            (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                <div className="to-block block-block">
                                                    <p className="cv-heading main-color-2-text font-weight-700 font-size-2 line-height-2">TO</p>
                                                    <span className="horizontal-line main-color-2-border"></span>
                                                    <p className="cv-sender main-color-2-text font-size-1 line-height-1"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                        {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}</p>
                                                    <p className="cv-sender main-color-2-text font-size-1 line-height-1">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                                </div>
                                            )
                                        }

                                        {
                                            (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                <div className="from-block block-block">
                                                    <p className="cv-heading main-color-2-text font-weight-700 font-size-2 line-height-2">FROM</p>
                                                    <span className="horizontal-line main-color-2-border"></span>
                                                    <div className="cv-destination">
                                                        {!!state && (<p className="main-color-2-text font-size-1 line-height-1">{state}<br /></p>)}
                                                        {!!city && (<p className="main-color-2-text font-size-1 line-height-1">{city}<br /></p>)}
                                                        {!!zipCode && (<p className="main-color-2-text font-size-1 line-height-1">{zipCode}<br /></p>)}
                                                        {!!country && (<p className="main-color-2-text font-size-1 line-height-1">{country}<br /></p>)}
                                                        {!!phone && (<p className="main-color-2-text font-size-1 line-height-1">{phone}<br /></p>)}
                                                        {!!email && (<p className="main-color-2-text font-size-1 line-height-1">{email}</p>)}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}