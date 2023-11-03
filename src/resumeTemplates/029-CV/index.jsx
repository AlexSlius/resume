import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { checkForSymbol } from "../../utils/checkForSymbol";
import { socialHelper } from "../../utils/socialHelper";

const drawing = () => {
  if (typeof window != 'undefined') {
    var current_page_number = 1;
    var max_page_number = 1;

    function rebuildingPages() {
      current_page_number = 1;
      max_page_number = 1;

      $('.cv-body.cv-body-visible').remove();

      var profile_block = $('#cv-body-hidden-container .profile-block').clone();
      var employment_history_block = $('#cv-body-hidden-container .employment-history-block').clone();
      var extra_curricular_activities_block = $('#cv-body-hidden-container .extra-curricular-activities-block').clone();
      var internships_block = $('#cv-body-hidden-container .internships-block').clone();
      var references_block = $('#cv-body-hidden-container .references-block').clone();
      var education_block = $('#cv-body-hidden-container .education-block').clone();
      var courses_block = $('#cv-body-hidden-container .courses-block').clone();
      var certificates_block = $('#cv-body-hidden-container .certificates-block').clone();
      var hobbies_block = $('#cv-body-hidden-container .hobbies-block').clone();
      var skills_block = $('#cv-body-hidden-container .skills-block').clone();
      var languages_block = $('#cv-body-hidden-container .languages-block').clone();
      var bottom_block = $('#cv-body-hidden-container .bottom-block').clone();

      getPageArea1().append(profile_block);

      // Column left
      current_page_number = 1;
      getPageColumnLeft().append(employment_history_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        employment_history_block.remove();
        current_page_number++;
        getPageColumnLeft().append(employment_history_block);
      }

      getPageColumnLeft().append(education_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        education_block.remove();
        current_page_number++;
        getPageColumnLeft().append(education_block);
      }

      getPageColumnLeft().append(courses_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        courses_block.remove();
        current_page_number++;
        getPageColumnLeft().append(courses_block);
      }

      getPageColumnLeft().append(extra_curricular_activities_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getPageColumnLeft().append(extra_curricular_activities_block);
      }

      getPageColumnLeft().append(internships_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        internships_block.remove();
        current_page_number++;
        getPageColumnLeft().append(internships_block);
      }

      if (max_page_number < current_page_number) {
        max_page_number = current_page_number;
      }

      // Right block
      current_page_number = 1;

      getPageColumnRight().append(skills_block);
      if (getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number)) {
        skills_block.remove();
        current_page_number++;
        getPageColumnRight().append(skills_block);
      }

      getPageColumnRight().append(languages_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        languages_block.remove();
        current_page_number++;
        getPageColumnRight().append(languages_block);
      }

      getPageColumnRight().append(references_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        references_block.remove();
        current_page_number++;
        getPageColumnRight().append(references_block);
      }

      getPageColumnRight().append(certificates_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        certificates_block.remove();
        current_page_number++;
        getPageColumnRight().append(certificates_block);
      }

      getPageColumnRight().append(hobbies_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        hobbies_block.remove();
        current_page_number++;
        getPageColumnRight().append(hobbies_block);
      }

      if (max_page_number < current_page_number) {
        max_page_number = current_page_number;
      }

      current_page_number = max_page_number;

      // Bottom block
      getPageArea3().append(bottom_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        bottom_block.remove();
        current_page_number++;
        getPageArea3().append(bottom_block);
      }
    }

    function getPageArea1() {
      return getPageContainer().find('.cv-body-area.top-area');
    }

    function getPageArea2() {
      return getPageContainer().find('.cv-body-area.middle-area');
    }

    function getPageArea3() {
      return getPageContainer().find('.cv-body-area.bottom-area');
    }

    function getPageColumnLeft() {
      return getPageArea2().find('.column-1');
    }

    function getPageColumnRight() {
      return getPageArea2().find('.column-2');
    }

    function getPageContainer() {
      var page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
      if (page.length > 0) {
        return page.find('.cv-body-content');
      } else {
        return createNewPage(current_page_number);
      }
    }

    function createNewPage(page_number) {
      var page_element = $('<div class="cv-body cv-body-visible cv-body-1 page-' + page_number + '" data-chapter="cv" data-page="' + page_number + '"></div>');
      page_element.attr('data-chapter', 'cv');
      page_element.attr('data-page', page_number);
      var page_element_container = $('<div class="cv-body-content font-size-1 main-color-1-text"></div>');
      page_element.append(page_element_container);

      if (current_page_number == 1) {
        var top_area = $('#cv-body-hidden-container .top-area').clone();
        top_area.children().remove();
        page_element_container.append(top_area);
      }

      var middle_area = $('#cv-body-hidden-container .middle-area').clone();
      middle_area.children().remove();
      var column_left = $('#cv-body-hidden-container .middle-area .column-1').clone();
      column_left.children().remove();
      middle_area.append(column_left);
      var column_right = $('#cv-body-hidden-container .middle-area .column-2').clone();
      column_right.children().remove();
      middle_area.append(column_right);
      page_element_container.append(middle_area);

      var bottom_area = $('#cv-body-hidden-container .bottom-area').clone();
      bottom_area.children().remove();
      page_element_container.append(bottom_area);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }

    rebuildingPages();
  }
}

