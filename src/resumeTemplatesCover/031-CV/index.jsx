import React, { useEffect } from "react";

export const CoverCv031 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    const {
        firstName,
        lastName,
    } = data;

    useEffect(() => {
        if (typeof window != "undefined") {
            // Reccomendation letter
            let letter_current_page_number = 1;

            $('.cv-body-visible').remove();

            function rebuildingPages2() {
                let cv_letter_heading = $('#cv-body-2 .middle-area .letter-block .right-side .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .middle-area .letter-block .right-side .cv-letter-text').clone();

                getCvLetterContainer().append(cv_letter_heading);

                let original_cv_letter_text = $('#cv-body-2 .middle-area .letter-block .right-side .cv-letter-text');
                getCvLetterContainer().append(cv_letter_text);

                let text1 = getCvLetterContainer().find('.cv-letter-text');

                if (getPageContainer2().height() > (getPageContainer2().parent().height() - 40)) {
                    do {
                        text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
                    }
                    while (getPageContainer2().height() > (getPageContainer2().parent().height() - 40));

                    letter_current_page_number++;
                    getCvLetterContainer().append(original_cv_letter_text.clone());
                    let text2 = getCvLetterContainer().find('.cv-letter-text');
                    text2.html(text2.html().substring(text1.html().length));
                }
            }

            function getCvLetterContainer() {
                return getPageContainer2().find('.middle-area .letter-block .right-side');
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

                page_element_container.find('.middle-area .letter-block .right-side .cv-letter-heading').remove();
                page_element_container.find('.middle-area .letter-block .right-side .cv-letter-text').remove();

                $('#cv-chapter-section-resume').append(page_element);

                return page_element_container;
            }

            rebuildingPages2();
        }
    }, [data, stateClasses]);

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
                                    {/* <h3 className="letter-heading font-size-3 cv-letter-heading line-height-6 font-weight-400 additional-color-1-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3> */}
                                    <div className="letter-text cv-letter-text font-size-1 line-height-2 font-weight-400 main-color-3-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                                </div>

                            </div>
                        </div>
                        <div className="bottom-area">
                            <div className="addresses-block">
                                <div className="to-block">
                                    <h3 className="block-heading font-size-2 line-height-3 font-weight-400 additional-color-1-text">To</h3>
                                    <p className="font-size-1 line-height-1 font-weight-400 main-color-3-text" dangerouslySetInnerHTML={{ __html: data.to }}></p>
                                </div>
                                <div className="from-block">
                                    <h3 className="block-heading font-size-2 line-height-3 font-weight-400 additional-color-1-text">From</h3>
                                    <p className="font-size-1 line-height-1 font-weight-400 main-color-3-text" dangerouslySetInnerHTML={{ __html: data.from }}></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

