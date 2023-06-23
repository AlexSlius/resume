import React, { useEffect } from "react";

const drawing = () => {
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

export const CoverCv016 = ({
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
    }, [isDrawing, data]);

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
                                    <div className="block-to">
                                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">To</h3>
                                        <div className="underheading-line"></div>
                                        <p className="font-size-1 line-height-2 main-color-2-text font-weight-300" dangerouslySetInnerHTML={{ __html: data.to }}></p>
                                    </div>
                                    <div className="block-from">
                                        <h3 className="heading-type-1 font-size-4 line-height-6 font-weight-300">From</h3>
                                        <div className="underheading-line"></div>
                                        <p className="font-size-1 line-height-2 main-color-2-text font-weight-300" dangerouslySetInnerHTML={{ __html: data.from }}></p>
                                    </div>
                                </div>
                            </div>
                            <div className="column-right">
                                <div className="letter-block">
                                    {/* <h3 className="letter-heading font-size-2 cv-letter-heading line-height-3 main-color-2-text font-weight-400">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3> */}
                                    <div className="letter-text cv-letter-text font-size-1 line-height-2 main-color-2-text font-weight-300" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

