import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $(`.cv-body.cv-body-visible`).each(function(){
        $(this).remove();
      });

      let personal_info_block = $('#cv-body-hidden-container .cv-body-content .personal-info-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();
      let contacts_information_block = $('#cv-body-hidden-container .cv-body-content .contacts-information-block').clone();
      let certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();
      let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();

      current_page_number = 1;

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

      getContentContainer2().append(courses_block);
      if (checkHeight()) {
        courses_block.remove();
        current_page_number++;
        getContentContainer2().append(courses_block);
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

      getContentContainer2().append(certificates_block);
      if (checkHeight()) {
        certificates_block.remove();
        current_page_number++;
        getContentContainer2().append(certificates_block);
      }

      current_page_number = 1;

      getContentContainer1().append(contacts_information_block);
      if (checkHeight()) {
        contacts_information_block.remove();
        current_page_number++;
        getContentContainer1().append(contacts_information_block);
      }

      getContentContainer1().append(personal_info_block);
      if (checkHeight()) {
        personal_info_block.remove();
        current_page_number++;
        getContentContainer1().append(personal_info_block);
      }

      getContentContainer1().append(skills_block);
      if (checkHeight()) {
        skills_block.remove();
        current_page_number++;
        getContentContainer1().append(skills_block);
      }

      getContentContainer1().append(hobbies_block);
      if (checkHeight()) {
        hobbies_block.remove();
        current_page_number++;
        getContentContainer2().append(hobbies_block);
      }

      getContentContainer1().append(languages_block);
      if (checkHeight()) {
        languages_block.remove();
        current_page_number++;
        getContentContainer1().append(languages_block);
      }

      getContentContainer1().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer1().append(references_block);
      }

      getContentContainer1().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer1().append(links_block);
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
      page_element_container.children().remove();
      page_element.append(page_element_container);

      let column_left = $('#cv-body-hidden-container .cv-body-content .column-left').clone();
      column_left.children().remove();
      page_element_container.append(column_left);

      let column_right = $('#cv-body-hidden-container .cv-body-content .column-right').clone();
      column_right.children().remove();
      page_element_container.append(column_right);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }

    rebuildingPages();
  }
}

