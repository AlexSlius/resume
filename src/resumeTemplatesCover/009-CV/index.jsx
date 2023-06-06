import React, { useEffect } from "react";

import Icon from "../../components/Icon";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

import imgBg from "/public/styles/resumes/009/image/bgBot.svg?sprite";

export const CoverCv009 = ({
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
                let cv_letter_heading = $('#cv-body-2 .column-right .letter-body .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .column-right .letter-body .cv-letter-text').clone();

                getCvLetterContainer().append(cv_letter_heading);

                let original_cv_letter_text = $('#cv-body-2 .column-right .letter-body .cv-letter-text');
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
                return getPageContainer2().find('.column-right .letter-body');
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

                page_element_container.find('.column-right .letter-body .cv-letter-heading').remove();
                page_element_container.find('.column-right .letter-body .cv-letter-text').remove();

                $('#cv-chapter-section-resume').append(page_element);

                return page_element_container;
            }

            rebuildingPages2();
        }
    }, [data, stateClasses]);

    return (
        <div className="sv_009 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body_height cv-body-2 cv-body---resume page-2 font-size-scheme-1 line-height-scheme-1">
                    <div className="cv-body-content">
                        <div className="cv-body-area top-area">
                            <div className="background-image">
                                <img src="/styles/resumes/009/image/top_area_bg.png" />
                            </div>
                            <div className="column-left">
                            </div>
                            <div className="column-right">
                                <h1 className="cv-name main-color-2-text font-weight-400 font-size-8 line-height-9-1">{firstName}{` `} {lastName}</h1>
                                <div className="white-line main-color-2-border"></div>
                            </div>
                        </div>
                        <div className="cv-body-area middle-area main-color-3-background">
                            <div className="column-right">
                                <div className="letter-body">
                                    <h3 className="letter-heading cv-letter-heading font-weight-500 font-size-3 line-height-5-1">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                    {/* {
                                        !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && ( */}
                                            <div className="letter-text cv-letter-text font-weight-400 font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                                        {/* )
                                    } */}
                                </div>
                            </div>
                        </div>
                        <div class="cv-body-area bottom-gap-area main-color-3-background"></div>
                        <div className="cv-body-area bottom-area">
                            <div className="bg-image-container">
                                <Icon svg={imgBg} classNames={["additional-color-2-svg-path"]} />
                            </div>
                            <div className="column-right">
                                <div className="delivery-block">
                                    {
                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                            <div className="block-to">
                                                <h3 className="heading-type-1 font-weight-500 font-size-5 line-height-7 main-color-2-text">To</h3>
                                                <p className="font-weight-500 font-size-1 line-height-1 main-color-2-text"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                    {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}</>)} </p>
                                                <p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                            <div className="block-from">
                                                <h3 className="heading-type-1 font-weight-500 font-size-5 line-height-7 main-color-2-text">From</h3>
                                                {!!state && (<p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{state}<br /></p>)}
                                                {!!city && (<p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{`${!!city && (`${city}, `)} ${!!zipCode && (`${zipCode}, `)} ${!!country && (`${country}`)}`}<br /></p>)}
                                                {!!phone && (<p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{phone}<br /></p>)}
                                                {!!email && (<p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{email}</p>)}
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
    )
}