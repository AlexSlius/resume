import React, { useEffect } from "react";

export const CoverCv002 = ({
    data,
    stateClasses,
    reportTemplateRef,
}) => {
    const {
        firstName,
        lastName,
    } = data;

    useEffect(() => {
        if (typeof window != "undefined") {
            let letter_current_page_number = 1;

            function rebuildingPages2() {
                $('.cv-body-visible').remove();

                let cv_letter_heading = $('#cv-body-2 .cv-body-area.area-2 .column-left .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .cv-body-area.area-2 .column-left .cv-letter-text').clone();

                getCvLetterContainer().append(cv_letter_heading);

                let original_cv_letter_text = $('#cv-body-2 .cv-body-area.area-2 .column-left .cv-letter-text');
                getCvLetterContainer().append(cv_letter_text);

                let text1 = getCvLetterContainer().find('.cv-letter-text');

                if (getPageContainer2().height() >= (getPageContainer2().parent().height())) {
                    do {
                        text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
                        text1.html(text1.html().substring(0, text1.html().lastIndexOf("<")));
                    }
                    while (getPageContainer2().height() >= (getPageContainer2().parent().height()));
                    console.log(text1.html().length);
                    letter_current_page_number++;
                    getCvLetterContainer().append(original_cv_letter_text.clone());
                    let text2 = getCvLetterContainer().find('.cv-letter-text');
                    text2.html(original_cv_letter_text.html().substring(text1.html().length - 4, original_cv_letter_text.html().length));
                }
            }

            function getCvLetterContainer() {
                return getPageContainer2().find('.cv-body-area.area-2 .column-left');
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

                page_element_container.find('.cv-body-area.area-2 .column-left').children().remove();

                $('#cv-chapter-section-resume').append(page_element);

                return page_element_container;
            }

            rebuildingPages2();
        }
    }, [data, stateClasses]);

    return (
        <div className="sv_002 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume">
                    <div className="cv-body-content font-size-1 main-color-1-text additional-color-2-border">
                        {
                            (!!firstName || !!lastName) && (
                                <div className="cv-body-area area-1">
                                    <div className="column-left">
                                        <h1 className="cv-heading additional-color-1-text cv-name font-size-4">
                                            {!!firstName && (firstName)}{` `}
                                            {!!lastName && (lastName)}
                                        </h1>
                                    </div>
                                </div>
                            )
                        }
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                {/* <h2 className="cv-heading cv-letter-heading heading-type-6 font-size-2 line-height-4 main-color-1-text letter-heading">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2> */}
                                <div id="cv-letter-text" className="cv-text  cv-letter-text letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                            </div>
                            <div className="separator additional-color-2-border"></div>
                            <div className="column-right">
                                <div className="cv-destination">
                                    <div className="cv-destination-block block-block">
                                        <div className="destination-details">
                                            <h3 className="cv-heading font-size-2 additional-color-1-text">TO
                                                <span className="line-after-block-heading additional-color-1-border"></span>
                                            </h3>
                                            <p className="cv-sender" dangerouslySetInnerHTML={{ __html: data.to }}></p>

                                            <h3 className="cv-heading ont-size-2 additional-color-1-text">
                                                FROM
                                                <span className="line-after-block-heading additional-color-1-border"></span>
                                            </h3>
                                            <p className="cv-destination" dangerouslySetInnerHTML={{ __html: data.from }}></p>
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