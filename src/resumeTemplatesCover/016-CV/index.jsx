import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv016 = ({
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
        <div className="sv_016 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 font-size-scheme-1 line-height-scheme-1">
                    <div className="cv-body-content">
                        <div className="circle-shade"></div>
                        <div className="top-area">
                            <h1 className="cv-name font-size-6 line-height-8 main-color-2-text font-weight-400">{firstName}{` `} {lastName}</h1>
                        </div>
                        <div className="middle-area">
                            <div className="column-left">
                                <div className="destination-block block-block">
                                    {
                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                            <div className="block-to">
                                                <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">To</h3>
                                                <div className="underheading-line"></div>
                                                <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{`${applyingCompanyName} ${applyingCompanyJobTitle}`}</p>
                                                <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{`${applyingCompanyTitle} ${applyingCompanyContact}`}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                            <div className="block-from">
                                                <h3 className="heading-type-1 font-size-4 line-height-6 font-weight-300">From</h3>
                                                <div className="underheading-line"></div>
                                                {
                                                    !!state && (
                                                        <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{state}</p>
                                                    )
                                                }
                                                <p class="font-size-1 line-height-2 main-color-2-text font-weight-300">
                                                    {`${!!city && (`${city}, `)} ${!!zipCode && (`${zipCode}, `)} ${!!country && (`${country}`)}`}
                                                </p>
                                                {!!phone && (<p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{phone}</p>)}
                                                {!!email && (<p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{email}</p>)}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="column-right">
                                <div className="letter-block">
                                    <h3 className="letter-heading font-size-2 line-height-3 main-color-2-text font-weight-400">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                    {
                                        !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                            <p className="letter-text font-size-1 line-height-2 main-color-2-text font-weight-300" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
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

