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
      let details_block = $('#cv-body-hidden-container .cv-body-content .details-block').clone();
      let additional_details_block = $('#cv-body-hidden-container .cv-body-content .additional-details-block').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
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

      getContentContainer2().append(name_and_prophecy_block);
      if (checkHeight()) {
        name_and_prophecy_block.remove();
        current_page_number++;
        getContentContainer2().append(name_and_prophecy_block);
      }

      current_page_number = 1;

      getContentContainer3().append(details_block);
      if (checkHeight()) {
        details_block.remove();
        current_page_number++;
        getContentContainer3().append(details_block);
      }

      getContentContainer3().append(additional_details_block);
      if (checkHeight()) {
        additional_details_block.remove();
        current_page_number++;
        getContentContainer3().append(additional_details_block);
      }

      getContentContainer3().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer3().append(links_block);
      }

      getContentContainer3().append(skills_block);
      if (checkHeight()) {
        skills_block.remove();
        current_page_number++;
        getContentContainer3().append(skills_block);
      }

      getContentContainer3().append(hobbies_block);
      if (checkHeight()) {
        hobbies_block.remove();
        current_page_number++;
        getContentContainer3().append(hobbies_block);
      }

      getContentContainer3().append(languages_block);
      if (checkHeight()) {
        languages_block.remove();
        current_page_number++;
        getContentContainer3().append(languages_block);
      }

      getContentContainer3().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer3().append(references_block);
      }

      current_page_number = 1;

      getContentContainer4().append(profile_block);
      if (checkHeight()) {
        profile_block.remove();
        current_page_number++;
        getContentContainer4().append(profile_block);
      }

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

      getContentContainer4().append(certificates_block);
      if (checkHeight()) {
        certificates_block.remove();
        current_page_number++;
        getContentContainer4().append(certificates_block);
      }

      getContentContainer4().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getContentContainer4().append(extra_curricular_activities_block);
      }

      getContentContainer4().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        current_page_number++;
        getContentContainer4().append(internships_block);
      }
    }

    function checkHeight() {
      return getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
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
      page_element.attr('class', 'cv-body cv-body-visible cv-body-1 page-' + current_page_number);
      page_element.children().remove();

      let page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();

      page_element_container.find('.top-area .column-left').children().remove();
      page_element_container.find('.top-area .column-right').children().remove();
      page_element_container.find('.middle-area .column-left').children().remove();
      page_element_container.find('.middle-area .column-right').children().remove();
      page_element.append(page_element_container);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }

    rebuildingPages();
  }
}

