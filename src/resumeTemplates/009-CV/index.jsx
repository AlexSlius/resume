import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";

import Icon from "../../components/Icon";

import imgBg from "/public/styles/resumes/009/image/bgBot.svg?sprite";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let photo_block = $('#cv-body-hidden-container .cv-body-content .photo-wrapper').clone();
      let main_info_block = $('#cv-body-hidden-container .cv-body-content .main-info-block').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let information_block_1 = $('#cv-body-hidden-container .cv-body-content .information-block-1').clone();
      let information_block_2 = $('#cv-body-hidden-container .cv-body-content .information-block-2').clone();
      let information_block_3 = $('#cv-body-hidden-container .cv-body-content .information-block-3').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();

      current_page_number = 1;

      getContentContainer1().append(photo_block);
      if (checkHeight()) {
        photo_block.remove();
        current_page_number++;
        getContentContainer1().append(photo_block);
      }

      getContentContainer2().append(main_info_block);
      if (checkHeight()) {
        main_info_block.remove();
        current_page_number++;
        getContentContainer2().append(main_info_block);
      }

      getContentContainer2().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer2().append(links_block);
      }

      //
      current_page_number = 1;
      getContentContainer3().append(profile_block);
      if (checkHeight()) {
        profile_block.remove();
        current_page_number++;
        getContentContainer3().append(profile_block);
      }

      getContentContainer3().append(information_block_1);
      if (checkHeight()) {
        information_block_1.remove();
        current_page_number++;
        getContentContainer3().append(information_block_1);
      }

      getContentContainer3().append(information_block_2);
      if (checkHeight()) {
        information_block_2.remove();
        current_page_number++;
        getContentContainer3().append(information_block_2);
      }

      getContentContainer3().append(information_block_3);
      if (checkHeight()) {
        information_block_3.remove();
        current_page_number++;
        getContentContainer3().append(information_block_3);
      }

      //
      current_page_number = 1;

      getContentContainer4().append(employment_history_block);
      if (checkHeight()) {
        employment_history_block.remove();
        current_page_number++;
        getContentContainer4().append(employment_history_block);
      }

      getContentContainer4().append(education_block);
      if (checkHeight()) {
        education_block.remove();
        current_page_number++;
        getContentContainer4().append(education_block);
      }

      getContentContainer4().append(courses_block);
      if (checkHeight()) {
        courses_block.remove();
        current_page_number++;
        getContentContainer4().append(courses_block);
      }

      getContentContainer4().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        current_page_number++;
        getContentContainer4().append(internships_block);
      }

      getContentContainer4().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getContentContainer4().append(extra_curricular_activities_block);
      }

      //

      current_page_number = 1;

      getContentContainer5().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer5().append(references_block);
      }
    }

    function getContentContainer1() {
      return getPageContainer().find('.top-area .column-left');
    }

    function getContentContainer2() {
      return getPageContainer().find('.top-area .column-right');
    }

    function getContentContainer3() {
      return getPageContainer().find('.middle-area .column-left');
    }

    function getContentContainer4() {
      return getPageContainer().find('.middle-area .column-right');
    }

    function getContentContainer5() {
      return getPageContainer().find('.bottom-area .block-container');
    }

    function checkHeight() {
      console.log("Test 1: ", getPageContainer().outerHeight());
      console.log("Test 2: ", getPageContainer().parent().outerHeight());

      return getPageContainer().outerHeight() > getPageContainer().parent().outerHeight();
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
      page_element.addClass(['cv-body-visible', 'page-' + current_page_number]);

      let page_element_container = page_element.find('.cv-body-content');
      page_element_container.find('.top-area .column-left').children().remove();
      page_element_container.find('.top-area .column-right').children().remove();
      page_element_container.find('.middle-area .column-left').children().remove();
      page_element_container.find('.middle-area .column-right').children().remove();
      page_element_container.find('.bottom-area .block-container').children().remove();

      page_element.append(page_element_container);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }

    $(document).ready(function () {
      rebuildingPages();
    });
  }
}