export const ResumeCv029 = ({
  data,
  dataNew,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  stateClasses,
  reportTemplateRef,
  beforeСontent,
  objActiveBlock,
  isPdf = false
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
    if (isPdf) return;

    if (!!isDrawing) {
      drawing();
      handleFalseDrafind();
    }
  }, [isDrawing, data, stateClasses]);

  return (
    <div className="sv_029" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text">
            <div className="cv-body-area top-area">
              <div className="profile-block additional-color-1-border">
                {
                  contact[0]?.picture && (
                    <div className="photo-wrapper">
                      <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                    </div>
                  )
                }
                <div className={`profile-info ${!contact[0].firstName && !contact[0].lastName && !contact[0].jobTitle && !career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`cv-name font-size-4 ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`text-line-1 ${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].firstName || 'Matthew'}{` `}
                    </span>
                    <span className={`text-line-2 ${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].lastName || 'Mcconaughey'}
                    </span>
                  </div>
                  <div className={`cv-profession font-size-3 additional-color-1-text ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].jobTitle || 'Web-designer'}
                  </div>
                  {
                    career_objective[0]?.data && (
                      <div className="profile-info-text" dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                    ) || (
                      <div className="profile-info-text empty-field">
                        Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="cv-body-area middle-area">
              <div className="column-1">
                <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                  {
                    employment.map((itemEm, index) => (
                      <div className="block-info" key={index}>
                        {
                          (index == 0) && (
                            <div className="cv-heading-block">
                              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                                <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                                <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                              </svg>
                              <div className="cv-heading font-size-3 additional-color-1-text">Employment History</div>
                            </div>
                          )
                        }
                        <div className={`cv-subheading font-size-2 ${!itemEm.title && !itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEm.title ? 'empty-field' : ''} ${!itemEm.title && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEm.company, itemEm?.city]) ? (itemEm.title || 'Web Designer') + ', ' : itemEm.title || 'Web Designer'}
                          </span>
                          <span className={`${!itemEm.company ? 'empty-field' : ''} ${!itemEm.company && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEm?.city]) ? (itemEm?.company || 'Apple INC.') + ', ' : itemEm?.company || ', Apple INC.'}
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
                <div className={`education-block block-block ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  {
                    education.map((itemEd, index) => (
                      <div className="block-info" key={index}>
                        {
                          (index == 0) && (
                            <div className="cv-heading-block">
                              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                                <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                                <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                              </svg>
                              <div className="cv-heading font-size-3 additional-color-1-text">Education</div>
                            </div>
                          )
                        }
                        <div className={`cv-subheading font-size-2 ${!itemEd.study && !itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEd.facility]) ? (itemEd.study || 'Marketing and Management') + ', ' : itemEd.study || 'Marketing and Management'}
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
                        <div className={`cv-subheading ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
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
                  {
                    courses.map((itemCo, index) => (
                      <div className="block-info" key={index}>
                        {
                          (index == 0) && (
                            <div className="cv-heading-block">
                              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                                <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                                <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                              </svg>
                              <div className="cv-heading font-size-3 additional-color-1-text">Courses</div>
                            </div>
                          )
                        }
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
                <div className={`extra-curricular-activities-block block-block ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  {
                    extra_curricular.map((itemEx, index) => (
                      <div className="block-info" key={index}>
                        {
                          (index == 0) && (
                            <div className="cv-heading-block">
                              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                                <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                                <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                              </svg>
                              <div className="cv-heading font-size-3 additional-color-1-text">Extra-curricular activities</div>
                            </div>
                          )
                        }
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
                <div className={`internships-block block-block ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  {
                    internship.map((itemIn, index) => (
                      <div className="block-info" key={index}>
                        {
                          (index == 0) && (
                            <div className="cv-heading-block">
                              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                                <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                                <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                              </svg>
                              <div className="cv-heading font-size-3 additional-color-1-text">Internships</div>
                            </div>
                          )
                        }
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
              <div className="column-2">
                <div className={`skills-block block-block ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                      <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                      <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                      <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                    </svg>
                    <div className="cv-heading font-size-3">Skills</div>
                  </div>
                  <div className="skills-list">
                    {
                      skills.map((item, index) => (
                        <div className={`skills-list-item ${!item.name ? 'empty-field single' : ''}`} key={index}>
                          <div className="skills-name">{item.name ? item.name : 'Skill name'}</div>
                          {
                            !hide_experience_level && (
                              <div className="estimation-wrapper">
                                <div className="estimation-value additional-color-1-background" style={{ width: `${item.level ? (+item.level * 100) / 5 : '33.33'}%` }}></div>
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`languages-block block-block ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                      <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                      <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                      <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                    </svg>
                    <div className="cv-heading font-size-3">Languages</div>
                  </div>
                  <div className="languages-list">
                    {
                      languages.map((item, index) => (
                        <div className={`language-list-item ${!item.language ? 'empty-field' : ''}`} key={index}>
                          <div className="language-name">{item.language ? item.language : 'Language'}</div>
                          <div className="estimation-wrapper">
                            <div className="estimation-value additional-color-1-background" style={{ width: `${item.level ? (+item.level * 100) / 6 : '66.66'}%` }}></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`references-block block-block ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                      <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                      <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                      <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                    </svg>
                    <div className="cv-heading font-size-3">References</div>
                  </div>
                  <div className="info-section">
                    {
                      reference.map((itemRef, index) => (
                        <div className="block-info" key={index}>
                          <div className={`${!itemRef.fullName && !itemRef.company && !beforeСontent ? 'hide' : ''}`}>
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
                </div>
                <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                      <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                      <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                      <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                    </svg>
                    <div className="cv-heading font-size-3">Certificates</div>
                  </div>
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
                <div className={`hobbies-block block-block ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                      <line y1="5" x2="22" y2="5" stroke="#5E5E5E" />
                      <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2" />
                      <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800" />
                    </svg>
                    <div className="cv-heading font-size-3">Hobbies</div>
                  </div>
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
              </div>
            </div>
            <div className="cv-body-area bottom-area">
              <div className="bottom-block">
                <div className={`profile-additional-info ${!contact[0].driverLicense && !contact[0].nationality && !contact[0].placeOfBirth && !contact[0].dateOfBirth && !contact[0].email && !contact[0].phone && !contact[0].country && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`footer-block ${!contact[0].country && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Address</div>
                    <div className="value">
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
                  <div className={`footer-block ${!contact[0]?.phone && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Phone</div>
                    <div className={`value ${!contact[0].phone ? 'empty-field' : ''}`}>
                      {contact[0]?.phone || '736-343-9384'}
                    </div>
                  </div>
                  <div className={`footer-block ${!contact[0]?.nationality && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Nationality</div>
                    <div className={`value ${!contact[0]?.nationality ? 'empty-field' : ''}`}>
                      {contact[0]?.nationality ? contact[0]?.nationality : 'German'}
                    </div>
                  </div>
                  <div className={`footer-block ${!contact[0]?.dateOfBirth && !contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Date / Place of Birth</div>
                    <div className="value">
                      <span className={`${!contact[0]?.dateOfBirth ? 'empty-field' : ''} ${!contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0]?.dateOfBirth ? moment(contact[0]?.dateOfBirth).format("DD-MM-yy") : '14-08-1991'} {` `}
                      </span>
                      <span className={`${!contact[0]?.placeOfBirth ? 'empty-field' : ''} ${!contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0]?.placeOfBirth ? contact[0]?.placeOfBirth : 'Berlin'}
                      </span>
                    </div>
                  </div>
                  <div className={`footer-block ${!contact[0]?.email && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">E-mail</div>
                    <div className={`value ${!contact[0].email ? 'empty-field' : ''}`}>
                      {contact[0].email || 'designer@webservice.com'}
                    </div>
                  </div>
                  <div className={`footer-block ${!contact[0]?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">Driving Licence</div>
                    <div className={`value ${!contact[0]?.driverLicense ? 'empty-field' : ''}`}>
                      {contact[0]?.driverLicense ? contact[0]?.driverLicense : 'Class 1'}
                    </div>
                  </div>
                </div>
                <div className={`links-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                  {
                    isArray(social_links) && social_links.length && (
                      social_links.map((itemSocial, index) => (
                        <a className="links-item additional-color-1-svg" key={index}>
                          {socialHelper(itemSocial.name)}
                        </a>
                      ))
                    ) || (
                      <>
                        <a className="links-item empty-field additional-color-1-svg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.6466 1.33335H2.35329C2.22634 1.33158 2.10029 1.35484 1.98233 1.4018C1.86438 1.44876 1.75683 1.51849 1.66582 1.60702C1.57482 1.69555 1.50215 1.80113 1.45195 1.91775C1.40176 2.03437 1.37503 2.15973 1.37329 2.28668V13.7133C1.37503 13.8403 1.40176 13.9657 1.45195 14.0823C1.50215 14.1989 1.57482 14.3045 1.66582 14.393C1.75683 14.4815 1.86438 14.5513 1.98233 14.5982C2.10029 14.6452 2.22634 14.6684 2.35329 14.6667H13.6466C13.7736 14.6684 13.8996 14.6452 14.0176 14.5982C14.1355 14.5513 14.2431 14.4815 14.3341 14.393C14.4251 14.3045 14.4978 14.1989 14.548 14.0823C14.5982 13.9657 14.6249 13.8403 14.6266 13.7133V2.28668C14.6249 2.15973 14.5982 2.03437 14.548 1.91775C14.4978 1.80113 14.4251 1.69555 14.3341 1.60702C14.2431 1.51849 14.1355 1.44876 14.0176 1.4018C13.8996 1.35484 13.7736 1.33158 13.6466 1.33335ZM5.39329 12.4933H3.39329V6.49334H5.39329V12.4933ZM4.39329 5.65334C4.11747 5.65334 3.85294 5.54377 3.6579 5.34874C3.46286 5.1537 3.35329 4.88917 3.35329 4.61334C3.35329 4.33752 3.46286 4.07299 3.6579 3.87795C3.85294 3.68292 4.11747 3.57334 4.39329 3.57334C4.53975 3.55673 4.68808 3.57125 4.82854 3.61593C4.96901 3.66062 5.09845 3.73447 5.2084 3.83265C5.31834 3.93083 5.40631 4.05113 5.46654 4.18567C5.52677 4.3202 5.5579 4.46594 5.5579 4.61334C5.5579 4.76075 5.52677 4.90649 5.46654 5.04102C5.40631 5.17556 5.31834 5.29586 5.2084 5.39404C5.09845 5.49222 4.96901 5.56607 4.82854 5.61076C4.68808 5.65544 4.53975 5.66995 4.39329 5.65334ZM12.6066 12.4933H10.6066V9.27334C10.6066 8.46668 10.32 7.94001 9.59329 7.94001C9.3684 7.94166 9.14942 8.0122 8.96585 8.14213C8.78228 8.27205 8.64295 8.45513 8.56663 8.66668C8.51445 8.82337 8.49185 8.98839 8.49996 9.15334V12.4867H6.49996C6.49996 12.4867 6.49996 7.03334 6.49996 6.48668H8.49996V7.33334C8.68164 7.01808 8.9459 6.75836 9.26425 6.58215C9.58261 6.40593 9.943 6.31991 10.3066 6.33334C11.64 6.33334 12.6066 7.19335 12.6066 9.04001V12.4933Z" fill="#605C64" />
                          </svg>
                        </a>
                        <a className="links-item empty-field additional-color-1-svg">
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
    </div >
  )
}

