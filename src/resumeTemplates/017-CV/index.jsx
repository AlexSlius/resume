import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { checkForSymbol } from "../../utils/checkForSymbol";
import { levelLanguage } from "../../helpers/levelLanguage";
import { socialHelper } from "../../utils/socialHelper";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let name_and_photo_block = $('#cv-body-hidden-container .cv-body-content .name-and-photo-block').clone();
      let profile_icon = $('#cv-body-hidden-container .cv-body-content .profile-icon').clone();
      let details_block = $('#cv-body-hidden-container .cv-body-content .details-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let hobbies_and_references = $('#cv-body-hidden-container .cv-body-content .hobbies-and-references-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_and_sertificates = $('#cv-body-hidden-container .cv-body-content .courses-and-sertificates-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();

      current_page_number = 1;

      getContentContainer1().append(name_and_photo_block);
      if (checkHeight()) {
        name_and_photo_block.remove();
        current_page_number++;
        getContentContainer1().append(name_and_photo_block);
      }

      getContentContainer1().append(profile_icon);
      if (checkHeight()) {
        profile_icon.remove();
        current_page_number++;
        getContentContainer1().append(profile_icon);
      }

      current_page_number = 1;

      getContentContainer2().append(employment_history_block);
      if (checkHeight()) {
        employment_history_block.remove();
        current_page_number++;
        getContentContainer2().append(employment_history_block);
      }

      getContentContainer2().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        current_page_number++;
        getContentContainer2().append(internships_block);
      }

      getContentContainer2().append(skills_block);
      if (checkHeight()) {
        skills_block.remove();
        current_page_number++;
        getContentContainer2().append(skills_block);
      }

      getContentContainer2().append(details_block);
      if (checkHeight()) {
        details_block.remove();
        current_page_number++;
        getContentContainer2().append(details_block);
      }

      current_page_number = 1;

      getContentContainer3().append(profile_block);
      if (checkHeight()) {
        profile_block.remove();
        current_page_number++;
        getContentContainer3().append(profile_block);
      }

      getContentContainer3().append(education_block);
      if (checkHeight()) {
        education_block.remove();
        current_page_number++;
        getContentContainer3().append(education_block);
      }

      getContentContainer3().append(courses_and_sertificates);
      if (checkHeight()) {
        courses_and_sertificates.remove();
        current_page_number++;
        getContentContainer3().append(courses_and_sertificates);
      }

      getContentContainer3().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getContentContainer3().append(extra_curricular_activities_block);
      }

      getContentContainer3().append(languages_block);
      if (checkHeight()) {
        languages_block.remove();
        current_page_number++;
        getContentContainer3().append(languages_block);
      }

      getContentContainer3().append(hobbies_and_references);
      if (checkHeight()) {
        hobbies_and_references.remove();
        current_page_number++;
        getContentContainer3().append(hobbies_and_references);
      }
    }

    function checkHeight() {
      return getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
    }

    function getContentContainer1() {
      return getPageContainer().find('.top-area');
    }

    function getContentContainer2() {
      return getPageContainer().find('.middle-area .column-left');
    }

    function getContentContainer3() {
      return getPageContainer().find('.middle-area .column-right');
    }

    function getPageContainer() {
      let page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
      if (page.length > 0) {
        return page.find('.cv-body-content');
      } else {
        return createNewPage(current_page_number);
      }
    }

    function createNewPage(page_number) {
      let page_element = $('#cv-body-hidden-container').clone();
      page_element.attr('id', '');
      page_element.attr('class', 'cv-body cv-body-visible cv-body-1 page-' + current_page_number);
      page_element.children().remove();

      let page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();

      page_element_container.find('.top-area').children().remove();
      page_element_container.find('.middle-area .column-left').children().remove();
      page_element_container.find('.middle-area .column-right').children().remove();
      page_element.append(page_element_container);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }

    rebuildingPages();
  }
}

