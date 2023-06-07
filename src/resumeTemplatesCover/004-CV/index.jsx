import React, { useEffect } from "react";

export const CoverCv004 = ({
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
            let letter_current_page_number = 1;

            $('.cv-body-visible').remove();

            // Reccomendation letter
            function rebuildingPages2() {
                let cv_letter_heading = $('#cv-body-2 .columns-wrapper .column-1 .letter-block .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .columns-wrapper .column-1 .letter-block .cv-letter-text').clone();

                getCvLetterContainer().append(cv_letter_heading);

                let original_cv_letter_text = $('#cv-body-2 .columns-wrapper .column-1 .cv-letter-text');
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
                return getPageContainer2().find('.columns-wrapper .column-1 .letter-block');
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

                page_element_container.find('.columns-wrapper .column-1 .letter-block').children().remove();

                $('#cv-chapter-section-resume').append(page_element);

                return page_element_container;
            }

            rebuildingPages2();
        }
    }, [data, stateClasses]);

    return (
        <div className="sv_004 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className={`cv-body cv-body-2 cv-body---resume`}>
                    <div className="cv-body-content">
                        <div className="name-block toggle-photo-state toggle-photo-state-active">
                            <h1 className="additional-color-1-text font-size-4 line-height-4 font-family-arsenal">{firstName}{` `} {lastName}</h1>
                        </div>
                        <div className="columns-wrapper">
                            <div className="column-1">
                                <div className="letter-block">
                                    <h3 className="first-line cv-letter-heading additional-color-1-text font-size-3 line-height-3">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                    <div className="cv-letter-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                                </div>
                            </div>
                            {
                                (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact || !!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                    <div className="column-2">
                                        {
                                            (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                <div className="to-block">
                                                    <h3 className="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">TO</h3>
                                                    <div className="to-block">
                                                        <h3 className="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">TO</h3>
                                                        <p className="font-size-1 line-height-1"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                            {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}</p>
                                                        <p className="font-size-1 line-height-1">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {
                                            (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                <div className="from-block block-block">
                                                    <h3 className="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">FROM</h3>
                                                    <p className="font-size-1 line-height-1">
                                                        {!!state && (<>{state}<br /></>)}
                                                        {!!city && (<>{city}<br /></>)}
                                                        {!!zipCode && (<>{zipCode}<br /></>)}
                                                        {!!country && (<>{country}<br /></>)}
                                                        {!!phone && (<>{phone}<br /></>)}
                                                        {
                                                            !!email && (email)
                                                        }
                                                    </p>
                                                </div>
                                            )
                                        }

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}