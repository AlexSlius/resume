import React, { useState } from "react";
import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv001 = ({
    data,
    idCv,
    stateLineSpacing,
    stateFontSize,
    templateClass,
    reportTemplateRef,
}) => {
    const [classFontSize, setClassFontSize] = useState(1);
    const [classFontLineSpacing, setClassFontLineSpacing] = useState(1);

    React.useEffect(() => {
        switch (stateLineSpacing) {
            case 0: {
                setClassFontLineSpacing(1);
                break;
            }
            case 50: {
                setClassFontLineSpacing(2);
                break;
            }
            case 100: {
                setClassFontLineSpacing(3);
                break;
            }
        }

    }, [stateLineSpacing]);

    React.useEffect(() => {
        switch (stateFontSize) {
            case 0: {
                setClassFontSize(1);
                break;
            }
            case 50: {
                setClassFontSize(2);
                break;
            }
            case 100: {
                setClassFontSize(3);
                break;
            }
        }
    }, [stateFontSize]);

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
        <div className="sv_001 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className="cv-chapter-section" data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className={`
                    cv-body 
                    cv-body-2 
                    cv-body_height
                    cv-body---resume 
                    page-2
                    color-scheme-1
                    font-size-scheme-${classFontSize}
                    line-height-scheme-${classFontLineSpacing}
                `}>
                    <div className="cv-body-content">
                        {
                            (!!firstName || !!lastName) && (
                                <div className="cv-body-area area-1 additional-color-3-background">
                                    <div className="column-left">
                                        <h1 className="cv-heading heading-type-1 additional-color-1-text font-size-3 line-height-3">
                                            {!!firstName && (firstName)}
                                            {!!lastName && (lastName)}
                                        </h1>
                                    </div>
                                </div>
                            )
                        }
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                <div className="cv-letter">
                                    <h2 className="cv-heading cv-letter-heading heading-type-6 font-size-1 line-height-1 additional-color-1-text">Dear Dr. Boater,</h2>
                                    {
                                        !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                            <p className="cv-letter-text font-size-1 line-height-1 main-color-1-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact || !!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                    <div className="column-right">
                                        <div className="cv-destination">
                                            <div className="cv-destination-block additional-color-2-border">
                                                <div className="destination-details">
                                                    {
                                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                            <>
                                                                <p className="cv-heading heading-type-6 font-size-1 line-height-1 additional-color-1-text">To</p>
                                                                <p className="cv-sender font-size-1 line-height-1 main-color-1-text">
                                                                    {!!applyingCompanyName && (<>{applyingCompanyName}<br /></>)}
                                                                    {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}
                                                                    {!!applyingCompanyTitle && (<>{applyingCompanyTitle}<br /></>)}
                                                                    {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}
                                                                </p>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                            <>
                                                                <p className="cv-heading heading-type-6 font-size-1 line-height-1 additional-color-1-text">From</p>
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