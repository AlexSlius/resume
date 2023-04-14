import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv008 = ({
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
        <div className="sv_008 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1`} data-chapter="resume">
                <div className="cv-body cv-body-2 cv-body_height main-color-3-background">
                    <div className="red-circle-1 additional-color-1-background"></div>
                    <div className="red-circle-2 additional-color-1-background"></div>
                    <div className="white-circle main-color-2-border"></div>
                    <div className="cv-body-content">
                        <div className="cv-body-area top-area">
                            <div className="column-left">
                                <h1 className="cv-name font-size-6 line-height-9 main-color-2-text">{firstName}{` `} {lastName}</h1>
                                <span className="white-line main-color-2-border"></span>
                            </div>
                        </div>
                        <div className="cv-body-area middle-area">
                            <div className="column-left"></div>
                            <div className="column-right">
                                <h2 className="cv-heading font-weight-500 font-size-4 line-height-0 main-color-2-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="cv-text font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="cv-body-area bottom-area">
                            <div className="column-left">
                                <div className="cv-destination">
                                    <div className="cv-destination-block">
                                        <div className="destination-details">
                                            {
                                                (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                    <>
                                                        <p className="cv-heading to-heading font-weight-700 font-size-2 line-height-0-1 main-color-2-text">TO</p>
                                                        <p className="cv-sender font-size-1 line-height-1 main-color-2-text"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                            {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)} {!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                                    </>
                                                )
                                            }
                                            {
                                                (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                    <>
                                                        <p className="cv-heading from-heading font-weight-700 font-size-2 line-height-0-1 main-color-2-text">FROM</p>
                                                        {!!state && (<p className="font-size-1 line-height-1 main-color-2-text">{state}<br /></p>)}
                                                        {!!city && (<p className="font-size-1 line-height-1 main-color-2-text">{city}<br /></p>)}
                                                        {!!zipCode && (<p className="font-size-1 line-height-1 main-color-2-text">{zipCode}<br /></p>)}
                                                        {!!country && (<p className="font-size-1 line-height-1 main-color-2-text">{country}<br /></p>)}
                                                        {!!phone && (<p className="font-size-1 line-height-1 main-color-2-text">{phone}<br /></p>)}
                                                        {!!email && (<p className="font-size-1 line-height-1 main-color-2-text">{email}</p>)}
                                                    </>
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
        </div>
    )
}