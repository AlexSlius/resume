import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";

import { levelLanguage } from "../../helpers/levelLanguage";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let photo_block = $('#cv-body-hidden-container .cv-body-content .photo-wrapper').clone();
      let name_and_prophecy_block = $('#cv-body-hidden-container .cv-body-content .name-and-prophecy-wrapper').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let details_and_hobbies_block = $('#cv-body-hidden-container .cv-body-content .details-and-hobbies-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
      let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
      let certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();

      current_page_number = 1;

      getContentContainer1().append(photo_block);
      if (checkHeight()) {
        photo_block.remove();
        current_page_number++;
        getContentContainer1().append(photo_block);
      }

      getContentContainer1().append(name_and_prophecy_block);
      if (checkHeight()) {
        name_and_prophecy_block.remove();
        current_page_number++;
        getContentContainer1().append(name_and_prophecy_block);
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

      getContentContainer1().append(certificates_block);
      if (checkHeight()) {
        certificates_block.remove();
        current_page_number++;
        getContentContainer1().append(certificates_block);
      }

      getContentContainer1().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer1().append(references_block);
      }

      current_page_number = 1;

      getContentContainer2().append(details_and_hobbies_block);
      if (checkHeight()) {
        details_and_hobbies_block.remove();
        current_page_number++;
        getContentContainer2().append(details_and_hobbies_block);
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

      getContentContainer2().append(courses_block);
      if (checkHeight()) {
        courses_block.remove();
        current_page_number++;
        getContentContainer2().append(courses_block);
      }

      getContentContainer2().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer2().append(links_block);
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
  
      page_element_container.find('.column-left').children().remove();
      page_element_container.find('.column-right').children().remove();
      page_element.append(page_element_container);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }

    rebuildingPages();
  }
}

