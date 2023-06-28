import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let photo_block = $('#cv-body-hidden-container .cv-body-content .photo-block').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let personal_information_block = $('#cv-body-hidden-container .cv-body-content .personal-information-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
      let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
      let certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobiies-block').clone();

      let main_info_block = $('#cv-body-hidden-container .cv-body-content .main-info-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();

      current_page_number = 1;

      getContentContainer1().append(photo_block);
      if (checkHeight()) {
        photo_block.remove();
        current_page_number++;
        getContentContainer1().append(photo_block);
      }

      getContentContainer1().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer1().append(links_block);
      }

      getContentContainer1().append(personal_information_block);
      if (checkHeight()) {
        personal_information_block.remove();
        current_page_number++;
        getContentContainer1().append(personal_information_block);
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

      getContentContainer1().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer1().append(references_block);
      }

      getContentContainer1().append(certificates_block);
      if (checkHeight()) {
        certificates_block.remove();
        current_page_number++;
        getContentContainer1().append(certificates_block);
      }

      getContentContainer1().append(hobbies_block);
      if (checkHeight()) {
        hobbies_block.remove();
        current_page_number++;
        getContentContainer1().append(hobbies_block);
      }

      current_page_number = 1;

      getContentContainer2().append(main_info_block);
      if (checkHeight()) {
        main_info_block.remove();
        current_page_number++;
        getContentContainer2().append(main_info_block);
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
    }

    function checkHeight() {
      return getPageContainer().outerHeight() > getPageContainer().parent().outerHeight();
    }

    function getContentContainer1() {
      return getPageContainer().find('.middle-area .column-left');
    }

    function getContentContainer2() {
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
      page_element.addClass(['cv-body-visible', 'page-' + current_page_number]);
      page_element.children().remove();

      let page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();
      page_element_container.find('.middle-area .column-left').children().remove();
      page_element_container.find('.middle-area .column-right').children().remove();

      if (current_page_number > 1) {
        page_element_container.find('.top-area .center-block').remove();
      }

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

export const ResumeCv041 = ({
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
    hide_experience_level,
  } = data;
  const isContactArray = isArray(contact);
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
    <div className="sv_041" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-1-background">
          <div className="cv-body-content">
            <div className="middle-area">
              <div className="column-left">
                <div className="photo-block">
                  <div className="left-side additional-color-2-background"></div>
                  <div className="right-side">
                    {
                      !!contact?.[0]?.picture && (
                        <img src={contact?.[0]?.picture} />
                      )
                    }
                  </div>
                </div>
                <div className="links-block">
                  <div className="left-side additional-color-2-background"></div>
                  <div className="right-side">
                    {
                      isArray(social_links) && !!social_links.length && (
                        social_links.map((item, index) => (
                          <div className="link-wrapper font-size-1 line-height-4 font-weight-400" key={index}>
                            {
                              !!item?.icon && <img src={item.icon} />
                            }
                            {item.name}
                          </div>
                        ))
                      )
                    }
                  </div>
                </div>
                <div className="personal-information-block">
                  {
                    !!contact?.[0]?.phone && (
                      <div className="personal-information-item phone-item-block">
                        <div className="left-side additional-color-2-background">
                          <svg className="additional-color-1-svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.31315 0.196491C2.84424 -0.181893 2.22732 0.0352567 1.7892 0.432981L1.78292 0.438678C0.614075 1.49973 -0.167698 2.20941 0.0307883 3.74385C0.734152 9.18312 7.737 13.2434 9.49541 13.8347C11.2538 14.4259 12.4569 13.3217 13.3947 12.2575C14.0199 11.548 14.218 10.9568 13.7156 10.4838C13.1295 9.93201 12.0455 8.80096 11.84 8.63188L11.8068 8.60459C10.7695 7.75122 10.0437 7.15416 9.37819 8.98662C9.07756 9.81433 7.73357 9.81433 6.79919 9.2146C6.05105 8.73441 5.33598 8.02355 5.07156 7.68592C4.45464 6.89819 3.54761 5.04455 5.07156 4.45332C6.29073 3.98034 6.06503 2.88509 5.62691 2.44316C5.0017 1.81251 3.78206 0.574875 3.31315 0.196491Z" fill="#1E7BC0" />
                          </svg>
                        </div>
                        <div className="right-side">
                          <p className="subheading font-size-3 line-height-6 font-weight-700">Phone</p>
                          <p className="font-size-2 line-height-3">{contact?.[0]?.phone}</p>
                        </div>
                      </div>
                    )
                  }
                  {
                    !!contact?.[0]?.email && (
                      <div className="personal-information-item email-item-block">
                        <div className="left-side additional-color-2-background">
                          <svg className="additional-color-1-svg" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.0338717 0.740978C0.0117786 0.823592 0 0.91042 0 1V9C0 9.08958 0.0117786 9.17641 0.0338716 9.25902L4.29289 5L0.0338717 0.740978ZM5 5.70711L0.740979 9.96613C0.823592 9.98822 0.910421 10 1 10H13C13.0896 10 13.1764 9.98822 13.259 9.96613L9 5.70711L7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L5 5.70711ZM8.6461 4.6468L7 6.29289L5.35355 4.64645L0.740978 0.0338716C0.823592 0.0117786 0.91042 0 1 0H13C13.0896 0 13.1764 0.0117786 13.259 0.0338716L8.64679 4.6461C8.64668 4.64621 8.64656 4.64633 8.64645 4.64645C8.64633 4.64656 8.64621 4.64668 8.6461 4.6468ZM9.70711 5L13.9661 9.25902C13.9882 9.17641 14 9.08958 14 9V1C14 0.91042 13.9882 0.823592 13.9661 0.740979L9.70711 5Z" fill="#1E7BC0" />
                          </svg>
                        </div>
                        <div className="right-side">
                          <p className="subheading font-size-3 line-height-6 font-weight-700">Email</p>
                          <p className="font-size-2 line-height-3">{contact?.[0]?.email}</p>
                        </div>
                      </div>
                    )
                  }
                  {
                    (!!contact?.[0]?.address || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                      <div className="personal-information-item area-item-block">
                        <div className="left-side additional-color-2-background">
                          <svg className="additional-color-1-svg" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 15C5.5 15 11 10 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 10 5.5 15 5.5 15ZM5.5 8C6.88071 8 8 6.88071 8 5.5C8 4.11929 6.88071 3 5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8Z" fill="#1E7BC0" />
                          </svg>
                        </div>
                        <div className="right-side">
                          <p className="subheading font-size-3 line-height-6 font-weight-700">Area</p>
                          {
                            !!contact?.[0]?.address && (<p className="font-size-2 line-height-3">{contact?.[0]?.address}</p>)
                          }
                          {
                            !!contact?.[0]?.city && (<p className="font-size-2 line-height-3">{contact?.[0]?.city}</p>)
                          }
                          {
                            !!contact?.[0]?.zipCode && (<p className="font-size-2 line-height-3">{contact?.[0]?.zipCode}</p>)
                          }
                          {
                            !!contact?.[0]?.country && (<p className="font-size-2 line-height-3">{contact?.[0]?.country}</p>)
                          }
                        </div>
                      </div>
                    )
                  }
                  {
                    (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                      <div className="personal-information-item info-item-block">
                        <div className="left-side additional-color-2-background">
                          <svg className="additional-color-1-svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM7 6C6.44772 6 6 6.44772 6 7V10C6 10.5523 6.44772 11 7 11C7.55228 11 8 10.5523 8 10V7C8 6.44772 7.55228 6 7 6Z" fill="#1E7BC0" />
                          </svg>
                        </div>
                        <div className="right-side">
                          <p className="subheading font-size-3 line-height-6 font-weight-700">Info</p>
                          {
                            !!contact?.[0]?.nationality && (
                              <div className="info-list-item">
                                <p className="font-size-2 line-height-3 font-weight-700">Nationality</p>
                                <p className="font-size-2 line-height-3 font-weight-400">{contact?.[0]?.nationality}</p>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.driverLicense && (
                              <div className="info-list-item">
                                <p className="font-size-2 line-height-3 font-weight-700">Driving license</p>
                                <p className="font-size-2 line-height-3 font-weight-400">{contact?.[0]?.driverLicense}</p>
                              </div>
                            )
                          }
                          {
                            (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                              <div className="info-list-item">
                                <p className="font-size-2 line-height-3 font-weight-700">Date / Place of birth:</p>
                                <p className="font-size-2 line-height-3 font-weight-400">{`${moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} ${contact?.[0]?.placeOfBirth || ""}`} </p>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
                {
                  isArray(skills) && !!skills.length && (
                    <div className="skills-block block-block">
                      <h3 className="block-heading font-size-4 line-height-2">Skills</h3>
                      <div className="estimated-items-list">
                        {
                          skills.map((item, index) => (
                            <div className="estimated-item" key={index}>
                              <p className="item-name font-size-2 line-height-3">{item.name}</p>
                              {
                                !hide_experience_level && (
                                  <div className="estimation-wrapper main-color-2-background">
                                    <div className="estimation-value additional-color-1-background" style={{ width: `${(item.level * 100) / 5}%` }}></div>
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
                      <h3 className="block-heading font-size-4 line-height-2">Languages</h3>
                      <div className="estimated-items-list">
                        {
                          languages.map((item, index) => (
                            <div className="estimated-item" key={index}>
                              <p className="item-name font-size-2 line-height-3">{item.language}</p>
                              <div className="estimation-wrapper main-color-2-background">
                                <div className="estimation-value additional-color-1-background" style={{ width: `${(item.level * 100) / 6}%` }}></div>
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
                      <h3 className="block-heading font-size-4 line-height-2">References</h3>
                      {
                        reference.map((itemRef, index) => (
                          <div key={index}>
                            {
                              (!!itemRef?.fullName || !!itemRef?.company) && (
                                <p className="font-size-2 line-height-3">
                                  {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                  {!!itemRef?.company && (`${itemRef.company}`)}
                                </p>
                              )
                            }
                            {
                              !!itemRef?.email && (
                                <p className="font-size-2 line-height-3">{itemRef.email}</p>
                              )
                            }
                            {
                              !!itemRef.phone && (
                                <p className="font-size-2 line-height-3">{itemRef.phone}</p>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(certificates) && !!certificates.length && (
                    <div className="certificates-block block-block">
                      <h3 className="block-heading font-size-4 line-height-2">Certificates</h3>
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
                      <h3 className="block-heading font-size-4 line-height-2">Hobbies</h3>
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
              </div>
              <div className="column-right">
                <div className="main-info-block">
                  <h1 className="cv-name font-size-5 line-height-7 font-weight-700">{!!contact?.[0]?.firstName && (<>{contact?.[0]?.firstName}</>)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}</h1>
                  {
                    isContactArray && contact?.[0]?.jobTitle && (
                      <h3 className="cv-prophecy font-size-3 line-height-5 font-weight-400 main-color-1-background main-color-4-text">{contact?.[0]?.jobTitle}</h3>
                    )
                  }
                </div>
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-block block-block">
                      <div className="heading-line">
                        <h3 className="block-heading font-size-4 line-height-2 font-weight-700">Profile</h3>
                        <div className="heading-border-line"></div>
                      </div>
                      <p className="font-size-1 line-height-4 font-weight-400" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  )
                }
                {
                  (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    <div className="employment-history-block block-block">
                      <div className="heading-line">
                        <h3 className="block-heading font-size-4 line-height-2 font-weight-700">Employment History</h3>
                        <div className="heading-border-line"></div>
                      </div>
                      {
                        employment.map((itemEm, index) => (
                          <div key={index}>
                            <div className="subheading-line">
                              <div className="to-left">
                                {
                                  !!itemEm?.title && (<p className="font-size-2 line-height-1 font-weight-700">{itemEm.title}</p>)
                                }
                                {
                                  (!!itemEm?.company || !!itemEm?.city) && (
                                    <p className="font-size-2 line-height-1 font-weight-400">{`${itemEm.company} ${itemEm?.city}`}</p>
                                  )
                                }
                              </div>
                              {
                                (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                  <p className="date-range font-size-2 line-height-1 font-weight-400">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} —`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                                )
                              }
                            </div>
                            <div className="font-size-1 line-height-4 font-weight-400" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    <div className="education-block block-block">
                      <div className="heading-line">
                        <h3 className="block-heading font-size-4 line-height-2 font-weight-700">Education</h3>
                        <div className="heading-border-line"></div>
                      </div>
                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            <div className="subheading-line">
                              <div className="to-left">
                                {
                                  !!itemEd?.study && (
                                    <p className="font-size-2 line-height-1 font-weight-700">{itemEd?.study}</p>
                                  )
                                }
                                <p className="font-size-2 line-height-1 font-weight-400">{itemEd?.facility && (`${itemEd.facility}, `)} {itemEd?.degree && (`${itemEd?.degree}`)}</p>
                                {/* <p className="text-line-3 font-size-2 line-height-1 font-weight-700">Bachelor</p> */}
                              </div>
                              {
                                (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                  <p className="date-range font-size-2 line-height-1 font-weight-400">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                                )
                              }
                            </div>
                            <p className="font-size-1 line-height-4 font-weight-400" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                    <div className="courses-block block-block">
                      <div className="heading-line">
                        <h3 className="block-heading font-size-4 line-height-2 font-weight-700">Courses</h3>
                        <div className="heading-border-line"></div>
                      </div>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            <div className="subheading-line">
                              <div className="to-left">
                                {
                                  !!itemCo?.title && (<p className="font-size-2 line-height-1 font-weight-700">{itemCo?.title}</p>)
                                }
                                {
                                  !!itemCo?.institution && (
                                    <p className="font-size-2 line-height-1 font-weight-400">{itemCo?.institution}</p>
                                  )
                                }
                              </div>
                              {
                                (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                  <p className="date-range font-size-2 line-height-1 font-weight-400">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
                                )
                              }
                            </div>
                            {/* <p className="font-size-1 line-height-4 font-weight-400">I have learned to merge marketing and management skills in a very efficient way and produce great results. Even though managing hundreds of people is hard, all skills are learned to do that.</p> */}
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                    <div className="extra-curricular-activities-block block-block">
                      <div className="heading-line">
                        <h3 className="block-heading font-size-4 line-height-2 font-weight-700">Extra-curricular activities</h3>
                        <div className="heading-border-line"></div>
                      </div>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            <div className="subheading-line">
                              <div className="to-left">
                                {
                                  !!itemEx?.title && (<p className="font-size-2 line-height-1 font-weight-700">{itemEx.title}</p>)
                                }
                                {
                                  !!itemEx?.employer && (<p className="font-size-2 line-height-1 font-weight-400">{itemEx.employer}</p>)
                                }
                              </div>
                              {
                                (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                                  <p className="date-range font-size-2 line-height-1 font-weight-400">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                                )
                              }
                            </div>
                            <p className="font-size-1 line-height-4 font-weight-400" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    <div className="internships-block block-block">
                      <div className="heading-line">
                        <h3 className="block-heading font-size-4 line-height-2 font-weight-700">Internships</h3>
                        <div className="heading-border-line"></div>
                      </div>
                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            <div className="subheading-line">
                              <div className="to-left">
                                {
                                  !!itemIn?.jobTitle && (
                                    <p className="font-size-2 line-height-1 font-weight-700">{itemIn.jobTitle}</p>
                                  )
                                }
                                {
                                  (!!itemIn?.employer || !!itemIn?.city) && (
                                    <p className="font-size-2 line-height-1 font-weight-400">{!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                                  )
                                }
                              </div>
                              {
                                (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                                  <p className="date-range font-size-2 line-height-1 font-weight-400">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                                )
                              }
                            </div>
                            <div className="font-size-1 line-height-4 font-weight-400" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            </div>
            <div className="bottom-area additional-color-2-background"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

