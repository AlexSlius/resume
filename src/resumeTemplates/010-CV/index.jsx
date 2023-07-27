import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { checkForSymbol } from "../../utils/checkForSymbol";

const drawing = () => {
  if (typeof window != "undefined") {
    var current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let cvBlocksLeft = [
        'top-block',
        'profile-block',
        'references-block',
        'employment-history-block',
        'education-block',
        'courses-block',
        'extra-curricular-activities-block',
        'internships-block'
      ];
      let cvBlocksRight = [
        'photo-block',
        'details-block',
        'links-block',
        'skills-block',
        'certificates-block',
        'hobbies-block',
        'languages-block'
      ];

      let cvDataLeft = [];
      let cvDataRight = [];

      cvBlocksLeft.forEach(function (el) {
        cvDataLeft.push($('.' + el).clone());
      });
      cvBlocksRight.forEach(function (el) {
        cvDataRight.push($('.' + el).clone());
      });

      current_page_number = 1;
      cvDataLeft.forEach(function (el) {
        getPageColumnLeft().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnLeft().append(el);
        }
      });

      current_page_number = 1;
      cvDataRight.forEach(function (el) {
        getPageColumnRight().append(el);
        if (checkHeight()) {
          console.log(el);
          el.remove();
          current_page_number++;
          getPageColumnRight().append(el);
        }
      });
      checkEmpty();
    }
    function getPageColumnLeft() {
      return getPageContainer().find('.column-left');
    }
    function getPageColumnRight() {
      return getPageContainer().find('.information-block');
    }
    function checkHeight() {
      return getPageContainer().outerHeight() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
    }
    function getPageContainer() {
      var page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
      if (page.length > 0) {
        return page.find('.cv-body-content');
      } else {
        return createNewPage(current_page_number);
      }
    }
    function createNewPage() {
      var page_element = $('#cv-body-hidden-container').clone();
      page_element.attr('id', '');
      page_element.attr('class', 'cv-body cv-body-visible cv-body-1 page-' + current_page_number);
      page_element.children().remove();

      var page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();
      page_element_container.children().remove();
      page_element.append(page_element_container);

      var area_left = $('#cv-body-hidden-container .cv-body-content .column-left').clone();
      area_left.children().remove();
      page_element_container.append(area_left);

      var area_right = $('#cv-body-hidden-container .cv-body-content .column-right').clone();
      area_right.children().remove();
      page_element_container.append(area_right);

      var area_right_info = $('#cv-body-hidden-container .cv-body-content .information-block').clone();
      area_right_info.children().remove();
      area_right.append(area_right_info);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }
    function checkEmpty() {
      $('.cv-body-area').each(function (index, el) {
        if ($(this).height() === 0) {
          $(this).remove();
        }
      });
    }

    rebuildingPages();
  }
}

