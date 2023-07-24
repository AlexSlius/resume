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
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  stateClasses,
  reportTemplateRef,
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

useEffect(() => {
  if (isTemplate) {
    setTimeout(() => {
      drawing();
    }, 100);
  }
}, []);

  return (
    <div className="sv_029" ref={reportTemplateRef}>
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
                      <h1 className="cv-name font-size-4">
                        {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                      </h1>
                    )
                  }
                  {
                    isArray(contact) && contact?.[0]?.jobTitle && (
                      <h2 className="cv-prophecy font-size-3 additional-color-1-text">{contact?.[0]?.jobTitle}</h2>
                    )
                  }
                  {
                    !!career_objective?.[0]?.data && (
                      <p className="profile-info-text" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="cv-body-area middle-area">
              <div className="column-1">
                <div className="employment-history-block block-block">
                  {
                    (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                      
                        employment.map((itemEm, index) => (
                          <div className="block-info" key={index}>
                            {
                              (index == 0) && (
                                <div className="cv-heading-block">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                    <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                                    <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                                    <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                                  </svg>
                                  <h3 className="cv-heading font-size-3 additional-color-1-text">Employment History</h3>
                                </div>
                              )
                            }
                            <p className="cv-subheading font-size-2">
                              {!!itemEm?.title && (checkForSymbol([itemEm?.company, itemEm?.city])) ? itemEm?.title + ', ' : itemEm?.title}
                              {!!itemEm?.company && (checkForSymbol([itemEm?.city])) ? itemEm?.company + ', ' : itemEm?.company}
                              {!!itemEm?.city && (itemEm?.city)}
                            </p>
                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range">
                                  {!!itemEm?.periodFrom?.date && (checkForSymbol([itemEm?.periodTo?.date]) ? moment(itemEm?.periodFrom?.date).format("MMMM yy") + ' - ' : moment(itemEm?.periodFrom?.date).format("MMMM yy"))}
                                  {!!itemEm?.periodTo?.date && (moment(itemEm?.periodTo?.date).format("MMMM yy"))}
                                  </p>
                              )
                            }
                            <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                    )
                  }
                </div>
                <div className="education-block block-block">
                  {
                    (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                      education.map((itemEd, index) => (
                        <div className="block-info" key={index}>
                          {
                            (index == 0) && (
                              <div className="cv-heading-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                  <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                                  <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                                  <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                                </svg>
                                <h3 className="cv-heading font-size-3 additional-color-1-text">Education</h3>
                              </div>
                            )
                          }
                          {
                            (!!itemEd?.facility || !!itemEd?.study) && (
                              <p className="cv-subheading font-size-2">
                                {!!itemEd?.facility && (checkForSymbol([itemEd?.study])) ? itemEd?.facility + ', ' : itemEd?.facility}
                                {!!itemEd?.study && (itemEd?.study)}
                                
                              </p>
                            )
                          }
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemEd?.dateFrom?.date && (checkForSymbol([itemEd?.dateTo?.date]) ? moment(itemEd?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEd?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemEd?.dateTo?.date && (moment(itemEd?.dateTo?.date).format("MMMM yy"))}
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
                      ))
                    )
                  }
                </div>
                <div className="courses-block block-block" >
                  {
                    (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                      courses.map((itemCo, index) => (
                        <div className="block-info" key={index}>
                          {
                            (index == 0) && (
                              <div className="cv-heading-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                  <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                                  <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                                  <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                                </svg>
                                <h3 className="cv-heading font-size-3 additional-color-1-text">Courses</h3>
                              </div>
                            )
                          }
                          {
                            (!!itemCo?.title || !!itemCo?.institution) && (
                              <p className="cv-subheading font-size-2">
                                {!!itemCo?.title && (checkForSymbol([itemCo?.institution])) ? itemCo?.title + ', ' : itemCo?.title}
                                {!!itemCo?.institution && (itemCo?.institution)}
                                
                              </p>
                            )
                          }
                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemCo?.dateFrom?.date && (checkForSymbol([itemCo?.dateTo?.date]) ? moment(itemCo?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemCo?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemCo?.dateTo?.date && (moment(itemCo?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                        </div>
                      ))
                    )
                  }
                </div>
                <div className="extra-curricular-activities-block block-block">
                  {
                    (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                      extra_curricular.map((itemEx, index) => (
                        <div className="block-info" key={index}>
                          {
                            (index == 0) && (
                              <div className="cv-heading-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                  <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                                  <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                                  <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                                </svg>
                                <h3 className="cv-heading font-size-3 additional-color-1-text">Extra-curricular activities</h3>
                              </div>
                            )
                          }
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="cv-subheading font-size-2">
                                {(!!itemEx?.title && checkForSymbol([itemEx?.employer])) ? itemEx?.title + ', ' : itemEx?.title}
                                {(!!itemEx?.employer && itemEx?.employer)}
                              </p>
                            )
                          }
                          {
                            (
                              !!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemEx?.dateFrom?.date && (checkForSymbol([itemEx?.dateTo?.date]) ? moment(itemEx?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEx?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemEx?.dateTo?.date && (moment(itemEx?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                        </div>
                      ))
                    )
                  }
                </div>
                <div className="internships-block block-block">
                  {
                    (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                      internship.map((itemIn, index) => (
                        <div className="block-info" key={index}>
                          {
                            (index == 0) && (
                              <div className="cv-heading-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                                  <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                                  <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                                  <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                                </svg>
                                <h3 className="cv-heading font-size-3 additional-color-1-text">Internships</h3>
                              </div>
                            )
                          }
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="cv-subheading font-size-2">
                                {!!itemIn?.jobTitle && (checkForSymbol([itemIn?.employer, itemIn?.city])) ? itemIn?.jobTitle + ', ' : itemIn?.jobTitle}
                                {!!itemIn?.employer && (checkForSymbol([itemIn?.city])) ? itemIn?.employer + ', ' : itemIn?.employer}
                                {!!itemIn?.city && (itemIn?.city)}
                              </p>
                            )
                          }
                          {
                            (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemIn?.dateFrom?.date && (checkForSymbol([itemIn?.dateTo?.date]) ? moment(itemIn?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemIn?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemIn?.dateTo?.date && (moment(itemIn?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                          <div dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                        </div>
                      ))
                    )
                  }
                </div>
              </div>
              <div className="column-2">
                {
                  isArray(skills) && !!skills.length && (
                    <div className="skills-block block-block">
                      <div className="cv-heading-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                          <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                          <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                          <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                        </svg>
                        <h3 className="cv-heading font-size-3">Skills</h3>
                      </div>

                      <div className="skills-list">
                        {
                          skills.map((item, index) => (
                            <div className="skills-list-item" key={index}>
                              <p className="skills-name">{item.name}</p>
                              {
                                !hide_experience_level && (
                                  <div className="estimation-wrapper">
                                    <div className="estimation-value additional-color-1-background" style={{ width: `${(+item.level * 100) / 5}%` }}></div>
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
                  isArray(languages) && !!languages.length && (
                    <div className="languages-block block-block">
                      <div className="cv-heading-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                          <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                          <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                          <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                        </svg>
                        <h3 className="cv-heading font-size-3">Languages</h3>
                      </div>

                      <div className="languages-list">
                        {
                          languages.map((item, index) => (
                            <div className="language-list-item" key={index}>
                              <p className="language-name">{item.language}</p>
                              <div className="estimation-wrapper">
                                    <div className="estimation-value additional-color-1-background" style={{ width: `${(+item.level * 100) / 5}%` }}></div>
                                  </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                    <div className="references-block block-block">
                      <div className="cv-heading-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                          <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                          <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                          <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                        </svg>
                        <h3 className="cv-heading font-size-3">References</h3>
                      </div>
                      <div className="info-section">
                        {
                          reference.map((itemRef, index) => (
                            <div className="block-info" key={index}>
                              {
                                (!!itemRef?.fullName || !!itemRef?.company) && (
                                  <p>
                                    {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                    {!!itemRef?.company && (`${itemRef.company}`)}
                                  </p>
                                )
                              }
                              {
                                !!itemRef?.email && (
                                  <p>{itemRef.email}</p>
                                )
                              }
                              {
                                !!itemRef.phone && (
                                  <p>{itemRef.phone}</p>
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
                      <div className="cv-heading-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                          <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                          <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                          <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                        </svg>
                        <h3 className="cv-heading font-size-3">Certificates</h3>
                      </div>
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
                      <div className="cv-heading-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="10" viewBox="0 0 29 10" fill="none">
                          <line y1="5" x2="22" y2="5" stroke="#5E5E5E"/>
                          <rect x="20" y="0.5" width="9" height="9" rx="4.5" fill="#E2E2E2"/>
                          <rect className="additional-color-1-svg" x="22" y="2.5" width="5" height="5" rx="2.5" fill="#C84800"/>
                        </svg>
                        <h3 className="cv-heading font-size-3">Hobbies</h3>
                      </div>
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
                  <div className="bottom-block">
                    <div className="profile-additional-info">
                      {
                        isArray(contact) && (!!contact?.[0]?.zipCode || !!contact?.[0]?.address || !!contact?.[0]?.city || !!contact?.[0]?.phone || !!contact?.[0]?.email || !!contact?.[0]?.country || !!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                          <>
                            {
                              (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.address || !!contact?.[0]?.zipCode) && (
                                <div className="footer-block">
                                  <span className="item-name">Address</span>
                                  <span className="item-value">{`${!!contact?.[0]?.country ? (`${contact?.[0]?.country},`) : ''} ${!!contact?.[0]?.address ? (`${contact?.[0]?.address},`) : ''} ${!!contact?.[0]?.city ? (`${contact?.[0]?.city},`) : ''} ${!!contact?.[0]?.zipCode ? contact?.[0]?.zipCode : ""}`}</span>
                                </div>
                              )
                            }
                            {
                              !!contact?.[0]?.phone && (
                                <div className="footer-block">
                                  <span className="item-name">Phone</span>
                                  <span className="item-value">{contact?.[0]?.phone}</span>
                                </div>
                              )
                            }
                            {
                              !!contact?.[0]?.nationality && (
                                <div className="footer-block">
                                  <span className="item-name">Nationality</span>
                                  <span className="item-value">{contact?.[0]?.nationality}</span>
                                </div>
                              )
                            }
                            {
                              !!contact?.[0]?.dateOfBirth && (
                                <div className="footer-block">
                                  <span className="item-name">Date / Place of Birth</span>
                                  <span className="item-value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} {contact?.[0]?.placeOfBirth}</span>
                                </div>
                              )
                            }
                            {
                              !!contact?.[0]?.email && (
                                <div className="footer-block">
                                  <span className="item-name">E-mail</span>
                                  <span className="item-value">{contact?.[0]?.email}</span>
                                </div>
                              )
                            }
                            {
                              !!contact?.[0]?.driverLicense && (
                                <div className="footer-block">
                                  <span className="item-name">Driving Licence</span>
                                  <span className="item-value">{contact?.[0]?.driverLicense}</span>
                                </div>
                              )
                            }
                          </>
                        )
                      }
                    </div>
                    {
                      isArray(social_links) && !!social_links.length && (
                        <div className="links-block">
                          {
                            social_links.map((item, index) => (
                              <a key={index} className="links-item"><img src={item.icon} alt={item.name}/></a>
                            ))
                          }
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

