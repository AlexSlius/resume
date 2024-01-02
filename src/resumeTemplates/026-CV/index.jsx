import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { checkForSymbol } from "../../utils/checkForSymbol";
import { socialHelper } from "../../utils/socialHelper";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let photo_block = $('#cv-body-hidden-container .cv-body-content .photo-wrapper').clone();
      let name_and_prophecy_block = $('#cv-body-hidden-container .cv-body-content .name-and-prophecy-wrapper').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let details_and_hobbies_block = $('#cv-body-hidden-container .cv-body-content .details-and-hobbies-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
      let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
      let certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();

      current_page_number = 1;

      getContentContainer1().append(photo_block);
      if (checkHeight()) {
        photo_block.remove();
        current_page_number++;
        getContentContainer1().append(photo_block);
      }

      getContentContainer1().append(name_and_prophecy_block);
      if (checkHeight()) {
        name_and_prophecy_block.remove();
        current_page_number++;
        getContentContainer1().append(name_and_prophecy_block);
      }

      getContentContainer1().append(skills_block);
      if (checkHeight()) {
        skills_block.remove();
        current_page_number++;
        getContentContainer1().append(skills_block);
      }

      getContentContainer1().append(languages_block);
      if (checkHeight()) {
        languages_block.remove();
        current_page_number++;
        getContentContainer1().append(languages_block);
      }

      getContentContainer1().append(certificates_block);
      if (checkHeight()) {
        certificates_block.remove();
        current_page_number++;
        getContentContainer1().append(certificates_block);
      }

      getContentContainer1().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer1().append(references_block);
      }

      current_page_number = 1;

      getContentContainer2().append(details_and_hobbies_block);
      if (checkHeight()) {
        details_and_hobbies_block.remove();
        current_page_number++;
        getContentContainer2().append(details_and_hobbies_block);
      }

      getContentContainer2().append(profile_block);
      if (checkHeight()) {
        profile_block.remove();
        current_page_number++;
        getContentContainer2().append(profile_block);
      }

      getContentContainer2().append(employment_history_block);
      if (checkHeight()) {
        employment_history_block.remove();
        current_page_number++;
        getContentContainer2().append(employment_history_block);
      }

      getContentContainer2().append(education_block);
      if (checkHeight()) {
        education_block.remove();
        current_page_number++;
        getContentContainer2().append(education_block);
      }

      getContentContainer2().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getContentContainer2().append(extra_curricular_activities_block);
      }

      getContentContainer2().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        current_page_number++;
        getContentContainer2().append(internships_block);
      }

      getContentContainer2().append(courses_block);
      if (checkHeight()) {
        courses_block.remove();
        current_page_number++;
        getContentContainer2().append(courses_block);
      }

      getContentContainer2().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer2().append(links_block);
      }
    }

    function checkHeight() {
      return getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
    }

    function getContentContainer1() {
      return getPageContainer().find('.column-left');
    }

    function getContentContainer2() {
      return getPageContainer().find('.column-right');
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

      page_element_container.find('.column-left').children().remove();
      page_element_container.find('.column-right').children().remove();
      page_element.append(page_element_container);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }

    rebuildingPages();
  }
}