export const ResumeCv016 = ({
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

useEffect(() => {
  if (isTemplate) {
    setTimeout(() => {
      drawing();
    }, 100);
  }
}, []);

  return (
    <div className="sv_016" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1 ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-2-text">
            <div className="circle-shade"></div>
            <div className="top-area">
              {
                !!conta?.picture && (
                  <div className="column-left">
                    <div className="photo-wrapper">
                    <div className="photo" style={{ backgroundImage: `url(${conta?.picture})` }}></div>
                    </div>
                  </div>
                )
              }
              <div className="column-right">
                <div className="name-and-prophecy-wrapper">
                  {
                    isContactArray && contact?.[0]?.jobTitle && (
                      <h2 className="cv-prophecy font-size-5">{contact?.[0]?.jobTitle}</h2>
                    )
                  }
                  {
                    isContactArray && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                      <h1 className="cv-name font-size-6">
                        {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                      </h1>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="middle-area">
              <div className="column-left">
                {
                  (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country || !!contact?.[0]?.phone || !!contact?.[0]?.email) && (
                    <div className="details-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">details</h3>
                        <h3 className="cv-heading font-size-3">01</h3>
                      </div>
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
                    <div className="additional-details-block block-block">
                      {
                        !!contact?.[0]?.nationality && (
                          <div className="block-item">
                            <p className="item-name">nationality:</p>
                            <p className="item-value">{contact?.[0]?.nationality}</p>
                          </div>
                        )
                      }
                      {
                        !!contact?.[0]?.driverLicense && (
                          <div className="block-item">
                            <p className="item-name">driving license:</p>
                            <p className="item-value">{contact?.[0]?.driverLicense}</p>
                          </div>
                        )
                      }
                      {
                        (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                          <div className="block-item">
                            <p className="item-name">data/place of birth:</p>
                            {
                              !!contact?.[0]?.dateOfBirth && (
                                <p className="item-value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}</p>
                              )
                            }
                            {
                              !!contact?.[0]?.placeOfBirth && (
                                <p className="item-value">{contact?.[0]?.placeOfBirth || ""}</p>
                              )
                            }
                          </div>
                        )
                      }
                    </div>
                  )
                }
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">links</h3>
                        <h3 className="cv-heading font-size-3">02</h3>
                      </div>
                      
                      {
                        social_links.map((item, index) => (
                          <a className="font-size-2" key={index}>{item.name}</a>
                        ))
                      }
                    </div>
                  )
                }
                {
                  !!(isArray(skills) && skills.length) && (
                    <div className="skills-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">skills</h3>
                        <h3 className="cv-heading font-size-3">03</h3>
                      </div>
                      
                      <div className="skills-list estimated-items-list">
                        {
                          skills.map((item, index) => (
                            <p className="estimated-item" key={index}>{item.name}</p>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">hobbies</h3>
                        <h3 className="cv-heading font-size-3">04</h3>
                      </div>
                      
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
                  isArray(languages) && !!languages.length && (
                    <div className="languages-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">languages</h3>
                        <h3 className="cv-heading font-size-3">05</h3>
                      </div>
                      
                      <div className="languages-list estimated-items-list">
                        {
                          languages.map((item, index) => (
                            <p className="languages-item" key={index}>
                              <span className="languages-name">{item.language}</span>
                              <span className="languages-value">{levelLanguage(item.level)}</span>
                            </p>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                    <div className="references-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">references</h3>
                        <h3 className="cv-heading font-size-3">06</h3>
                      </div>
                      
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
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">profile</h3>
                        <h3 className="cv-heading font-size-3">07</h3>
                      </div>
                      
                      <p dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  )
                }
                {
                  (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    <div className="employment-history-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">employment history </h3>
                        <h3 className="cv-heading font-size-3">08</h3>
                      </div>
                      
                      {
                        employment.map((itemEm, index) => (
                          <div className="block-info" key={index}>
                            <p className="block-subheading font-size-2">
                              {!!itemEm?.title && (`${itemEm?.title}, `)}
                              {!!itemEm?.company && (` ${itemEm?.company}, `)}
                              {!!itemEm?.city && (`${itemEm?.city} `)}
                            </p>
                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
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
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">education</h3>
                        <h3 className="cv-heading font-size-3">09</h3>
                      </div>
                      
                      {
                        education.map((itemEd, index) => (
                          <div className="block-info" key={index}>
                            {
                              (!!itemEd?.study) && (
                                <p className="block-subheading font-size-2">{itemEd?.facility && (`${itemEd.facility}, `)} {!!itemEd?.study && (`${itemEd?.study}, `)} {itemEd?.degree && (`${itemEd?.degree}`)} </p>
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
                  )
                }
                {
                  (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                    <div className="courses-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">courses</h3>
                        <h3 className="cv-heading font-size-3">10</h3>
                      </div>
                      
                      {
                        courses.map((itemCo, index) => (
                          <div className="block-info" key={index}>
                            {
                              (!!itemCo?.title || !!itemCo?.institution) && (
                                <p className="block-subheading font-size-2">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
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
                  )
                }
                {
                  isArray(certificates) && !!certificates.length && (
                    <div className="certificates-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">certificates</h3>
                        <h3 className="cv-heading font-size-3">11</h3>
                      </div>
                      
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
                  (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                    <div className="extra-curricular-activities-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">extra-curricular activities</h3>
                        <h3 className="cv-heading font-size-3">12</h3>
                      </div>
                      
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div className="block-info" key={index}>
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <p className="block-subheading font-size-2">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
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
                  )
                }
                {
                 (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    <div className="internships-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="cv-heading font-size-4">internships</h3>
                        <h3 className="cv-heading font-size-3">13</h3>
                      </div>
                      
                      {
                        internship.map((itemIn, index) => (
                          <div className="block-info" key={index}>
                            {
                              (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                                <p className="block-subheading font-size-2">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
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