export const ResumeCv009 = ({
  data,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
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

  useEffect(() => {
    if (isTemplate) {
        drawing();
    }

    if (!!isDrawing && !isTemplate) {
        drawing();
        handleFalseDrafind();
    }
}, [isDrawing, data]);

  return (
    <div className="sv_009" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content">
            <div className="cv-body-area top-area">
              <div className="background-image">
                <img src="/styles/resumes/009/image/top_area_bg.png" />
              </div>
              <div className="column-left">
                {
                  !!contact?.[0]?.picture && (
                    <div className="photo-wrapper">
                      <img src={contact?.[0]?.picture} />
                    </div>
                  )
                }
              </div>
              <div className="column-right">
                {
                  isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                    <h1 className="cv-name main-color-2-text font-weight-400 font-size-8 line-height-9-1">
                      {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                    </h1>
                  )
                }
                <div className="white-line main-color-2-border"></div>
                {
                  isArray(contact) && contact?.[0]?.jobTitle && (
                    <h2 className="cv-prophecy main-color-2-text font-size-7 line-height-8-1">{contact?.[0]?.jobTitle}</h2>
                  )
                }
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-wrapper">
                      <p className="links-heading main-color-2-text font-weight-700 font-size-4 line-height-6">Links</p>
                      {
                        social_links.map((item, index) => (
                          <a className="main-color-2-text font-weight-500 font-size-4 line-height-5" key={index}>{item.name}</a>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            </div>
            <div className="cv-body-area middle-area">
              <div className="column-left additional-color-3-background">
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-block main-color-1-background">
                      <h3 className="profile-heading main-color-2-text font-weight-500 font-size-6 line-height-8">Profile</h3>
                      <p className="profile-text main-color-2-text font-weight-300 font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  )
                }
                <div className="information-block information-block-1 additional-color-1-background">
                  <svg className="left-corner main-color-1-svg" viewBox="0 0 117 26">
                    <path d="M 0,0 117,0 0,26 z" />
                  </svg>
                  <svg className="right-corner main-color-1-svg" viewBox="0 0 117 26">
                    <path d="M 0,0 117,0 117,26 z" />
                  </svg>
                  <div className="right-corner main-color-1-background"></div>
                  {
                    isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                      <div className="profile-details-block">
                        {
                          !!contact?.[0]?.nationality && (
                            <div className="details-block-item">
                              <p className="block-item-name main-color-1-text font-weight-700 font-size-1 line-height-1">NATIONALITY</p>
                              <p className="block-item-value main-color-2-text font-weight-500 font-size-1 line-height-1">{contact?.[0]?.nationality}</p>
                            </div>
                          )
                        }
                        {
                          !!contact?.[0]?.driverLicense && (
                            <div className="details-block-item">
                              <p className="block-item-name main-color-1-text font-weight-700 font-size-1 line-height-1">DRIVING LICENSE</p>
                              <p className="block-item-value main-color-2-text font-weight-500 font-size-1 line-height-1">{contact?.[0]?.driverLicense}</p>
                            </div>
                          )
                        }
                        {
                          (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                            <div className="details-block-item">
                              <p className="block-item-name main-color-1-text font-weight-700 font-size-1 line-height-1">DATE / PLACE OF BIRTH</p>
                              <p className="block-item-value main-color-2-text font-weight-500 font-size-1 line-height-1">{!!contact?.[0]?.dateOfBirth && moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} {contact?.[0]?.placeOfBirth || ""}</p>
                            </div>
                          )
                        }
                      </div>
                    )
                  }

                  {
                    (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.email || !!contact?.[0]?.phone || !!contact?.[0]?.address || !!contact?.[0]?.zipCode) && (
                      <div className="additional-details-block">
                        <p className="main-color-2-text font-weight-500 font-size-1 line-height-1">{`${!!contact?.[0]?.country ? (`${contact?.[0]?.country},`) : ''} ${!!contact?.[0]?.address ? (`${contact?.[0]?.address},`) : ''} ${!!contact?.[0]?.city ? (`${contact?.[0]?.city},`) : ''} ${!!contact?.[0]?.zipCode ? contact?.[0]?.zipCode : ""} ${contact?.[0]?.phone || ""} ${contact?.[0]?.email || ""}`}</p>
                      </div>
                    )
                  }
                </div>
                <div className="information-block information-block-2 additional-color-2-background">
                  <svg className="left-corner additional-color-1-svg" viewBox="0 0 117 26">
                    <path d="M 0,0 117,0 0,26 z" />
                  </svg>
                  <svg className="right-corner additional-color-1-svg" viewBox="0 0 117 26">
                    <path d="M 0,0 117,0 117,26 z" />
                  </svg>
                  {
                    (!!(isArray(skills) && skills.length) || !!(isArray(languages) && languages.length)) && (
                      <div className="skills-block">
                        <h3 className="heading-type-1 main-color-2-text font-weight-500 font-size-6 line-height-8">Skills</h3>
                        <div className="skills-list">
                          {
                            skills.map((item, index) => (
                              <div className="skills-list-item" key={index}>
                                <p className="list-item-name main-color-1-text font-weight-500 font-size-1-1 line-height-3">{item.name}</p>
                                {
                                  !hide_experience_level && (
                                    <div className="skill-estimation-points">
                                      {
                                        [...new Array(+item.level)].map((_, itemIndex) => (
                                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" key={itemIndex}>
                                            <path d="M5 0.5L6.12257 3.95492H9.75528L6.81636 6.09017L7.93893 9.54508L5 7.40983L2.06107 9.54508L3.18364 6.09017L0.244718 3.95492H3.87743L5 0.5Z" fill="#ECE8E0" />
                                          </svg>
                                        ))
                                      }
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
                </div>
                <div className="information-block information-block-3 additional-color-3-background">
                  <svg className="left-corner additional-color-2-svg" viewBox="0 0 117 26">
                    <path d="M 0,0 117,0 0,26 z" />
                  </svg>
                  <svg className="right-corner additional-color-2-svg" viewBox="0 0 117 26">
                    <path d="M 0,0 117,0 117,26 z" />
                  </svg>
                  {
                     isArray(hobbies) && !!hobbies.length && (
                      <div className="hobbies-block">
                        <h3 className="heading-type-1 main-color-2-text font-weight-500 font-size-6 line-height-8">Hobbies</h3>
                        <div className="font-weight-500 font-size-1-1 line-height-2-2">
                          {
                            hobbies.map((item, index) => (
                              <span key={index}>
                                {`${item.text}${((hobbies.length - 1) != index) ? (", ") : ""}`}
                              </span>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                  {
                    isArray(languages) && !!languages.length && (
                      <div className="languages-block">
                        <h3 className="heading-type-1 main-color-2-text font-weight-500 font-size-6 line-height-8">Languages</h3>
                        <div className="languages-list">
                          {
                            languages.map((item, index) => (
                              <div className="languages-list-item" key={index}>
                                <p className="main-color-1-text font-weight-500 font-size-1-1 line-height-3">{item.language}</p>
                                <div className="language-estimation-wrapper">
                                  <div className="language-estimation main-color-2-background" style={{ width: `${(+item.level * 100) / 6}%` }}></div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                  {
                    isArray(certificates) && !!certificates.length && (
                      <div className="certificates-block">
                        <h3 className="heading-type-1 main-color-2-text font-weight-500 font-size-6 line-height-8">Certificates</h3>
                        <p className="main-color-1-text font-weight-500 font-size-1-1 line-height-3">
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
                </div>
              </div>
              <div className="column-right main-color-3-background">
                {
                 (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    <div className="employment-history-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-2 main-color-2-text additional-color-2-background font-weight-500 font-size-5 line-height-7">Employment History</h3>
                        <div className="right-line additional-color-2-background"></div>
                      </div>

                      {
                        employment.map((itemEm, index) => (
                          <div key={index}>
                            <p className="subheading-line main-color-1-text font-weight-500 font-size-3 line-height-5">
                              {!!itemEm?.title && (`${itemEm?.title}, `)}
                              {!!itemEm?.company && (` ${itemEm?.company}, `)}
                              {!!itemEm?.city && (`${itemEm?.city} `)}
                            </p>

                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range main-color-1-text font-weight-500 font-size-3 line-height-4">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMM yy")}`)}</p>
                              )
                            }
                            <div className="block-content-wrapper main-color-1-text font-weight-400 font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                   (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    <div className="education-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 main-color-2-text additional-color-2-background font-weight-500 font-size-5 line-height-7">Education</h3>
                        <div className="right-line additional-color-2-background"></div>
                      </div>

                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            {
                              (!!itemEd?.study) && (
                                <p className="subheading-line subheading">
                                  <span className="text-type-1 font-weight-500 font-size-3 line-height-5">{!!itemEd?.study && (`${itemEd?.study}, `)}  {itemEd?.facility && (`${itemEd.facility}`)}</span>
                                  {/* <span className="text-type-2 font-weight-500 font-size-3 line-height-5">Bachelor</span> */}
                                </p>
                              )
                            }
                            {
                              (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                <p className="date-range font-weight-500 font-size-3 line-height-4">
                                  {
                                    !!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMM yy")}`)
                                  }
                                </p>
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
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 main-color-2-text additional-color-2-background font-size-5 line-height-7">Courses</h3>
                        <div className="right-line additional-color-2-background"></div>
                      </div>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            {
                              (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                <p className="date-range main-color-1-text font-weight-500 font-size-3 line-height-4">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMM yy")}`)}</p>
                              )
                            }
                            {
                              (!!itemCo?.title || !!itemCo?.institution) && (
                                <div className="block-content-wrapper">
                                  <p className="font-weight-400 font-size-1 line-height-1">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                                </div>
                              )
                            }
                          </div>
                        ))}
                    </div>
                  )
                }

                {
                  (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    <div className="internships-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 main-color-2-text additional-color-2-background font-weight-500 font-size-5 line-height-7">Internships</h3>
                        <div className="right-line additional-color-2-background"></div>
                      </div>

                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            {
                              (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                                <p className="subheading-line font-weight-500 font-size-3 line-height-5">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                              )
                            }
                            {
                              (
                                !!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (<p className="date-range font-weight-500 font-size-3 line-height-4">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMM yy")}`)}</p>
                              )
                            }
                            <div className="block-content-wrapper font-weight-400 font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))}
                    </div>
                  )
                }

                {
                  (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                    <div className="extra-curricular-activities-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-2 main-color-2-text additional-color-2-background font-weight-500 font-size-5 line-height-7">Extra-curricular activities</h3>
                        <div className="right-line additional-color-2-background"></div>
                      </div>

                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <p className="subheading-line font-weight-500 font-size-3 line-height-5">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                              )
                            }
                            {
                              (
                                !!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (<p className="date-range font-weight-500 font-size-3 line-height-4">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMM yy")}`)}</p>
                              )
                            }
                            <div className="block-content-wrapper font-weight-400 font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            </div>
            <div className="cv-body-area bottom-area">
              <div className="bg-image-container">
                <Icon svg={imgBg} classNames={["additional-color-2-svg-path"]} />
              </div>
              {
               (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                  <div className="references-block">
                    <h3 className="references-heading main-color-2-text font-size-5 line-height-7">References</h3>
                    {
                      reference.map((itemRef, index) => (
                        <div key={index}>
                          {
                            (!!itemRef?.fullName || !!itemRef?.company) && (
                              <p className="main-color-2-text font-size-1 line-height-1">
                                {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                {!!itemRef?.company && (`${itemRef.company}`)}
                              </p>
                            )
                          }
                          {
                            !!itemRef?.email && (
                              <p className="main-color-2-text font-size-1 line-height-1">{itemRef.email}</p>
                            )
                          }
                          {
                            !!itemRef.phone && (
                              <p className="main-color-2-text font-size-1 line-height-1">{itemRef.phone}</p>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