export const ResumeCv010 = ({
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
    <div className="sv_010" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={` ${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-2 additional-color-4-background additional-color-2-text">
            <div className="column-left">
              <div className={`top-block ${!contact[0].firstName && !contact[0].lastName && !contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                <div className={`cv-name font-size-5 additional-color-1-text ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                  <span className={`${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].firstName || 'Matthew'}{` `}
                  </span>
                  <span className={`${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].lastName || 'Mcconaughey'}
                  </span>
                </div>
                <div className={`cv-profession font-size-3 ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                  {contact[0].jobTitle || 'Web-designer'}
                </div>
              </div>
              <div className={`profile-block block-block ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-4 additional-color-1-text">Profile</div>
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
              <div className={`references-block block-block ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-4 additional-color-1-text">References</div>
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
              <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-4 additional-color-1-text">Employment History</div>
                {
                  employment.map((itemEm, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading font-size-3 ${!itemEm.title && !itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
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
                      <div className={`date-range ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                        <div className={`date-range-item ${!itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''}`}>
                            {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MMMM yy") + ' - ' : moment(itemEm.periodFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <svg className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className={`date-range-item ${!itemEm.periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''}`}>
                            {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                          <svg className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      {
                        itemEm.assignment && (
                          <div className="text-block" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                        ) || (
                          <div className={`text-block empty-field ${!itemEm.assignment && !beforeСontent ? 'hide' : ''}`}>
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
                <div className="cv-heading font-size-4 additional-color-1-text">Education</div>
                {
                  education.map((itemEd, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading font-size-3 ${!itemEd.study && !itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.study && (checkForSymbol([itemEd.facility])) ? itemEd.study + ', ' : itemEd.study || 'Marketing and Management'}
                        </span>
                        <span className={`${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.facility ? itemEd.facility : ', Harcum College, PortlandM'}
                        </span>
                      </div>
                      <div className={`date-range ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !itemEd?.degree && !beforeСontent ? 'hide' : ''}`}>
                        <div className={`date-range-item ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''}`}>
                            {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <svg className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className={`date-range-item ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemEd.dateTo?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''}`}>
                            {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                          <svg className={`${!itemEd.dateTo?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className={`cv-degree ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.degree ? itemEd.degree : 'Bachelor'}
                        </div>
                      </div>
                      {
                        itemEd.description && (
                          <div className="block-content-wrapper" dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
                        ) || (
                          <div className={`block-content-wrapper empty-field ${!itemEd.description && !beforeСontent ? 'hide' : ''}`}>
                            I have learned to merge marketing and management skills in a very efficient way and produce great results. Even though managing hundreds of people is hard, all skills are learned to do that.
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
              <div className={`courses-block block-block ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-4 additional-color-1-text">Courses</div>
                {
                  courses.map((itemCo, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading font-size-3 ${!itemCo.title && !itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemCo.title ? 'empty-field' : ''} ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.title && (checkForSymbol([itemCo.institution])) ? itemCo.title + ', ' : itemCo.title || 'Marketing and Management'}
                        </span>
                        <span className={`${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.institution ? itemCo.institution : ', Harcum College, PortlandM'}
                        </span>
                      </div>
                      <div className={`date-range ${!itemCo.dateFrom?.date && !itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                        <div className={`date-range-item ${!itemCo.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''}`}>
                            {itemCo.dateFrom?.date && (checkForSymbol([itemCo.dateTo?.date]) ? moment(itemCo.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemCo.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <svg className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className={`date-range-item ${!itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemCo.dateTo?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemCo.dateTo?.date ? 'empty-field' : ''}`}>
                            {itemCo.dateTo?.date && (moment(itemCo.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                          <svg className={`${!itemCo.dateTo?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className={`extra-curricular-activities-block block-block ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-4 additional-color-1-text">Extra-curricular activities</div>
                {
                  extra_curricular.map((itemEx, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading font-size-3 ${!itemEx.title && !itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemEx.title ? 'empty-field' : ''} ${!itemEx.title && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemEx.employer]) ? itemEx.title + ', ' : itemEx.title || 'UX Designer'}
                        </span>
                        <span className={`${!itemEx.employer ? 'empty-field' : ''} ${!itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                          {itemEx.employer || ', My own company'}
                        </span>
                      </div>
                      <div className={`date-range ${!itemEx.dateFrom?.date && !itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                        <div className={`date-range-item ${!itemEx.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''}`}>
                            {itemEx.dateFrom?.date && (checkForSymbol([itemEx.dateTo?.date]) ? moment(itemEx.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEx.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <svg className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className={`date-range-item ${!itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemEx.dateTo?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemEx.dateTo?.date ? 'empty-field' : ''}`}>
                            {itemEx.dateTo?.date && (moment(itemEx.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                          <svg className={`${!itemEx.dateTo?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      {
                        itemEx.description && (
                          <div className="block-content-wrapper" dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                        ) || (
                          <div className={`block-content-wrapper empty-field ${!itemEx.description && !beforeСontent ? 'hide' : ''}`}>
                            I was doing research for about five different projects. The goal was to find out the biggest issues with the current concept and solution how to solve them.
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
              <div className={`internships-block block-block ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-4 additional-color-1-text">Internships</div>
                {
                  internship.map((itemIn, index) => (
                    <div className="block-info" key={index}>
                      <div className={`cv-subheading font-size-3 ${!itemIn.jobTitle && !itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
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
                      <div className={`date-range ${!itemIn.dateFrom?.date && !itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                        <div className={`date-range-item ${!itemIn.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''}`}>
                            {itemIn.dateFrom?.date && (checkForSymbol([itemIn.dateTo?.date]) ? moment(itemIn.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemIn.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <svg className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className={`date-range-item ${!itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <svg className={`${!itemIn.dateTo?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className={`${!itemIn.dateTo?.date ? 'empty-field' : ''}`}>
                            {itemIn.dateTo?.date && (moment(itemIn.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                          <svg className={`${!itemIn.dateTo?.date ? 'empty-field' : ''}`} width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                            <defs>
                              <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                <stop offset="0.104167" stopColor="#D13B83" />
                                <stop offset="0.895833" stopColor="#477A97" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      {
                        itemIn.description && (
                          <div className="block-content-wrapper" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                        ) || (
                          <div className={`block-content-wrapper empty-field ${!itemIn.description && !beforeСontent ? 'hide' : ''}`}>
                            Handled each product and package with care and precision. Handled much of the communication between clients and the lead Graphic Designer.
                            Worked productively with Product Team to understand requirements and business specifications around Portfolio Management, Analytics and Risk.
                          </div>
                        )
                      }
                    </div>
                  ))}
              </div>
            </div>
            <div className="column-right">
              <div className="information-block additional-color-5-background">
                {
                  contact[0]?.picture && (
                    <div className="photo-block">
                      <svg className="svg-1" width="157" height="157" viewBox="0 0 157 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="78.5" cy="78.5" r="77.5" stroke="url(#paint0_linear_160_945)" strokeWidth="2" />
                        <defs>
                          <linearGradient id="paint0_linear_160_945" x1="156" y1="155.962" x2="0.999996" y2="155.962" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#60A9CC" />
                            <stop offset="1" stopColor="#D13B83" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <svg className="svg-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_f_160_947)">
                          <circle cx="10" cy="10" r="6" fill="url(#paint0_radial_160_947)" fillOpacity="0.4" />
                        </g>
                        <circle cx="9.33333" cy="10.3333" r="3.33333" fill="url(#paint1_radial_160_947)" />
                        <defs>
                          <filter id="filter0_f_160_947" x="0" y="0" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_160_947" />
                          </filter>
                          <radialGradient id="paint0_radial_160_947" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 10) rotate(90) scale(6)">
                            <stop offset="0.640625" stopColor="#D13B83" />
                            <stop offset="0.9999" stopColor="#60A9CC" />
                            <stop offset="1" stopColor="#D36D9E" />
                          </radialGradient>
                          <radialGradient id="paint1_radial_160_947" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.33333 10.3333) rotate(90) scale(3.33333)">
                            <stop stopColor="white" />
                            <stop offset="0.7625" stopColor="#D36D9E" />
                            <stop offset="0.989583" stopColor="#D13B83" />
                          </radialGradient>
                        </defs>
                      </svg>
                      <div className="photo" style={{ backgroundImage: `url(${contact[0].picture})` }}></div>
                    </div>
                  )
                }
                <div className={`details-block block-block ${!contact[0].nationality && !contact[0]?.driverLicense && !contact[0].dateOfBirth && !contact[0].placeOfBirth && !contact[0].phone && !contact[0].email && !contact[0].country && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-3 main-color-4-text">Details</div>
                  <div className={`${!contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
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
                  <div className={`${!contact[0].phone ? 'empty-field' : ''}`}>
                    {contact[0].phone || '736-343-9384'}
                  </div>
                  <div className={`email ${!contact[0].email ? 'empty-field' : ''}`}>
                    {contact[0].email || 'designer@webservice.com'}
                  </div>
                  <div className={`item-block ${!contact[0]?.nationality && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name main-color-4-text font-size-1"> Nationality</div>
                    {
                      contact[0]?.nationality && (
                        <div className="value">{contact[0].nationality}</div>
                      ) || (
                        <div className="value empty-field">German</div>
                      )
                    }
                  </div>
                  <div className={`item-block ${!contact[0]?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name main-color-4-text font-size-1">DrivingLicense</div>
                    {
                      contact[0]?.driverLicense && (
                        <div className="value">{contact[0].driverLicense}</div>
                      ) || (
                        <div className="value empty-field">Class 1</div>
                      )
                    }
                  </div>
                  <div className={`item-block ${!contact[0].dateOfBirth && !contact[0].placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name main-color-4-text font-size-1">Date/PlaceOfBirth</div>
                    <div className="value">
                      <div className={`${!contact[0].dateOfBirth ? 'empty-field' : ''} ${!contact[0].dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0].dateOfBirth ? moment(contact[0].dateOfBirth).format("DD-MM-yy") : "14-08-1991"}
                      </div>
                      <div className={`${!contact[0].placeOfBirth ? 'empty-field' : ''} ${!contact[0].placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0].placeOfBirth || "Berlin"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`links-block block-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-3 main-color-4-text">Links</div>
                  {
                    isArray(social_links) && social_links.length && (
                      social_links.map((itemSocial, index) => (
                        <a className="links-item" key={index}>
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
                <div className={`skills-block block-block ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-3 main-color-4-text">Skills</div>
                  <div className="skills-list">
                    {
                      skills.map((item, index) => (
                        <div className={`skills-list-item ${!item.name ? 'empty-field' : ''}`} key={index}>
                          <div className="skill-item-name">
                            {item.name ? item.name : 'Skill name'}
                          </div>
                          {
                            !hide_experience_level && (
                              <div className="item-value-container additional-color-3-background">
                                <span className="item-value" style={{ width: `${item.level ? (+item.level * 100) / 5 : "33.33"}%` }}>
                                  <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_f_216_2030)">
                                      <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fillOpacity="0.4" />
                                    </g>
                                    <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                                    <defs>
                                      <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                                      </filter>
                                      <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                        <stop offset="0.640625" stopColor="#4685A4" />
                                        <stop offset="0.9999" stopColor="#60A9CC" />
                                        <stop offset="1" stopColor="#60A9CC" />
                                      </radialGradient>
                                      <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                        <stop stopColor="white" />
                                        <stop offset="0.7625" stopColor="#60A9CC" />
                                        <stop offset="0.989583" stopColor="#4685A4" />
                                      </radialGradient>
                                    </defs>
                                  </svg>
                                </span>
                                <span className="empty-gap additional-color-3-background"></span>
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-3 main-color-4-text">Certificates</div>
                  <div className="certificate-names">
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
                  <div className="cv-heading font-size-3 main-color-4-text">Hobbies</div>
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
                  <div className="cv-heading font-size-3 main-color-4-text">Languages</div>
                  <div className="languages-list">
                    {
                      languages.map((item, index) => (
                        <div className={`languages-list-item ${!item.language ? 'empty-field' : ''}`} key={index}>
                          <div className="list-item-name font-size-2">
                            {item.language ? item.language : 'Language'}
                          </div>
                          <div className="item-value-container">
                            <span className="item-value" style={{ width: `${item.level ? (+item.level * 100) / 6 : "66.66"}%` }}>
                              <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_f_216_2030)">
                                  <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fillOpacity="0.4" />
                                </g>
                                <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                                <defs>
                                  <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                                  </filter>
                                  <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                    <stop offset="0.640625" stopColor="#4685A4" />
                                    <stop offset="0.9999" stopColor="#60A9CC" />
                                    <stop offset="1" stopColor="#60A9CC" />
                                  </radialGradient>
                                  <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                    <stop stopColor="white" />
                                    <stop offset="0.7625" stopColor="#60A9CC" />
                                    <stop offset="0.989583" stopColor="#4685A4" />
                                  </radialGradient>
                                </defs>
                              </svg>
                            </span>
                            <span className="empty-gap additional-color-3-background"></span>
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
  )
}

