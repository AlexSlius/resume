import React, { useEffect } from "react";

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
        applyingCompanyTitle,
        applyingCompanyContact,
    } = data;

    useEffect(() => {
        if (typeof window != "undefined") {
            // Reccomendation letter
            let letter_current_page_number = 1;

            $('.cv-body-visible').remove();

            function rebuildingPages2() {
                let cv_letter_heading = $('#cv-body-2 .column-right .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .column-right .cv-letter-text').clone();

                getCvLetterContainer().append(cv_letter_heading);

                let original_cv_letter_text = $('#cv-body-2 .column-right .cv-letter-text');
                getCvLetterContainer().append(cv_letter_text);

                let text1 = getCvLetterContainer().find('.cv-letter-text');

                if (getPageContainer2().height() > (getPageContainer2().parent().height())) {
                    do {
                        text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
                    }
                    while (getPageContainer2().height() > (getPageContainer2().parent().height()));

                    letter_current_page_number++;
                    getCvLetterContainer().append(original_cv_letter_text.clone());
                    let text2 = getCvLetterContainer().find('.cv-letter-text');
                    text2.html(text2.html().substring(text1.html().length));
                }
            }

            function getCvLetterContainer() {
                return getPageContainer2().find('.column-right');
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

                page_element_container.find('.column-right .cv-letter-heading').remove();
                page_element_container.find('.column-right .cv-letter-text').remove();

                $('#cv-chapter-section-resume').append(page_element);

                return page_element_container;
            }

            rebuildingPages2();
        }
    }, [data, stateClasses]);

    return (
        <div className="sv_008 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" className="cv-body cv-body-2 cv-body_height main-color-3-background">
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
                                {/* <h2 className="cv-heading cv-letter-heading font-weight-500 font-size-4 line-height-0 main-color-2-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2> */}
                                <div className="cv-text cv-letter-text font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                            </div>
                        </div>
                        <div className="cv-body-area bottom-area">
                            <div className="column-left">
                                <div className="cv-destination">
                                    <div className="cv-destination-block">
                                        <div className="destination-details">
                                            <p className="cv-heading to-heading font-weight-700 font-size-2 line-height-0-1 main-color-2-text">TO</p>
                                            <p className="cv-sender font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: data.to }}></p>
                                            <p className="cv-heading from-heading font-weight-700 font-size-2 line-height-0-1 main-color-2-text">FROM</p>
                                            <p className="font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: data.from }}></p>
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