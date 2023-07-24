import React, { useEffect } from "react";

const drawing = () => {
    if (typeof window != "undefined") {
        // Reccomendation letter
        let letter_current_page_number = 1;

        $('.cv-body-visible').remove();

        function rebuildingPages2() {
            let cv_letter_heading = $('#cv-body-2 .cv-body-area.middle-area .cv-letter .cv-letter-heading').clone();
            let cv_letter_text = $('#cv-body-2 .cv-body-area.middle-area .cv-letter .cv-letter-text').clone();

            getCvLetterContainer().append(cv_letter_heading);

            let original_cv_letter_text = $('#cv-body-2 .cv-body-area.middle-area .cv-letter .cv-letter-text');
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
            return getPageContainer2().find('.cv-body-area.middle-area .cv-letter');
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

            page_element_container.find('.cv-body-area.middle-area .cv-letter').children().remove();

            $('#cv-chapter-section-resume').append(page_element);

            return page_element_container;
        }

        rebuildingPages2();
    }
}

export const CoverCv005 = ({
    data,
    stateClasses,
    reportTemplateRef,
    isDrawing = false,
    isTemplate = false,
    handleFalseDrafind = () => { },
}) => {
    const {
        firstName,
        lastName,
    } = data;

    useEffect(() => {
        if (isTemplate) {
            drawing();
        }

        if (!!isDrawing && !isTemplate) {
            drawing();
            handleFalseDrafind();
        }
    }, [isDrawing, data, stateClasses]);

    useEffect(() => {
        if (isTemplate) {
          setTimeout(() => {
            drawing();
          }, 100);
        }
      }, []);

    return (
        <div className="sv_005 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" className="cv-body cv-body-2">
                    <div className="cv-body-content">
                        <div className="cv-body-area top-area">
                            <h1 className="cv-name">
                                {
                                    !!firstName?.length && (
                                        <span className="text-line-1 font-weight-400 font-size-5 line-height-5">{firstName}</span>
                                    )
                                }
                                {
                                    !!lastName?.length && (
                                        <span className="text-line-2 font-weight-700 font-size-4 line-height-4">{firstName}</span>
                                    )
                                }
                            </h1>
                        </div>
                        <div className="cv-body-area middle-area">
                            <div className="cv-letter">
                                {/* <h2 className="cv-heading cv-letter-heading  main-color-1-text font-weight-600 font-size-3 line-height-4">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2> */}
                                <div className="cv-text cv-letter-text main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                            </div>
                        </div>
                        <div className="cv-body-area bottom-area additional-color-1-background">
                            <div className="cv-destination">
                                <div className="cv-destination-block">
                                    <div className="destination-details">
                                        <div className="to-block block-block">
                                            <p className="cv-heading main-color-2-text font-weight-700 font-size-2 line-height-2">TO</p>
                                            <p className="cv-sender main-color-2-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.to }}></p>
                                        </div>
                                        <div className="from-block block-block">
                                            <p className="cv-heading main-color-2-text font-weight-700 font-size-2 line-height-2">FROM</p>
                                            <span className="horizontal-line main-color-2-border"></span>
                                            <div className="cv-destination main-color-2-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.from }}></div>
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