export const ResumeCv013 = ({
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
    hide_experience_level
  } = dataNew;
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
    <div className="sv_013" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content main-color-1-text font-size-1">
            <div className="column-left">
              <div className="contacts-information-block block-block">
                {
                  conta.picture && (
                    <div className="photo-block">
                      <div className="photo" style={{ backgroundImage: `url(${conta.picture})` }}></div>
                    </div>
                  )
                }
                <div className="cv-name font-size-3 m-without-photo">
                  <span className={`${!conta.firstName ? 'empty-field' : ''} ${!conta.firstName && !beforeСontent ? 'hide' : ''}`}>
                    {conta.firstName || 'Matthew'}
                  </span><br />
                  <span className={`${!conta.lastName ? 'empty-field' : ''} ${!conta.lastName && !beforeСontent ? 'hide' : ''}`}>
                    {conta.lastName || 'Mcconaughey'}
                  </span>
                </div>
                <div className={`contacts-block ${!conta.country && !conta.address && !conta.city && !conta.zipCode && !conta.email && !conta.phone && !beforeСontent ? 'hide' : ''}`}>
                  <div className="block-heading font-size-2 additional-color-1-text">Details</div>
                  <div className={`block-item ${!conta?.country && !conta?.address && !conta?.city && !conta?.zipCode && !beforeСontent ? 'hide' : ''}`}>
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
                  <div className={`block-item ${!conta.email ? 'empty-field' : ''} ${!conta.email && !beforeСontent ? 'hide' : ''}`}>
                    <a href="#">
                      {conta.email || 'designer@webservice.com'}
                    </a>
                  </div>
                  <div className={`block-item ${!conta.phone ? 'empty-field' : ''} ${!conta.phone && !beforeСontent ? 'hide' : ''}`}>
                    {conta.phone || '736-343-9384'}
                  </div>
                </div>
              </div>
              <div className={`personal-info-block block-block ${!conta?.driverLicense && !conta?.nationality && !conta?.placeOfBirth && !conta?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                <div className="personal-info">
                  <div className={`item-block ${!conta?.nationality && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Nationality</div>
                    {
                      conta?.nationality && (
                        <div className="value">{conta.nationality}</div>
                      ) || (
                        <div className="value empty-field">German</div>
                      )
                    }
                  </div>
                  <div className={`item-block ${!conta?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Driving license</div>
                    {
                      conta?.driverLicense && (
                        <div className="value">{conta.driverLicense}</div>
                      ) || (
                        <div className="value empty-field">Class 1</div>
                      )
                    }
                  </div>

                  <div className={`item-block ${!conta?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Date of firth</div>
                    {
                      conta?.dateOfBirth && (
                        <span className="value">{moment(conta.dateOfBirth).format("DD-MM-yy")}</span>
                      ) || (
                        <span className="value empty-field">14-08-1991</span>
                      )
                    }
                  </div>
                  <div className={`item-block ${!conta?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Place of birth</div>
                    {
                      conta?.placeOfBirth && (
                        <span className="value">{conta.placeOfBirth}</span>
                      ) || (
                        <span className="value empty-field">Berlin</span>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className={`skills-block block-block ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Skills</div>
                <div className="skills-list estimated-items-list">
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
              <div className={`hobbies-block block-block ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Hobbies</div>
                <div className={`${!hobbies[0].text ? 'empty-field' : ''}`}>
                  {
                    hobbies.map((item, index) => (
                      <span key={index}>
                        {item.text ? item.text + (hobbies.length - 1 != index ? ', ' : '') : 'Squash, Surfing, Swimming, Table tennis, Tennis, Tennis polo, Tether car, Tour skating'}
                      </span>
                    ))
                  }
                </div>
              </div>
              <div className={`languages-block block-block ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Languages</div>
                <div className="skills-list estimated-items-list">
                  {
                    languages.map((item, index) => (
                      <div className={`list-item ${!item.language ? 'empty-field' : ''}`} key={index}>
                        <div className="item-name">{item.language ? item.language : 'Language'}</div>
                        <div className="estimation-wrapper">
                          <div className="estimation-background"></div>
                          <div className="estimation-value" style={{ width: `${item.level ? (+item.level * 100) / 6 : '66.66'}%` }}></div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`references-block block-block ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">References</div>
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
              <div className={`links-block block-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Links</div>
                <div className="links-block-content">
                  {
                    isArray(social_links) && social_links.length && (
                      social_links.map((itemSocial, index) => (
                        <a href={itemSocial.link} className="links-item" key={index}>
                          {itemSocial.name}
                        </a>
                      ))
                    ) || (
                      <>
                        <a className="links-item empty-field">Linkedin</a>
                        <a className="links-item empty-field">Facebook</a>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="column-right">
              <div className="profile-block block-block">
                <div className="cv-name font-size-3 m-with-photo">
                  <span className={`${!conta.firstName ? 'empty-field' : ''} ${!conta.firstName && !beforeСontent ? 'hide' : ''}`}>
                    {conta.firstName || 'Matthew'}
                  </span><br />
                  <span className={`${!conta.lastName ? 'empty-field' : ''} ${!conta.lastName && !beforeСontent ? 'hide' : ''}`}>
                    {conta.lastName || 'Mcconaughey'}
                  </span>
                </div>
                <div className={`block-heading font-size-2 additional-color-1-text ${!conta.jobTitle ? 'empty-field' : ''} ${!conta.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                  {conta.jobTitle || 'Web-designer'}
                </div>
                {
                  career_objective?.[0]?.data && (
                    <div dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                  ) || (
                    <div className={`empty-field ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                      Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                    </div>
                  )
                }
              </div>
              <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Employment History</div>
                {
                  employment.map((itemEm, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading ${!itemEm.title && !itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
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
                      <div className={`text-block-wrapper ${!itemEm.assignment && !beforeСontent ? 'hide' : ''}`}>
                        {
                          itemEm.assignment && (
                            <div className="text-block" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          ) || (
                            <div className="text-block empty-field">
                              <ul>
                                <li>Helped to achieve a consistent look and visual theme across the website by promoting uniform fonts, formatting, images, and layout.</li>
                                <li>Followed policies and procedures related to application methods and quality standards at all times.</li>
                                <li>Managed front-end and back-end development in the company's Portfolio Analyst, Employee Track, and Account Management systems.</li>
                              </ul>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className={`education-block block-block ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Education</div>
                {
                  education.map((itemEd, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading ${!itemEd.study && !itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.study && (checkForSymbol([itemEd.facility])) ? (itemEd.study || 'Marketing and Management') + ', ' : itemEd.study || 'Marketing and Management'}
                        </span>
                        <span className={`${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.facility ? itemEd.facility : ', Harcum College, Portland'}
                        </span>
                      </div>
                      <div className={`date-range ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''} ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                        </span>
                        <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''} ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                        </span>
                      </div>
                      <div className={`block-degree ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`courses-block block-block ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Courses</div>
                {
                  courses.map((itemCo, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading ${!itemCo.title && !itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`extra-curricular-activities-block block-block ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Extra-curricular activities</div>
                {
                  extra_curricular.map((itemEx, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading ${!itemEx.title && !itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`internships-block block-block ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Internships</div>
                {
                  internship.map((itemIn, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading ${!itemIn.jobTitle && !itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-2 additional-color-1-text">Certificates</div>
                <div className="certificates-list">
                  {
                    certificates.map((item, index) => (
                      <span className={`${!item.name ? 'empty-field' : ''}`} key={index}>
                        {item.name ? item.name : 'Certificate name'}
                      </span>
                    ))
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

