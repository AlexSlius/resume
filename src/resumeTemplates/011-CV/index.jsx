import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

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
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();

      current_page_number = 1;

      getContentContainer2().append(contacts_information_block);
      if (checkHeight()) {
        contacts_information_block.remove();
        current_page_number++;
        getContentContainer2().append(contacts_information_block);
      }

      getContentContainer2().append(certificates_block);
      if (checkHeight()) {
        certificates_block.remove();
        current_page_number++;
        getContentContainer2().append(certificates_block);
      }

      getContentContainer2().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer2().append(references_block);
      }

      getContentContainer2().append(hobbies_block);
      if (checkHeight()) {
        hobbies_block.remove();
        current_page_number++;
        getContentContainer2().append(hobbies_block);
      }

      getContentContainer2().append(skills_block);
      if (checkHeight()) {
        skills_block.remove();
        current_page_number++;
        getContentContainer2().append(skills_block);
      }

      getContentContainer2().append(languages_block);
      if (checkHeight()) {
        languages_block.remove();
        current_page_number++;
        getContentContainer2().append(languages_block);
      }

      current_page_number = 1;

      getContentContainer1().append(personal_info_block);
      if (checkHeight()) {
        personal_info_block.remove();
        current_page_number++;
        getContentContainer1().append(personal_info_block);
      }

      getContentContainer1().append(profile_block);
      if (checkHeight()) {
        profile_block.remove();
        current_page_number++;
        getContentContainer1().append(profile_block);
      }

      getContentContainer1().append(employment_history_block);
      if (checkHeight()) {
        employment_history_block.remove();
        current_page_number++;
        getContentContainer1().append(employment_history_block);
      }

      getContentContainer1().append(education_block);
      if (checkHeight()) {
        education_block.remove();
        current_page_number++;
        getContentContainer1().append(education_block);
      }

      getContentContainer1().append(courses_block);
      if (checkHeight()) {
        courses_block.remove();
        current_page_number++;
        getContentContainer1().append(courses_block);
      }

      getContentContainer1().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getContentContainer1().append(extra_curricular_activities_block);
      }

      getContentContainer1().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        current_page_number++;
        getContentContainer1().append(internships_block);
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

    function columnRightHelper() {
      $('.cv-body-visible .js-column-right').each(function () {
        if ($(this).width() < 30) {
          $(this).addClass('m-empty');
        } else {
          $(this).removeClass('m-empty');
        }
      });
    }

    rebuildingPages();
    columnRightHelper();
  }
}