export const ResumeCv017 = ({
  data,
  dataNew,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  stateClasses,
  reportTemplateRef,
  beforeСontent,
  objActiveBlock,
  isPdf = false,
  setPagePagCurrent = () => { },
  setPages = false
}) => {
  const {
    contact,
    social_links,
    employment,
    extra_curricular,
    internship,
    reference,
    education,
    career_objective,
    courses,
    certificates,
    hobbies,
    skills,
    languages,
  } = dataNew;
  const isContactArray = isArray(contact);
  let conta = contact[0];
  let classPhoto = (isArray(contact) && conta?.picture) ? "has-photo" : "";

  useEffect(() => {
    if (isPdf) return;

    if (!!isDrawing) {
      drawing();
      handleFalseDrafind();
    }
  }, [isDrawing, stateClasses]);

  if (objActiveBlock) {
    if (typeof window != 'undefined')
      hideEmpty();
  }
  function hideEmpty() {
    employment.forEach(function (el, i) {
      if (i < (employment.length - 1)) {
        $('.employment-history-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.employment === false && (el.assignment !== "" || el.city !== "" || el.company !== "" || el.country !== "" || el.title !== "" || el.periodFrom !== null || el.periodTo !== null)) {
        $('.employment-history-block').find('.empty-field').hide();
      }
      if (objActiveBlock.employment && employment.length === 1) {
        $('.employment-history-block').find('.empty-field').show();
      }
      if (objActiveBlock.employment) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    education.forEach(function (el, i) {
      if (i < (education.length - 1)) {
        $('.education-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.education === false && (el.awards !== "" || el.study !== "" || el.facility !== "" || el.description !== "" || el.degree !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.education-block').find('.empty-field').hide();
      }
      if (objActiveBlock.education && education.length === 1) {
        $('.education-block').find('.empty-field').show();
      }
      if (objActiveBlock.education) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    courses.forEach(function (el, i) {
      if (i < (courses.length - 1)) {
        $('.courses-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.courses === false && (el.title !== "" || el.institution !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.courses-block').find('.empty-field').hide();
      }
      if (objActiveBlock.courses && courses.length === 1) {
        $('.courses-block').find('.empty-field').show();
      }
      if (objActiveBlock.courses) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    extra_curricular.forEach(function (el, i) {
      if (i < (extra_curricular.length - 1)) {
        $('.extra-curricular-activities-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.extra_curricular === false && (el.city !== "" || el.country !== "" || el.description !== "" || el.employer !== "" || el.title !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.extra-curricular-activities-block').find('.empty-field').hide();
      }
      if (objActiveBlock.extra_curricular && extra_curricular.length === 1) {
        $('.extra-curricular-activities-block').find('.empty-field').show();
      }
      if (objActiveBlock.extra_curricular) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    internship.forEach(function (el, i) {
      if (i < (internship.length - 1)) {
        $('.internships-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.internship === false && (el.city !== "" || el.country !== "" || el.description !== "" || el.employer !== "" || el.jobTitle !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.internships-block').find('.empty-field').hide();
      }
      if (objActiveBlock.internship && internship.length === 1) {
        $('.internships-block').find('.empty-field').show();
      }
      if (objActiveBlock.internship) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    reference.forEach(function (el, i) {
      if (i < (reference.length - 1)) {
        $('.references-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.reference === false && (el.company !== "" || el.email !== "" || el.fullName !== "" || el.phone !== "")) {
        $('.references-block').find('.empty-field').hide();
      }
      if (objActiveBlock.reference && reference.length === 1) {
        $('.references-block').find('.empty-field').show();
      }
      if (objActiveBlock.reference) {
        $('div, span, p').not('.empty-field').show();
      }
    });
  }

  return (
    <div className="sv_017" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text additional-color-1-background">
            <div className="top-area">
              <div className={`name-and-photo-block block-block`}>
                <div className={`name-and-prophecy-wrapper ${!conta.firstName && !conta.lastName && !conta.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`cv-name font-size-6 ${!conta.firstName && !conta.lastName && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`${!conta.firstName ? 'empty-field' : ''} ${!conta.firstName && !beforeСontent ? 'hide' : ''}`}>
                      {conta.firstName || 'Matthew'}{` `}
                    </span>
                    <span className={`${!conta.lastName ? 'empty-field' : ''} ${!conta.lastName && !beforeСontent ? 'hide' : ''}`}>
                      {conta.lastName || 'Mcconaughey'}
                    </span>
                  </div>
                  <div className={`cv-profession font-size-5 ${!conta.jobTitle ? 'empty-field' : ''} ${!conta.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                    {conta.jobTitle || 'Web-designer'}
                  </div>
                </div>
                {
                  conta.picture && (
                    <div className="photo-wrapper">
                      <div className="photo" style={{ backgroundImage: `url(${conta?.picture})` }}></div>
                    </div>
                  )
                }
              </div>
              <div className="profile-icon"></div>
            </div>
            <div className="middle-area">
              <div className="column-left">
                <div className={`employment-history-block block-block m-left ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">employment history </div>
                  <div className="bg-block">
                    {
                      employment.map((itemEm, index) => (
                        <div className="block-info" key={index}>
                          <div className="top-bg"></div>
                          <div className="right-bg"></div>
                          <div className="bottom-bg"></div>
                          <div className={`cv-subheading font-size-2 ${!itemEm.title && !itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEm.title ? 'empty-field' : ''} ${!itemEm.title && !beforeСontent ? 'hide' : ''}`}>
                              {checkForSymbol([itemEm.company, itemEm.city]) ? (itemEm.title || 'Web Designer') + ', ' : itemEm.title || 'Web Designer'}
                            </span>
                            <span className={`${!itemEm.company ? 'empty-field' : ''} ${!itemEm.company && !beforeСontent ? 'hide' : ''}`}>
                              {checkForSymbol([itemEm.city]) ? (itemEm.company || 'Apple INC.') + ', ' : itemEm.company || ', Apple INC.'}
                            </span>
                            <span className={`${!itemEm.city ? 'empty-field' : ''} ${!itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                              {itemEm.city || ', New York City'}
                            </span>
                          </div>
                          <div className={`date-range ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''} ${!itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MMMM yy") + ' - ' : moment(itemEm.periodFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''} ${!itemEm.periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                          </div>
                          {
                            itemEm.assignment && (
                              <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                            ) || (
                              <div className={`empty-field ${!itemEm.assignment && !beforeСontent ? 'hide' : ''}`}>
                                <ul>
                                  <li>Helped to achieve a consistent look and visual theme across the website by promoting uniform fonts, formatting, images, and layout.</li>
                                  <li>Followed policies and procedures related to application methods and quality standards at all times.</li>
                                  <li>Managed front-end and back-end development in the company's Portfolio Analyst, Employee Track, and Account Management systems.</li>
                                </ul>
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`internships-block block-block m-left ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">internships</div>
                  <div className="bg-block">
                    {
                      internship.map((itemIn, index) => (
                        <div className="block-info" key={index}>
                          <div className="top-bg"></div>
                          <div className="right-bg"></div>
                          <div className="bottom-bg"></div>
                          <div className={`cv-subheading font-size-2 ${!itemIn.jobTitle && !itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemIn.jobTitle ? 'empty-field' : ''} ${!itemIn.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                              {checkForSymbol([itemIn.employer, itemIn?.city]) ? (itemIn.jobTitle || 'Product Designer') + ', ' : itemIn.jobTitle || 'Product Designer'}
                            </span>
                            <span className={`${!itemIn.employer ? 'empty-field' : ''} ${!itemIn.employer && !beforeСontent ? 'hide' : ''}`}>
                              {checkForSymbol([itemIn.city]) ? (itemIn.employer || 'Company S.A.') + ', ' : itemIn.employer || ', Company S.A.'}
                            </span>
                            <span className={`${!itemIn.city ? 'empty-field' : ''} ${!itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                              {itemIn.city || ', Toronto'}
                            </span>
                          </div>
                          <div className={`date-range ${!itemIn.dateFrom?.date && !itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''} ${!itemIn.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemIn.dateFrom?.date && (checkForSymbol([itemIn.dateTo?.date]) ? moment(itemIn.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemIn.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemIn.dateTo?.date ? 'empty-field' : ''} ${!itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemIn.dateTo?.date && (moment(itemIn.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                          </div>
                          {
                            itemIn.description && (
                              <div dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                            ) || (
                              <div className={`empty-field ${!itemIn.description && !beforeСontent ? 'hide' : ''}`}>
                                Handled each product and package with care and precision. Handled much of the communication between clients and the lead Graphic Designer.
                                Worked productively with Product Team to understand requirements and business specifications around Portfolio Management, Analytics and Risk.
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`skills-block block-block m-left ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">skills</div>
                  <div className="bg-block">
                    <div className="skills-list">
                      <div className="top-bg"></div>
                      <div className="right-bg"></div>
                      <div className="bottom-bg"></div>
                      {
                        skills.map((item, index) => (
                          <div className={`list-item ${!item.name ? 'empty-field' : ''}`} key={index}>
                            <div className="item-name">{item.name ? item.name : 'Skill name'}</div>
                            <div className="estimation-wrapper">
                              <div className="estimation-background"></div>
                              <div className="estimation-value" style={{ width: `${item.level ? (+item.level * 100) / 5 : '33.33'}%` }}></div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className={`details-block block-block m-left ${!conta?.country && !conta?.address && !conta?.city && !conta?.zipCode && !conta.email && !conta.phone && !conta?.driverLicense && !conta?.nationality && !conta?.placeOfBirth && !conta?.dateOfBirth && !social_links.length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">details</div>
                  <div className="bg-block">
                    <div className={`left-side ${!conta?.country && !conta?.address && !conta?.city && !conta?.zipCode && !conta.email && !conta.phone && !beforeСontent ? 'hide' : ''}`}>
                      <div className="top-bg"></div>
                      <div className="right-bg"></div>
                      <div className="bottom-bg"></div>
                      <div className={`details-address details-item ${!conta.country && !conta.address && !conta.city && !conta.zipCode && !beforeСontent ? 'hide' : ''}`}>
                        <svg className={`${!conta.country && !conta.address && !conta.city && !conta.zipCode ? 'empty-field' : ''}`} xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                          <path d="M5 0C3.67392 0 2.40215 0.505711 1.46447 1.40588C0.526784 2.30605 0 3.52695 0 4.79998C0 8.03997 4.40625 11.7 4.59375 11.856C4.70696 11.9489 4.85103 12 5 12C5.14897 12 5.29304 11.9489 5.40625 11.856C5.625 11.7 10 8.03997 10 4.79998C10 3.52695 9.47322 2.30605 8.53553 1.40588C7.59785 0.505711 6.32608 0 5 0ZM5 10.59C3.66875 9.38997 1.25 6.80398 1.25 4.79998C1.25 3.84521 1.64509 2.92954 2.34835 2.25441C3.05161 1.57928 4.00544 1.2 5 1.2C5.99456 1.2 6.94839 1.57928 7.65165 2.25441C8.35491 2.92954 8.75 3.84521 8.75 4.79998C8.75 6.80398 6.33125 9.39597 5 10.59ZM5 2.39999C4.50555 2.39999 4.0222 2.54075 3.61107 2.80446C3.19995 3.06818 2.87952 3.44301 2.6903 3.88155C2.50108 4.32009 2.45157 4.80265 2.54804 5.2682C2.6445 5.73375 2.8826 6.16139 3.23223 6.49704C3.58186 6.83268 4.02732 7.06126 4.51227 7.15386C4.99723 7.24647 5.49989 7.19894 5.95671 7.01729C6.41352 6.83564 6.80397 6.52803 7.07867 6.13335C7.35338 5.73867 7.5 5.27466 7.5 4.79998C7.5 4.16347 7.23661 3.55302 6.76777 3.10293C6.29893 2.65285 5.66304 2.39999 5 2.39999ZM5 5.99998C4.75277 5.99998 4.5111 5.9296 4.30554 5.79774C4.09998 5.66589 3.93976 5.47847 3.84515 5.2592C3.75054 5.03993 3.72579 4.79865 3.77402 4.56588C3.82225 4.3331 3.9413 4.11928 4.11612 3.95146C4.29093 3.78364 4.51366 3.66935 4.75614 3.62305C4.99861 3.57674 5.24995 3.60051 5.47835 3.69133C5.70676 3.78216 5.90199 3.93596 6.03934 4.1333C6.17669 4.33064 6.25 4.56265 6.25 4.79998C6.25 5.11824 6.1183 5.42347 5.88388 5.64851C5.64946 5.87355 5.33152 5.99998 5 5.99998Z" fill="#75BE87" />
                        </svg>
                        <div>
                          <span className={`${!contact[0].address ? 'empty-field' : ''} ${!contact[0].address && !beforeСontent ? 'hide' : ''}`}>
                            {`${contact[0].address ? checkForSymbol([contact[0].city, contact[0].zipCode, contact[0].country]) ? contact[0].address + ', ' : contact[0].address : '5th Avenue Street, '}`}
                          </span>
                          <span className={`${!contact[0].city ? 'empty-field' : ''} ${!contact[0].city && !beforeСontent ? 'hide' : ''}`}>
                            {`${contact[0].city ? checkForSymbol([contact[0].zipCode, contact[0].country]) ? contact[0].city + ', ' : contact[0].city : contact[0].address && !contact[0].zipCode && !contact[0].country ? ', New York City, ' : 'New York City, '}`}
                          </span>
                          <span className={`${!contact[0].zipCode ? 'empty-field' : ''} ${!contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                            {`${contact[0].zipCode ? checkForSymbol([contact[0].country]) ? contact[0].zipCode + ', ' : contact[0].zipCode : contact[0].city && !contact[0].country ? ', 384846, ' : '384846, '}`}
                          </span>
                          <span className={`${!contact[0].country ? 'empty-field' : ''} ${!contact[0].country && !beforeСontent ? 'hide' : ''}`}>
                            {`${contact[0].country ? contact[0].country : contact[0].zipCode ? ', United States' : 'United States'}`}
                          </span>
                        </div>
                      </div>
                      <div className={`details-phone details-item ${!conta.phone ? 'empty-field' : ''} ${!conta.phone && !beforeСontent ? 'hide' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M8.70921 5.50338C8.59914 5.50338 8.48407 5.46836 8.374 5.44334C8.15129 5.39354 7.93229 5.32834 7.7186 5.24822C7.4865 5.16378 7.23138 5.16817 7.00232 5.26053C6.77326 5.35289 6.58645 5.52671 6.47784 5.74853L6.36777 5.97867C5.88189 5.7031 5.43301 5.36687 5.03195 4.97805C4.64314 4.57699 4.30691 4.12812 4.03134 3.64223L4.26148 3.53717C4.4833 3.42856 4.65711 3.24175 4.74948 3.01269C4.84184 2.78363 4.84622 2.52851 4.76179 2.29641C4.68233 2.08079 4.61715 1.86018 4.56667 1.636C4.54165 1.52594 4.52164 1.41087 4.50663 1.3008C4.44588 0.948392 4.26129 0.629257 3.98612 0.400866C3.71095 0.172474 3.36328 0.049835 3.00571 0.0550337H1.49979C1.28828 0.0547567 1.0791 0.0991848 0.885968 0.185406C0.692833 0.271626 0.520102 0.397693 0.379098 0.555341C0.235169 0.717267 0.128001 0.908432 0.0649567 1.1157C0.00191211 1.32297 -0.0155146 1.54143 0.0138738 1.75608C0.285834 3.83842 1.23723 5.77287 2.72053 7.25945C4.20712 8.74276 6.14156 9.69415 8.22391 9.96611C8.28886 9.97108 8.35408 9.97108 8.41903 9.96611C8.78796 9.96666 9.14417 9.8313 9.41964 9.58588C9.57729 9.44488 9.70336 9.27215 9.78958 9.07901C9.8758 8.88588 9.92023 8.6767 9.91995 8.46519V6.96427C9.91725 6.61858 9.7953 6.28441 9.57471 6.01824C9.35411 5.75207 9.04839 5.5702 8.70921 5.50338ZM8.95436 8.50522C8.95419 8.57503 8.93942 8.64404 8.91098 8.7078C8.88255 8.77157 8.84109 8.82867 8.78926 8.87545C8.73442 8.9254 8.66917 8.96254 8.59822 8.98417C8.52726 9.00581 8.45238 9.01139 8.37901 9.00052C6.512 8.75669 4.77692 7.90585 3.44098 6.57904C2.10389 5.24195 1.24564 3.50083 0.999479 1.626C0.98861 1.55262 0.994194 1.47774 1.01583 1.40679C1.03746 1.33584 1.0746 1.27058 1.12456 1.21575C1.17189 1.16329 1.22981 1.12146 1.29448 1.093C1.35916 1.06454 1.42913 1.05011 1.49979 1.05064H3.00071C3.11636 1.04782 3.22942 1.08516 3.32063 1.15631C3.41185 1.22746 3.4756 1.32802 3.50101 1.44088C3.50101 1.57597 3.54604 1.71605 3.57606 1.85114C3.63388 2.11323 3.7108 2.37074 3.8062 2.62161L3.10577 2.95181C2.98538 3.00708 2.89182 3.10783 2.84561 3.23198C2.79557 3.35379 2.79557 3.49041 2.84561 3.61222C3.56565 5.15454 4.80544 6.39432 6.34776 7.11436C6.46956 7.1644 6.60619 7.1644 6.72799 7.11436C6.85214 7.06816 6.9529 6.9746 7.00816 6.85421L7.32336 6.15378C7.58147 6.24789 7.84555 6.32478 8.11384 6.38392C8.24392 6.41394 8.38401 6.43895 8.51909 6.45896C8.63195 6.48438 8.73252 6.54812 8.80367 6.63934C8.87482 6.73056 8.91216 6.84362 8.90933 6.95927L8.95436 8.50522ZM6.00255 0C5.88748 0 5.7674 0 5.65233 0C5.51964 0.0112786 5.39687 0.0748061 5.31102 0.176607C5.22517 0.278408 5.18327 0.410143 5.19455 0.542833C5.20583 0.675523 5.26936 0.798297 5.37116 0.884148C5.47296 0.969999 5.6047 1.01189 5.73739 1.00061H6.00255C6.79869 1.00061 7.56222 1.31688 8.12517 1.87983C8.68813 2.44279 9.00439 3.20632 9.00439 4.00246C9.00439 4.09251 9.00439 4.17756 9.00439 4.26762C8.9933 4.3996 9.035 4.5306 9.12034 4.63189C9.20569 4.73318 9.32771 4.79649 9.45967 4.80795H9.49969C9.62494 4.80846 9.74582 4.76197 9.83845 4.67768C9.93108 4.59338 9.98873 4.47741 10 4.35267C10 4.2376 10 4.11753 10 4.00246C10 2.9418 9.579 1.92452 8.82948 1.17406C8.07995 0.423597 7.0632 0.00132581 6.00255 0ZM7.00316 4.00246C7.00316 4.13515 7.05587 4.2624 7.1497 4.35623C7.24352 4.45005 7.37078 4.50276 7.50347 4.50276C7.63616 4.50276 7.76341 4.45005 7.85724 4.35623C7.95107 4.2624 8.00378 4.13515 8.00378 4.00246C8.00378 3.4717 7.79293 2.96268 7.41763 2.58737C7.04233 2.21207 6.53331 2.00123 6.00255 2.00123C5.86986 2.00123 5.7426 2.05394 5.64878 2.14776C5.55495 2.24159 5.50224 2.36885 5.50224 2.50153C5.50224 2.63422 5.55495 2.76148 5.64878 2.85531C5.7426 2.94913 5.86986 3.00184 6.00255 3.00184C6.26793 3.00184 6.52244 3.10726 6.71009 3.29491C6.89774 3.48257 7.00316 3.73708 7.00316 4.00246Z" fill="#75BE87" />
                        </svg>
                        <div>{conta.phone || '736-343-9384'}</div>
                      </div>
                      <div className={`details-email details-item ${!conta.email ? 'empty-field' : ''} ${!conta.email && !beforeСontent ? 'hide' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M8.5 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V6.5C0 6.89782 0.158035 7.27936 0.43934 7.56066C0.720644 7.84196 1.10218 8 1.5 8H8.5C8.89782 8 9.27936 7.84196 9.56066 7.56066C9.84196 7.27936 10 6.89782 10 6.5V1.5C10 1.10218 9.84196 0.720644 9.56066 0.43934C9.27936 0.158035 8.89782 0 8.5 0ZM1.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645C8.94732 1.24021 9 1.36739 9 1.5L5 3.94L1 1.5C1 1.36739 1.05268 1.24021 1.14645 1.14645C1.24021 1.05268 1.36739 1 1.5 1ZM9 6.5C9 6.63261 8.94732 6.75979 8.85355 6.85355C8.75979 6.94732 8.63261 7 8.5 7H1.5C1.36739 7 1.24021 6.94732 1.14645 6.85355C1.05268 6.75979 1 6.63261 1 6.5V2.64L4.74 4.925C4.81601 4.96888 4.90223 4.99199 4.99 4.99199C5.07777 4.99199 5.16399 4.96888 5.24 4.925L9 2.64V6.5Z" fill="#75BE87" />
                        </svg>
                        <div>{conta.email || 'designer@webservice.com'}</div>
                      </div>
                    </div>
                    <div className={`right-side ${!conta?.driverLicense && !conta?.nationality && !conta?.placeOfBirth && !conta?.dateOfBirth && !social_links.length && !beforeСontent ? 'hide' : ''}`}>
                      <div className={`additional-details-block ${!conta?.driverLicense && !conta?.nationality && !conta?.placeOfBirth && !conta?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                        <div className={`item-block ${!conta?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          <div className="name">Place of birth</div>
                          <div className={`value ${!conta?.placeOfBirth ? 'empty-field' : ''} ${!conta?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                            {conta.placeOfBirth ? conta.placeOfBirth : 'Berlin'}
                          </div>
                        </div>
                        <div className={`item-block ${!conta?.nationality && !beforeСontent ? 'hide' : ''}`}>
                          <div className="name">Nationality</div>
                          <div className={`value ${!conta?.nationality ? 'empty-field' : ''}`}>
                            {conta.nationality ? conta.nationality : 'German'}
                          </div>
                        </div>
                        <div className={`item-block ${!conta?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          <div className="name">Date of birth</div>
                          <div className={`value ${!conta?.dateOfBirth ? 'empty-field' : ''} ${!conta?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                            {conta.dateOfBirth ? moment(conta.dateOfBirth).format("DD-MM-yy") : '14-08-1991'}
                          </div>
                        </div>
                        <div className={`item-block ${!conta?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                          <div className="name">Driving license</div>
                          <div className={`value ${!conta?.driverLicense ? 'empty-field' : ''}`}>
                            {conta.driverLicense ? conta.driverLicense : 'Class 1'}
                          </div>
                        </div>
                      </div>
                      <div className={`links-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                        {
                          isArray(social_links) && social_links.length && (
                            social_links.map((itemSocial, index) => (
                              <a href={itemSocial.link} className="links-item" key={index}>
                                {socialHelper(itemSocial.name)}
                              </a>
                            ))
                          ) || (
                            <>
                              <a className="links-item empty-field">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M13.6466 1.33335H2.35329C2.22634 1.33158 2.10029 1.35484 1.98233 1.4018C1.86438 1.44876 1.75683 1.51849 1.66582 1.60702C1.57482 1.69555 1.50215 1.80113 1.45195 1.91775C1.40176 2.03437 1.37503 2.15973 1.37329 2.28668V13.7133C1.37503 13.8403 1.40176 13.9657 1.45195 14.0823C1.50215 14.1989 1.57482 14.3045 1.66582 14.393C1.75683 14.4815 1.86438 14.5513 1.98233 14.5982C2.10029 14.6452 2.22634 14.6684 2.35329 14.6667H13.6466C13.7736 14.6684 13.8996 14.6452 14.0176 14.5982C14.1355 14.5513 14.2431 14.4815 14.3341 14.393C14.4251 14.3045 14.4978 14.1989 14.548 14.0823C14.5982 13.9657 14.6249 13.8403 14.6266 13.7133V2.28668C14.6249 2.15973 14.5982 2.03437 14.548 1.91775C14.4978 1.80113 14.4251 1.69555 14.3341 1.60702C14.2431 1.51849 14.1355 1.44876 14.0176 1.4018C13.8996 1.35484 13.7736 1.33158 13.6466 1.33335ZM5.39329 12.4933H3.39329V6.49334H5.39329V12.4933ZM4.39329 5.65334C4.11747 5.65334 3.85294 5.54377 3.6579 5.34874C3.46286 5.1537 3.35329 4.88917 3.35329 4.61334C3.35329 4.33752 3.46286 4.07299 3.6579 3.87795C3.85294 3.68292 4.11747 3.57334 4.39329 3.57334C4.53975 3.55673 4.68808 3.57125 4.82854 3.61593C4.96901 3.66062 5.09845 3.73447 5.2084 3.83265C5.31834 3.93083 5.40631 4.05113 5.46654 4.18567C5.52677 4.3202 5.5579 4.46594 5.5579 4.61334C5.5579 4.76075 5.52677 4.90649 5.46654 5.04102C5.40631 5.17556 5.31834 5.29586 5.2084 5.39404C5.09845 5.49222 4.96901 5.56607 4.82854 5.61076C4.68808 5.65544 4.53975 5.66995 4.39329 5.65334ZM12.6066 12.4933H10.6066V9.27334C10.6066 8.46668 10.32 7.94001 9.59329 7.94001C9.3684 7.94166 9.14942 8.0122 8.96585 8.14213C8.78228 8.27205 8.64295 8.45513 8.56663 8.66668C8.51445 8.82337 8.49185 8.98839 8.49996 9.15334V12.4867H6.49996C6.49996 12.4867 6.49996 7.03334 6.49996 6.48668H8.49996V7.33334C8.68164 7.01808 8.9459 6.75836 9.26425 6.58215C9.58261 6.40593 9.943 6.31991 10.3066 6.33334C11.64 6.33334 12.6066 7.19335 12.6066 9.04001V12.4933Z" fill="#605C64" />
                                </svg>
                              </a>
                              <a className="links-item empty-field">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M13.9333 1.33334H2.06659C1.87209 1.33334 1.68557 1.41061 1.54804 1.54813C1.41051 1.68566 1.33325 1.87218 1.33325 2.06668V13.9333C1.33325 14.0296 1.35222 14.125 1.38907 14.214C1.42593 14.3029 1.47994 14.3838 1.54804 14.4519C1.61614 14.52 1.69698 14.574 1.78595 14.6109C1.87492 14.6477 1.97028 14.6667 2.06659 14.6667H8.45325V9.50001H6.71992V7.50001H8.45325V6.00001C8.41735 5.64785 8.45892 5.29209 8.57506 4.9577C8.6912 4.62331 8.8791 4.31837 9.12556 4.06428C9.37203 3.81019 9.6711 3.6131 10.0018 3.48684C10.3325 3.36057 10.6868 3.30818 11.0399 3.33334C11.5588 3.33015 12.0774 3.35686 12.5933 3.41334V5.21334H11.5333C10.6933 5.21334 10.5333 5.61334 10.5333 6.19334V7.48001H12.5333L12.2733 9.48001H10.5333V14.6667H13.9333C14.0296 14.6667 14.1249 14.6477 14.2139 14.6109C14.3029 14.574 14.3837 14.52 14.4518 14.4519C14.5199 14.3838 14.5739 14.3029 14.6108 14.214C14.6476 14.125 14.6666 14.0296 14.6666 13.9333V2.06668C14.6666 1.97037 14.6476 1.87501 14.6108 1.78604C14.5739 1.69707 14.5199 1.61623 14.4518 1.54813C14.3837 1.48004 14.3029 1.42602 14.2139 1.38917C14.1249 1.35231 14.0296 1.33334 13.9333 1.33334Z" fill="#605C64" />
                                </svg>
                              </a>
                            </>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column-right">
                <div className={`profile-block block-block m-right ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">profile</div>
                  <div className="bg-block">
                    <div className="top-bg"></div>
                    <div className="left-bg"></div>
                    <div className="bottom-bg"></div>
                    {
                      career_objective[0]?.data && (
                        <div dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                      ) || (
                        <div className="empty-field">
                          Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className={`education-block block-block m-right ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">education</div>
                  <div className="bg-block">
                    {
                      education.map((itemEd, index) => (
                        <div className="block-info" key={index}>
                          <div className="top-bg"></div>
                          <div className="left-bg"></div>
                          <div className="bottom-bg"></div>
                          <div className={`cv-subheading font-size-2 ${!itemEd.study && !itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                              {checkForSymbol([itemEd.facility]) ? (itemEd.study || 'Marketing and Management') + ', ' : itemEd.study || 'Marketing and Management'}
                            </span>
                            <span className={`${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.facility ? itemEd.facility : ', Harcum College, Portland'}
                            </span>
                          </div>
                          <div className={`date-range ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''} ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''} ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                            <span className={`cv-degree ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.degree ? itemEd.degree : 'Bachelor'}
                            </span>
                          </div>
                          {
                            itemEd.description && (
                              <div dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
                            ) || (
                              <div className={`empty-field ${!itemEd.description && !beforeСontent ? 'hide' : ''}`}>
                                I have learned to merge marketing and management skills in a very efficient way and produce great results. Even though managing hundreds of people is hard, all skills are learned to do that.
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`courses-and-sertificates-block block-block ${!Object.keys(courses[0]).length && !Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`left-side ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                    <div className="courses-block block-block m-right m-small">
                      <div className="cv-heading font-size-4">courses</div>
                      <div className="bg-block">
                        {
                          courses.map((itemCo, index) => (
                            <div className="block-info" key={index}>
                              <div className="top-bg"></div>
                              <div className="left-bg"></div>
                              <div className="bottom-bg"></div>
                              <div className={`cv-subheading font-size-2 ${!itemCo.title && !itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                                <span className={`${!itemCo.title ? 'empty-field' : ''} ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                                  {checkForSymbol([itemCo.institution]) ? (itemCo.title || 'Super course 1') + ', ' : itemCo.title || 'Super course 1'}
                                </span>
                                <span className={`${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                                  {itemCo.institution ? itemCo.institution : ', Benjamin Franklin Sidestep Collage'}
                                </span>
                              </div>
                              <div className={`date-range ${!itemCo.dateFrom?.date && !itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                                <span className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''} ${!itemCo.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                                  {itemCo.dateFrom?.date && (checkForSymbol([itemCo.dateTo?.date]) ? moment(itemCo.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemCo.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                                </span>
                                <span className={`${!itemCo.dateTo?.date ? 'empty-field' : ''} ${!itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                                  {itemCo.dateTo?.date && (moment(itemCo.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                                </span>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className={`right-side ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                    <div className="certificates-block block-block m-right m-small">
                      <div className="cv-heading font-size-4">certificates</div>
                      <div className="bg-block">
                        <div className="certificates-info">
                          <div className="top-bg"></div>
                          <div className="left-bg"></div>
                          <div className="bottom-bg"></div>
                          {
                            certificates.map((item, index) => (
                              <span className={`certificates-item font-size-2 ${!item.name ? 'empty-field' : ''}`} key={index}>
                                {item.name ? item.name : 'Certificate name'}
                              </span>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`extra-curricular-activities-block block-block m-right ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">extra-curricular activities</div>
                  <div className="bg-block">
                    {
                      extra_curricular.map((itemEx, index) => (
                        <div className="block-info" key={index}>
                          <div className="top-bg"></div>
                          <div className="left-bg"></div>
                          <div className="bottom-bg"></div>
                          <div className={`cv-subheading font-size-2 ${!itemEx.title && !itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEx.title ? 'empty-field' : ''} ${!itemEx.title && !beforeСontent ? 'hide' : ''}`}>
                              {checkForSymbol([itemEx.employer]) ? (itemEx.title || 'UX Designer') + ', ' : itemEx.title || 'UX Designer'}
                            </span>
                            <span className={`${!itemEx.employer ? 'empty-field' : ''} ${!itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                              {itemEx.employer || ', My own company'}
                            </span>
                          </div>
                          <div className={`date-range ${!itemEx.dateFrom?.date && !itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''} ${!itemEx.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEx.dateFrom?.date && (checkForSymbol([itemEx.dateTo?.date]) ? moment(itemEx.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEx.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemEx.dateTo?.date ? 'empty-field' : ''} ${!itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEx.dateTo?.date && (moment(itemEx.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                          </div>
                          {
                            itemEx.description && (
                              <div dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                            ) || (
                              <div className={`empty-field ${!itemEx.description && !beforeСontent ? 'hide' : ''}`}>
                                I was doing research for about five different projects. The goal was to find out the biggest issues with the current concept and solution how to solve them.
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`languages-block block-block m-right ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">languages</div>
                  <div className="bg-block">
                    <div className="languages-list estimated-items-list">
                      <div className="top-bg"></div>
                      <div className="left-bg"></div>
                      <div className="bottom-bg"></div>
                      {
                        languages.map((item, index) => (
                          <div className={`languages-item ${!item.language ? 'empty-field' : ''}`} key={index}>
                            <span className="languages-name">{item.language ? item.language : 'Language'}</span>
                            <span className="languages-value font-size-3">{levelLanguage(item.level ? item.level : 6)}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className={`hobbies-and-references-block block-block ${!Object.keys(hobbies[0]).length && !Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`left-side ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                    <div className="hobbies-block block-block m-right m-small">
                      <div className="cv-heading font-size-4">hobbies</div>
                      <div className="bg-block">
                        <div className="top-bg"></div>
                        <div className="left-bg"></div>
                        <div className="bottom-bg"></div>
                        <div className={`${!hobbies[0].text ? 'empty-field' : ''}`}> {
                          hobbies.map((item, index) => (
                            <span key={index}>
                              {item.text ? item.text + (hobbies.length - 1 != index ? ', ' : '') : 'Squash, Surfing, Swimming, Table tennis, Tennis, Tennis polo, Tether car, Tour skating'}
                            </span>
                          ))
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`right-side ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                    <div className="references-block block-block m-right m-small">
                      <div className="cv-heading font-size-4">references</div>
                      <div className="bg-block">
                        {
                          reference.map((itemRef, index) => (
                            <div className="block-info" key={index}>
                              <div className="top-bg"></div>
                              <div className="left-bg"></div>
                              <div className="bottom-bg"></div>
                              <div className={`references-name font-size-2 ${!itemRef.fullName ? 'empty-field' : ''} ${!itemRef.fullName && !beforeСontent ? 'hide' : ''}`}>
                                {itemRef.fullName || 'Full name'}
                              </div>
                              <div className={`${!itemRef.company ? 'empty-field' : ''} ${!itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                                {itemRef.company || 'Company'}
                              </div>
                              <div className={`${!itemRef.email ? 'empty-field' : ''} ${!itemRef.email && !beforeСontent ? 'hide' : ''}`}>
                                {itemRef.email || 'references@webservice.com'}
                              </div>
                              <div className={`${!itemRef.phone ? 'empty-field' : ''} ${!itemRef.phone && !beforeСontent ? 'hide' : ''}`}>
                                {itemRef.phone || '736-343-9384'}
                              </div>
                            </div>
                          ))
                        }
                      </div>
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

