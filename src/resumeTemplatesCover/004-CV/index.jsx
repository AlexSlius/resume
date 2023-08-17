import React, { useEffect } from "react";

const drawing = () => {
  if (typeof window != "undefined") {
    let letter_current_page_number = 1;

    function rebuildingPages2() {
      $('.cv-body-visible').remove();

      let cv_letter_text = $('#cv-body-2 .columns-wrapper .column-1 .letter-block .cv-letter-text').clone();

      let original_cv_letter_text = $('#cv-body-2 .columns-wrapper .column-1 .letter-block .cv-letter-text');
      getCvLetterContainer().append(cv_letter_text);

      let text1 = getCvLetterContainer().find('.cv-letter-text');

      if (getPageContainer2().height() > getPageContainer2().parent().height()) {
        do {
          text1.html(text1.html().substring(0, text1.html().lastIndexOf(" ")));
          text1.html(text1.html().substring(0, text1.html().lastIndexOf("<")));
        }
        while (getPageContainer2().height() > (getPageContainer2().parent().height()));

        letter_current_page_number++;
        getCvLetterContainer().append(original_cv_letter_text.clone());
        let text2 = getCvLetterContainer().find('.cv-letter-text');
        text2.html(original_cv_letter_text.html().substring(text1.html().length -4, original_cv_letter_text.html().length));
        document.querySelectorAll("p")
        .forEach(el => el.textContent.trim() === "" && el.parentNode.removeChild(el));
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
}

export const CoverCv004 = ({
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
    <div className="sv_004 template-wrapper" ref={reportTemplateRef}>
      <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section`} data-chapter="resume">
        <div id="cv-body-2" className="cv-body cv-body-2" data-chapter="resume" data-page="1">
          <div className="cv-body-content font-size-1 main-color-1-text">
            {
              (firstName || lastName) && (
                <div className="name-block">
                  <div className="cv-name additional-color-1-text font-size-4">{firstName}{` `} {lastName}</div>
                </div>
              )
            }
            <div className="columns-wrapper">
              <div className="column-1">
                <div className="letter-block">
                  <div className="cv-letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                </div>
              </div>
              <div className="column-2">
                <div className="cv-destination">
                  <div className="cv-destination-block block-block">
                    <div className="destination-details">
                      <div className="block-title additional-color-1-text font-size-3">TO</div>
                      <div className="cv-sender additional-color-1-border" dangerouslySetInnerHTML={{ __html: data.to }}></div>

                      <div className="block-title additional-color-1-text font-size-3">FROM</div>
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