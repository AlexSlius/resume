import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv010 = ({
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
        <div className="sv_010 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 font-size-scheme-1 line-height-scheme-1">
                    <div className="cv-body-content additional-color-4-background additional-color-2-text">
                        <div className="column-left">
                            <h1 className="cv-name font-size-5 line-height-6">{firstName}{` `} {lastName}</h1>
                            <h2 className="cv-prophecy font-size-3 line-height-4 main-color-4-text">W E B D E S I G N E R</h2>
                            <div className="letter-block">
                                <h3 className="letter-heading font-size-4 line-height-4-1">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="letter-text font-size-2 line-height-1-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="column-right">
                            <div className="information-block additional-color-5-background">
                                <div className="destination-block">
                                    {
                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                            <div className="block-to">
                                                <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">To</h3>
                                                <p className="font-size-2 line-height-3"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                    {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}</>)} </p>
                                                <p className="font-size-2 line-height-3">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                            <div className="block-from">
                                                <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">From</h3>
                                                {!!state && (<p className="font-size-2 line-height-3">{state}<br /></p>)}
                                                {!!city && (<p className="font-size-2 line-height-3">{`${!!city && (`${city}, `)} ${!!zipCode && (`${zipCode}, `)} ${!!country && (`${country}`)}`}<br /></p>)}
                                                {!!phone && (<p className="font-size-2 line-height-3">{phone}<br /></p>)}
                                                {!!email && (<p className="font-size-2 line-height-3">{email}</p>)}
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
    )
}
