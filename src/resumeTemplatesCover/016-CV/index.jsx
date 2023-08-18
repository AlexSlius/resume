import React, { useEffect } from "react";

const drawing = () => {
  if (typeof window != "undefined") {
    // Reccomendation letter
    let letter_current_page_number = 1;

    function rebuildingPages2() {
      $('.cv-body-visible').remove();

      let cv_letter_text = $('#cv-body-2 .column-right .cv-letter-text').clone();


      let original_cv_letter_text = $('#cv-body-2 .column-right .cv-letter-text');
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
        document.querySelectorAll("p")
          .forEach(el => el.textContent.trim() === "" && el.parentNode.removeChild(el));
      }
    }

    function getCvLetterContainer() {
      return getPageContainer2().find('.column-right .letter-block');
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

      page_element_container.find('.column-right .letter-block .cv-letter-heading').remove();
      page_element_container.find('.column-right .letter-block .cv-letter-text').remove();

      $('#cv-chapter-section-resume').append(page_element);

      return page_element_container;
    }

    rebuildingPages2();
  }
}

export const CoverCv016 = ({
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
    <div className="sv_016 template-wrapper" ref={reportTemplateRef}>
      <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
        <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2">
          <div className="cv-body-content font-size-1 main-color-2-text">
            <div className="circle-shade"></div>
            <div className="top-area">
              <h1 className="cv-name font-size-6">{firstName}{` `} {lastName}</h1>
            </div>
            <div className="middle-area">
              <div className="column-left">
                <div className="destination-block block-block">
                  <div className="block-to">
                    <div className="heading-wrapper">
                      <h3 className="cv-heading font-size-4">To</h3>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: data.to }}></p>
                  </div>
                  <div className="block-from">
                    <div className="heading-wrapper">
                      <h3 className="cv-heading font-size-4">From</h3>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: data.from }}></p>
                  </div>
                </div>
              </div>
              <div className="column-right">
                <div className="letter-block">
                  <div className="letter-text cv-letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

