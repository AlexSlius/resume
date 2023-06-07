import React, { useEffect } from "react";

export const CoverCv006 = ({
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
                let cv_letter_heading = $('#cv-body-2 .cv-body-area.middle-area .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .cv-body-area.middle-area .cv-letter-text').clone();

                getCvLetterContainer().append(cv_letter_heading);

                let original_cv_letter_text = $('#cv-body-2 .cv-body-area.middle-area .cv-letter-text');
                getCvLetterContainer().append(cv_letter_text);

                let text1 = getCvLetterContainer().find('.cv-letter-text');

                if (getPageContainer2().height() > getPageContainer2().parent().height()) {
                    do {
                        text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
                    }
                    while (getPageContainer2().height() > getPageContainer2().parent().height());

                    letter_current_page_number++;
                    getCvLetterContainer().append(original_cv_letter_text.clone());
                    let text2 = getCvLetterContainer().find('.cv-letter-text');
                    text2.html(text2.html().substring(text1.html().length));
                }
            }

            function getCvLetterContainer() {
                return getPageContainer2().find('.cv-body-area.middle-area');
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

                page_element_container.find('.cv-body-area.middle-area').children().remove();

                $('#cv-chapter-section-resume').append(page_element);

                return page_element_container;
            }

            rebuildingPages2();
        }
    }, [data, stateClasses]);

    return (
        <div className="sv_006 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" className="cv-body cv-body-2">
                    <div className="cv-body-content">
                        <div className="cv-body-area top-area">
                            <div className="profile-information additional-color-1-border">
                                <h1 className="cv-name font-weight-700 font-size-3 line-height-4">
                                    {firstName}{` `} {lastName}
                                </h1>
                            </div>
                        </div>
                        <div className="cv-body-area middle-area">
                            <h2 className="cv-heading cv-letter-heading main-color-1-text font-size-2 line-height-3">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                                    <div className="cv-text cv-letter-text main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                        </div>
                        <div className="cv-body-area bottom-area additional-color-1-background">
                            <div className="cv-destination">
                                <div className="cv-destination-block">
                                    <div className="destination-details">
                                        {
                                            (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                <div className="to-block block-block">
                                                    <p className="cv-heading main-color-2-text font-weight-700 font-size-2 line-height-2">TO</p>
                                                    <span className="horizontal-line main-color-2-border"></span>
                                                    <p className="cv-sender main-color-2-text font-size-1 line-height-1"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                        {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}</p>
                                                    <p className="cv-sender main-color-2-text font-size-1 line-height-1">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                                </div>
                                            )
                                        }

                                        {
                                            (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                <div className="from-block block-block">
                                                    <p className="cv-heading main-color-2-text font-weight-700 font-size-2 line-height-2">FROM</p>
                                                    <span className="horizontal-line main-color-2-border"></span>
                                                    <div className="cv-destination">
                                                        {!!state && (<p className="main-color-2-text font-size-1 line-height-1">{state}<br /></p>)}
                                                        {!!city && (<p className="main-color-2-text font-size-1 line-height-1">{city}<br /></p>)}
                                                        {!!zipCode && (<p className="main-color-2-text font-size-1 line-height-1">{zipCode}<br /></p>)}
                                                        {!!country && (<p className="main-color-2-text font-size-1 line-height-1">{country}<br /></p>)}
                                                        {!!phone && (<p className="main-color-2-text font-size-1 line-height-1">{phone}<br /></p>)}
                                                        {!!email && (<p className="main-color-2-text font-size-1 line-height-1">{email}</p>)}
                                                    </div>
                                                </div>
                                            )
                                        }
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