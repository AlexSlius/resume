import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { levelLanguage } from "../../helpers/levelLanguage";

export const ResumeCv030 = ({
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
  } = data;
  const isContactArray = isArray(contact);
  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";

  React.useEffect(() => {
    if (typeof window != 'undefined') {
      let current_page_number = 1;

      function rebuildingPages() {
        $('.cv-body.cv-body-visible').remove();

        let main_info_block = $('#cv-body-hidden-container .cv-body-content .main-info-block').clone();
        let photo_block = $('#cv-body-hidden-container .cv-body-content .photo-block').clone();
        let details_block = $('#cv-body-hidden-container .cv-body-content .details-block').clone();
        let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
        let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
        let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
        let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
        let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
        let certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();

        let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
        let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
        let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
        let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
        let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
        let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();

        current_page_number = 1;

        getContentContainer1().append(main_info_block);

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

        getContentContainer2().append(languages_block);
        if (checkHeight()) {
          languages_block.remove();
          current_page_number++;
          getContentContainer2().append(languages_block);
        }

        getContentContainer2().append(hobbies_block);
        if (checkHeight()) {
          hobbies_block.remove();
          current_page_number++;
          getContentContainer2().append(hobbies_block);
        }

        getContentContainer2().append(certificates_block);
        if (checkHeight()) {
          certificates_block.remove();
          current_page_number++;
          getContentContainer2().append(certificates_block);
        }

        current_page_number = 1;

        getContentContainer3().append(profile_block);
        if (checkHeight()) {
          profile_block.remove();
          current_page_number++;
          getContentContainer3().append(profile_block);
        }

        getContentContainer3().append(employment_history_block);
        if (checkHeight()) {
          employment_history_block.remove();
          current_page_number++;
          getContentContainer3().append(employment_history_block);
        }

        getContentContainer3().append(education_block);
        if (checkHeight()) {
          education_block.remove();
          current_page_number++;
          getContentContainer3().append(education_block);
        }

        getContentContainer3().append(courses_block);
        if (checkHeight()) {
          courses_block.remove();
          current_page_number++;
          getContentContainer3().append(courses_block);
        }

        getContentContainer3().append(extra_curricular_activities_block);
        if (checkHeight()) {
          extra_curricular_activities_block.remove();
          current_page_number++;
          getContentContainer3().append(extra_curricular_activities_block);
        }

        getContentContainer3().append(internships_block);
        if (checkHeight()) {
          internships_block.remove();
          current_page_number++;
          getContentContainer3().append(internships_block);
        }
      }

      function getContentContainer1() {
        return getPageContainer().find('.top-area');
      }

      function getContentContainer2() {
        return getPageContainer().find('.middle-area .column-left');
      }

      function getContentContainer3() {
        return getPageContainer().find('.middle-area .column-right');
      }

      function checkHeight() {
        return getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
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

        page_element_container.find('.top-area').children().remove();
        page_element_container.find('.middle-area .column-left').children().remove();
        page_element_container.find('.middle-area .column-right').children().remove();
        page_element.append(page_element_container);

        if ($('#cv-chapter-section-cv').find(page_element)) {
          $('#cv-chapter-section-cv').append(page_element);
        }

        return page_element_container;
      }

      function checkPageHeight(page_number) {
        let page_element = $('.cv-body.cv-body-visible.page-' + page_number);
        if (page_element.height() < page_element.find('.cv-body-container').height()) {
          return false;
        } else {
          return true;
        }
      }

      rebuildingPages();
    }
  }, [data]);

  return (
    <div className="sv_030" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-2-background">
          <div className="ellipse-line"></div>
          <div className="cv-body-content">
            <div className="top-area">
              <h1 className="cv-name font-size-5 line-height-9">{!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}</h1>
              <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00004 0.484375C5.00004 3.26358 7.02129 5.28483 9.8005 5.28483C7.02129 5.28483 5.00004 7.30608 5.00004 10.0853C5.00004 7.30608 2.97887 5.28483 0.199585 5.28483C2.97879 5.28483 5.00004 3.26358 5.00004 0.484375Z" fill="black" />
              </svg>
              {
                isContactArray && contact?.[0]?.jobTitle && (
                  <h2 className="cv-prophecy font-size-2 line-height-6">{contact?.[0]?.jobTitle}</h2>
                )
              }
            </div>
            <div className="middle-area">
              <div className="column-left">
                {
                  !!contact?.[0]?.picture && (
                    <div className="photo-block">
                      <img src={contact?.[0]?.picture} />
                    </div>
                  )
                }
                <div className="details-block block-block">
                  {
                    (!!contact?.[0]?.address || !!contact?.[0]?.phone || !!contact?.[0]?.email || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                      <>
                        <h3 className="block-heading block-heading font-size-3 line-height-7">Details</h3>
                        <div className="contacts-block">
                          {
                            !!contact?.[0]?.phone && (
                              <div className="contact-item">
                                <p className="font-size-1 line-height-1">{contact?.[0]?.phone}</p>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.email && (
                              <div className="contact-item">
                                <p className="font-size-1 line-height-1">{contact?.[0]?.email}</p>
                              </div>
                            )
                          }
                          {
                            (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                              <div className="contact-item">
                                <p className="font-size-1 line-height-1">
                                  {!!contact?.[0]?.address && (`${contact?.[0]?.address},`)}
                                  {!!contact?.[0]?.city && (`${contact?.[0]?.city}, ${!!contact?.[0]?.zipCode && contact?.[0]?.zipCode} ${!!contact?.[0]?.country && contact?.[0]?.country}`)}
                                </p>
                              </div>
                            )
                          }
                        </div>
                      </>
                    )
                  }
                  <div className="profile-info-list">
                    {
                      !!contact?.[0]?.nationality && (
                        <div className="info-list-item">
                          <p className="item-name font-size-1 line-height-1">NATIONALITY</p>
                          <p className="item-value font-size-1 line-height-1">{contact?.[0]?.nationality}</p>
                        </div>
                      )
                    }
                    {
                      !!contact?.[0]?.driverLicense && (
                        <div className="info-list-item">
                          <p className="item-name font-size-1 line-height-1">DRIVING LICENSE</p>
                          <p className="item-value font-size-1 line-height-1">{contact?.[0]?.driverLicense}</p>
                        </div>
                      )
                    }
                    {
                      (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                        <div className="info-list-item">
                          <p className="item-name font-size-1 line-height-1">DATE / PLACE OF BIRTH</p>
                          <p className="item-value font-size-1 line-height-1">{`${moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} ${contact?.[0]?.placeOfBirth || ""}`} </p>
                        </div>
                      )
                    }
                  </div>
                </div>
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-3 line-height-7">Links</h3>
                      <div className="contact-item social">
                        {
                          social_links.map((item, index) => (
                            <a className="font-size-1 line-height-2 additional-color-1-text additional-color-1-border" key={index}>{item.name.substring(0, 2)}</a>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  !!(isArray(skills) && skills.length) && (
                    <div className="skills-block">
                      <h3 className="heading-type-1 block-heading font-size-3 line-height-7">Skills</h3>

                      <div className="skills-list">
                        {
                          skills.map((item, index) => (
                            <div className="skills-list-item" key={index}>
                              <p className="skill-name font-size-1 line-height-1">{item.name}</p>
                              <div className="estimation-container">
                                <p className="item-estimation"></p>
                              </div>
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
                      <h3 className="heading-type-1 block-heading font-size-3 line-height-7">Languages</h3>
                      <div className="estimated-items-list">
                        {
                          languages.map((item, index) => (
                            <div className="estimated-item" key={index}>
                              <p className="item-name font-size-1 line-height-1">{item.language}</p>
                              <p className="estimation-number-value font-size-2 line-height-4">{levelLanguage(item.level)}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-3 line-height-7">Hobbies</h3>
                      <p className="font-size-1 line-height-1"> {
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
                  isArray(reference) && !!reference.length && (
                    <div className="references-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-3 line-height-7">Referencec</h3>
                      {
                        reference.map((itemRef, index) => (
                          <div key={index}>
                            {
                              (!!itemRef?.fullName || !!itemRef?.company) && (
                                <p className="font-size-1 line-height-1">
                                  {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                  {!!itemRef?.company && (`${itemRef.company}`)}
                                </p>
                              )
                            }
                            {
                              !!itemRef?.email && (
                                <p className="font-size-1 line-height-10">{itemRef.email}</p>
                              )
                            }
                            {
                              !!itemRef.phone && (
                                <p className="font-size-1 line-height-1">{itemRef.phone}</p>
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
                      <h3 className="heading-type-1 block-heading font-size-3 line-height-7">Certificates</h3>
                      <p className="block-subheading font-size-1 line-height-1">
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
              <div className="column-right">
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-4 line-height-8">Profile</h3>
                      <p className="font-size-1 line-height-3" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  )
                }
                {
                  isArray(employment) && !!employment.length && (
                    <div className="employment-history-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-4 line-height-8">Employment History</h3>
                      {
                        employment.map((itemEm, index) => (
                          <div key={index}>
                            <p className="block-subheading font-size-2 line-height-5">
                              {!!itemEm?.title && (`${itemEm?.title}, `)}
                              {!!itemEm?.company && (` ${itemEm?.company}, `)}
                              {!!itemEm?.city && (`${itemEm?.city} `)}
                            </p>
                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range font-size-1 line-height-1">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <div className="text-block-list font-size-1 line-height-3" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(education) && !!education.length && (
                    <div className="education-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-4 line-height-8">Education</h3>
                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            {
                              (!!itemEd?.study) && (
                                <p className="block-subheading font-size-2 line-height-5">{itemEd?.facility && (`${itemEd.facility}, `)} {!!itemEd?.study && (`${itemEd?.study}, `)} {itemEd?.degree && (`${itemEd?.degree}`)} </p>
                              )
                            }
                            {/* <p className="block-subheading-2 font-size-2 line-height-5">Bachelor</p> */}
                            {
                              (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-1 line-height-3" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(courses) && !!courses.length && (
                    <div className="courses-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-4 line-height-8">Courses</h3>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            {
                              (!!itemCo?.title || !!itemCo?.institution) && (
                                <p className="block-subheading font-size-2 line-height-5">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                              )
                            }
                            {
                              (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(extra_curricular) && !!extra_curricular.length && (
                    <div className="extra-curricular-activities-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-4 line-height-8">Extra-curricular activities</h3>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <p className="block-subheading font-size-2 line-height-5">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                              )
                            }
                            {
                              (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-1 line-height-3" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {
                  isArray(internship) && !!internship.length && (
                    <div className="internships-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-4 line-height-8">Internships</h3>
                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            {
                              (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                                <p className="block-subheading font-size-2 line-height-5">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                              )
                            }
                            {
                              (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <div className="text-block-list font-size-1 line-height-3 text-block-text" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
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
    </div>
  )
}

