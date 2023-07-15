import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";

const drawing = () => {
  if (typeof window != 'undefined') {
    var current_page_number = 1;
    var max_page_number = 1;

    function rebuildingPages() {
      current_page_number = 1;
      max_page_number = 1;

      $('.cv-body.cv-body-visible').remove();

      // var header_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-1').clone();
      var footer_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-3').clone();
      var photo_block = $('#cv-body-hidden-container .photo-block').clone();
      var profile_block = $('#cv-body-hidden-container .profile-block').clone();
      var employment_history_block = $('#cv-body-hidden-container .employment-history-block').clone();
      var extra_curricular_activities_block = $('#cv-body-hidden-container .extra-curricular-activities-block').clone();
      var internships_block = $('#cv-body-hidden-container .internships-block').clone();
      var references_block = $('#cv-body-hidden-container .references-block').clone();
      var details_block = $('#cv-body-hidden-container .details-block').clone();
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

      //
      getPageColumnLeft().append(references_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        references_block.remove();
        current_page_number++;
        getPageColumnLeft().append(references_block);
      }

      if (max_page_number < current_page_number) {
        max_page_number = current_page_number;
      }

      // Right block
      current_page_number = 1;
      getPageColumnRight().append(languages_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        languages_block.remove();
        current_page_number++;
        getPageColumnRight().append(languages_block);
      }

      getPageColumnRight().append(skills_block);
      if (getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number)) {
        skills_block.remove();
        current_page_number++;
        getPageColumnRight().append(skills_block);
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

      current_page_number = 1;
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

export const ResumeCv006 = ({
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

  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";
  
  useEffect(() => {
    if (isTemplate) {
        drawing();
    }

    if (!!isDrawing && !isTemplate) {
        drawing();
        handleFalseDrafind();
    }
}, [isDrawing, data, stateClasses]);

  return (
    <div className="sv_006" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text">
            <div className="cv-body-area top-area">
              <div className="profile-block profile-information additional-color-1-border">
                {
                  !!contact?.[0]?.picture && (
                    <div className="photo-wrapper">
                      <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                    </div>
                  )
                }
                <div className="profile-info">
                  {
                    isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                      <h1 className="cv-name font-size-3">
                        {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                      </h1>
                    )
                  }
                  {
                    isArray(contact) && contact?.[0]?.jobTitle && (
                      <h2 className="cv-prophecy font-size-2">{contact?.[0]?.jobTitle}</h2>
                    )
                  }
                  {
                    !!career_objective?.[0]?.data && (
                      <p className="profile-info-text" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    )
                  }
                  {
                    isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                      <div className="profile-additional-info">
                        {
                          !!contact?.[0]?.dateOfBirth && (
                            <p className="profile-info-item">
                              <span className="item-name">Birth Date</span>
                              <span className="item-value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}</span>
                            </p>
                          )
                        }
                        {
                          !!contact?.[0]?.placeOfBirth && (
                            <p className="profile-info-item">
                              <span className="item-name">Place of Birth</span>
                              <span className="item-value">{contact?.[0]?.placeOfBirth}</span>
                            </p>
                          )
                        }
                        {
                          !!contact?.[0]?.nationality && (
                            <p className="profile-info-item">
                              <span className="item-name">Nationality</span>
                              <span className="item-value">{contact?.[0]?.nationality}</span>
                            </p>
                          )
                        }
                        {
                          !!contact?.[0]?.driverLicense && (
                            <p className="profile-info-item">
                              <span className="item-name">Driving Licence</span>
                              <span className="item-value">{contact?.[0]?.driverLicense}</span>
                            </p>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="cv-body-area middle-area">
              <div className="column-1">
                {
                  (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    employment.map((itemEm, index) => (
                      <div className={`employment-history-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          {
                            (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <p className="date-range">
                                {!!itemEm?.periodFrom?.date && (checkForSymbol([itemEm?.periodTo?.date]) ? moment(itemEm?.periodFrom?.date).format("MM/yy") + ' - ' : moment(itemEm?.periodFrom?.date).format("MM/yy"))}
                                {!!itemEm?.periodTo?.date && (moment(itemEm?.periodTo?.date).format("MM/yy"))}
                                </p>
                            )
                          }
                        </div>

                        <div className="right-side additional-color-1-border">
                          <span className="block-circle additional-color-1-background"></span>
                          {
                            (index == 0) && (
                              <h3 className="cv-heading font-size-2">Employment History</h3>
                            )
                          }
                          <p className="cv-subheading">
                            {!!itemEm?.title && (checkForSymbol([itemEm?.company, itemEm?.city])) ? itemEm?.title + ', ' : itemEm?.title}
                            {!!itemEm?.company && (checkForSymbol([itemEm?.city])) ? itemEm?.company + ', ' : itemEm?.company}
                            {!!itemEm?.city && (itemEm?.city)}
                          </p>
                          <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                        </div>
                      </div>
                    ))
                  )
                }

                {
                  (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    education.map((itemEd, index) => (
                      <div className={`education-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemEd?.dateFrom?.date && (checkForSymbol([itemEd?.dateTo?.date]) ? moment(itemEd?.dateFrom?.date).format("MM/yy") + ' - ' : moment(itemEd?.dateFrom?.date).format("MM/yy"))}
                                {!!itemEd?.dateTo?.date && (moment(itemEd?.dateTo?.date).format("MM/yy"))}
                              </p>
                            )
                          }
                        </div>
                        <div className="right-side additional-color-1-border">
                          <span className="block-circle additional-color-1-background"></span>
                          {
                            (index == 0) && (
                              <h3 className="cv-heading font-size-2">Education</h3>
                            )
                          }
                          {
                            (!!itemEd?.facility || !!itemEd?.study) && (
                              <p className="cv-subheading">
                                {!!itemEd?.facility && (checkForSymbol([itemEd?.study])) ? itemEd?.facility + ', ' : itemEd?.facility}
                                {!!itemEd?.study && (itemEd?.study)}
                                
                              </p>
                            )
                          }
                          {
                            itemEd?.degree && (
                              <p className="cv-subheading">{itemEd?.degree}</p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                        </div>
                      </div>
                    ))
                  )
                }
                {
                   (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                    courses.map((itemCo, index) => (
                      <div className={`courses-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemCo?.dateFrom?.date && (checkForSymbol([itemCo?.dateTo?.date]) ? moment(itemCo?.dateFrom?.date).format("MM/yy") + ' - ' : moment(itemCo?.dateFrom?.date).format("MM/yy"))}
                                {!!itemCo?.dateTo?.date && (moment(itemCo?.dateTo?.date).format("MM/yy"))}
                              </p>
                            )
                          }
                        </div>
                        <div className="right-side additional-color-1-border">
                          <span className="block-circle additional-color-1-background"></span>
                          {
                            (index == 0) && (
                              <h3 className="cv-heading font-size-2">Courses</h3>
                            )
                          }
                          {
                            !!itemCo?.title && (
                              <p className="cv-subheading">{itemCo?.title}</p>
                            )
                          }
                          {
                            !!itemCo?.institution && (
                              <p>{itemCo?.institution}</p>
                            )
                          }
                        </div>
                      </div>
                    ))
                  )
                }
                {
                  (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                    extra_curricular.map((itemEx, index) => (
                      <div key={index} className={`extra-curricular-activities-block block-block ${(index > 0) ? "block-net" : ""}`}>
                        <div className="left-side">
                          {
                            (
                              !!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemEx?.dateFrom?.date && (checkForSymbol([itemEx?.dateTo?.date]) ? moment(itemEx?.dateFrom?.date).format("MM/yy") + ' - ' : moment(itemEx?.dateFrom?.date).format("MM/yy"))}
                                {!!itemEx?.dateTo?.date && (moment(itemEx?.dateTo?.date).format("MM/yy"))}
                              </p>
                            )
                          }
                        </div>
                        <div className="right-side additional-color-1-border">
                          <span className="block-circle additional-color-1-background"></span>
                          {
                            (index == 0) && (
                              <h3 className="cv-heading font-size-2">Extra-curricular activities</h3>
                            )
                          }
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="cv-subheading">
                                {(!!itemEx?.title && checkForSymbol([itemEx?.employer])) ? itemEx?.title + ', ' : itemEx?.title}
                                {(!!itemEx?.employer && itemEx?.employer)}
                              </p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                        </div>
                      </div>
                    ))
                  )
                }

                {
                  (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    internship.map((itemIn, index) => (
                      <div key={index} className={`internships-block block-block  ${(index > 0) ? "block-net" : ""}`}>
                        <div className="left-side">
                          {
                            (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemIn?.dateFrom?.date && (checkForSymbol([itemIn?.dateTo?.date]) ? moment(itemIn?.dateFrom?.date).format("MM/yy") + ' - ' : moment(itemIn?.dateFrom?.date).format("MM/yy"))}
                                {!!itemIn?.dateTo?.date && (moment(itemIn?.dateTo?.date).format("MM/yy"))}
                              </p>
                            )
                          }
                        </div>
                        <div className="right-side additional-color-1-border">
                          <span className="block-circle additional-color-1-background"></span>
                          {
                            (index == 0) && (
                              <h3 className="cv-heading font-size-2">Internships</h3>
                            )
                          }
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="cv-subheading">
                                {!!itemIn?.jobTitle && (checkForSymbol([itemIn?.employer, itemIn?.city])) ? itemIn?.jobTitle + ', ' : itemIn?.jobTitle}
                                {!!itemIn?.employer && (checkForSymbol([itemIn?.city])) ? itemIn?.employer + ', ' : itemIn?.employer}
                                {!!itemIn?.city && (itemIn?.city)}
                              </p>
                            )
                          }
                          <div dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                        </div>
                      </div>
                    ))
                  )
                }
                {
                  (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                    <div className="references-block block-block">
                      <h3 className="cv-heading font-size-2">References</h3>

                      {
                        reference.map((itemRef, index) => (
                          <div className="block-content-wrapper" key={index}>
                            {
                              (!!itemRef?.fullName || !!itemRef?.company) && (
                                <span className="references-name">
                                  {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                  {!!itemRef?.company && (`${itemRef.company}`)}
                                </span>
                              )
                            }
                            {
                              !!itemRef?.email && (
                                <span>{itemRef.email}</span>
                              )
                            }
                            {
                              !!itemRef.phone && (
                                <span>{itemRef.phone}</span>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
              <div className="column-2">
                {
                  isArray(languages) && !!languages.length && (
                    <div className="languages-block block-block">
                      <h3 className="cv-heading font-size-2">Languages</h3>

                      <div className="languages-list">
                        {
                          languages.map((item, index) => (
                            <div className="language-list-item" key={index}>
                              <p className="language-name">{item.language}</p>
                              <p className="language-skill-estimation-wrapper">
                                <span className="estimation-value additional-color-1-background" style={{ width: `${(item.level * 100) / 6}%` }}></span>
                              </p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  isArray(skills) && !!skills.length && (
                    <div className="skills-block block-block">
                      <h3 className="cv-heading font-size-2">Skills</h3>

                      <div className="skills-list">
                        {
                          skills.map((item, index) => (
                            <div className="skills-list-item" key={index}>
                              <p className="skills-name">{item.name}</p>
                              {
                                !hide_experience_level && (
                                  <div className="skill-estimation-point-list">
                                    {
                                      [...new Array(5)].map((_, index) => (
                                        <svg key={index} className={`additional-color-1-svg-path ${(index + 1) <= item.level ? "additional-color-1-svg" : ""}`} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M5 0L6.29313 3.22016L9.75528 3.45492L7.09232 5.67984L7.93893 9.04508L5 7.2L2.06107 9.04508L2.90768 5.67984L0.244718 3.45492L3.70687 3.22016L5 0Z" fill="#606C70" />
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
                {
                  isArray(certificates) && !!certificates.length && (
                    <div className="certificates-block block-block">
                      <h3 className="cv-heading font-size-2">Certificates</h3>
                      <p className="certificates-info">
                        {
                          certificates.map((item, index) => (
                            <span key={index}>
                              {`${item.name}`}
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
                      <h3 className="cv-heading font-size-2">Hobbies</h3>
                      <p>
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
              </div>
            </div>
            {
              isArray(contact) && (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.phone || !!contact?.[0]?.address || !!contact?.[0]?.email || (isArray(social_links) && !!social_links.length)) && (
                <div className="cv-body-area bottom-area">
                  <div className="bottom-block additional-color-1-background">
                    {
                      !!contact?.[0]?.phone && (
                        <div className="footer-block">
                          <svg className="main-color-2-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.94 8.66683C12.7933 8.66683 12.64 8.62016 12.4933 8.58683C12.1966 8.52047 11.9047 8.43359 11.62 8.32683C11.3107 8.21432 10.9708 8.22016 10.6655 8.34323C10.3603 8.46631 10.1114 8.69792 9.96666 8.9935L9.81999 9.30016C9.17254 8.93297 8.57441 8.48493 8.03999 7.96683C7.52189 7.43241 7.07386 6.83428 6.70666 6.18683L7.01333 6.04683C7.3089 5.90211 7.54051 5.65318 7.66359 5.34796C7.78666 5.04273 7.79251 4.70277 7.67999 4.3935C7.57412 4.10618 7.48726 3.81221 7.41999 3.5135C7.38666 3.36683 7.35999 3.2135 7.33999 3.06683C7.25904 2.59724 7.01308 2.17199 6.64641 1.86766C6.27974 1.56332 5.81646 1.3999 5.33999 1.40683H3.33333C3.05149 1.40646 2.77276 1.46566 2.5154 1.58055C2.25805 1.69544 2.02788 1.86343 1.83999 2.0735C1.64821 2.28927 1.5054 2.544 1.42139 2.82019C1.33739 3.09638 1.31417 3.38748 1.35333 3.6735C1.71572 6.44826 2.98347 9.02593 4.95999 11.0068C6.94089 12.9834 9.51857 14.2511 12.2933 14.6135C12.3799 14.6201 12.4668 14.6201 12.5533 14.6135C13.0449 14.6142 13.5196 14.4338 13.8867 14.1068C14.0967 13.9189 14.2647 13.6888 14.3796 13.4314C14.4945 13.1741 14.5537 12.8953 14.5533 12.6135V10.6135C14.5497 10.1529 14.3872 9.70757 14.0933 9.35289C13.7993 8.99821 13.392 8.75588 12.94 8.66683ZM13.2667 12.6668C13.2664 12.7599 13.2468 12.8518 13.2089 12.9368C13.171 13.0217 13.1157 13.0978 13.0467 13.1602C12.9736 13.2267 12.8866 13.2762 12.7921 13.305C12.6975 13.3339 12.5978 13.3413 12.5 13.3268C10.0122 13.0019 7.70016 11.8682 5.91999 10.1002C4.13831 8.31847 2.99468 5.99841 2.66666 3.50016C2.65218 3.40239 2.65962 3.30261 2.68844 3.20806C2.71727 3.11352 2.76676 3.02656 2.83333 2.9535C2.89641 2.8836 2.97358 2.82785 3.05976 2.78993C3.14594 2.75201 3.23917 2.73278 3.33333 2.7335H5.33333C5.48743 2.72973 5.63808 2.77949 5.75964 2.8743C5.88119 2.96911 5.96613 3.10311 5.99999 3.2535C5.99999 3.4335 6.05999 3.62016 6.09999 3.80016C6.17704 4.14941 6.27954 4.49254 6.40666 4.82683L5.47333 5.26683C5.3129 5.34047 5.18823 5.47473 5.12666 5.64016C5.05998 5.80247 5.05998 5.98452 5.12666 6.14683C6.08613 8.202 7.73816 9.85403 9.79333 10.8135C9.95563 10.8802 10.1377 10.8802 10.3 10.8135C10.4654 10.7519 10.5997 10.6273 10.6733 10.4668L11.0933 9.5335C11.4373 9.65891 11.7891 9.76136 12.1467 9.84016C12.32 9.88016 12.5067 9.9135 12.6867 9.94016C12.837 9.97403 12.9711 10.059 13.0659 10.1805C13.1607 10.3021 13.2104 10.4527 13.2067 10.6068L13.2667 12.6668ZM9.33333 1.3335C9.17999 1.3335 9.01999 1.3335 8.86666 1.3335C8.68985 1.34853 8.52625 1.43318 8.41185 1.56883C8.29745 1.70448 8.24163 1.88002 8.25666 2.05683C8.27169 2.23364 8.35634 2.39724 8.49199 2.51164C8.62764 2.62603 8.80318 2.68186 8.97999 2.66683H9.33333C10.3942 2.66683 11.4116 3.08826 12.1618 3.8384C12.9119 4.58855 13.3333 5.60596 13.3333 6.66683C13.3333 6.78683 13.3333 6.90016 13.3333 7.02016C13.3185 7.19604 13.3741 7.37059 13.4878 7.50556C13.6016 7.64053 13.7642 7.7249 13.94 7.74016H13.9933C14.1602 7.74084 14.3213 7.6789 14.4447 7.56657C14.5682 7.45425 14.645 7.29971 14.66 7.1335C14.66 6.98016 14.66 6.82016 14.66 6.66683C14.66 5.2535 14.099 3.89795 13.1003 2.89795C12.1015 1.89795 10.7467 1.33526 9.33333 1.3335ZM10.6667 6.66683C10.6667 6.84364 10.7369 7.01321 10.8619 7.13823C10.9869 7.26326 11.1565 7.3335 11.3333 7.3335C11.5101 7.3335 11.6797 7.26326 11.8047 7.13823C11.9298 7.01321 12 6.84364 12 6.66683C12 5.95959 11.719 5.28131 11.2189 4.78121C10.7188 4.28111 10.0406 4.00016 9.33333 4.00016C9.15652 4.00016 8.98695 4.0704 8.86192 4.19543C8.7369 4.32045 8.66666 4.49002 8.66666 4.66683C8.66666 4.84364 8.7369 5.01321 8.86192 5.13823C8.98695 5.26326 9.15652 5.3335 9.33333 5.3335C9.68695 5.3335 10.0261 5.47397 10.2761 5.72402C10.5262 5.97407 10.6667 6.31321 10.6667 6.66683Z" fill="white" />
                          </svg>
                          <span className="main-color-2-text font-size-1">{contact?.[0]?.phone}</span>
                        </div>
                      )
                    }
                    {
                      !!contact?.[0]?.email && (
                        <div className="footer-block">
                          <svg className="main-color-2-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.6666 2.6665H3.33331C2.80288 2.6665 2.29417 2.87722 1.9191 3.25229C1.54403 3.62736 1.33331 4.13607 1.33331 4.6665V11.3332C1.33331 11.8636 1.54403 12.3723 1.9191 12.7474C2.29417 13.1225 2.80288 13.3332 3.33331 13.3332H12.6666C13.1971 13.3332 13.7058 13.1225 14.0809 12.7474C14.4559 12.3723 14.6666 11.8636 14.6666 11.3332V4.6665C14.6666 4.13607 14.4559 3.62736 14.0809 3.25229C13.7058 2.87722 13.1971 2.6665 12.6666 2.6665ZM3.33331 3.99984H12.6666C12.8435 3.99984 13.013 4.07008 13.1381 4.1951C13.2631 4.32012 13.3333 4.48969 13.3333 4.6665L7.99998 7.91984L2.66665 4.6665C2.66665 4.48969 2.73688 4.32012 2.86191 4.1951C2.98693 4.07008 3.1565 3.99984 3.33331 3.99984ZM13.3333 11.3332C13.3333 11.51 13.2631 11.6796 13.1381 11.8046C13.013 11.9296 12.8435 11.9998 12.6666 11.9998H3.33331C3.1565 11.9998 2.98693 11.9296 2.86191 11.8046C2.73688 11.6796 2.66665 11.51 2.66665 11.3332V6.1865L7.65331 9.23317C7.75466 9.29168 7.86962 9.32249 7.98665 9.32249C8.10367 9.32249 8.21863 9.29168 8.31998 9.23317L13.3333 6.1865V11.3332Z" fill="white" />
                          </svg>
                          <span className="main-color-2-text font-size-1">{contact?.[0]?.email}</span>
                        </div>
                      )
                    }
                    {
                      (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.address || !!contact?.[0]?.zipCode) && (
                        <div className="footer-block">
                          <svg className="main-color-2-svg" width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.24996 2.98644C8.25539 1.92558 6.90648 1.32959 5.49996 1.32959C4.09343 1.32959 2.74452 1.92558 1.74996 2.98644C0.755394 4.04731 0.196655 5.48615 0.196655 6.98644C0.196655 8.48674 0.755394 9.92558 1.74996 10.9864L5.04371 14.5064C5.10181 14.5689 5.17093 14.6185 5.2471 14.6524C5.32326 14.6862 5.40495 14.7036 5.48746 14.7036C5.56996 14.7036 5.65165 14.6862 5.72782 14.6524C5.80398 14.6185 5.8731 14.5689 5.93121 14.5064L9.24996 10.9531C10.2404 9.89666 10.7968 8.46381 10.7968 6.96978C10.7968 5.47574 10.2404 4.0429 9.24996 2.98644ZM8.35621 9.99978L5.49996 13.0598L2.64371 9.99978C2.07942 9.39732 1.69525 8.62994 1.53977 7.79464C1.38428 6.95933 1.46445 6.09361 1.77015 5.3069C2.07584 4.52019 2.59334 3.84781 3.25723 3.37476C3.92111 2.90171 4.70157 2.64923 5.49996 2.64923C6.29834 2.64923 7.0788 2.90171 7.74269 3.37476C8.40657 3.84781 8.92407 4.52019 9.22976 5.3069C9.53546 6.09361 9.61563 6.95933 9.46015 7.79464C9.30466 8.62994 8.92049 9.39732 8.35621 9.99978ZM3.62496 4.93978C3.1204 5.47963 2.83708 6.21082 2.83708 6.97311C2.83708 7.7354 3.1204 8.4666 3.62496 9.00644C3.99981 9.40697 4.4772 9.6805 4.99724 9.79271C5.51728 9.90493 6.0568 9.85083 6.54813 9.63721C7.03945 9.42359 7.46069 9.05996 7.75901 8.59194C8.05732 8.12392 8.21941 7.57236 8.22496 7.00644C8.22777 6.62858 8.15953 6.25395 8.02427 5.9047C7.88901 5.55546 7.68947 5.23868 7.43746 4.97311C7.18975 4.70283 6.89438 4.48747 6.56835 4.33942C6.24231 4.19137 5.89204 4.11356 5.53771 4.11046C5.18337 4.10737 4.83196 4.17904 4.50369 4.32137C4.17542 4.4637 3.87678 4.67386 3.62496 4.93978ZM6.55621 8.05978C6.31936 8.31627 6.00634 8.47705 5.67066 8.51461C5.33498 8.55218 4.9975 8.4642 4.7159 8.26573C4.4343 8.06725 4.22608 7.77061 4.12684 7.4265C4.02759 7.08239 4.04349 6.7122 4.1718 6.37921C4.30012 6.04623 4.53289 5.77112 4.83032 5.60093C5.12775 5.43075 5.47136 5.37605 5.80242 5.44619C6.13347 5.51633 6.4314 5.70695 6.64527 5.98547C6.85915 6.26398 6.97568 6.61309 6.97496 6.97311C6.96586 7.38462 6.80401 7.77546 6.52496 8.05978H6.55621Z" fill="white" />
                          </svg>
                          <span className="main-color-2-text font-size-1">{`${!!contact?.[0]?.country ? (`${contact?.[0]?.country},`) : ''} ${!!contact?.[0]?.address ? (`${contact?.[0]?.address},`) : ''} ${!!contact?.[0]?.city ? (`${contact?.[0]?.city},`) : ''} ${!!contact?.[0]?.zipCode ? contact?.[0]?.zipCode : ""}`}</span>
                        </div>
                      )
                    }
                    {
                      isArray(social_links) && !!social_links.length && (
                        <div className="footer-block">
                          <svg className="main-color-2-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.56877 9.61869L5.14377 12.0437C4.85017 12.327 4.45806 12.4854 4.05002 12.4854C3.64198 12.4854 3.24987 12.327 2.95627 12.0437C2.81227 11.9003 2.69802 11.7298 2.62005 11.5421C2.54209 11.3544 2.50196 11.1532 2.50196 10.9499C2.50196 10.7467 2.54209 10.5455 2.62005 10.3578C2.69802 10.1701 2.81227 9.99962 2.95627 9.85619L5.38127 7.43119C5.49896 7.3135 5.56508 7.15388 5.56508 6.98744C5.56508 6.821 5.49896 6.66138 5.38127 6.54369C5.26358 6.426 5.10396 6.35988 4.93752 6.35988C4.77108 6.35988 4.61146 6.426 4.49377 6.54369L2.06877 8.97494C1.58024 9.50668 1.31603 10.2066 1.33132 10.9285C1.3466 11.6505 1.6402 12.3386 2.15079 12.8492C2.66138 13.3598 3.3495 13.6534 4.07142 13.6686C4.79335 13.6839 5.49327 13.4197 6.02502 12.9312L8.45627 10.5062C8.57396 10.3885 8.64008 10.2289 8.64008 10.0624C8.64008 9.896 8.57396 9.73638 8.45627 9.61869C8.33858 9.501 8.17896 9.43488 8.01252 9.43488C7.84608 9.43488 7.68646 9.501 7.56877 9.61869ZM12.9313 2.06869C12.4055 1.54619 11.6944 1.25293 10.9531 1.25293C10.2119 1.25293 9.50078 1.54619 8.97502 2.06869L6.54377 4.49369C6.4855 4.55196 6.43927 4.62114 6.40773 4.69728C6.37619 4.77342 6.35996 4.85503 6.35996 4.93744C6.35996 5.01985 6.37619 5.10145 6.40773 5.17759C6.43927 5.25373 6.4855 5.32291 6.54377 5.38119C6.60204 5.43946 6.67123 5.48569 6.74736 5.51722C6.8235 5.54876 6.90511 5.56499 6.98752 5.56499C7.06993 5.56499 7.15154 5.54876 7.22768 5.51722C7.30381 5.48569 7.373 5.43946 7.43127 5.38119L9.85627 2.95619C10.1499 2.67283 10.542 2.51447 10.95 2.51447C11.3581 2.51447 11.7502 2.67283 12.0438 2.95619C12.1878 3.09962 12.302 3.27007 12.38 3.45776C12.4579 3.64545 12.4981 3.8467 12.4981 4.04994C12.4981 4.25318 12.4579 4.45442 12.38 4.64211C12.302 4.82981 12.1878 5.00026 12.0438 5.14369L9.61877 7.56869C9.56019 7.62679 9.51369 7.69591 9.48196 7.77208C9.45023 7.84824 9.4339 7.92993 9.4339 8.01244C9.4339 8.09494 9.45023 8.17664 9.48196 8.2528C9.51369 8.32896 9.56019 8.39809 9.61877 8.45619C9.67687 8.51477 9.746 8.56126 9.82216 8.59299C9.89832 8.62472 9.98001 8.64106 10.0625 8.64106C10.145 8.64106 10.2267 8.62472 10.3029 8.59299C10.379 8.56126 10.4482 8.51477 10.5063 8.45619L12.9313 6.02494C13.4538 5.49918 13.747 4.78805 13.747 4.04681C13.747 3.30558 13.4538 2.59445 12.9313 2.06869ZM5.51877 9.48119C5.57717 9.53911 5.64643 9.58494 5.72258 9.61604C5.79873 9.64715 5.88027 9.66291 5.96252 9.66244C6.04477 9.66291 6.12631 9.64715 6.20246 9.61604C6.27861 9.58494 6.34787 9.53911 6.40627 9.48119L9.48127 6.40619C9.59896 6.2885 9.66508 6.12888 9.66508 5.96244C9.66508 5.796 9.59896 5.63638 9.48127 5.51869C9.36358 5.401 9.20396 5.33488 9.03752 5.33488C8.87108 5.33488 8.71146 5.401 8.59377 5.51869L5.51877 8.59369C5.46019 8.65179 5.41369 8.72091 5.38196 8.79708C5.35023 8.87324 5.3339 8.95493 5.3339 9.03744C5.3339 9.11994 5.35023 9.20164 5.38196 9.2778C5.41369 9.35396 5.46019 9.42309 5.51877 9.48119Z" fill="white" />
                          </svg>
                          <div className="social-info">
                            {
                              social_links.map((item, index) => (        
                                  <a key={index} className="main-color-2-text font-size-1">{item.name}</a>
                              ))
                            }
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div >
  )
}

