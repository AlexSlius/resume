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
  let conta = contact?.[0];
  let classPhoto = (isArray(contact) && conta?.picture) ? "has-photo" : "";

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
    <div className="sv_013" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content main-color-1-text font-size-1">
            <div className="column-left">
              <div className="contacts-information-block block-block">
                {
                  !!conta?.picture && (
                    <div className="photo-block">
                      <img src={conta?.picture} />
                    </div>
                  )
                }
                {
                  (conta?.email || conta?.phone || conta?.address || conta?.city || conta?.zipCode || conta?.country) && (
                    <>
                      <h3 className="block-heading font-size-2 additional-color-1-text">Details</h3>
                      <div className="contacts-block">
                        <div className="block-item">
                          {`${conta?.address}, ${conta?.city}, ${conta?.zipCode}, ${conta?.country}`}
                        </div>
                        {
                          conta?.email && (
                            <div className="block-item">
                              <a href={`mailto:${conta?.email}`}>{conta?.email}</a>
                            </div>
                          )
                        }
                        {
                          conta?.phone && (
                            <div className="block-item">{conta?.phone}</div>
                          )
                        }
                      </div>
                    </>
                  )
                }
              </div>
              <div className="personal-info-block block-block">
                <div className="personal-info">
                  {
                    conta?.nationality && (
                      <div className="info-item">
                        <p className="info-item-name">Nationality</p>
                        <p className="info-item-value">{conta?.nationality}</p>
                      </div>
                    )
                  }
                  {
                    conta?.driverLicense && (
                      <div className="info-item">
                        <p className="info-item-name">Driving license</p>
                        <p className="info-item-value">{conta?.driverLicense}</p>
                      </div>
                    )
                  }
                  {
                    conta?.dateOfBirth && (
                      <div className="info-item">
                        <p className="info-item-name">Date of firth</p>
                        <p className="info-item-value">{moment(conta?.dateOfBirth).format("DD-MM-yy")}</p>
                      </div>
                    )
                  }
                  {
                    conta?.placeOfBirth && (
                      <div className="info-item">
                        <p className="info-item-name">Place of birth</p>
                        <p className="info-item-value">{conta?.placeOfBirth}</p>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="skills-block block-block">
                {
                  !!(isArray(skills) && skills.length) && (
                    <>
                      <h3 className="block-heading font-size-2 additional-color-1-text">Skills</h3>
                      <div className="skills-list estimated-items-list">
                        {
                          skills.map((item, index) => (
                            <div className="list-item" key={index}>
                              <p className="item-name">{item?.name}</p>
                              <div className="estimation-wrapper">
                                <div className="estimation-background"></div>
                                <div className="estimation-value" style={{ width: `${(+item.level * 100) / 5}%` }}></div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </>
                  )
                }
              </div>
              {
                isArray(hobbies) && !!hobbies.length && (
                  <div className="hobbies-block block-block">
                    <h3 className="block-heading font-size-2 additional-color-1-text">Hobbies</h3>
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
              {
                isArray(languages) && !!languages.length && (
                  <div className="languages-block block-block">
                    <h3 className="block-heading font-size-2 additional-color-1-text">Languages</h3>
                    <div className="skills-list estimated-items-list">
                      {
                        languages.map((item, index) => (
                          <div className="list-item" key={index}>
                            <p className="item-name">{item.language}</p>
                            <div className="estimation-wrapper">
                              <div className="estimation-background"></div>
                              <div className="estimation-value" style={{ width: `${(+item.level * 100) / 6}%` }}></div>
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
                    <h3 className="block-heading font-size-2 additional-color-1-text">References</h3>
                    {
                      reference.map((itemRef, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemRef?.fullName || !!itemRef?.company) && (
                              <p >
                                {!!itemRef?.fullName && (checkForSymbol([itemRef?.company])) ? itemRef?.fullName + ', ' : itemRef?.fullName}
                                {!!itemRef?.company && (itemRef?.company)}
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
                )
              }
              {
                isArray(social_links) && !!social_links.length && (
                  <div className="links-block block-block">
                    <h3 className="block-heading font-size-2 additional-color-1-text">Links</h3>
                    <div className="links-block-content">
                      {
                        social_links.map((item, index) => (
                          <a key={index}>{item.name}</a>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
            <div className="column-right">
              <div className="profile-block block-block">
                {
                  isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                    <h1 className="cv-name font-size-3">
                      {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                    </h1>
                  )
                }
                {
                  isArray(contact) && contact?.[0]?.jobTitle && (
                    <h2 className="block-heading font-size-2 additional-color-1-text">{contact?.[0]?.jobTitle.toUpperCase()}</h2>
                  )
                }
                {
                  career_objective?.[0]?.data && (
                    <p dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                  )
                }
              </div>
              {
                (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                  <div className="employment-history-block block-block">
                    <h3 className="block-heading font-size-2 additional-color-1-text">Employment History</h3>
                    {
                      employment.map((itemEm, index) => (
                        <div className="block-info" key={index}>
                          <p className="block-subheading">
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
                          <div className="text-block-wrapper">
                            <div className="text-block" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
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
                    <h3 className="block-heading font-size-2 additional-color-1-text">Education</h3>
                    {
                      education.map((itemEd, index) => (
                        <div className="block-info" key={index}>
                          <p className="block-subheading">
                            {!!itemEd?.facility && (checkForSymbol([itemEd?.study])) ? itemEd?.facility + ', ' : itemEd?.facility}
                            {!!itemEd?.study && (itemEd?.study)}
                          </p>
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemEd?.dateFrom?.date && (checkForSymbol([itemEd?.dateTo?.date]) ? moment(itemEd?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEd?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemEd?.dateTo?.date && (moment(itemEd?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                          <p className="block-degree">
                            {!!itemEd?.degree && (`${itemEd?.degree}`)}
                          </p>
                          <p dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                 (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                  <div className="courses-block block-block">
                    <h3 className="block-heading font-size-2 additional-color-1-text">Courses</h3>
                    {
                      courses.map((itemCo, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemCo?.title || !!itemCo?.institution) && (
                              <p className="block-subheading">
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
                    }
                  </div>
                )
              }
              {
                (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                  <div className="extra-curricular-activities-block block-block">
                    <h3 className="block-heading font-size-2 additional-color-1-text">Extra-curricular activities</h3>
                    {
                      extra_curricular.map((itemEx, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="block-subheading">
                                {!!itemEx?.title && (checkForSymbol([itemEx?.employer])) ? itemEx?.title + ', ' : itemEx?.title}
                                {!!itemEx?.employer && (itemEx?.employer)}
                              </p>
                            )
                          }
                          {
                            (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemEx?.dateFrom?.date && (checkForSymbol([itemEx?.dateTo?.date]) ? moment(itemEx?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEx?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemEx?.dateTo?.date && (moment(itemEx?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
              (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                  <div className="internships-block block-block">
                    <h3 className="block-heading font-size-2 additional-color-1-text">Internships</h3>
                    {
                      internship.map((itemIn, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="block-subheading">
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
                          <div className="text-block-wrapper font-size-2">
                            <div className="text-block">
                              <div className="left-side">
                                <div className="list-point additional-background-1-text"></div>
                              </div>
                              <div className="right-side" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                isArray(certificates) && !!certificates.length && (
                  <div className="certificates-block block-block">
                    <h3 className="block-heading font-size-2 additional-color-1-text">Certificates</h3>
                    <div className="block-info">
                      <p className="certificates-list">
                        {
                          certificates.map((item, index) => (
                            <span key={index}>
                              {`${item.name}`}
                            </span>
                          ))
                        }
                      </p>
                    </div>
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

