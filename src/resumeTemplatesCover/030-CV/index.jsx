import React, { useEffect } from "react";

const drawing = () => {
  if (typeof window != "undefined") {
    // Reccomendation letter
    let letter_current_page_number = 1;

    function rebuildingPages2() {
      $('.cv-body-visible').remove();

      let cv_letter_text = $('#cv-body-2 .middle-area .letter-block .cv-letter-text').clone();

      let original_cv_letter_text = $('#cv-body-2 .middle-area .letter-block .cv-letter-text');
      getCvLetterContainer().append(cv_letter_text);

      let text1 = getCvLetterContainer().find('.cv-letter-text');

      if (getPageContainer2().outerHeight() + 28 > (getPageContainer2().parent().outerHeight())) {
        do {
          text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
          text1.html(text1.html().substring(0, text1.html().lastIndexOf("<")));
        }
        while (getPageContainer2().outerHeight() + 28 > (getPageContainer2().parent().outerHeight()));

        letter_current_page_number++;
        getCvLetterContainer().append(original_cv_letter_text.clone());
        let text2 = getCvLetterContainer().find('.cv-letter-text');
        text2.html(original_cv_letter_text.html().substring(text1.html().length - 4, original_cv_letter_text.html().length));
        document.querySelectorAll("p")
          .forEach(el => el.textContent.trim() === "" && el.parentNode.removeChild(el));
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
}

export const CoverCv030 = ({
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
    <div className="sv_030 template-wrapper" ref={reportTemplateRef}>
      <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section font-size-scheme-state-small line-height-scheme-state-small color-scheme-state-color-set-1`} data-chapter="resume">
        <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2">
          <div className="cv-body-content font-size-1 main-color-4-text">
            {
              (firstName || lastName) && (
                <div className="top-area">
                  <div className="ellipse-line"></div>
                  <div className="cv-name font-size-5 additional-color-1-text">
                    <span>{firstName && firstName} {` `} {lastName && lastName}</span>
                  </div>
                </div>
              )
            }
            <div className="middle-area">
              <svg className="additional-color-1-svg" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.00004 0.484375C5.00004 3.26358 7.02129 5.28483 9.8005 5.28483C7.02129 5.28483 5.00004 7.30608 5.00004 10.0853C5.00004 7.30608 2.97887 5.28483 0.199585 5.28483C2.97879 5.28483 5.00004 3.26358 5.00004 0.484375Z" fill="black" />
              </svg>
              <div className="letter-block">
                <div className="letter-text cv-letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
              </div>
            </div>
            <div className="bottom-area">
              <div className="addresses-block block-block">
                <div className="block-to">
                  <div className="cv-heading font-size-3 additional-color-1-text">To</div>
                  <div dangerouslySetInnerHTML={{ __html: data.to }}></div>
                </div>
                <div className="block-from">
                  <div className="cv-heading font-size-3 additional-color-1-text">From</div>
                  <div dangerouslySetInnerHTML={{ __html: data.from }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

