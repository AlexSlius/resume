import React, { useEffect } from "react";

const drawing = () => {
    if (typeof window != "undefined") {
        // Reccomendation letter
        let letter_current_page_number = 1;

        $('.cv-body-visible').remove();

        function rebuildingPages2() {
            let cv_letter_heading = $('#cv-body-2 .column-left .letter-block .cv-letter-heading').clone();
            let cv_letter_text = $('#cv-body-2 .column-left .letter-block .cv-letter-text').clone();

            getCvLetterContainer().append(cv_letter_heading);

            let original_cv_letter_text = $('#cv-body-2 .column-left .letter-block .cv-letter-text');
            getCvLetterContainer().append(cv_letter_text);

            let text1 = getCvLetterContainer().find('.cv-letter-text');

            if (getPageContainer2().outerHeight() > (getPageContainer2().parent().outerHeight())) {
                do {
                    text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
                    text1.html(text1.html().substring(0, text1.html().lastIndexOf("<")));
                }
                while (getPageContainer2().outerHeight() > (getPageContainer2().parent().outerHeight()));

                letter_current_page_number++;
                getCvLetterContainer().append(original_cv_letter_text.clone());
                let text2 = getCvLetterContainer().find('.cv-letter-text');
                text2.html(original_cv_letter_text.html().substring(text1.html().length - 4, original_cv_letter_text.html().length));
            }
        }

        function getCvLetterContainer() {
            return getPageContainer2().find('.column-left .letter-block');
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

            page_element_container.find('.column-left .letter-block .cv-letter-heading').remove();
            page_element_container.find('.column-left .letter-block .cv-letter-text').remove();

            $('#cv-chapter-section-resume').append(page_element);

            return page_element_container;
        }

        rebuildingPages2();
    }
}

export const CoverCv011 = ({
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
        if (isTemplate) {
            drawing();
        }

        if (!!isDrawing && !isTemplate) {
            drawing();
            handleFalseDrafind();
        }
    }, [isDrawing, data, stateClasses]);

    return (
        <div className="sv_011 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2">
                    <div className="cv-body-content font-size-2 main-color-1-text">
                        <div className="column-left">
                            <div className="personal-data-block">
                                <h1 className="cv-name font-size-6 additional-color-2-text">{firstName}{` `} {lastName}</h1>
                            </div>
                            <div className="letter-block">
                                {/* <h2 className="block-heading letter-heading cv-letter-heading font-size-4 line-height-4 font-weight-400 additional-color-3-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2> */}
                                <div className="letter-text cv-letter-text additional-color-1-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                            </div>
                        </div>
                        <div className="column-right">
                            <div className="destination-block">
                                <div className="left-block additional-color-2-background"></div>
                                <div className="right-block">
                                    <div className="destination-contacts-block">
                                        {<>
                                            <div className="block-item">
                                                <div className="left-side"></div>
                                                <div className="right-side">
                                                    <h3 className="block-heading font-size-4 additional-color-3-text">To</h3>
                                                </div>
                                            </div>
                                            <div className="block-item">
                                                <div className="left-side">
                                                    <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.87061 5.11842C2.87061 3.11967 4.50102 1.48926 6.49977 1.48926C8.49852 1.48926 10.1289 3.11967 10.1289 5.11842C10.1289 7.59926 6.88435 11.2501 6.74352 11.4018C6.61352 11.548 6.38602 11.548 6.25602 11.4018C6.12061 11.2501 2.87061 7.59926 2.87061 5.11842ZM7.77457 4.91371C7.88603 5.61391 7.40875 6.27189 6.70855 6.38335C6.00835 6.4948 5.35037 6.01752 5.23891 5.31732C5.12746 4.61711 5.60473 3.95914 6.30494 3.84768C7.00514 3.73623 7.66312 4.2135 7.77457 4.91371Z" fill="white" />
                                                    </svg>
                                                </div>
                                                <div className="right-side">
                                                    <p dangerouslySetInnerHTML={{ __html: data.to }}></p>
                                                </div>
                                            </div>
                                        </>
                                        }
                                        {
                                            (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                <>
                                                    <div className="block-item block-from">
                                                        <div className="left-side"></div>
                                                        <div className="right-side">
                                                            <h3 className="block-heading font-size-4 additional-color-3-text">From</h3>
                                                            {
                                                                !!state && (
                                                                    <p className="additional-color-1-text">{state}</p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="block-item">
                                                        <div className="left-side">
                                                            <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.87061 5.11842C2.87061 3.11967 4.50102 1.48926 6.49977 1.48926C8.49852 1.48926 10.1289 3.11967 10.1289 5.11842C10.1289 7.59926 6.88435 11.2501 6.74352 11.4018C6.61352 11.548 6.38602 11.548 6.25602 11.4018C6.12061 11.2501 2.87061 7.59926 2.87061 5.11842ZM7.77457 4.91371C7.88603 5.61391 7.40875 6.27189 6.70855 6.38335C6.00835 6.4948 5.35037 6.01752 5.23891 5.31732C5.12746 4.61711 5.60473 3.95914 6.30494 3.84768C7.00514 3.73623 7.66312 4.2135 7.77457 4.91371Z" fill="white" />
                                                            </svg>
                                                        </div>
                                                        <div className="right-side">
                                                            <p className="additional-color-1-text">
                                                                {`${!!city ? (`${city}, `) : ""} ${!!zipCode ? (`${zipCode}, `) : ""} ${!!country ? (`${country}`) : ""}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {
                                                        !!phone && (
                                                            <div className="block-item">
                                                                <div className="left-side">
                                                                    <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6.25081 6.74873C8.35247 8.8504 8.83456 6.41832 10.1725 7.75623C11.4616 9.0454 12.2037 9.3054 10.5679 10.9412C10.3621 11.1037 9.06206 13.0862 4.48498 8.51457C-0.0921061 3.93748 1.89039 2.63748 2.05289 2.43165C3.69414 0.790401 3.94873 1.5379 5.23789 2.82707C6.58123 4.16498 4.14914 4.64707 6.25081 6.74873Z" fill="white" />
                                                                    </svg>
                                                                </div>
                                                                <div className="right-side">
                                                                    <p className="additional-color-1-text">{phone}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        !!email && (
                                                            <div className="block-item">
                                                                <div className="left-side">
                                                                    <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.53242 3.67619C1.50446 3.78221 1.48958 3.89344 1.48958 4.00801V8.99134C1.48958 9.71176 2.07458 10.2913 2.78958 10.2913H10.2104C10.9308 10.2913 11.5104 9.71176 11.5104 8.99134V4.00801C11.5104 3.89151 11.4951 3.7787 11.4664 3.67143L7.76132 7.34958L7.76025 7.35065C7.04836 8.06143 5.94851 8.05619 5.23618 7.35299L5.23468 7.35151L1.53242 3.67619ZM10.3044 2.71137C10.2734 2.70914 10.242 2.70801 10.2104 2.70801H2.78958C2.75607 2.70801 2.72287 2.70927 2.69002 2.71176L6.28997 6.28551L6.29052 6.28605C6.42271 6.41611 6.57851 6.41107 6.70066 6.28892L6.7026 6.28698L6.7026 6.28699L10.3044 2.71137Z" fill="white" />
                                                                    </svg>
                                                                </div>
                                                                <div className="right-side">
                                                                    <p className="additional-color-1-text">{email}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

