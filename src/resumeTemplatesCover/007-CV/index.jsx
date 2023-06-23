import React, { useEffect } from "react";

const drawing = () => {
    if (typeof window != "undefined") {
        let letter_current_page_number = 1;

        $('.cv-body-visible').remove();

        function rebuildingPages2() {
            let cv_letter_heading = $('#cv-body-2 .column-right .letter-wrapper .cv-letter-heading').clone();
            let cv_letter_text = $('#cv-body-2 .column-right .letter-wrapper .cv-letter-text').clone();

            getCvLetterContainer().append(cv_letter_heading);

            let original_cv_letter_text = $('#cv-body-2 .column-right .letter-wrapper .cv-letter-text');
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
            return getPageContainer2().find('.column-right .letter-wrapper');
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

            page_element_container.find('.column-right .letter-wrapper .cv-letter-heading').remove();
            page_element_container.find('.column-right .letter-wrapper .cv-letter-text').remove();

            $('#cv-chapter-section-resume').append(page_element);

            return page_element_container;
        }

        rebuildingPages2();
    }
}

export const CoverCv007 = ({
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
        <div className="sv_007 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div className="cv-body cv-body-2">
                    <div className="cv-body-content">
                        <div className="column-left">
                            <div className="cv-destination">
                                <div className="cv-destination-block">
                                    <div className="destination-details">
                                        <p className="headint-type-3 heading-to font-weight-900 font-size-2 line-height-3">TO</p>
                                        <p className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.to }}></p>
                                        <p className="heading-type-3 heading-from font-weight-900 font-size-2 line-height-3">FROM</p>
                                        <p className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.from }}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column-right">
                            <h1 className="cv-name font-size-5 line-height-6">
                                {
                                    !!firstName?.length && (
                                        <span className="text-line-1 font-weight-300">{firstName}&nbsp;</span>
                                    )
                                }
                                {
                                    !!lastName?.length && (
                                        <span className="text-line-2 font-weight-900">{` ${firstName}`}</span>
                                    )
                                }
                            </h1>
                            <div className="letter-wrapper additional-color-2-background">
                                <div className="black-line main-color-1-background"></div>
                                {/* <h2 className="cv-heading  cv-letter-heading font-weight-600 font-size-2 line-height-3">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2> */}
                                <div className="font-size-1 cv-letter-text line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="nine-points nine-points-1">
                        <div className="inner-wrapper">
                            <div className="point p1 additional-color-1-background"></div>
                            <div className="point p2 additional-color-1-background"></div>
                            <div className="point p3 additional-color-1-background"></div>
                            <div className="point p4 additional-color-1-background"></div>
                            <div className="point p5 additional-color-1-background"></div>
                            <div className="point p6 additional-color-1-background"></div>
                            <div className="point p7 additional-color-1-background"></div>
                            <div className="point p8 additional-color-1-background"></div>
                            <div className="point p9 additional-color-1-background"></div>
                        </div>
                    </div>

                    <div className="nine-points nine-points-2">
                        <div className="inner-wrapper">
                            <div className="point p1 additional-color-1-background"></div>
                            <div className="point p2 additional-color-1-background"></div>
                            <div className="point p3 additional-color-1-background"></div>
                            <div className="point p4 additional-color-1-background"></div>
                            <div className="point p5 additional-color-1-background"></div>
                            <div className="point p6 additional-color-1-background"></div>
                            <div className="point p7 additional-color-1-background"></div>
                            <div className="point p8 additional-color-1-background"></div>
                            <div className="point p9 additional-color-1-background"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}