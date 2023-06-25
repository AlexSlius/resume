import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let main_info_block = $('#cv-body-hidden-container .cv-body-content .main-info-block').clone();
      let personal_info_block = $('#cv-body-hidden-container .cv-body-content .personal-info-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
      let languages_and_skills_block = $('#cv-body-hidden-container .cv-body-content .languages-and-skills-block').clone();
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let certificates_and_references_block = $('#cv-body-hidden-container .cv-body-content .certificates-and-references-block').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let gap_block_1 = $('#cv-body-hidden-container .cv-body-content .middle-area .column-left .gap-block').clone();
      let gap_block_2 = $('#cv-body-hidden-container .cv-body-content .middle-area .column-right .gap-block').clone();

      current_page_number = 1;

      getContentContainer1().append(main_info_block);
      if (checkHeight()) {
        main_info_block.remove();
        current_page_number++;
        getContentContainer1().append(main_info_block);
      }

      getContentContainer2().append(personal_info_block);
      if (checkHeight()) {
        personal_info_block.remove();
        current_page_number++;
        getContentContainer2().append(personal_info_block);
      }

      //
      getContentContainer3().append(profile_block);
      if (checkHeight()) {
        profile_block.remove();
        getContentContainer3().append($(gap_block_1).clone());
        current_page_number++;
        getContentContainer3().append(profile_block);
      }

      getContentContainer3().append(education_block);
      if (checkHeight()) {
        education_block.remove();
        getContentContainer3().append($(gap_block_1).clone());
        current_page_number++;
        getContentContainer3().append(education_block);
      }

      getContentContainer3().append(courses_block);
      if (checkHeight()) {
        courses_block.remove();
        getContentContainer3().append($(gap_block_1).clone());
        current_page_number++;
        getContentContainer3().append(courses_block);
      }

      getContentContainer3().append(languages_and_skills_block);
      if (checkHeight()) {
        languages_and_skills_block.remove();
        getContentContainer3().append($(gap_block_1).clone());
        current_page_number++;
        getContentContainer3().append(languages_and_skills_block);
      }

      getContentContainer3().append(hobbies_block);
      if (checkHeight()) {
        hobbies_block.remove();
        getContentContainer3().append($(gap_block_1).clone());
        current_page_number++;
        getContentContainer3().append(hobbies_block);
      }

      getContentContainer3().append($(gap_block_1).clone());

      current_page_number = 1;

      getContentContainer4().append(employment_history_block);
      if (checkHeight()) {
        employment_history_block.remove();
        getContentContainer4().append($(gap_block_2).clone());
        current_page_number++;
        getContentContainer4().append(employment_history_block);
      }

      getContentContainer4().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        getContentContainer4().append($(gap_block_2).clone());
        current_page_number++;
        getContentContainer4().append(internships_block);
      }

      getContentContainer4().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        getContentContainer4().append($(gap_block_2).clone());
        current_page_number++;
        getContentContainer4().append(extra_curricular_activities_block);
      }

      getContentContainer4().append(certificates_and_references_block);
      if (checkHeight()) {
        certificates_and_references_block.remove();
        getContentContainer4().append($(gap_block_2).clone());
        current_page_number++;
        getContentContainer4().append(certificates_and_references_block);
      }

      getContentContainer4().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        getContentContainer4().append($(gap_block_2).clone());
        current_page_number++;
        getContentContainer4().append(links_block);
      }

      getContentContainer4().append($(gap_block_2).clone());

      //
      if (getContentContainer3().children().length == 0) {
        getContentContainer3().append($(gap_block_1).clone());
      }

      if (getContentContainer4().children().length == 0) {
        getContentContainer4().append($(gap_block_2).clone());
      }
    }

    function checkHeight() {
      return getPageContainer().outerHeight() > getPageContainer().parent().outerHeight();
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
      page_element_container.find('.top-area .column-left').children().remove();
      page_element_container.find('.top-area .column-right').children().remove();
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

export const ResumeCv040 = ({
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
}, [isDrawing, data]);

  return (
    <div className="sv_040" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-1-background">
          <div className="cv-body-content">
            <div className="top-area">
              <div className="column-left">
                <div className="main-info-block block-block additional-color-1-border">
                  <h1 className="cv-name font-size-6 line-height-6 font-weight-300">{!!contact?.[0]?.firstName && (<>{contact?.[0]?.firstName}<br /></>)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}</h1>
                  {
                    isContactArray && contact?.[0]?.jobTitle && (
                      <h3 className="cv-prophecy font-size-4 line-height-3 font-weight-600">{contact?.[0]?.jobTitle}</h3>
                    )
                  }
                </div>
              </div>
              <div className="column-right">
                <div className="personal-info-block block-block additional-color-1-border">
                  <div className="contacts-block">
                    {
                      (!!contact?.[0]?.address || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                        <p className="font-size-2 line-height-2 font-weight-400">
                          {!!contact?.[0]?.address && (`${contact?.[0]?.address},`)}
                          {!!contact?.[0]?.city && (`${contact?.[0]?.city}, ${!!contact?.[0]?.zipCode && contact?.[0]?.zipCode} ${!!contact?.[0]?.country && contact?.[0]?.country}`)}
                        </p>
                      )
                    }
                    {
                      !!contact?.[0]?.phone && (
                        <p className="font-size-2 line-height-2 font-weight-400">{contact?.[0]?.phone}</p>
                      )
                    }
                    {
                      !!contact?.[0]?.email && (
                        <p className="font-size-2 line-height-2 font-weight-400">{contact?.[0]?.email}</p>
                      )
                    }
                  </div>
                  <div className="personal-info-list">
                    {
                      !!contact?.[0]?.nationality && (
                        <div className="personal-info-list-item">
                          <p className="item-name font-size-1 line-height-1 font-weight-400 main-color-3-text">NATIONALITY</p>
                          <p className="item-value font-size-2 line-height-2 font-weight-400">{contact?.[0]?.nationality}</p>
                        </div>
                      )
                    }
                    {
                      !!contact?.[0]?.driverLicense && (
                        <div className="personal-info-list-item">
                          <p className="item-name font-size-1 line-height-1 font-weight-400 main-color-3-text">DRIVING LICENSE</p>
                          <p className="item-value font-size-2 line-height-2 font-weight-400">{contact?.[0]?.driverLicense}</p>
                        </div>
                      )
                    }
                    {
                      (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                        <div className="personal-info-list-item">
                          <p className="item-name font-size-1 line-height-1 font-weight-400 main-color-3-text">DATE / PLACE OF BIRTH</p>
                          <p className="item-value font-size-2 line-height-2 font-weight-400">{`${moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} ${contact?.[0]?.placeOfBirth || ""}`} </p>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="center-block additional-color-1-border">
                {
                  !!contact?.[0]?.picture && (
                    <div className="photo-wrapper">
                      <img src={contact?.[0]?.picture} />
                    </div>
                  )
                }
              </div>
            </div>
            <div className="middle-area">
              <div className="column-left">
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Profile</h3>
                      <p className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  )
                }
                {
                  (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    <div className="education-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Education</h3>
                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            {
                              (!!itemEd?.study) && (
                                <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">{itemEd?.facility && (`${itemEd.facility}, `)} {!!itemEd?.study && (`${itemEd?.study}, `)} {itemEd?.degree && (`${itemEd?.degree}`)} </p>
                              )
                            }
                            {/* <p className="block-subheading-2 font-size-1 line-height-1 font-weight-400">Bachelor</p> */}
                            {
                              (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                   (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                    <div className="courses-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Courses</h3>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            {
                              (!!itemCo?.title || !!itemCo?.institution) && (
                                <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                              )
                            }
                            {
                              (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                <div className="languages-and-skills-block block-block additional-color-1-border">
                  {
                    isArray(languages) && !!languages.length && (
                      <div className="languages-block">
                        <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Languages</h3>
                        <div className="estimated-items-list">
                          {
                            languages.map((item, index) => (
                              <div className="estimated-items-list-item" key={index}>
                                <p className="estimated-item-name font-size-2 line-height-2 font-weight-400">{item.language}</p>
                                <div className="estimated-item-value-wrapper">
                                  <div className="estimated-item-value" style={{ width: `${(item.level * 100) / 6}%` }}></div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                  {
                    isArray(skills) && !!skills.length && (
                      <div className="skills-block">
                        <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Skills</h3>
                        <div className="estimated-items-list">
                          {
                            skills.map((item, index) => (
                              <div className="estimated-items-list-item" key={index}>
                                <p className="estimated-item-name font-size-2 line-height-2 font-weight-400">{item.name}</p>
                                {
                                  !hide_experience_level && (
                                    <div className="estimated-item-value-wrapper">
                                      <div className="estimated-item-value" style={{ width: `${(item.level * 100) / 5}%` }}></div>
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
                {
                   isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Hobbies</h3>
                      <p className="font-size-2 line-height-2 font-weight-400">
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
                <div className="block-block gap-block additional-color-1-border"></div>
              </div>
              <div className="column-right">
                {
                 (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    <div className="employment-history-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Employment History</h3>
                      {
                        employment.map((itemEm, index) => (
                          <div key={index}>
                            <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">
                              {!!itemEm?.title && (`${itemEm?.title}, `)}
                              {!!itemEm?.company && (` ${itemEm?.company}, `)}
                              {!!itemEm?.city && (`${itemEm?.city} `)}
                            </p>
                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} —`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <div className="font-size-2 line-height-2 font-weight-400 text-blckse" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                 (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    <div className="internships-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Internships</h3>
                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            {
                              (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                                <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                              )
                            }
                            {
                              (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <div className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                    <div className="extra-curricular-activities-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Extra-curricular activities</h3>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                              )
                            }
                            {
                              (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                <div className="certificates-and-references-block block-block additional-color-1-border">
                  {
                    isArray(certificates) && !!certificates.length && (
                      <div className="certificates-block">
                        <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Certificates</h3>
                        <p className="font-size-2 line-height-2 font-weight-400">
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
                   (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                      <div className="references-block additional-color-1-border">
                        <h3 className="block-heading font-size-5 line-height-5 font-weight-400">References</h3>
                        {
                          reference.map((itemRef, index) => (
                            <div key={index}>
                              {
                                (!!itemRef?.fullName || !!itemRef?.company) && (
                                  <p className="font-size-2 line-height-2 font-weight-400">
                                    {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                    {!!itemRef?.company && (`${itemRef.company}`)}
                                  </p>
                                )
                              }
                              {
                                !!itemRef?.email && (
                                  <p className="font-size-2 line-height-2 font-weight-400">{itemRef.email}</p>
                                )
                              }
                              {
                                !!itemRef.phone && (
                                  <p className="font-size-2 line-height-2 font-weight-400">{itemRef.phone}</p>
                                )
                              }
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-2 line-height-3 font-weight-400 additional-color-1-text">Links</h3>
                      <div className="social">
                        {
                          social_links.map((item, index) => (
                            <a className="font-size-1 line-height-1 font-weight-500 additional-color-1-border additional-color-3-text" key={index}>{item.name.substring(0, 2)}</a>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Links</h3>
                      <div className="links-wrapepr">
                        {
                          social_links.map((item, index) => (
                            <a className="font-size-2 line-height-2 font-weight-400 main-color-4-text" key={index}>{item.name}</a>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                <div className="block-block gap-block additional-color-1-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

