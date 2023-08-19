import React, { useEffect } from "react";

const drawing = () => {
  if (typeof window != "undefined") {
    // Reccomendation letter
    let letter_current_page_number = 1;

    function rebuildingPages2() {
      $('.cv-body-visible').remove();

      let cv_letter_text = $('#cv-body-2 .column-left .cv-letter-text').clone();

      let original_cv_letter_text = $('#cv-body-2 .column-left .cv-letter-text');
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
      return getPageContainer2().find('.column-left .letter-block .bg-block');
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

      page_element_container.find('.column-left .letter-block .cv-letter-text').remove();

      $('#cv-chapter-section-resume').append(page_element);

      return page_element_container;
    }

    rebuildingPages2();
  }
}

export const CoverCv017 = ({
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
    <div className="sv_017 template-wrapper" ref={reportTemplateRef}>
      <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section`} data-chapter="resume">
        <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2">
          <div className="cv-body-content font-size-1 main-color-1-text additional-color-1-background">
            <div className="top-area">
              <div className="name-and-photo-block block-block">
                <div className="name-and-prophecy-wrapper">
                  {
                    (firstName || lastName) && (
                      <div className="cv-name font-size-6">
                        <span>{firstName && firstName} {` `} {lastName && lastName}</span>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="profile-icon"></div>
            </div>
            <div className="middle-area">
              <div className="column-left">
                <div className="letter-block block-block m-left">
                  <div className="bg-block">
                    <div class="top-bg"></div>
                    <div class="right-bg"></div>
                    <div class="bottom-bg"></div>
                    <div className="letter-text cv-letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                  </div>
                </div>
              </div>
              <div className="column-right">
                <div className="destination-block">
                  <div className="block-to block-block m-right m-small">
                    <div className="cv-heading font-size-4">to</div>
                    <div className="bg-block">
                      <div class="top-bg"></div>
                      <div class="left-bg"></div>
                      <div class="bottom-bg"></div>
                      <div dangerouslySetInnerHTML={{ __html: data.to }}></div>
                    </div>
                  </div>
                  <div className="block-from block-block m-right m-small">
                    <div className="cv-heading font-size-4">from</div>
                    <div className="bg-block">
                      <div class="top-bg"></div>
                      <div class="left-bg"></div>
                      <div class="bottom-bg"></div>
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

