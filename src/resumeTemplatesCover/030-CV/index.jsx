import React, { useEffect } from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv030 = ({
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
        <div className="sv_030 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section font-size-scheme-state-small line-height-scheme-state-small color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2 main-color-2-background">
                    <div className="ellipse-line"></div>
                    <div className="cv-body-content">
                        <div className="top-area">
                            <h1 className="cv-name font-size-5 line-height-9">{firstName}{` `} {lastName}</h1>
                        </div>
                        <div className="middle-area">
                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clip-rule="evenodd" d="M5.00004 0.484375C5.00004 3.26358 7.02129 5.28483 9.8005 5.28483C7.02129 5.28483 5.00004 7.30608 5.00004 10.0853C5.00004 7.30608 2.97887 5.28483 0.199585 5.28483C2.97879 5.28483 5.00004 3.26358 5.00004 0.484375Z" fill="black" />
                            </svg>
                            <div className="letter-block">
                                <h3 className="letter-heading font-size-4 cv-letter-heading line-height-8">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <div className="letter-text cv-letter-text font-size-1 line-height-3" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="bottom-area">
                            <div className="addresses-block">
                                {
                                    (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                        <div className="block-to">
                                            <h3 className="block-heading font-size-3 line-height-7">To</h3>
                                            <p className="font-size-1 line-height-1">{`${applyingCompanyName} ${applyingCompanyJobTitle}`}</p>
                                            <p className="font-size-1 line-height-1">{`${applyingCompanyTitle} ${applyingCompanyContact}`}</p>
                                        </div>
                                    )
                                }
                                {
                                    (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                        <div className="block-from">
                                            <h3 className="block-heading font-size-3 line-height-7">From</h3>
                                            {
                                                !!state && (
                                                    <p className="font-size-1 line-height-1">{state}</p>
                                                )
                                            }
                                            {!!phone && (<p className="font-size-1 line-height-1">{phone}</p>)}
                                            {!!email && (<p className="font-size-1 line-height-1">{email}</p>)}
                                            <p className="font-size-1 line-height-1">
                                                {`${!!city && (`${city}, `)} ${!!zipCode && (`${zipCode}, `)} ${!!country && (`${country}`)}`}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

