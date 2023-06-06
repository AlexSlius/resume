import React, { useEffect } from "react";

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

    useEffect(() => {
        if (typeof window != "undefined") {
            let letter_current_page_number = 1;

            $('.cv-body-visible').remove();

            // Reccomendation letter
            function rebuildingPages2() {
                let cv_letter_heading = $('#cv-body-2 .cv-body-area.area-2 .column-left .letter-block .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .cv-body-area.area-2 .column-left .letter-block .cv-letter-text').clone();

                getCvLetterContainer().append(cv_letter_heading);

                let original_cv_letter_text = $('#cv-body-2 .cv-body-area.area-2 .column-left .cv-letter-text');
                getCvLetterContainer().append(cv_letter_text);

                let text1 = getCvLetterContainer().find('.cv-letter-text');

                if (getPageContainer2().height() > getPageContainer2().parent().height()) {
                    if (!!text1.html()) {
                        do {

                            text1.html(text1.html()?.substring(0, text1.html().lastIndexOf(" ")));
                        }
                        while (getPageContainer2().height() > getPageContainer2().parent().height());
                    }

                    letter_current_page_number++;
                    getCvLetterContainer().append(original_cv_letter_text.clone());
                    let text2 = getCvLetterContainer().find('.cv-letter-text');
                    text2.html(text2.html()?.substring(text1.html().length));
                }
            }

            function getCvLetterContainer() {
                return getPageContainer2().find('.cv-body-area.area-2 .column-left .letter-block');
            }

            function getPageContainer2() {
                let page = $('#cv-chapter-section-resume').find('.cv-body.cv-body-visible.page-' + letter_current_page_number);
                if (page.length > 0) {
                    return page.find('.cv-body-content');
                } else {
                    return createNewPage2();
                }
            }

            function createNewPage2() {
                let page_element = $('#cv-body-2').clone();
                page_element.attr('id', '');
                page_element.addClass(['cv-body-visible', 'page-' + letter_current_page_number]);
                let page_element_container = page_element.find('.cv-body-content');

                page_element_container.find('.cv-body-area.area-2 .column-left .letter-block').children().remove();

                $('#cv-chapter-section-resume').append(page_element);

                return page_element_container;
            }

            rebuildingPages2();
        }
    }, [data, stateClasses]);

    return (
        <div className="sv_003 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className={`cv-body cv-body-2 cv-body---resume`}>
                    <div className="cv-body-content">
                        <div className="cv-body-area area-1 additional-color-2-background">
                            <h1 className="cv-heading cv-name main-color-1-text heading-type-1 font-size-3 line-height-3">
                                {!!firstName && (<span className="name-line-1 font-weight-400">{firstName}</span>)} {` `}
                                {!!lastName && (<span className="name-line-2 font-weight-600">{lastName}</span>)}
                            </h1>
                        </div>
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                <div className="cv-letter">
                                    <h2 className="cv-heading letter-heading cv-letter-heading heading-type-6 font-size-2-2 line-height-2-2 main-color-1-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                                    {/* {
                                        !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && ( */}
                                            <div className="cv-text cv-letter-text letter-text font-size-1 line-height-1 main-color-1-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                                        {/* )
                                    } */}
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