export const ResumeCv026 = ({
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
  } = data;
  const isContactArray = isArray(contact);
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
    <div className="sv_026" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1 ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text additional-color-1-background">
            <div className="column-left additional-color-2-background">
              {
                !!conta?.picture && (
                  <div className="photo-wrapper">
                    <div className="circle-shade"></div>
                    <div className="photo" style={{ backgroundImage: `url(${conta?.picture})` }}></div>
                  </div>
                )
              }
              <div className="name-and-prophecy-wrapper">
                {
                  isContactArray && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                    <p className="cv-name font-size-4">
                      {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)}<br/>{!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                    </p>
                  )
                }
                {
                  isContactArray && contact?.[0]?.jobTitle && (
                    <p className="cv-prophecy font-size-3">{contact?.[0]?.jobTitle}</p>
                  )
                }
              </div>
              {
                !!(isArray(skills) && skills.length) && (
                  <div className="skills-block block-block">
                    <p className="cv-heading font-size-3">Skills</p>
                    <div className="skills-list estimated-items-list">
                      {
                        skills.map((item, index) => (
                          <div className="estimated-wrapper">
                            <svg viewBox="0 0 64 64" className="pie additional-color-3-svg additional-color-5-svg">
                              <circle className="background" r="50%" cx="50%" cy="50%" stroke-dasharray="0"></circle>
                              <circle className="chart" r="50%" cx="50%" cy="50%" stroke-dasharray={`${(+item.level * 100) / 5 * 2} 200`}></circle>
                            </svg>
                            <p className="estimated-item-name font-size-2" key={index}>{item.name}</p>
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
                    <p className="cv-heading font-size-3">Languages</p>
                    <div className="languages-list estimated-items-list">
                      {
                        languages.map((item, index) => (
                          <div className="languages-item" key={index}>
                              <p className="languages-name font-size-2">{item.language}</p>
                              {
                                <div className="skill-estimation additional-color-5-text">
                                  {
                                    [...new Array(5)].map((_, index) => (
                                      <svg className="" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill={(index + 1) <= item.level ? "currentColor" : "none"}>
                                        <path d="M6.82092 2.08288L7.91699 5.45623L8.02925 5.80172H8.39252H11.9395L9.06993 7.88657L8.77604 8.1001L8.88829 8.44559L9.98436 11.8189L7.11482 9.7341L6.82092 9.52057L6.52703 9.7341L3.65748 11.8189L4.75355 8.44559L4.86581 8.1001L4.57192 7.88657L1.70237 5.80172H5.24932H5.6126L5.72485 5.45623L6.82092 2.08288Z" stroke="currentColor"/>
                                      </svg>
                                    ))
                                  }
                                </div>
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
                    <p className="cv-heading font-size-3">Certificates</p>
                    <p className="certificates-info">
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
                  <div className="references-block block-block">
                    <p className="cv-heading font-size-3">References</p>
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
                )
              }
            </div>
            <div className="column-right">
              <div className="details-and-hobbies-block block-block">
                <div className="left-side">
                  {
                    (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country || !!contact?.[0]?.phone || !!contact?.[0]?.email) && (
                      <div className="details-block">
                        <p className="cv-heading font-size-3 additional-color-4-text">Details</p>
                        {
                          (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                            <p>
                              {!!contact?.[0]?.address && (`${contact?.[0]?.address},`)}
                              {!!contact?.[0]?.city && (`${contact?.[0]?.city}, ${!!contact?.[0]?.zipCode && contact?.[0]?.zipCode} ${!!contact?.[0]?.country && contact?.[0]?.country}`)}
                            </p>
                          )
                        }
                        {
                          !!contact?.[0]?.phone && (
                            <p>{contact?.[0]?.phone}</p>
                          )
                        }
                        {
                          !!contact?.[0]?.email && (
                            <p>{contact?.[0]?.email}</p>
                          )
                        }
                      </div>
                    )
                  }
                  {
                    (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                      <div className="additional-details-block">
                        {
                          !!contact?.[0]?.nationality && (
                            <div className="block-item">
                              <p className="item-name additional-color-4-text">nationality</p>
                              <p className="item-value">{contact?.[0]?.nationality}</p>
                            </div>
                          )
                        }
                        {
                          !!contact?.[0]?.driverLicense && (
                            <div className="block-item">
                              <p className="item-name additional-color-4-text">driving license</p>
                              <p className="item-value">{contact?.[0]?.driverLicense}</p>
                            </div>
                          )
                        }
                        {
                          (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                            <div className="block-item">
                              <p className="item-name additional-color-4-text">data/place of birth</p>
                              {
                                !!contact?.[0]?.dateOfBirth && (
                                  <p className="item-value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} / {contact?.[0]?.placeOfBirth || ""}</p>
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                </div>
                <div className="right-side">
                  {
                    isArray(hobbies) && !!hobbies.length && (
                      <div className="hobbies-block">
                        <p className="cv-heading font-size-3 additional-color-4-text">Hobbies</p>    
                        <div className="hobbies-info additional-color-4-border"> {
                          hobbies.map((item, index) => (
                            <span className="hobbies-item" key={index}><span className="additional-color-4-text additional-color-4-border">{`${index + 1}`}</span>{`${item.text}`}</span>
                          ))
                        }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              {
                !!career_objective?.[0]?.data && (
                  <div className="profile-block block-block">
                    <p className="cv-heading font-size-3 additional-color-4-text">Profile</p>
                    
                    <p dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                  </div>
                )
              }
              {
                (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                  <div className="employment-history-block block-block">
                      <p className="cv-heading font-size-3 additional-color-4-text">Employment History</p>
                    {
                      employment.map((itemEm, index) => (
                        <div className="block-info" key={index}>
                          <p className="cv-subheading additional-color-4-text">
                            {!!itemEm?.title && (`${itemEm?.title}, `)}
                            {!!itemEm?.company && (` ${itemEm?.company}, `)}
                            {!!itemEm?.city && (`${itemEm?.city} `)}
                          </p>
                          {
                            (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <p className="date-range additional-color-4-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <div className="text-block-list" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}>
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
                    <p className="cv-heading font-size-3 additional-color-4-text">Education</p>
                    {
                      education.map((itemEd, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemEd?.study || !!itemEd?.facility) && (
                              <p className="cv-subheading additional-color-4-text">
                                {itemEd?.facility && (`${itemEd.facility}, `)}
                                {!!itemEd?.study && (`${itemEd?.study}`)}
                              </p>
                            )
                          }
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range additional-color-4-text">
                                {!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)}
                                {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}
                              </p>
                            )
                          }
                          {
                            (!!itemEd?.degree) && (
                              <p className="cv-degree additional-color-4-text">
                                {itemEd?.degree && (`${itemEd?.degree}`)}
                              </p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                  <div className="extra-curricular-activities-block block-block">
                    <p className="cv-heading font-size-3 additional-color-4-text">Extra-curricular activities</p>
                    
                    {
                      extra_curricular.map((itemEx, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="cv-subheading additional-color-4-text">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                            )
                          }
                          {
                            (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <p className="date-range additional-color-4-text">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
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
                    <p className="cv-heading font-size-3 additional-color-4-text">Internships</p>
                    
                    {
                      internship.map((itemIn, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="cv-subheading additional-color-4-text">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                            )
                          }
                          {
                            (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                              <p className="date-range additional-color-4-text">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemIn.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                  <div className="courses-block block-block">
                    <p className="cv-heading font-size-3 additional-color-4-text">Courses</p>
                    
                    {
                      courses.map((itemCo, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemCo?.title || !!itemCo?.institution) && (
                              <p className="cv-subheading additional-color-4-text">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                            )
                          }
                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range additional-color-4-text">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
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
                    <div className="links-info">              
                      {
                        social_links.map((item, index) => (
                          <a key={index}><img src={item.icon} alt={item.name} /></a>
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
  )
}

