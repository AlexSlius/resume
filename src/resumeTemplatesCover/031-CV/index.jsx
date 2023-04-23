import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv031 = ({
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
        <div className="sv_031 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 main-color-1-background">
                    <div className="cv-body-content additional-color-1-border">
                        <div className="top-area">
                            <h1 className="cv-name font-size-4 line-height-7 font-weight-500 additional-color-1-text">{firstName}{` `} {lastName}</h1>
                        </div>
                        <div className="middle-area">
                            <div className="letter-block">
                                <div className="left-side">
                                    <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                                    </svg>
                                </div>
                                <div className="right-side">
                                    <h3 className="letter-heading font-size-3 line-height-6 font-weight-400 additional-color-1-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                    {
                                        !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                            <p className="letter-text font-size-1 line-height-2 font-weight-400 main-color-3-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="bottom-area">
                            <div className="addresses-block">
                                {
                                    (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                        <div className="to-block">
                                            <h3 className="block-heading font-size-2 line-height-3 font-weight-400 additional-color-1-text">To</h3>
                                            <p className="font-size-1 line-height-1 font-weight-400 main-color-3-text">{`${applyingCompanyName} ${applyingCompanyJobTitle}`}</p>
                                            <p className="font-size-1 line-height-1 font-weight-400 main-color-3-text">{`${applyingCompanyTitle} ${applyingCompanyContact}`}</p>
                                        </div>
                                    )
                                }
                                {
                                    (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                        <div className="from-block">
                                            <h3 className="block-heading font-size-2 line-height-3 font-weight-400 additional-color-1-text">From</h3>
                                            {
                                                !!state && (
                                                    <p className="font-size-1 line-height-1 font-weight-400 main-color-3-text">{state}</p>
                                                )
                                            }
                                            {!!phone && (<p className="font-size-1 line-height-1 font-weight-400 main-color-3-text">{phone}</p>)}
                                            {!!email && (<p className="font-size-1 line-height-1 font-weight-400 main-color-3-text">{email}</p>)}
                                            <p className="font-size-1 line-height-1 font-weight-400 main-color-3-text">
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

