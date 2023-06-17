import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";

export const ResumeCv010 = ({
  data,
  idCv,
  stateClasses,
  reportTemplateRef
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
  } = data;
  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";

  React.useEffect(() => {
    if (typeof window != 'undefined') {
      var current_page_number = 1;

      function rebuildingPages() {
        $('.cv-body.cv-body-visible').remove();
        var top_block = $('#cv-body-hidden-container .cv-body-content .top-block').clone();
        var profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
        var references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
        var employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
        var education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
        var courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
        var extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
        var internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();

        var photo_block = $('#cv-body-hidden-container .cv-body-content .photo-block').clone();
        var details_block = $('#cv-body-hidden-container .cv-body-content .details-block').clone();
        var links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
        var skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
        var certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();
        var hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
        var languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();

        current_page_number = 1;
        getContentContainer1().append(top_block);
        if (checkHeight()) {
          top_block.remove();
          current_page_number++;
          getContentContainer1().append(top_block);
        }

        getContentContainer1().append(profile_block);
        if (checkHeight()) {
          profile_block.remove();
          current_page_number++;
          getContentContainer1().append(profile_block);
        }

        getContentContainer1().append(references_block);
        if (checkHeight()) {
          references_block.remove();
          current_page_number++;
          getContentContainer1().append(references_block);
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

        current_page_number = 1;

        getContentContainer2().append(photo_block);
        if (checkHeight()) {
          photo_block.remove();
          current_page_number++;
          getContentContainer2().append(photo_block);
        }
        getContentContainer2().append(details_block);
        if (checkHeight()) {
          details_block.remove();
          current_page_number++;
          getContentContainer2().append(details_block);
        }
        getContentContainer2().append(links_block);
        if (checkHeight()) {
          links_block.remove();
          current_page_number++;
          getContentContainer2().append(links_block);
        }
        getContentContainer2().append(skills_block);
        if (checkHeight()) {
          skills_block.remove();
          current_page_number++;
          getContentContainer2().append(skills_block);
        }
        getContentContainer2().append(certificates_block);
        if (checkHeight()) {
          certificates_block.remove();
          current_page_number++;
          getContentContainer2().append(certificates_block);
        }

        getContentContainer2().append(hobbies_block);
        if (checkHeight()) {
          hobbies_block.remove();
          current_page_number++;
          getContentContainer2().append(hobbies_block);
        }
        getContentContainer2().append(languages_block);
        if (checkHeight()) {
          languages_block.remove();
          current_page_number++;
          getContentContainer2().append(languages_block);
        }
      }

      function checkHeight() {
        return getPageContainer().height() > getPageContainer().parent().height();
      }

      function getContentContainer1() {
        return getPageContainer().find('.column-left');
      }

      function getContentContainer2() {
        return getPageContainer().find('.column-right .information-block');
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
        var page_element = $('#cv-body-hidden-container').clone();

        page_element.attr('id', '');
        page_element.attr('class', 'cv-body cv-body-visible cv-body-1 page-' + current_page_number);
        page_element.children().remove();

        var page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();
        page_element_container.children().remove();
        page_element.append(page_element_container);

        var column_left = $('#cv-body-hidden-container .cv-body-content .column-left').clone();
        column_left.children().remove();
        page_element_container.append(column_left);

        var column_right = $('#cv-body-hidden-container .cv-body-content .column-right').clone();
        column_right.find('.information-block').children().remove();
        page_element_container.append(column_right);

        if ($('#cv-chapter-section-cv').find(page_element)) {
          $('#cv-chapter-section-cv').append(page_element);
        }

        return page_element_container;
      }

      $(document).ready(function () {
        rebuildingPages();
      });
    }
  }, [data, stateClasses]);

  return (
    <div className="sv_010" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={` ${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content additional-color-4-background additional-color-2-text">
            <div className="column-left">
              <div className="top-block">
                {
                  isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                    <h1 className="cv-name font-size-5 line-height-6">
                      {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                    </h1>
                  )
                }
                {
                  isArray(contact) && contact?.[0]?.jobTitle && (
                    <h2 className="cv-prophecy font-size-3 line-height-4 main-color-4-text">{contact?.[0]?.jobTitle.toUpperCase()}</h2>
                  )
                }
              </div>
              {
                !!career_objective?.[0]?.data && (
                  <div className="profile-block block-block">
                    <h3 className="heading-type-1 font-size-4 line-height-5">Profile</h3>
                    <p className="font-size-2 line-height-2" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                  </div>
                )
              }
              {
                (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                  <div className="references-block block-block">
                    <h3 className="heading-type-1 font-size-4 line-height-5">References</h3>
                    {
                      reference.map((itemRef, index) => (
                        <div key={index}>
                          {
                            (!!itemRef?.fullName || !!itemRef?.company) && (
                              <p className="font-size-2 line-height-2">
                                {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                {!!itemRef?.company && (`${itemRef.company}`)}
                              </p>
                            )
                          }
                          {
                            !!itemRef?.email && (
                              <p className="font-size-2 line-height-2">{itemRef.email}</p>
                            )
                          }
                          {
                            !!itemRef.phone && (
                              <p className="font-size-2 line-height-2">{itemRef.phone}</p>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                  <div className="employment-history-block block-block">
                    <h3 className="heading-type-1 font-size-4 line-height-5">Employment History</h3>
                    {
                      employment.map((itemEm, index) => (
                        <div key={index}>
                          <p className="subheading font-size-3 line-height-4 main-color-4-text">
                            {!!itemEm?.title && (`${itemEm?.title}, `)}
                            {!!itemEm?.company && (` ${itemEm?.company}, `)}
                            {!!itemEm?.city && (`${itemEm?.city} `)}
                          </p>
                          {
                            (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <div className="date-range font-size-1 line-height-0">
                                {
                                  !!itemEm?.periodFrom?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemEm?.periodFrom?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }
                                {
                                  !!itemEm?.periodTo?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemEm?.periodTo?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }
                              </div>
                            )
                          }
                          <div className="text-block">
                            <div className="bullet">
                              <div className="inner-bullet-1">
                                <div className="inner-bullet-2"></div>
                              </div>
                            </div>
                            <p className="text-block-text font-size-2 line-height-2" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                  <div className="education-block block-block">
                    <h3 className="heading-type-1 font-size-4 line-height-5">Education</h3>
                    {
                      education.map((itemEd, index) => (
                        <div key={index}>
                          {
                            (!!itemEd?.study) && (
                              <p className="subheading font-size-3 line-height-4 main-color-4-text">{itemEd?.facility && (`${itemEd.facility}, `)} {!!itemEd?.study && (`${itemEd?.study}, `)} {itemEd?.degree && (`${itemEd?.degree}`)} </p>
                            )
                          }
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <div className="date-range font-size-1 line-height-0">
                                {
                                  !!itemEd?.dateFrom?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemEd?.dateFrom?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }
                                {
                                  !!itemEd?.dateTo?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemEd?.dateTo?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }
                                {/* <p className="subheading-additional font-size-2 line-height-2">Bachelor</p> */}
                              </div>
                            )
                          }
                          <div className="block-content-wrapper font-weight-400 font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                 (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                  <div className="courses-block block-block">
                    <h3 className="heading-type-1 font-size-4 line-height-5">Courses</h3>
                    {
                      courses.map((itemCo, index) => (
                        <div key={index}>
                          {
                            (!!itemCo?.title || !!itemCo?.institution) && (
                              <p className="subheading font-size-3 line-height-4 main-color-4-text">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                            )
                          }

                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <div className="date-range font-size-1 line-height-0">
                                {
                                  !!itemCo?.dateFrom?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemCo?.dateFrom?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }
                                {
                                  !!itemCo?.dateTo?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemCo?.dateTo?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }
                              </div>
                            )
                          }
                        </div>
                      ))}
                  </div>
                )
              }
              {
                (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                  <div className="extra-curricular-activities-block block-block">
                    <h3 className="heading-type-1 font-size-4 line-height-5">Extra-curricular activities</h3>
                    {
                      extra_curricular.map((itemEx, index) => (
                        <div key={index}>
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="subheading font-size-3 line-height-4 main-color-4-text">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                            )
                          }
                          {
                            (
                              !!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <div className="date-range font-size-1 line-height-0">
                                {
                                  !!itemEx?.dateFrom?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemEx?.dateFrom?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }
                                {
                                  !!itemEx?.dateTo?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemEx?.dateTo?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }
                              </div>
                            )
                          }
                          <div className="font-size-2 line-height-2" dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                        </div>
                      ))
                    }
                  </div>
                )
              }

              {
                (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                  <div className="internships-block block-block">
                    <h3 className="heading-type-1 font-size-4 line-height-5">Internships</h3>
                    {
                      internship.map((itemIn, index) => (
                        <div key={index}>
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="subheading font-size-3 line-height-4 main-color-4-text">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                            )
                          }
                          {
                            (
                              !!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                              <div className="date-range font-size-1 line-height-0">
                                {
                                  !!itemIn?.dateFrom?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemIn?.dateFrom?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }

                                {
                                  !!itemIn?.dateTo?.date && (
                                    <div className="date-range-item">
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <span>{moment(itemIn?.dateTo?.date).format("MMM yy")}</span>
                                      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fillOpacity="0.2" />
                                        <defs>
                                          <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.104167" stopColor="#D13B83" />
                                            <stop offset="0.895833" stopColor="#477A97" />
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                    </div>
                                  )
                                }

                              </div>
                            )
                          }
                          <div className="text-block">
                            <div className="bullet">
                              <div className="inner-bullet-1">
                                <div className="inner-bullet-2"></div>
                              </div>
                            </div>
                            <p className="text-block-text font-size-2 line-height-2" dangerouslySetInnerHTML={{ __html: itemIn.description }}></p>
                          </div>
                        </div>
                      ))}
                  </div>
                )
              }
            </div>
            <div className="column-right">
              <div className="information-block additional-color-5-background">
                {
                  !!contact?.[0]?.picture && (
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
                      <img src={contact?.[0]?.picture} />
                    </div>
                  )
                }
                {
                  isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.email || contact?.[0]?.phone || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                    <div className="details-block block-block">
                      <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Details</h3>
                      {
                        !!contact?.[0]?.address && (
                          <p className="font-size-2 line-height-2">{contact?.[0]?.address}</p>
                        )
                      }
                      {
                        (!!contact?.[0]?.city || !!contact?.[0]?.zipCode) && (
                          <p className="font-size-2 line-height-2">{!!contact?.[0]?.city && (`${contact?.[0]?.city}, `)} {contact?.[0]?.zipCode}</p>
                        )
                      }
                      {
                        !!contact?.[0]?.country && (
                          <p className="font-size-2 line-height-2">{contact?.[0]?.country}</p>
                        )
                      }
                      {
                        !!contact?.[0]?.phone && (
                          <p className="font-size-2 line-height-2">{contact?.[0]?.phone}</p>
                        )
                      }
                      {
                        !!contact?.[0]?.email && (
                          <p className="email font-size-2 line-height-2">{contact?.[0]?.email}</p>
                        )
                      }
                      {
                        !!contact?.[0]?.nationality && (
                          <div className="details-block-item">
                            <p className="item-name main-color-4-text font-size-1 line-height-0">N AT I O N A L I T Y</p>
                            <p className="item-value additional-color-2-text font-size-2 line-height-1-1">{contact?.[0]?.nationality}</p>
                          </div>
                        )
                      }
                      {
                        !!contact?.[0]?.driverLicense && (
                          <div className="details-block-item">
                            <p className="item-name main-color-4-text font-size-1 line-height-0">D R I V I N G L I C E N S E</p>
                            <p className="item-value additional-color-2-text font-size-2 line-height-1-1">{contact?.[0]?.driverLicense}</p>
                          </div>
                        )
                      }
                      {
                        (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                          <div className="details-block-item">
                            <p className="item-name main-color-4-text font-size-1 line-height-0">D A T E / P L A C E O F B I R T H</p>
                            <p className="item-value additional-color-2-text font-size-2 line-height-1-1">{!!contact?.[0]?.dateOfBirth && (<>{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}<br /></>)} {contact?.[0]?.placeOfBirth || ""}</p>
                          </div>
                        )
                      }
                    </div>
                  )
                }
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-block block-block">
                      <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Links</h3>
                      {
                        social_links.map((item, index) => (
                          <a className="font-size-2 line-height-2" key={index}>{item.name}</a>
                        ))
                      }
                    </div>
                  )
                }
                {
                  !!(isArray(skills) && skills.length) && (
                    <div className="skills-block block-block">
                      <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Skills</h3>
                      <div className="skills-list">
                        {
                          skills.map((item, index) => (
                            <div className="skills-list-item" key={index}>
                              <p className="skill-item-name font-size-2 line-height-3">{item.name}</p>
                              {
                                !hide_experience_level && (
                                  <div className="item-value-container additional-color-3-background">
                                    <span className="item-value" style={{ width: `${(+item.level * 100) / 5}%` }}>
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
                  )
                }
                {
                  isArray(certificates) && !!certificates.length && (
                    <div className="certificates-block block-block">
                      <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Certificates</h3>
                      <p className="font-size-2 line-height-3">
                        {
                          certificates.map((item, index) => (
                            <span key={index}>
                              {`${item.name}${((certificates.length - 1) != index) ? (", ") : ""}`}
                            </span>
                          ))
                        }
                      </p>
                    </div>
                  )
                }
                {
                  isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block block-block">
                      <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Hobbies</h3>
                      <p className="font-size-2 line-height-3">
                        {
                          hobbies.map((item, index) => (
                            <span key={index}>
                              {`${item.text}${((hobbies.length - 1) != index) ? (", ") : ""}`}
                            </span>
                          ))
                        }
                      </p>
                    </div>
                  )
                }
                {
                  isArray(languages) && !!languages.length && (
                    <div className="languages-block block-block">
                      <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Languages</h3>
                      <div className="languages-list">
                        {
                          languages.map((item, index) => (
                            <div className="languages-list-item" key={index}>
                              <p className="list-item-name font-size-2 line-height-3">{item.language}</p>
                              <div className="item-value-container">
                                <span className="item-value" style={{ width: `${(+item.level * 100) / 6}%` }}>
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
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

