import React, { useEffect } from "react";

const drawing = () => {
  if (typeof window != "undefined") {
    let letter_current_page_number = 1;

    function rebuildingPages2() {
      $('.cv-body-visible').remove();

      let cv_letter_text = $('#cv-body-2 .cv-body-area.middle-area .cv-letter-text').clone();

      let original_cv_letter_text = $('#cv-body-2 .cv-body-area.middle-area .cv-letter-text');
      getCvLetterContainer().append(cv_letter_text);

      let text1 = getCvLetterContainer().find('.cv-letter-text');

      if (getPageContainer2().height() > (getPageContainer2().parent().height())) {
        do {
          text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
          text1.html(text1.html().substring(0, text1.html().lastIndexOf("<")));
        }
        while (getPageContainer2().height() > (getPageContainer2().parent().height()));

        letter_current_page_number++;
        getCvLetterContainer().append(original_cv_letter_text.clone());
        let text2 = getCvLetterContainer().find('.cv-letter-text');
        text2.html(original_cv_letter_text.html().substring(text1.html().length - 4, original_cv_letter_text.html().length));
        document.querySelectorAll("p")
          .forEach(el => el.textContent.trim() === "" && el.parentNode.removeChild(el));
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
}

export const CoverCv006 = ({
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
    <div className="sv_006 template-wrapper" ref={reportTemplateRef}>
      <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section`} data-chapter="resume">
        <div id="cv-body-2" className="cv-body cv-body-2">
          <div className="cv-body-content main-color-1-text font-size-1">
            {
              (firstName || lastName) && (
                <div className="cv-body-area top-area">
                  <div className="profile-information additional-color-1-border">
                    <div className="cv-name font-size-3">{firstName && firstName} {` `} {lastName && lastName}</div>
                  </div>
                </div>
              )
            }
            <div className="cv-body-area middle-area">
              <div className="cv-text cv-letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
            </div>
            <div className="cv-body-area bottom-area">
              <div className="cv-destination additional-color-1-background">
                <div className="cv-destination-block block-block">
                  <div className="destination-details">
                    <div className="to-block">
                      <div className="cv-heading main-color-2-text font-size-2">TO</div>
                      <div className="cv-sender main-color-2-text" dangerouslySetInnerHTML={{ __html: data.to }}></div>
                    </div>
                    <div className="from-block">
                      <div className="cv-heading main-color-2-text font-size-2">FROM</div>
                      <div className="main-color-2-text" dangerouslySetInnerHTML={{ __html: data.from }}></div>
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