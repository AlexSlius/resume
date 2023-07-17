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
      let details_block = $('#cv-body-hidden-container .cv-body-content .details-block').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
      let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
      let certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();
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

      getContentContainer1().append(details_block);
      if (checkHeight()) {
        details_block.remove();
        current_page_number++;
        getContentContainer1().append(details_block);
      }

      getContentContainer1().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer1().append(links_block);
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

      getContentContainer1().append(hobbies_block);
      if (checkHeight()) {
        hobbies_block.remove();
        current_page_number++;
        getContentContainer1().append(hobbies_block);
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
      page_element.addClass(['cv-body-visible', 'page-' + current_page_number]);
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

    $(document).ready(function () {
      rebuildingPages()
    });
  }
}

export const ResumeCv031 = ({
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
    <div className="sv_031" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-1-background">
          <div className="cv-body-content font-size-1 main-color-3-text additional-color-1-border">
            <div className="column-left">
              {
                !!contact?.[0]?.picture && (
                  <div className="photo-block block-block">
                    <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                  </div>
                )
              }
              <div className="details-block block-block">
                {
                  (!!contact?.[0]?.address || !!contact?.[0]?.phone || !!contact?.[0]?.email || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                    <>
                      <h3 className="cv-heading font-size-2 additional-color-1-text">Details</h3>
                      <div className="contacts-block">
                        {
                          (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                            <div className="contact-item">
                              <p>
                                {!!contact?.[0]?.address && (`${contact?.[0]?.address},`)}
                                {!!contact?.[0]?.city && (`${contact?.[0]?.city}, ${!!contact?.[0]?.zipCode && contact?.[0]?.zipCode} ${!!contact?.[0]?.country && contact?.[0]?.country}`)}
                              </p>
                            </div>
                          )
                        }
                        {
                          !!contact?.[0]?.phone && (
                            <div className="contact-item">
                              <p>{contact?.[0]?.phone}</p>
                            </div>
                          )
                        }
                        {
                          !!contact?.[0]?.email && (
                            <div className="contact-item">
                              <p>{contact?.[0]?.email}</p>
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
                        <p className="item-name">NATIONALITY</p>
                        <p className="item-value">{contact?.[0]?.nationality}</p>
                      </div>
                    )
                  }
                  {
                    !!contact?.[0]?.driverLicense && (
                      <div className="info-list-item">
                        <p className="item-name">DRIVING LICENSE</p>
                        <p className="item-value">{contact?.[0]?.driverLicense}</p>
                      </div>
                    )
                  }
                  {
                    (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                      <div className="info-list-item">
                        <p className="item-name">DATE / PLACE OF BIRTH</p>
                        <p className="item-value">{`${moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} ${contact?.[0]?.placeOfBirth || ""}`} </p>
                      </div>
                    )
                  }
                </div>
              </div>
              {
                isArray(social_links) && !!social_links.length && (
                  <div className="links-block block-block">
                    <h3 className="cv-heading font-size-2 additional-color-1-text">Links</h3>
                    <div className="social">
                      {
                        social_links.map((item, index) => (
                          <a className="additional-color-1-border m-border additional-color-1-text" key={index}>{item.name.substring(0, 2)}</a>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              {
                !!(isArray(skills) && skills.length) && (
                  <div className="skills-block block-block">
                    <h3 className="cv-heading font-size-2 additional-color-1-text">Skills</h3>
                    <div className="skills-list">
                      {
                        skills.map((item, index) => (
                          <div className="skills-list-item" key={index}>
                            <p className="skill-name" >{item.name}</p>
                            {
                              !hide_experience_level && (
                                <div className="estimation-wrapper">
                                  <p className="estimation-value additional-color-1-background" style={{ width: `${(+item.level * 100) / 5}%` }}></p>
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
                    <h3 className="cv-heading font-size-2 additional-color-1-text">Languages</h3>
                    <div className="languages-list">
                      {
                        languages.map((item, index) => (
                          <div className="languages-item" key={index}>
                            <p className="item-name">{item.language}</p>
                            <div className="estimation-wrapper">
                              <div className="estimation-value additional-color-1-background" style={{ width: `${(+item.level * 100) / 6}%` }}></div>
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
                  <div className="hobbies-block block-block">
                    <h3 className="cv-heading font-size-2 additional-color-1-text">Hobbies</h3>
                    <p> {
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
                (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                  <div className="references-block block-block">
                    <h3 className="cv-heading font-size-2 additional-color-1-text">References</h3>
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
              {
                isArray(certificates) && !!certificates.length && (
                  <div className="certificates-block block-block">
                    <h3 className="cv-heading font-size-2 additional-color-1-text">Certificates</h3>
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
            </div>
            <div className="column-right">
              <div className="main-info-block">
                <h1 className="cv-name font-size-4 additional-color-1-text">
                  {!!contact?.[0]?.firstName && (<>{contact?.[0]?.firstName}<br /></>)}
                  {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                </h1>
                {
                  isContactArray && contact?.[0]?.jobTitle && (
                    <h2 className="cv-prophecy font-size-2">{contact?.[0]?.jobTitle}</h2>
                  )
                }
              </div>
              {
                !!career_objective?.[0]?.data && (
                  <div className="profile-block block-block">
                    <div className="left-side">
                      <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                      </svg>
                    </div>
                    <div className="right-side">
                      <h3 className="cv-heading font-size-3 additional-color-1-text">Profile</h3>
                      <p dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  </div>
                )
              }
              {
                (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                  <div className="employment-history-block block-block">
                    <div className="left-side">
                      <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                      </svg>
                    </div>
                    <div className="right-side">
                      <h3 className="cv-heading font-size-3 additional-color-1-text">Employment History</h3>
                      {
                        employment.map((itemEm, index) => (
                          <div className="block-info" key={index}>
                            <p className="cv-subheading font-size-2">
                              {!!itemEm?.title && (`${itemEm?.title}, `)}
                              {!!itemEm?.company && (` ${itemEm?.company}, `)}
                              {!!itemEm?.city && (`${itemEm?.city} `)}
                            </p>
                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} —`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              {
                (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                  <div className="education-block block-block">
                    <div className="left-side">
                      <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                      </svg>
                    </div>
                    <div className="right-side">
                      <h3 className="cv-heading font-size-3 additional-color-1-text">Education</h3>
                      {
                        education.map((itemEd, index) => (
                          <div className="block-info" key={index}>
                            {
                              (!!itemEd?.study) && (
                                <p className="cv-subheading font-size-2">
                                  {itemEd?.facility && (`${itemEd.facility}, `)}
                                  {!!itemEd?.study && (`${itemEd?.study}, `)}
                                  {itemEd?.degree && (`${itemEd?.degree}`)}
                                </p>
                              )
                            }
                            {
                              (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                <p className="date-range">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              {
                (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                  <div className="courses-block block-block">
                    <div className="left-side">
                      <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                      </svg>
                    </div>
                    <div className="right-side">
                      <h3 className="cv-heading font-size-3 additional-color-1-text">Courses</h3>
                      {
                        courses.map((itemCo, index) => (
                          <div className="block-info" key={index}>
                            {
                              (!!itemCo?.title || !!itemCo?.institution) && (
                                <p className="cv-subheading font-size-2">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                              )
                            }
                            {
                              (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                <p className="date-range">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
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
                (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                  <div className="extra-curricular-activities-block block-block">
                    <div className="left-side">
                      <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                      </svg>
                    </div>
                    <div className="right-side">
                      <h3 className="cv-heading font-size-3 additional-color-1-text">Extra-curricular activities</h3>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div className="block-info" key={index}>
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <p className="cv-subheading font-size-2">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                              )
                            }
                            {
                              (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                                <p className="date-range">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              {
                (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                  <div className="internships-block block-block">
                    <div className="left-side">
                      <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                      </svg>
                    </div>
                    <div className="right-side">
                      <h3 className="cv-heading font-size-3 additional-color-1-text">Internships</h3>

                      {
                        internship.map((itemIn, index) => (
                          <div className="block-info" key={index}>
                            {
                              (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                                <p className="cv-subheading font-size-2">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                              )
                            }
                            {
                              (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                                <p className="date-range">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p dangerouslySetInnerHTML={{ __html: itemIn.description }}></p>
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
  )
}

