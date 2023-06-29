import React, { useEffect } from "react";

const drawing = () => {
    if (typeof window != "undefined") {
        // Reccomendation letter
        let letter_current_page_number = 1;

        function rebuildingPages2() {
            $('.cv-body-visible').remove();
            let cv_letter_heading = $('#cv-body-2 .column-right .letter-block .cv-letter-heading').clone();
            let cv_letter_text = $('#cv-body-2 .column-right .letter-block .cv-letter-text').clone();

            getCvLetterContainer().append(cv_letter_heading);

            let original_cv_letter_text = $('#cv-body-2 .column-right .letter-block .cv-letter-text');
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
            return getPageContainer2().find('.column-right .letter-block');
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

            page_element_container.find('.column-right .letter-block .cv-letter-heading').remove();
            page_element_container.find('.column-right .letter-block .cv-letter-text').remove();

            $('#cv-chapter-section-resume').append(page_element);

            return page_element_container;
        }

        rebuildingPages2();
    }
}

export const CoverCv015 = ({
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

    return (
        <div className="sv_015 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-default`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2">
                    <div className="cv-body-content main-color-1-text font-size-1">
                        <div className="column-left">
                            <div className="destination-block block-block">
                                <div className="destination-contacts-block">
                                    <h3 className="block-heading font-size-2 additional-color-1-text">To</h3>
                                    <div className="block-item">
                                        <p dangerouslySetInnerHTML={{ __html: data.to }}></p>
                                    </div>
                                    <h3 className="block-heading font-size-2 additional-color-1-text">From</h3>
                                    <div className="block-item" dangerouslySetInnerHTML={{ __html: data.from }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="column-right">
                            <h1 className="cv-name font-size-3">{firstName}{` `} {lastName}</h1>
                            <div className="letter-block">
                                {/* <h2 className="cv-letter-heading block-heading letter-heading font-size-1">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2> */}
                                <div className="cv-letter-text letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

