import React, { useEffect } from "react";

function magic(el) {
    let textClone = el.text();
    let widthContent = el.width();
    let heightContent = el.height();
    let createDiv = el.append('<span>');
    let content = textClone.split(' ');

    console.log("content: ", content);

    let arrT = [];

    console.log("createDiv: ", createDiv.width());

    // for (let i = 0; i < content.length; i++) {
    //     let word = content[i];

    //     if() {

    //     }
    // }


    // let tmp = document.createElement('p')
    // tmp = el.cloneNode(true)

    // tmp.innerHTML = 'foo'
    // document.body.appendChild(tmp)

    // let content = el.textContent.split(''),
    //     oneLineHeight = tmp.scrollHeight,
    //     lines = [],
    //     i = 0

    // while (i < content.length) {
    //     let line = tmp.innerHTML = ''

    //     while (i < content.length && tmp.scrollHeight <= oneLineHeight) {
    //         tmp.innerHTML = line += content[i++]
    //     }

    //     let lineEndIndex = i === content.length ? i : line.lastIndexOf(' ') + 1
    //     lines.push(content.splice(0, lineEndIndex).join(''))
    //     i = 0
    // }

    // tmp.remove()
    // el.innerHTML = lines.map(line => '<span>' + line + '</span>').join('')
}


export const CoverCv002 = ({
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

            function rebuildingPages2() {
                $('.cv-body.cv-body-visible').remove();

                letter_current_page_number = 1;
                let cv_letter_heading = $('#cv-body-2 .cv-body-area.area-2 .column-left .cv-letter-heading').clone();
                let cv_letter_text = $('#cv-body-2 .cv-body-area.area-2 .column-left .cv-letter-text').clone();

                // getCvLetterContainer().append(cv_letter_heading);

                // получает высоту блока текста
                let cv_letter_text_height = $('#cv-body-2 .cv-body-area.area-2 .column-left .cv-letter-text').height();
                // получает сам текст и разбивает по переносу строки "абзац"
                let cv_letter_text_lines = $('#cv-body-2 .cv-body-area.area-2 .column-left #cv-letter-text');

                magic(cv_letter_text_lines);

                // // делит высоту на количество строк
                // let cv_letter_line_height = cv_letter_text_height / cv_letter_text_lines.length;

                // let text_first_part_max_height = getCvLetterContainer().innerHeight() - getCvLetterContainer().find(cv_letter_heading).outerHeight(true);

                // let text_first_part_lines = 0;

                // for (let l = 1; l <= cv_letter_text_lines.length; l++) {
                //     if ((cv_letter_line_height * l) > (text_first_part_max_height - 40)) {
                //         text_first_part_lines = l - 1;
                //         break;
                //     } else {
                //         text_first_part_lines = l;
                //     }
                // }

                // let cv_letter_text_part_1 = "";
                // let cv_letter_text_part_2 = "";

                // for (let l = 0; l < cv_letter_text_lines.length; l++) {

                //     if (l <= text_first_part_lines) {
                //         cv_letter_text_part_1 += cv_letter_text_lines[l];
                //     } else {
                //         cv_letter_text_part_2 += cv_letter_text_lines[l];
                //     }
                // }

                // getCvLetterContainer().append($(cv_letter_text).clone().html(cv_letter_text_part_1));
                // if (cv_letter_text_part_2) {
                //     letter_current_page_number++;
                // }

                // getCvLetterContainer().append($(cv_letter_text).clone().html(cv_letter_text_part_2));
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
    }, []); //data, stateClasses

    return (
        <div className="sv_002 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume">
                    <div className="cv-body-content">
                        {
                            (!!firstName || !!lastName) && (
                                <div className="cv-body-area area-1">
                                    <div className="column-left">
                                        <h1 className="cv-heading additional-color-1-text cv-name font-weight-600 font-size-5 line-height-4">
                                            {!!firstName && (firstName)}{` `}
                                            {!!lastName && (lastName)}
                                        </h1>
                                    </div>
                                </div>
                            )
                        }
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                <h2 className="cv-heading cv-letter-heading heading-type-6 font-size-2 line-height-4 main-color-1-text letter-heading">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                                <div id="cv-letter-text" className="cv-text  cv-letter-text font-size-1 line-height-1 main-color-1-text letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                            </div>
                            <div className="separator"></div>
                            {
                                (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact || !!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                    <div className="column-right">
                                        <div className="cv-destination">
                                            <div className="cv-destination-block block-block additional-color-2-border">
                                                <div className="destination-details">
                                                    {
                                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                            <>
                                                                <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">TO
                                                                    <span className="line-after-block-heading additional-color-2-border"></span>
                                                                </h3>
                                                                <p className="cv-sender font-size-1 line-height-1 main-color-1-text">
                                                                    {!!applyingCompanyName && (<>{applyingCompanyName}<br /></>)}
                                                                    {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}
                                                                    {!!applyingCompanyTitle && (<> {`Dear ${applyingCompanyTitle}`}<br /></>)}
                                                                    {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}
                                                                </p>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                            <>
                                                                <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">
                                                                    FROM
                                                                    <span className="line-after-block-heading additional-color-2-border"></span>
                                                                </h3>
                                                                <p className="cv-destination font-size-1 line-height-1 main-color-1-text">
                                                                    {!!state && (<>{state}<br /></>)}
                                                                    {!!city && (<>{city}<br /></>)}
                                                                    {!!zipCode && (<>{zipCode}<br /></>)}
                                                                    {!!country && (<>{country}<br /></>)}
                                                                    {!!phone && (<>{phone}<br /></>)}
                                                                    {
                                                                        !!email && (email)
                                                                    }
                                                                </p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
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