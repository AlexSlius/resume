import React, { useEffect } from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv041 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    const {
        firstName,
        lastName,
        industryHoldExperienceJobTitle,
    } = data;

    useEffect(() => {
        if (typeof window != "undefined") {
            // Reccomendation letter
            let letter_current_page_number = 1;

            $('.cv-body-visible').remove();

            function rebuildingPages2() {
                let cv_letter_heading = $('#cv-body-2 .middle-area .letter-block .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .middle-area .letter-block .cv-letter-text').clone();

                getCvLetterContainer().append(cv_letter_heading);

                let original_cv_letter_text = $('#cv-body-2 .middle-area .letter-block .cv-letter-text');
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
                return getPageContainer2().find('.middle-area .letter-block');
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

                page_element_container.find('.middle-area .letter-block .cv-letter-heading').remove();
                page_element_container.find('.middle-area .letter-block .cv-letter-text').remove();

                $('#cv-chapter-section-resume').append(page_element);

                return page_element_container;
            }

            rebuildingPages2();
        }
    }, [data, stateClasses]);

    return (
        <div className="sv_041 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 main-color-1-background">
                    <div className="cv-body-content">
                        <div className="top-area">
                            <div className="main-info-block main-color-3-border">
                                <h1 className="cv-name font-size-5 line-height-7">{firstName}{' '}{lastName}</h1>
                                {
                                    !!industryHoldExperienceJobTitle && (
                                        <h3 className="cv-prophecy font-size-3 line-height-5 main-color-1-background main-color-4-text">{industryHoldExperienceJobTitle}</h3>
                                    )
                                }
                            </div>
                        </div>
                        <div className="middle-area">
                            <div className="letter-block">
                                {/* <h3 className="letter-heading font-size-2 cv-letter-heading line-height-1">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3> */}
                                <div className="letter-text cv-letter-text font-size-1 line-height-4" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                            </div>
                            <div className="addresses-block">
                                <div className="block-to">
                                    <h3 className="block-heading font-size-3 line-height-6">To</h3>
                                    <p className="font-size-2 line-height-3" dangerouslySetInnerHTML={{ __html: data.to }}></p>
                                </div>
                                <div className="block-from">
                                    <h3 className="block-heading font-size-3 line-height-6">From</h3>
                                    <p className="font-size-2 line-height-3" dangerouslySetInnerHTML={{ __html: data.from }}></p>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-area additional-color-2-background"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