export const ResumeCv011 = ({
  data,
  dataNew,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  stateClasses,
  reportTemplateRef,
  beforeСontent,
  objActiveBlock
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
  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";

  useEffect(() => {
    if (!!isDrawing ) {
    drawing();
    handleFalseDrafind();
  }
  }, [isDrawing, data, stateClasses]);

  return (
    <div className="sv_011" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-2 main-color-1-text">
            <div className="column-left">
              <div className="personal-info-block">
                {
                  contact?.[0]?.picture && (
                    <div className="photo-block">
                      <div className="photo" style={{ backgroundImage: `url(${contact[0].picture})` }}></div>
                    </div>
                  )
                }
                <div className="personal-info">
                  <div className={`cv-name font-size-6 additional-color-2-text ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].firstName || 'Matthew'}{` `}
                    </span>
                    <span className={`${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].lastName || 'Mcconaughey'}
                    </span>
                  </div>
                  <div className={`cv-profession font-size-3 additional-color-3-text ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].jobTitle || 'Web-designer'}
                  </div>
                  <div className={`personal-additional-info ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <div className={`item-block ${!contact[0]?.nationality && !beforeСontent ? 'hide' : ''}`}>
                      <div className="name additional-color-3-text">Nationality</div>
                      {
                        contact[0]?.nationality && (
                          <div className="value additional-color-1-text">{contact[0].nationality}</div>
                        ) || (
                          <div className="value empty-field additional-color-1-text">German</div>
                        )
                      }
                    </div>
                    <div className={`item-block ${!contact[0]?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                      <div className="name additional-color-3-text">Drivinglicense</div>
                      {
                        contact[0]?.driverLicense && (
                          <div className="value additional-color-1-text">{contact[0].driverLicense}</div>
                        ) || (
                          <div className="value empty-field additional-color-1-text">Class 1</div>
                        )
                      }
                    </div>
                    <div className={`item-block ${!contact[0].dateOfBirth && !contact[0].placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                      <div className="name additional-color-3-text">Date/PlaceOfBirth</div>
                      <div className="value additional-color-1-text">
                        <div className={`${!contact[0].dateOfBirth ? 'empty-field' : ''} ${!contact[0].dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          {contact[0].dateOfBirth ? moment(contact[0].dateOfBirth).format("DD-MM-yy") : "14-08-1991"}
                        </div>
                        <div className={`${!contact[0].placeOfBirth ? 'empty-field' : ''} ${!contact[0].placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          {contact[0].placeOfBirth || "Berlin"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`profile-block block-block ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-5 additional-color-2-text">Profile</div>
                {
                  career_objective[0].data && (
                    <div dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                  ) || (
                    <div className="empty-field">
                      Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                    </div>
                  )
                }
              </div>
              <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-5 additional-color-2-text">Employment History</div>
                {
                  employment.map((itemEm, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading font-size-3 additional-color-3-text ${!itemEm.title && !itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEm.title ? 'empty-field' : ''} ${!itemEm.title && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEm.company]) ? itemEm.title + ', ' : itemEm.title || 'Web Designer'}
                        </span>
                        <span className={`${!itemEm.company ? 'empty-field' : ''} ${!itemEm.company && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEm?.city]) ? itemEm?.company + ', ' : itemEm?.company || ', Apple INC.'}
                        </span>
                        <span className={`${!itemEm.city ? 'empty-field' : ''} ${!itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                          {itemEm.city || ', New York City'}
                        </span>
                      </div>
                      <div className={`date-range font-size-1 additional-color-1-text ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''} ${!itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MMMM yy") + ' - ' : moment(itemEm.periodFrom.date).format("MMMM yy")) || 'March 2022'}
                        </span>
                        <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''} ${!itemEm.periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MMMM yy")) || ' - December 2022'}
                        </span>
                      </div>
                      <div className={`text-block-wrapper additional-color-1-text ${!itemEm.assignment ? 'empty-field' : ''} ${!itemEm.assignment && !beforeСontent ? 'hide' : ''}`}>
                        <div className="text-block">
                          <div className="left-side">
                            <div className="vertical-line additional-color-3-background"></div>
                          </div>
                          {
                            itemEm.assignment && (
                              <div className="right-side" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                            ) || (
                              <div className={`right-side`}>
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
                    </div>
                  ))
                }
              </div>
              <div className={`education-block block-block ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-5 additional-color-2-text">Education History</div>
                {
                  education.map((itemEd, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading font-size-3 additional-color-3-text ${!itemEd.degree && !itemEd.study && !itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEd.facility, itemEd.study]) ? itemEd.degree + ' - ' : itemEd.degree || 'Bachelor'}
                        </span>
                        <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEd?.facility]) ? itemEd?.study + ', ' : itemEd?.study || ' - Marketing and Management'}
                        </span>
                        <span className={`${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.facility || ', Harcum College, Portland'}
                        </span>
                      </div>
                      <div className={`date-range font-size-1 additional-color-1-text ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''} ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                        </span>
                        <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''} ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                        </span>
                      </div>
                      {
                        itemEd.description && (
                          <div className="additional-color-1-text" dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
                        ) || (
                          <div className={`additional-color-1-text empty-field ${!itemEd.description && !beforeСontent ? 'hide' : ''}`}>
                            I have learned to merge marketing and management skills in a very efficient way and produce great results. Even though managing hundreds of people is hard, all skills are learned to do that.
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
              <div className={`courses-block block-block ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-5 additional-color-2-text">Courses</div>
                {
                  courses.map((itemCo, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading font-size-3 additional-color-3-text ${!itemCo.title && !itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemCo.title ? 'empty-field' : ''} ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.title && (checkForSymbol([itemCo.institution])) ? itemCo.title + ', ' : itemCo.title || 'Super course 1'}
                        </span>
                        <span className={`${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.institution ? itemCo.institution : ', Benjamin Franklin Sidestep Collage'}
                        </span>
                      </div>
                      <div className={`date-range font-size-1 additional-color-1-text ${!itemCo.dateFrom?.date && !itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
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
                <div className="block-heading font-size-5 additional-color-2-text">Extra-curricular activities</div>
                {
                  extra_curricular.map((itemEx, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading font-size-3 additional-color-3-text ${!itemEx.title && !itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEx.title ? 'empty-field' : ''} ${!itemEx.title && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEx.employer]) ? itemEx.title + ', ' : itemEx.title || 'UX Designer'}
                        </span>
                        <span className={`${!itemEx.employer ? 'empty-field' : ''} ${!itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                          {itemEx.employer || ', My own company'}
                        </span>
                      </div>
                      <div className={`date-range font-size-1 additional-color-1-text ${!itemEx.dateFrom?.date && !itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''} ${!itemEx.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEx.dateFrom?.date && (checkForSymbol([itemEx.dateTo?.date]) ? moment(itemEx.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEx.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                        </span>
                        <span className={`${!itemEx.dateTo?.date ? 'empty-field' : ''} ${!itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemEx.dateTo?.date && (moment(itemEx.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                        </span>
                      </div>
                      {
                        itemEx.description && (
                          <div className="additional-color-1-text" dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                        ) || (
                          <div className={`additional-color-1-text empty-field ${!itemEx.description && !beforeСontent ? 'hide' : ''}`}>
                            I was doing research for about five different projects. The goal was to find out the biggest issues with the current concept and solution how to solve them.
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
              <div className={`internships-block block-block ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-5 additional-color-2-text">Internships</div>
                {
                  internship.map((itemIn, index) => (
                    <div className="block-info" key={index}>
                      <div className={`block-subheading font-size-3 additional-color-3-text ${!itemIn.jobTitle && !itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemIn.jobTitle ? 'empty-field' : ''} ${!itemIn.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemIn.employer, itemIn?.city]) ? itemIn.jobTitle + ', ' : itemIn.jobTitle || 'Product Designer'}
                        </span>
                        <span className={`${!itemIn.employer ? 'empty-field' : ''} ${!itemIn.employer && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemIn.city]) ? itemIn.employer + ', ' : itemIn.employer || ', Company S.A.'}
                        </span>
                        <span className={`${!itemIn.city ? 'empty-field' : ''} ${!itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                          {itemIn.city || ', Toronto'}
                        </span>
                      </div>
                      <div className={`date-range font-size-1 additional-color-1-text ${!itemIn.dateFrom?.date && !itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''} ${!itemIn.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemIn.dateFrom?.date && (checkForSymbol([itemIn.dateTo?.date]) ? moment(itemIn.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemIn.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                        </span>
                        <span className={`${!itemIn.dateTo?.date ? 'empty-field' : ''} ${!itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          {itemIn.dateTo?.date && (moment(itemIn.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                        </span>
                      </div>
                      {
                        itemIn.description && (
                          <div className="additional-color-1-text" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                        ) || (
                          <div className={`additional-color-1-text empty-field ${!itemIn.description && !beforeСontent ? 'hide' : ''}`}>
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
            <div className="column-right js-column-right">
              <div className={`contacts-information-block block-block ${!social_links.length && !contact[0].email && !contact[0].phone && !contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                <div className="left-block additional-color-2-background"></div>
                 <div className="right-block">
                  <div className="contacts-block">
                    <div className={`block-item ${!contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                      <div className={`left-side ${!contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode ? 'empty-field' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.87061 5.11842C2.87061 3.11967 4.50102 1.48926 6.49977 1.48926C8.49852 1.48926 10.1289 3.11967 10.1289 5.11842C10.1289 7.59926 6.88435 11.2501 6.74352 11.4018C6.61352 11.548 6.38602 11.548 6.25602 11.4018C6.12061 11.2501 2.87061 7.59926 2.87061 5.11842ZM7.77457 4.91371C7.88603 5.61391 7.40875 6.27189 6.70855 6.38335C6.00835 6.4948 5.35037 6.01752 5.23891 5.31732C5.12746 4.61711 5.60473 3.95914 6.30494 3.84768C7.00514 3.73623 7.66312 4.2135 7.77457 4.91371Z" fill="white" />
                          </svg>
                      </div>
                      <div className="right-side additional-color-1-text">
                        <span className={`${!contact[0].country ? 'empty-field' : ''} ${!contact[0]?.country && !beforeСontent ? 'hide' : ''}`}>
                          {`${checkForSymbol([contact[0].address, contact[0].city, contact[0].zipCode]) ? contact[0].country + ', ' : contact[0].country || 'United States, '}`}
                        </span>
                        <span className={`${!contact[0].address ? 'empty-field' : ''} ${!contact[0]?.address && !beforeСontent ? 'hide' : ''}`}>
                          {`${checkForSymbol([contact[0].city, contact[0].zipCode]) ? contact[0].address + ', ' : contact[0].address || '5th Avenue Street, '}`}
                        </span>
                        <span className={`${!contact[0].city ? 'empty-field' : ''} ${!contact[0]?.city && !beforeСontent ? 'hide' : ''}`}>
                          {`${checkForSymbol([contact[0].zipCode]) ? contact[0].city + ', ' : contact[0].city || 'New York City, '}`}
                        </span>
                        <span className={`${!contact[0].zipCode ? 'empty-field' : ''} ${!contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                          {`${contact[0].zipCode || '384846'}`}
                        </span>
                      </div>
                    </div>
                    <div className={`block-item ${!contact[0].phone ? 'empty-field' : ''} ${!contact[0].phone && !beforeСontent ? 'hide' : ''}`}>
                      <div className="left-side">
                        <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.25081 6.74873C8.35247 8.8504 8.83456 6.41832 10.1725 7.75623C11.4616 9.0454 12.2037 9.3054 10.5679 10.9412C10.3621 11.1037 9.06206 13.0862 4.48498 8.51457C-0.0921061 3.93748 1.89039 2.63748 2.05289 2.43165C3.69414 0.790401 3.94873 1.5379 5.23789 2.82707C6.58123 4.16498 4.14914 4.64707 6.25081 6.74873Z" fill="white" />
                        </svg>
                      </div>
                      <div className="right-side additional-color-1-text">{contact[0].phone || '736-343-9384'}</div>
                    </div>
                    <div className={`block-item ${!contact[0].email ? 'empty-field' : ''} ${!contact[0].email && !beforeСontent ? 'hide' : ''}`}>
                      <div className="left-side">
                        <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path clipRule="evenodd" d="M1.53242 3.67619C1.50446 3.78221 1.48958 3.89344 1.48958 4.00801V8.99134C1.48958 9.71176 2.07458 10.2913 2.78958 10.2913H10.2104C10.9308 10.2913 11.5104 9.71176 11.5104 8.99134V4.00801C11.5104 3.89151 11.4951 3.7787 11.4664 3.67143L7.76132 7.34958L7.76025 7.35065C7.04836 8.06143 5.94851 8.05619 5.23618 7.35299L5.23468 7.35151L1.53242 3.67619ZM10.3044 2.71137C10.2734 2.70914 10.242 2.70801 10.2104 2.70801H2.78958C2.75607 2.70801 2.72287 2.70927 2.69002 2.71176L6.28997 6.28551L6.29052 6.28605C6.42271 6.41611 6.57851 6.41107 6.70066 6.28892L6.7026 6.28698L6.7026 6.28699L10.3044 2.71137Z" fill="white" />
                        </svg>
                      </div>
                      <div className="right-side additional-color-1-text">
                        {contact[0].email || 'designer@webservice.com'}
                      </div>
                    </div>
                    {
                      isArray(social_links) && social_links.length && (
                        social_links.map((item, index) => (
                          <div className="block-item" key={index}>
                            <div className="left-side">
                              <img src={item.icon} />
                            </div>
                            <div className="right-side additional-color-1-text">{item.name}</div>
                          </div>
                        ))
                      ) || (
                        <>
                          <div className="block-item empty-field">
                            <div className="left-side">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <path d="M10.4993 10.4998H8.94645V8.06366C8.94645 7.48274 8.93609 6.73492 8.13882 6.73492C7.33002 6.73492 7.20626 7.36783 7.20626 8.02135V10.4996H5.65344V5.48996H7.14415V6.17457H7.16506C7.46858 5.65469 8.03503 5.34303 8.63589 5.36538C10.2098 5.36538 10.5 6.40241 10.5 7.75157L10.4993 10.4998Z" fill="white"/>
                                <path d="M3.90121 4.80541C3.90112 4.80541 3.90107 4.80541 3.90103 4.80541C3.40667 4.80541 2.99988 4.39795 2.99988 3.90273C2.99988 3.4075 3.40667 3 3.90103 3C4.39533 3 4.80208 3.40741 4.80217 3.90254C4.80217 3.90259 4.80217 3.90263 4.80217 3.90273C4.80217 4.39786 4.39548 4.80536 3.90121 4.80541Z" fill="white"/>
                                <path d="M4.67775 10.5H3.12329V5.49023H4.67775V10.5Z" fill="white"/>
                              </svg>
                            </div>
                            <div className="right-side additional-color-1-text">Linkedin</div>
                          </div>
                          <div className="block-item empty-field">
                            <div className="left-side">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                              <circle cx="6.5" cy="6.5" r="6.5" fill="#605C2C"/>
                              <path d="M9.02999 8.37913L9.31819 6.50015H7.51535V5.28081C7.51535 4.76676 7.76718 4.26569 8.57469 4.26569H9.39437V2.66602C9.39437 2.66602 8.65047 2.53906 7.93927 2.53906C6.45444 2.53906 5.48398 3.43894 5.48398 5.06807V6.50015H3.8335V8.37913H5.48398V12.9214C5.81493 12.9734 6.15413 13.0004 6.49967 13.0004C6.8452 13.0004 7.1844 12.9734 7.51535 12.9214V8.37913H9.02999Z" fill="white"/>
                            </svg>
                            </div>
                            <div className="right-side additional-color-1-text">Facebook</div>
                          </div>
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-4 additional-color-3-text">Certificates</div>
                <div className="certificates-block-info additional-color-1-text">
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
                <div className="block-heading font-size-4 additional-color-3-text">References</div>
                {
                  reference.map((itemRef, index) => (
                    <div className="block-info" key={index}>
                      <div className={`additional-color-1-text ${!itemRef.fullName && !itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemRef.fullName ? 'empty-field' : ''} ${!itemRef.fullName && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemRef.company]) ? itemRef.fullName + ', ' : itemRef.fullName || 'Full name'}
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
              <div className={`hobbies-block block-block ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-4 additional-color-3-text">Hobbies</div>
                <div className={`additional-color-1-text ${!hobbies[0].text ? 'empty-field' : ''}`}>
                  {
                    hobbies.map((item, index) => (
                      <span key={index}>
                        {item.text ? item.text + (hobbies.length - 1 != index ? ', ' : '') : 'Squash, Surfing, Swimming, Table tennis, Tennis, Tennis polo, Tether car, Tour skating'}
                      </span>
                    ))
                  }
                </div>
              </div>
              <div className={`skills-block block-block ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-4 additional-color-3-text">Skills</div>
                <div className="skills-list estimated-items-list">
                  {
                    skills.map((item, index) => (
                      <div className={`list-item ${!item.name ? 'empty-field' : ''}`} key={index}>
                        <p className="item-name additional-color-1-text">{item.name ? item.name : 'Skill name'}</p>
                        {
                          !hide_experience_level && (
                            <div className="estimation-wrapper">
                              <div className="estimation-background additional-color-2-background"></div>
                              <div className="estimation-value additional-color-2-background" style={{ width: `${item.level ? (+item.level * 100) / 5: '25'}%` }}></div>
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`languages-block block-block ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="block-heading font-size-4 additional-color-3-text">Languages</div>
                <div className="skills-list estimated-items-list">
                  {
                    languages.map((item, index) => (
                      <div className={`list-item ${!item.name ? 'empty-field' : ''}`} key={index}>
                        <p className="item-name additional-color-1-text">{item.language ? item.language : 'Language'}</p>
                        <div className="estimation-wrapper">
                          <div className="estimation-background additional-color-2-background"></div>
                          <div className="estimation-value additional-color-2-background" style={{ width: `${item.level ? (+item.level * 100) / 6 : '50'}%` }}></div>
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
  )
}