export const ResumeCv026 = ({
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
  }, [isDrawing, stateClasses, beforeСontent]);

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
    <div className="sv_026" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text additional-color-1-background">
            <div className="column-left additional-color-2-background">
              {
                conta.picture && (
                  <div className="photo-wrapper">
                    <div className="circle-shade"></div>
                    <div className="photo" style={{ backgroundImage: `url(${conta?.picture})` }}></div>
                  </div>
                )
              }
              <div className={`name-and-prophecy-wrapper ${!conta.firstName && !conta.lastName && !conta.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                <div className={`cv-name font-size-4 ${!conta.firstName && !conta.lastName && !beforeСontent ? 'hide' : ''}`}>
                  <span className={`${!conta.firstName ? 'empty-field' : ''} ${!conta.firstName && !beforeСontent ? 'hide' : ''}`}>
                    {conta.firstName || 'Matthew'}
                  </span><br />
                  <span className={`${!conta.lastName ? 'empty-field' : ''} ${!conta.lastName && !beforeСontent ? 'hide' : ''}`}>
                    {conta.lastName || 'Mcconaughey'}
                  </span>
                </div>
                <div className={`cv-profession font-size-3 ${!conta.jobTitle ? 'empty-field' : ''} ${!conta.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                  {conta.jobTitle || 'Web-designer'}
                </div>
              </div>
              <div className={`skills-block block-block ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3">Skills</div>
                <div className="skills-list">
                  {
                    skills.map((item, index) => (
                      <div className={`estimated-wrapper ${!item.name ? 'empty-field single' : ''}`}>
                        <svg viewBox="0 0 64 64" className="pie additional-color-3-svg additional-color-5-svg">
                          <circle className="background" r="50%" cx="50%" cy="50%" stroke-dasharray="0"></circle>
                          <circle className="chart" r="50%" cx="50%" cy="50%" stroke-dasharray={`${item.level ? (+item.level * 100) / 5 * 2 : '100'} 200`}></circle>
                        </svg>
                        <div className="estimated-item-name font-size-2" key={index}>
                          {item.name ? item.name : 'Skill name'}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`languages-block block-block ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3">Languages</div>
                <div className="languages-list">
                  {
                    languages.map((item, index) => (
                      <div className={`languages-item ${!item.language ? 'empty-field' : ''}`} key={index}>
                        <div className="languages-name font-size-2">{item.language ? item.language : 'Language'}</div>
                        {
                          <div className="skill-estimation additional-color-5-text">
                            {
                              [...new Array(5)].map((_, index) => (
                                <svg className="" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill={(index + 1) <= (item.level ? item.level : 3) ? "currentColor" : "none"}>
                                  <path d="M6.82092 2.08288L7.91699 5.45623L8.02925 5.80172H8.39252H11.9395L9.06993 7.88657L8.77604 8.1001L8.88829 8.44559L9.98436 11.8189L7.11482 9.7341L6.82092 9.52057L6.52703 9.7341L3.65748 11.8189L4.75355 8.44559L4.86581 8.1001L4.57192 7.88657L1.70237 5.80172H5.24932H5.6126L5.72485 5.45623L6.82092 2.08288Z" stroke="currentColor" />
                                </svg>
                              ))
                            }
                          </div>
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3">Certificates</div>
                <div className="certificates-info">
                  {
                    certificates.map((item, index) => (
                      <span className={`${!item.name ? 'empty-field' : ''}`} key={index}>
                        {item.name ? item.name : 'Certificate name'}
                      </span>
                    ))
                  }
                </div>
              </div>
              <div className={`references-block block-block ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3">References</div>
                {
                  reference.map((itemRef, index) => (
                    <div className="block-info" key={index}>
                      <div className={`${!itemRef.fullName && !itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemRef.fullName ? 'empty-field' : ''} ${!itemRef.fullName && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemRef.company]) ? (itemRef.fullName || 'Full name') + ', ' : itemRef.fullName || 'Full name'}
                        </span>
                        <span className={`${!itemRef.company ? 'empty-field' : ''} ${!itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                          {itemRef.company || ', Company'}
                        </span>
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
            <div className="column-right">
              <div className={`details-and-hobbies-block block-block ${!conta.country && !conta.address && !conta.city && !conta.zipCode && !conta.email && !conta.phone && !conta.driverLicense && !conta.nationality && !conta.placeOfBirth && !conta.dateOfBirth && !Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className={`left-side ${!conta.country && !conta.address && !conta.city && !conta.zipCode && !conta.email && !conta.phone && !conta.driverLicense && !conta.nationality && !conta.placeOfBirth && !conta.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`details-block ${!conta.country && !conta.address && !conta.city && !conta.zipCode && !conta.email && !conta.phone && !beforeСontent ? 'hide' : ''}`}>
                    <div className="cv-heading font-size-3 additional-color-4-text">Details</div>
                    <div className="details-info">
                      <div className={`details-item ${!conta.country && !conta.address && !conta.city && !conta.zipCode && !beforeСontent ? 'hide' : ''}`}>
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
                      <div className={`details-item ${!conta.phone ? 'empty-field' : ''} ${!conta.phone && !beforeСontent ? 'hide' : ''}`}>
                        {conta.phone || '736-343-9384'}
                      </div>
                      <div className={`details-item ${!conta.email ? 'empty-field' : ''} ${!conta.email && !beforeСontent ? 'hide' : ''}`}>
                        {conta.email || 'designer@webservice.com'}
                      </div>
                    </div>
                  </div>
                  <div className={`additional-details-block ${!conta?.driverLicense && !conta?.nationality && !conta?.placeOfBirth && !conta?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <div className={`item-block ${!conta?.nationality && !beforeСontent ? 'hide' : ''}`}>
                      <div className="name additional-color-4-text">nationality</div>
                      <div className={`value ${!conta?.nationality ? 'empty-field' : ''}`}>
                        {conta.nationality ? conta.nationality : 'German'}
                      </div>
                    </div>
                    <div className={`item-block ${!conta?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                      <div className="name additional-color-4-text">driving license</div>
                      <div className={`value ${!conta?.driverLicense ? 'empty-field' : ''}`}>
                        {conta.driverLicense ? conta.driverLicense : 'Class 1'}
                      </div>
                    </div>
                    <div className={`item-block ${!conta?.dateOfBirth && !conta?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                      <div className="name additional-color-4-text">data/place of birth</div>
                      <div className="value">
                        <span className={`${!conta?.dateOfBirth ? 'empty-field' : ''} ${!conta?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          {conta.dateOfBirth ? moment(conta.dateOfBirth).format("DD-MM-yy") : '14-08-1991'} {` / `}
                        </span>
                        <span className={`${!conta?.placeOfBirth ? 'empty-field' : ''} ${!conta?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          {conta.placeOfBirth ? conta.placeOfBirth : 'Berlin'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`right-side ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="hobbies-block">
                    <div className="cv-heading font-size-3 additional-color-4-text">Hobbies</div>
                    <div className={`hobbies-info additional-color-4-border ${!hobbies[0].text ? 'empty-field' : ''}`}>
                      {
                        Object.keys(hobbies[0]).length && (
                          hobbies.map((item, index) => (
                            <span className="hobbies-item" key={index}>
                              <span className="additional-color-4-text additional-color-4-border">{`${index + 1}`}</span>
                              {`${item.text}`}
                            </span>
                          ))
                        ) || (
                          <>
                            <span className="hobbies-item">
                              <span className="additional-color-4-text additional-color-4-border">1</span>
                              Squash
                            </span>
                            <span className="hobbies-item">
                              <span className="additional-color-4-text additional-color-4-border">2</span>
                              Surfing
                            </span>
                            <span className="hobbies-item">
                              <span className="additional-color-4-text additional-color-4-border">3</span>
                              Swimming
                            </span>
                            <span className="hobbies-item">
                              <span className="additional-color-4-text additional-color-4-border">4</span>
                              Table tennis
                            </span>
                            <span className="hobbies-item">
                              <span className="additional-color-4-text additional-color-4-border">5</span>
                              Tennis
                            </span>
                            <span className="hobbies-item">
                              <span className="additional-color-4-text additional-color-4-border">6</span>
                              Tennis polo
                            </span>
                            <span className="hobbies-item">
                              <span className="additional-color-4-text additional-color-4-border">7</span>
                              Tether car
                            </span>
                            <span className="hobbies-item">
                              <span className="additional-color-4-text additional-color-4-border">8</span>
                              Tour skating
                            </span>
                          </>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className={`profile-block block-block ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3 additional-color-4-text">Profile</div>
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
              <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3 additional-color-4-text">Employment History</div>
                {
                  employment.map((itemEm, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading additional-color-4-text ${!itemEm.title && !itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEm.title ? 'empty-field' : ''} ${!itemEm.title && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEm.company, itemEm.city]) ? (itemEm.title || 'Web Designer') + ', ' : itemEm.title || 'Web Designer'}
                        </span>
                        <span className={`${!itemEm.company ? 'empty-field' : ''} ${!itemEm.company && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEm.city]) ? (itemEm.company || 'Apple INC.') + ', ' : itemEm?.company || ', Apple INC.'}
                        </span>
                        <span className={`${!itemEm.city ? 'empty-field' : ''} ${!itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                          {itemEm.city || ', New York City'}
                        </span>
                      </div>
                      <div className={`date-range additional-color-4-text ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`education-block block-block ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3 additional-color-4-text">Education</div>
                {
                  education.map((itemEd, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading additional-color-4-text ${!itemEd.study && !itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEd.facility]) ? (itemEd.study || 'Marketing and Management') + ', ' : itemEd.study || 'Marketing and Management'}
                        </span>
                        <span className={`${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.facility ? itemEd.facility : ', Harcum College, Portland'}
                        </span>
                      </div>
                      <div className={`date-range additional-color-4-text ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''} ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                        </span>
                        <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''} ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                        </span>
                      </div>
                      <div className={`cv-degree additional-color-4-text ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                        {itemEd.degree ? itemEd.degree : 'Bachelor'}
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
              <div className={`extra-curricular-activities-block block-block ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3 additional-color-4-text">Extra-curricular activities</div>
                {
                  extra_curricular.map((itemEx, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading additional-color-4-text ${!itemEx.title && !itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEx.title ? 'empty-field' : ''} ${!itemEx.title && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEx.employer]) ? (itemEx.title || 'UX Designer') + ', ' : itemEx.title || 'UX Designer'}
                        </span>
                        <span className={`${!itemEx.employer ? 'empty-field' : ''} ${!itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                          {itemEx.employer || ', My own company'}
                        </span>
                      </div>
                      <div className={`date-range additional-color-4-text ${!itemEx.dateFrom?.date && !itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`internships-block block-block ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3 additional-color-4-text">Internships</div>
                {
                  internship.map((itemIn, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading additional-color-4-text ${!itemIn.jobTitle && !itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
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
                      <div className={`date-range additional-color-4-text ${!itemIn.dateFrom?.date && !itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`courses-block block-block ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3 additional-color-4-text">Courses</div>
                {
                  courses.map((itemCo, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading additional-color-4-text ${!itemCo.title && !itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemCo.title ? 'empty-field' : ''} ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemCo.institution]) ? (itemCo.title || 'Super course 1') + ', ' : itemCo.title || 'Super course 1'}
                        </span>
                        <span className={`${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.institution ? itemCo.institution : ', Benjamin Franklin Sidestep Collage'}
                        </span>
                      </div>
                      <div className={`date-range additional-color-4-text ${!itemCo.dateFrom?.date && !itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`links-block block-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                <div className="links-info">
                  {
                    isArray(social_links) && social_links.length && (
                      social_links.map((itemSocial, index) => (
                        <a href={itemSocial.link} className="links-item additional-color-4-svg" key={index}>
                          {socialHelper(itemSocial.name)}
                        </a>
                      ))
                    ) || (
                      <>
                        <a className="links-item empty-field additional-color-4-svg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.6466 1.33335H2.35329C2.22634 1.33158 2.10029 1.35484 1.98233 1.4018C1.86438 1.44876 1.75683 1.51849 1.66582 1.60702C1.57482 1.69555 1.50215 1.80113 1.45195 1.91775C1.40176 2.03437 1.37503 2.15973 1.37329 2.28668V13.7133C1.37503 13.8403 1.40176 13.9657 1.45195 14.0823C1.50215 14.1989 1.57482 14.3045 1.66582 14.393C1.75683 14.4815 1.86438 14.5513 1.98233 14.5982C2.10029 14.6452 2.22634 14.6684 2.35329 14.6667H13.6466C13.7736 14.6684 13.8996 14.6452 14.0176 14.5982C14.1355 14.5513 14.2431 14.4815 14.3341 14.393C14.4251 14.3045 14.4978 14.1989 14.548 14.0823C14.5982 13.9657 14.6249 13.8403 14.6266 13.7133V2.28668C14.6249 2.15973 14.5982 2.03437 14.548 1.91775C14.4978 1.80113 14.4251 1.69555 14.3341 1.60702C14.2431 1.51849 14.1355 1.44876 14.0176 1.4018C13.8996 1.35484 13.7736 1.33158 13.6466 1.33335ZM5.39329 12.4933H3.39329V6.49334H5.39329V12.4933ZM4.39329 5.65334C4.11747 5.65334 3.85294 5.54377 3.6579 5.34874C3.46286 5.1537 3.35329 4.88917 3.35329 4.61334C3.35329 4.33752 3.46286 4.07299 3.6579 3.87795C3.85294 3.68292 4.11747 3.57334 4.39329 3.57334C4.53975 3.55673 4.68808 3.57125 4.82854 3.61593C4.96901 3.66062 5.09845 3.73447 5.2084 3.83265C5.31834 3.93083 5.40631 4.05113 5.46654 4.18567C5.52677 4.3202 5.5579 4.46594 5.5579 4.61334C5.5579 4.76075 5.52677 4.90649 5.46654 5.04102C5.40631 5.17556 5.31834 5.29586 5.2084 5.39404C5.09845 5.49222 4.96901 5.56607 4.82854 5.61076C4.68808 5.65544 4.53975 5.66995 4.39329 5.65334ZM12.6066 12.4933H10.6066V9.27334C10.6066 8.46668 10.32 7.94001 9.59329 7.94001C9.3684 7.94166 9.14942 8.0122 8.96585 8.14213C8.78228 8.27205 8.64295 8.45513 8.56663 8.66668C8.51445 8.82337 8.49185 8.98839 8.49996 9.15334V12.4867H6.49996C6.49996 12.4867 6.49996 7.03334 6.49996 6.48668H8.49996V7.33334C8.68164 7.01808 8.9459 6.75836 9.26425 6.58215C9.58261 6.40593 9.943 6.31991 10.3066 6.33334C11.64 6.33334 12.6066 7.19335 12.6066 9.04001V12.4933Z" fill="#605C64" />
                          </svg>
                        </a>
                        <a className="links-item empty-field additional-color-4-svg">
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
      </div>
    </div>
  )
}

