import React, { useEffect } from "react";

const drawing = () => {
  if (typeof window != "undefined") {
    let letter_current_page_number = 1;

    function rebuildingPages2() {
      $('.cv-body-visible').remove();

      let cv_letter_heading = $('#cv-body-2 .cv-body-area.area-2 .column-left .letter-block .cv-letter-heading').clone();
      let cv_letter_text = $('#cv-body-2 .cv-body-area.area-2 .column-left .letter-block .cv-letter-text').clone();

      getCvLetterContainer().append(cv_letter_heading);

      let original_cv_letter_text = $('#cv-body-2 .cv-body-area.area-2 .column-left .letter-block .cv-letter-text');
      getCvLetterContainer().append(cv_letter_text);

      let text1 = getCvLetterContainer().find('.cv-letter-text');

      if (Math.round(getPageContainer2().height()) > Math.round(getPageContainer2().parent().height())) {
        do {
          text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
          text1.html(text1.html().substring(0, text1.html().lastIndexOf("<")));
        }
        while (getPageContainer2().height() > (getPageContainer2().parent().height()));

        letter_current_page_number++;
        getCvLetterContainer().append(original_cv_letter_text.clone());
        let text2 = getCvLetterContainer().find('.cv-letter-text');
        text2.html(original_cv_letter_text.html().substring(text1.html().length - 4, original_cv_letter_text.html().length));
      }
    }

    function getCvLetterContainer() {
      return getPageContainer2().find('.cv-body-area.area-2 .column-left .letter-block');
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

      page_element_container.find('.cv-body-area.area-2 .column-left .letter-block').children().remove();

      $('#cv-chapter-section-resume').append(page_element);

      return page_element_container;
    }

    rebuildingPages2();
  }
}

export const CoverCv003 = ({
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
    if (!!isDrawing) {
      drawing();
      handleFalseDrafind();
    }
  }, [isDrawing, data, stateClasses]);

  return (
    <div className="sv_003 template-wrapper" ref={reportTemplateRef}>
      <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section`} data-chapter="resume">
        <div id="cv-body-2" className="cv-body cv-body-2" data-chapter="resume" data-page="1">
          <div className="cv-body-content main-color-1-text font-size-1">
            {
              (firstName || lastName) && (
                <div className="cv-body-area area-1 additional-color-2-background">
                  <div className="cv-name font-size-4">
                    {firstName && (<span className="name-line-1">{firstName}</span>)} {` `}
                    {lastName && (<span className="name-line-2">{lastName}</span>)}
                  </div>
                </div>
              )
            }
            <div className="cv-body-area area-2">
              <div className="column-left">
                <div className="letter-block">
                  <div className="cv-text cv-letter-text letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                </div>
              </div>
              <div className="column-right">
                <div className="cv-destination">
                  <div className="cv-destination-block block-block">
                    <div className="destination-details">
                      <div className="cv-heading font-size-2">TO
                        <span className="line-after-block-heading additional-color-1-border"></span>
                      </div>
                      <div className="cv-sender" dangerouslySetInnerHTML={{ __html: data.to }}></div>

                      <div className="cv-heading font-size-2">FROM
                        <span className="line-after-block-heading additional-color-1-border"></span>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: data.from }}></div>
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