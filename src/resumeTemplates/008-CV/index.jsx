import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";

const Estimation = ({
  level = 0,
  maketLeng = 8,
  startLeng = 5,
}) => {
  let relation = maketLeng / startLeng;
  let rel = ((level * 100) / maketLeng) * relation;
  let pros = Math.round((maketLeng * rel) / 100);

  return (
    <div className="skill-estimation-container">
      {
        [...new Array(maketLeng)].map((_, index) => (
          <span key={index} className={`skill-estimation-point ${(index + 1) <= pros ? "additional-color-1-background" : "main-color-1-background"}`}></span>
        ))
      }
    </div>
  )
}

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let main_info_block = $('#cv-body-hidden-container .cv-body-content .main-info-block').clone();
      let address_contacts_block = $('#cv-body-hidden-container .cv-body-content .address-contacts-block').clone();
      let photo_block = $('#cv-body-hidden-container .cv-body-content .photo-wrapper').clone();
      let profile_info_block = $('#cv-body-hidden-container .cv-body-content .profile-info-block').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();

      let date_place_of_birth_block = $('#cv-body-hidden-container .cv-body-content .date-place-of-birth-block').clone();
      let driving_licence_block = $('#cv-body-hidden-container .cv-body-content .driving-licence-block').clone();
      let nationality_block = $('#cv-body-hidden-container .cv-body-content .nationality-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();
      let certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();

      current_page_number = 1;

      getContentContainer1().append(main_info_block);
      if (checkHeight()) {
        main_info_block.remove();
        current_page_number++;
        getContentContainer1().append(main_info_block);
      }

      getContentContainer1().append(address_contacts_block);
      if (checkHeight()) {
        address_contacts_block.remove();
        current_page_number++;
        getContentContainer1().append(address_contacts_block);
      }
      //
      getContentContainer2().append(photo_block);
      if (checkHeight()) {
        photo_block.remove();
        current_page_number++;
        getContentContainer2().append(photo_block);
      }

      getContentContainer2().append(profile_info_block);
      if (checkHeight()) {
        profile_info_block.remove();
        current_page_number++;
        getContentContainer2().append(profile_info_block);
      }
      //

      getContentContainer3().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer3().append(links_block);
      }
      //
      getContentContainer4().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer4().append(references_block);
      }
      //

      getContentContainer5().append(date_place_of_birth_block);
      if (checkHeight()) {
        date_place_of_birth_block.remove();
        current_page_number++;
        getContentContainer5().append(date_place_of_birth_block);
      }

      getContentContainer5().append(driving_licence_block);
      if (checkHeight()) {
        driving_licence_block.remove();
        current_page_number++;
        getContentContainer5().append(driving_licence_block);
      }

      getContentContainer5().append(nationality_block);
      if (checkHeight()) {
        nationality_block.remove();
        current_page_number++;
        getContentContainer5().append(nationality_block);
      }

      getContentContainer5().append(languages_block);
      if (checkHeight()) {
        languages_block.remove();
        current_page_number++;
        getContentContainer5().append(languages_block);
      }

      getContentContainer5().append(hobbies_block);
      if (checkHeight()) {
        hobbies_block.remove();
        current_page_number++;
        getContentContainer5().append(hobbies_block);
      }

      getContentContainer5().append(skills_block);
      if (checkHeight()) {
        skills_block.remove();
        current_page_number++;
        getContentContainer5().append(skills_block);
      }

      //
      current_page_number = 1;

      getContentContainer6().append(employment_history_block);
      if (checkHeight()) {
        employment_history_block.remove();
        current_page_number++;
        getContentContainer6().append(employment_history_block);
      }

      getContentContainer6().append(education_block);
      if (checkHeight()) {
        education_block.remove();
        current_page_number++;
        getContentContainer6().append(education_block);
      }

      getContentContainer6().append(courses_block);
      if (checkHeight()) {
        courses_block.remove();
        current_page_number++;
        getContentContainer6().append(courses_block);
      }

      getContentContainer6().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getContentContainer6().append(extra_curricular_activities_block);
      }

      getContentContainer6().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        current_page_number++;
        getContentContainer6().append(internships_block);
      }

      getContentContainer6().append(certificates_block);
      if (checkHeight()) {
        certificates_block.remove();
        current_page_number++;
        getContentContainer6().append(certificates_block);
      }

    }

    function checkHeight() {
      return getPageContainer().outerHeight() > getPageContainer().parent().outerHeight();
    }

    function getContentContainer1() {
      return getPageContainer().find('.top-area .left-side');
    }

    function getContentContainer2() {
      return getPageContainer().find('.top-area .right-side');
    }

    function getContentContainer3() {
      return getPageContainer().find('.middle-area .left-side');
    }

    function getContentContainer4() {
      return getPageContainer().find('.middle-area .right-side');
    }

    function getContentContainer5() {
      return getPageContainer().find('.bottom-area .column-1');
    }

    function getContentContainer6() {
      return getPageContainer().find('.bottom-area .column-2');
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

      page_element_container.find('.top-area .left-side').children().remove();
      page_element_container.find('.top-area .right-side').children().remove();
      page_element_container.find('.middle-area .left-side').children().remove();
      page_element_container.find('.middle-area .right-side').children().remove();
      page_element_container.find('.bottom-area .column-1').children().remove();
      page_element_container.find('.bottom-area .column-2').children().remove();


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

export const ResumeCv008 = ({
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
    <div className="sv_008" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-2`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-3-background">
          <div className="red-circle-1 additional-color-1-background"></div>
          <div className="red-circle-2 additional-color-1-background"></div>
          <div className="white-circle main-color-2-border"></div>
          <div className="cv-body-content">
            <div className="cv-body-area top-area">
              <div className="left-side">
                {
                  isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                    <h2 className="cv-name font-size-6 line-height-9 main-color-2-text">
                      {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                    </h2>
                  )
                }
                <span className="white-line main-color-2-border"></span>
                {
                  isArray(contact) && contact?.[0]?.jobTitle && (
                    <h1 className="cv-prophecy font-size-7 line-height-10 main-color-2-text">{contact?.[0]?.jobTitle}</h1>
                  )
                }
                {
                  (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.email || !!contact?.[0]?.phone || !!contact?.[0]?.address || !!contact?.[0]?.zipCode) && (
                    <p className="font-size-1 line-height-1 main-color-2-text">
                      {!!contact?.[0]?.address && (`${contact?.[0]?.address},`)}
                      {!!contact?.[0]?.city && (`${contact?.[0]?.city},`)}
                      {!!contact?.[0]?.zipCode && (<>{`${contact?.[0]?.zipCode},`}<br /></>)}
                      {!!contact?.[0]?.country && (`${contact?.[0]?.country},`)}
                      {!!contact?.[0]?.phone && (<>{`${contact?.[0].phone},`}<br /></>)}
                      {!!contact?.[0]?.email && (`${contact?.[0]?.email}`)}
                    </p>
                  )
                }
              </div>
              <div className="right-side">
                {
                  !!contact?.[0]?.picture && (
                    <div className="photo-wrapper">
                      <img src={contact?.[0]?.picture} />
                    </div>
                  )
                }
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-info-block">
                      <p className="profile-info-heading font-weight-500 font-size-1 line-height-1 main-color-2-text">Profile</p>
                      <p className="profile-info-text font-weight-300 font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="cv-body-area middle-area">
              {
                isArray(social_links) && !!social_links.length && (
                  <div className="left-side">
                    {
                      social_links.map((item, index) => (
                        <a className="font-size-2 line-height-2 main-color-2-text" key={index}>
                          <span className="circled font-size-1-1 line-height-5 main-color-2-text main-color-2-border main-color-3-background">{item.name.substr(1, 2)}</span>
                          {item.name}
                        </a>
                      ))
                    }
                  </div>
                )
              }
              {
               (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                  <div className="right-side">
                    <div className="references-block">
                      <span className="circled main-color-2-border"></span>
                      <div className="references-info" >
                        <p className="references-heading font-size-2 line-height-2 main-color-2-text">References</p>
                        {
                          reference.map((itemRef, index) => (
                            <div key={index}>
                              {
                                (!!itemRef?.fullName || !!itemRef?.company) && (
                                  <p className="font-size-1 line-height-1 main-color-2-text">
                                    {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                    {!!itemRef?.company && (`${itemRef.company}`)}
                                  </p>
                                )
                              }
                              {
                                !!itemRef?.email && (
                                  <p className="font-size-1 line-height-1 main-color-2-text">{itemRef.email}</p>
                                )
                              }
                              {
                                !!itemRef.phone && (
                                  <p className="font-size-1 line-height-1 main-color-2-text">{itemRef.phone}</p>
                                )
                              }
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <div className="cv-body-area bottom-area additional-color-3-background">
              <div className="column-1">
                {
                  isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                    <>
                      {
                        (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                          <div className="date-place-of-birth-block">
                            <h3 className="heading-type-3 font-weight-700 font-size-2 line-height-0-1 main-color-2-text">DATE / PLACE OF BIRTH</h3>
                            <p className="font-weight-700 font-size-2 line-height-0-1 additional-color-1-text">{!!contact?.[0]?.dateOfBirth && moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} {contact?.[0]?.placeOfBirth || ""}</p>
                          </div>
                        )
                      }
                      {
                        !!contact?.[0]?.driverLicense && (
                          <div className="driving-licence-block">
                            <h3 className="heading-type-3 font-weight-700 font-size-2 line-height-0-1 main-color-2-text">DRIVING LICENSE</h3>
                            <p className="font-weight-700 font-size-2 line-height-0-1 additional-color-1-text">{contact[0].driverLicense}</p>
                          </div>
                        )
                      }
                      {
                        !!contact?.[0]?.nationality && (
                          <div className="nationality-block">
                            <h3 className="heading-type-3 font-weight-700 font-size-2 line-height-0-1 main-color-2-text">NATIONALITY</h3>
                            <p className="font-weight-700 font-size-2 line-height-0-1 additional-color-1-text">{contact?.[0]?.nationality}</p>
                          </div>
                        )
                      }
                    </>
                  )
                }

                {
                  !!(isArray(languages) && languages.length) && (
                    <div className="languages-block">
                      <h3 className="heading-type-3 font-weight-500 font-size-5 line-height-8 main-color-2-text">Languages</h3>
                      <div className="languages-list">
                        {
                          languages.map((item, index) => (
                            <div className="list-item" key={index}>
                              <p className="font-size-1 line-height-1 main-color-2-text">{item.language}</p>
                              <div className="skill-estimation-container">
                                {
                                  [...new Array(+item.level)].map((inxeItem, index) => (
                                    <span key={index} className="skill-estimation-point main-color-2-background"></span>
                                  ))
                                }
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }

                {
                   isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block">
                      <div className="lefter font-size-4 line-height-6 additional-color-1-text">HOBBIES</div>
                      <div className="hobbies-list font-weight-500 font-size-1 line-height-3 main-color-2-text">
                        {
                          hobbies.map((item, index) => (
                            <>
                              <span key={index}>
                                {`${item.text}${((hobbies.length - 1) != index) ? (", ") : ""}`}
                              </span>
                              <br />
                            </>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  (!!(isArray(skills) && skills.length) || !!(isArray(languages) && languages.length)) && (
                    <div className="skills-block">
                      <h3 className="heading-type-3 font-weight-700 font-size-5 line-height-0-1 main-color-2-text">Skills</h3>
                      <div className="skills-list">
                        {
                          skills.map((item, index) => (
                            <div className="skills-list-item" key={index}>
                              <p className="font-weight-500 font-size-2 line-height-3 additional-color-1-text">{item.name}</p>
                              <Estimation
                                maketLeng={5}
                                level={item.level}
                              />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
              </div>

              <div className="column-2">
                {
                (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    <div className="employment-history-block block-block">
                      <h3 className="heading-type-3 font-weight-500 font-size-4 line-height-7 main-color-2-text">Employment History</h3>
                      {
                        employment.map((itemEm, index) => (
                          <div key={index}>
                            <p className="font-weight-500 font-size-3 line-height-4 main-color-2-text">
                              {!!itemEm?.title && (`${itemEm?.title}, `)}
                              {!!itemEm?.company && (` ${itemEm?.company}, `)}
                              {!!itemEm?.city && (`${itemEm?.city} `)}
                            </p>

                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="font-weight-500 font-size-2 line-height-2 main-color-3-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMM yy")}`)}</p>
                              )
                            }
                            <div className="font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {
                 (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    <div className="education-block block-block">
                      <div className="horizontal-line main-color-2-border"></div>
                      <h3 className="heading-type-3 font-weight-500 font-size-4 line-height-6 main-color-2-text">Education</h3>
                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            {
                              (!!itemEd?.study) && (
                                <p className="font-weight-500 font-size-3 line-height-4 main-color-2-text">{!!itemEd?.study && (`${itemEd?.study}, `)}  {itemEd?.facility && (`${itemEd.facility}`)}</p>
                              )
                            }
                            {
                              (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                <p className="font-weight-500 font-size-2 line-height-2 main-color-3-text">
                                  {
                                    !!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMM yy")}`)
                                  }
                                </p>
                              )
                            }
                            <p className="font-weight-500 font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {
                  (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                    <div className="courses-block block-block">
                      <div className="horizontal-line main-color-2-border"></div>
                      <h3 className="heading-type-3 font-weight-500 font-size-4 line-height-6 main-color-2-text">Courses</h3>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            {
                              (!!itemCo?.title || !!itemCo?.institution) && (
                                <p className="font-weight-500 font-size-3 line-height-4 main-color-2-text">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                              )
                            }
                            {
                              (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                <p className="font-weight-500 font-size-2 line-height-2 main-color-3-text">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMM yy")}`)}</p>
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
                      <div className="horizontal-line main-color-2-border"></div>
                      <h3 className="heading-type-3 font-weight-500 font-size-4 line-height-6 main-color-2-text">Extra-curricular activities</h3>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <p className="font-weight-500 font-size-3 line-height-4 main-color-2-text">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                              )
                            }
                            {
                              (
                                !!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (<p className="font-weight-500 font-size-2 line-height-2 main-color-3-text">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    <div className="internships-block block-block">
                      <div className="horizontal-line main-color-2-border"></div>
                      <h3 className="heading-type-3 font-weight-500 font-size-4 line-height-6">Internships</h3>
                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            {
                              (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                                <p className="font-weight-500 font-size-3 line-height-4 main-color-2-text">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                              )
                            }
                            {
                              (
                                !!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (<p className="font-weight-500 font-size-2 line-height-2 main-color-3-text">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MM/yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MM/yy")}`)}</p>
                              )
                            }
                            <div className="font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))}
                    </div>
                  )
                }

                {
                  isArray(certificates) && !!certificates.length && (
                    <div className="certificaces-block block-block">
                      <div className="horizontal-line main-color-2-border"></div>
                      <h3 className="heading-type-3 font-weight-500 font-size-4 line-height-7 main-color-2-text">Certificates</h3>
                      <p className="font-weight-500 font-size-3 line-height-4 main-color-2-text">
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
          </div>
        </div>
      </div>
    </div >
  )
}

