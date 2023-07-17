import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";

const Estimation = ({
  level = 0,
  maketLeng = 8,
  startLeng = 5,
}) => {
  let relation = maketLeng / startLeng;
  let rel = ((level * 100) / maketLeng) * relation;
  let pros = Math.round((maketLeng * rel) / 100);

  return (
    <div className="skill-estimation">
      {
        [...new Array(maketLeng)].map((_, index) => (
          <span key={index} className={`estimation-point main-color-2-border ${(index + 1) <= pros ? "main-color-2-background" : ""}`}></span>
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
      current_page_number = 1;

      let header_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-1').clone();
      let footer_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-3').clone();
      let photo_block = $('#cv-body-hidden-container .photo-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .employment-history-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .internships-block').clone();
      let references_block = $('#cv-body-hidden-container .references-block').clone();

      let profile_block_no_photo = $('#cv-body-hidden-container .profile-info-block.no-photo').clone();
      let profile_block_has_photo = $('#cv-body-hidden-container .profile-info-block.is-photo').clone();
      let details_block = $('#cv-body-hidden-container .details-block').clone();
      let education_block = $('#cv-body-hidden-container .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .courses-block').clone();
      let certificates_block = $('#cv-body-hidden-container .certificates-block').clone();
      let hobbies_block = $('#cv-body-hidden-container .hobbies-block').clone();
      let languages_block = $('#cv-body-hidden-container .languages-block').clone();
      let skills_block = $('#cv-body-hidden-container .skills-block').clone();

      let work_experience_block = $('#cv-body-hidden-container .work-experience-block').clone();
      let work_experience_subblocks = work_experience_block.find('.work-experience-subblock').clone();
      work_experience_block.find('.work-experience-subblock').remove();

      getPageContainer().append(header_block);
      getPageColumnLeft();
      getPageColumnRight();

      // Top area(profile block)
      current_page_number = 1;
      getPageContainer().parent().prepend(profile_block_no_photo);

      // Column left
      current_page_number = 1;
      getPageColumnLeft().append(photo_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        photo_block.remove();
        current_page_number++;
        getPageColumnLeft().append(photo_block);
        getPageColumnRight();
      }

      getPageColumnLeft().append(skills_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        skills_block.remove();
        current_page_number++;
        getPageColumnLeft().append(skills_block);
        getPageColumnRight();
      }

      getPageColumnLeft().append(languages_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        languages_block.remove();
        current_page_number++;
        getPageColumnLeft().append(languages_block);
        getPageColumnRight();
      }

      getPageColumnLeft().append(hobbies_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        hobbies_block.remove();
        current_page_number++;
        getPageColumnLeft().append(hobbies_block);
        getPageColumnRight();
      }

      // Column right
      current_page_number = 1;
      getPageColumnRight().append(profile_block_has_photo);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        profile_block_has_photo.remove();
        current_page_number++;
        getPageColumnLeft();
        getPageColumnRight().append(profile_block_has_photo);
      }

      getPageColumnRight().append(details_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        details_block.remove();
        current_page_number++;
        getPageColumnLeft();
        getPageColumnRight().append(details_block);
      }

      getPageColumnRight().append(education_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        education_block.remove();
        current_page_number++;
        getPageColumnLeft();
        getPageColumnRight().append(education_block);
      }

      let work_experience_block_list_container = work_experience_block.clone();
      getPageColumnRight().append(work_experience_block_list_container);
      work_experience_subblocks.each((index, item) => {
        work_experience_block_list_container.append(item);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          item.remove();
          current_page_number++;
          work_experience_block_list_container = work_experience_block.clone();
          getPageColumnRight().append(work_experience_block_list_container);
          work_experience_block_list_container.append(item);
        }
      });

      getPageColumnRight().append(extra_curricular_activities_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getPageColumnLeft();
        getPageColumnRight().append(extra_curricular_activities_block);
      }

      getPageColumnRight().append(internships_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        internships_block.remove();
        current_page_number++;
        getPageColumnLeft();
        getPageColumnRight().append(internships_block);
      }


      getPageColumnRight().append(certificates_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        certificates_block.remove();
        current_page_number++;
        getPageColumnLeft();
        getPageColumnRight().append(certificates_block);
      }

      getPageColumnRight().append(references_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        references_block.remove();
        current_page_number++;
        getPageColumnLeft();
        getPageColumnRight().append(references_block);
      }


      getPageContainer().append(footer_block);
      if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
        footer_block.remove();
        current_page_number++;
        getPageContainer().append(footer_block);
      }

      if (!getPageColumnRight()) {
        let col_r = getPageColumnRight();
      }
    }

    rebuildingPages();

    function createNewPage(page_number) {
      let page_element = $('<div class="cv-body cv-body-1 cv-body-visible page-' + page_number + '" data-chapter="cv" data-page="' + page_number + '"></div>');
      let page_wrapper = $('<div class="cv-body-content font-size-1 main-color-1-text"></div>');
      page_element.append(page_wrapper);
      let page_element_container = $('<div class="main-columns-wrapper"></div>');
      page_wrapper.append(page_element_container);

      let column_left = $('#cv-body-hidden-container .column-1.column-left').clone();
      column_left.children().remove();
      page_element_container.append(column_left);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }

    function getPageColumnLeft() {
      let column_left = getPageContainer().find('.column-left');
      if (column_left.length > 0) {
        return column_left;
      } else {
        column_left = $('<div class="column-1 column-left"></div>');
        getPageContainer().append(column_left);
        return $(column_left);
      }
    }

    function getPageColumnRight() {
      let column_right = getPageContainer().find('.column-right');
      if (column_right.length > 0) {
        return column_right;
      } else {
        column_right = $('<div class="column-2 column-right"></div>');
        getPageContainer().append(column_right);
        return $(column_right);
      }
    }

    function getPageContainer() {
      let page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
      if (page.length > 0) {
        return page.find('.cv-body-content .main-columns-wrapper');
      } else {
        return createNewPage(current_page_number);
      }
    }
  }
}

export const ResumeCv004 = ({
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

  return (
    <div className="sv_004" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-0`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text">
            <div className="profile-info-block no-photo">
              {
                isArray(contact) && contact?.[0]?.jobTitle && (
                  <h3 className="profile-speciality font-size-2 toggle-photo-state toggle-photo-state-active">{contact?.[0]?.jobTitle}</h3>
                )
              }
              {
                isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                  <h1 className="profile-name additional-color-1-text font-size-4 toggle-photo-state toggle-photo-state-active">{contact?.[0]?.firstName} {contact?.[0]?.lastName}</h1>
                )
              }
              <p dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
            </div>
            <div className="main-columns-wrapper">
              {
                ((isArray(contact) && contact?.[0]?.picture) || (isArray(skills) && !!skills.length) || (isArray(languages) && !!languages.length) || (isArray(hobbies) && !!hobbies.length)) && (
                  <div className="column-1 column-left additional-color-1-background toggle-photo-state toggle-photo-state-active">
                    {
                      contact?.[0]?.picture && (
                        <div className="photo-block block-block">
                          <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                        </div>
                      )
                    }
                    <div className="informations-container">
                      {/* skills */}
                      {
                        isArray(skills) && !!skills.length && (
                          <div className="skills-block block-block main-color-2-text toggle-photo-state toggle-photo-state-active">
                            <h3 className="block-title font-size-3">SKILLS</h3>
                            {
                              skills.map((item, index) => (
                                <p key={index} className="block-list-item skill-item">{item.name}</p>
                              ))
                            }
                          </div>
                        )
                      }
                      {/* languages */}
                      {
                        isArray(languages) && !!languages.length && (
                          <div className="languages-block block-block main-color-2-text">
                            <>
                              <h3 className="block-title font-size-3">LANGUAGES</h3>

                              {
                                languages.map((item, index) => (
                                  <div key={index} className="block-list-item language-item">
                                    <p className="language-name">{item.language}</p>
                                    <Estimation
                                      level={item.level}
                                      startLeng={6}
                                    />
                                  </div>
                                ))
                              }
                            </>
                          </div>
                        )
                      }
                      {/* hobbies */}
                      {
                        isArray(hobbies) && !!hobbies.length && (
                          <div className="hobbies-block block-block main-color-2-text">
                            <h3 className="block-title font-size-3">HOBBIES</h3>
                            <p className="block-list-item">Squash, Surfing, Swimming,<br />
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
                )
              }
              <div className="column-2 column-right">
                <div className="profile-info-block is-photo block-block">
                  {
                    isArray(contact) && contact?.[0]?.jobTitle && (
                      <h3 className="profile-speciality font-size-2 toggle-photo-state toggle-photo-state-active">{contact?.[0]?.jobTitle}</h3>
                    )
                  }
                  {
                    isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                      <h1 className="profile-name additional-color-1-text font-size-4 toggle-photo-state toggle-photo-state-active">{contact?.[0]?.firstName} {contact?.[0]?.lastName}</h1>
                    )
                  }
                  <p dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                </div>

                <div className="details-block block-block additional-color-1-border">
                  <div className="details-content-wrapper">
                    {
                      isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                        <div className="person-details left-side additional-color-1-border">
                          {
                            !!contact?.[0]?.dateOfBirth && (
                              <div className="details-item">
                                <span className="details-item-name">Birth Date</span>
                                <span className="details-item-value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}</span>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.placeOfBirth && (
                              <div className="details-item">
                                <span className="details-item-name">Place of Birth</span>
                                <span className="details-item-value">{contact?.[0]?.placeOfBirth}</span>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.nationality && (
                              <div className="details-item">
                                <span className="details-item-name">Nationality</span>
                                <span className="details-item-value">{contact?.[0]?.nationality}</span>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.driverLicense && (
                              <div className="details-item">
                                <span className="details-item-name">Driving Licence</span>
                                <span className="details-item-value">{contact?.[0]?.driverLicense}</span>
                              </div>
                            )
                          }
                        </div>
                      )
                    }
                    {
                      isArray(contact) && (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.phone || !!contact?.[0]?.address || !!contact?.[0]?.email || (isArray(social_links) && !!social_links.length)) && (
                        <div className="contacts">
                          {
                            !!contact?.[0]?.phone && (
                              <div className="contacts-item">
                                <svg className="additional-color-2-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.1313 8.125C11.9938 8.125 11.85 8.08125 11.7125 8.05C11.4343 7.98779 11.1607 7.90634 10.8938 7.80625C10.6039 7.70077 10.2851 7.70625 9.99899 7.82163C9.71284 7.93701 9.47947 8.15415 9.3438 8.43125L9.2063 8.71875C8.59931 8.3745 8.03856 7.95447 7.53755 7.46875C7.05183 6.96773 6.63179 6.40699 6.28755 5.8L6.57505 5.66875C6.85215 5.53307 7.06928 5.29971 7.18467 5.01356C7.30005 4.72741 7.30553 4.4087 7.20005 4.11875C7.10079 3.84939 7.01936 3.5738 6.9563 3.29375C6.92505 3.15625 6.90005 3.0125 6.8813 2.875C6.8054 2.43476 6.57481 2.03609 6.23106 1.75077C5.88731 1.46546 5.45298 1.31226 5.0063 1.31875H3.12505C2.86083 1.3184 2.59952 1.3739 2.35825 1.48161C2.11697 1.58932 1.90119 1.74681 1.72505 1.94375C1.54525 2.14603 1.41137 2.38484 1.33261 2.64377C1.25385 2.9027 1.23208 3.17561 1.2688 3.44375C1.60854 6.04509 2.79705 8.46166 4.65005 10.3188C6.50714 12.1717 8.92371 13.3603 11.525 13.7C11.6062 13.7062 11.6877 13.7062 11.7688 13.7C12.2297 13.7007 12.6747 13.5316 13.0188 13.225C13.2157 13.0489 13.3732 12.8331 13.4809 12.5918C13.5886 12.3505 13.6441 12.0892 13.6438 11.825V9.95C13.6404 9.51815 13.4881 9.1007 13.2125 8.76818C12.9369 8.43567 12.555 8.20848 12.1313 8.125ZM12.4375 11.875C12.4373 11.9622 12.4189 12.0484 12.3834 12.1281C12.3478 12.2077 12.296 12.2791 12.2313 12.3375C12.1628 12.3999 12.0813 12.4463 11.9926 12.4733C11.904 12.5004 11.8105 12.5073 11.7188 12.4937C9.38647 12.1891 7.21895 11.1262 5.55005 9.46875C3.87972 7.79842 2.80757 5.62335 2.50005 3.28125C2.48647 3.18958 2.49344 3.09605 2.52047 3.00741C2.54749 2.91877 2.59389 2.83725 2.6563 2.76875C2.71543 2.70322 2.78778 2.65096 2.86858 2.61541C2.94937 2.57986 3.03678 2.56183 3.12505 2.5625H5.00005C5.14452 2.55897 5.28576 2.60562 5.39971 2.6945C5.51367 2.78338 5.5933 2.90901 5.62505 3.05C5.62505 3.21875 5.6813 3.39375 5.7188 3.5625C5.79103 3.88991 5.88712 4.21161 6.0063 4.525L5.1313 4.9375C4.9809 5.00654 4.86402 5.13241 4.8063 5.2875C4.74379 5.43966 4.74379 5.61034 4.8063 5.7625C5.7058 7.68922 7.25457 9.238 9.1813 10.1375C9.33346 10.2 9.50413 10.2 9.6563 10.1375C9.81139 10.0798 9.93726 9.9629 10.0063 9.8125L10.4 8.9375C10.7225 9.05508 11.0524 9.15112 11.3875 9.225C11.55 9.2625 11.725 9.29375 11.8938 9.31875C12.0348 9.3505 12.1604 9.43013 12.2493 9.54408C12.3382 9.65804 12.3848 9.79927 12.3813 9.94375L12.4375 11.875ZM8.75005 1.25C8.6063 1.25 8.4563 1.25 8.31255 1.25C8.14679 1.26409 7.99341 1.34345 7.88616 1.47062C7.77892 1.5978 7.72658 1.76236 7.74067 1.92813C7.75476 2.09389 7.83412 2.24726 7.96129 2.35451C8.08847 2.46175 8.25304 2.51409 8.4188 2.5H8.75005C9.74461 2.5 10.6984 2.89509 11.4017 3.59835C12.105 4.30161 12.5 5.25544 12.5 6.25C12.5 6.3625 12.5 6.46875 12.5 6.58125C12.4862 6.74613 12.5383 6.90978 12.6449 7.03631C12.7515 7.16285 12.904 7.24194 13.0688 7.25625H13.1188C13.2753 7.25688 13.4263 7.19881 13.542 7.09351C13.6577 6.9882 13.7297 6.84333 13.7438 6.6875C13.7438 6.54375 13.7438 6.39375 13.7438 6.25C13.7438 4.925 13.2179 3.65418 12.2815 2.71667C11.3452 1.77917 10.075 1.25166 8.75005 1.25V1.25ZM10 6.25C10 6.41576 10.0659 6.57473 10.1831 6.69194C10.3003 6.80915 10.4593 6.875 10.625 6.875C10.7908 6.875 10.9498 6.80915 11.067 6.69194C11.1842 6.57473 11.25 6.41576 11.25 6.25C11.25 5.58696 10.9867 4.95107 10.5178 4.48223C10.049 4.01339 9.41309 3.75 8.75005 3.75C8.58429 3.75 8.42531 3.81585 8.3081 3.93306C8.19089 4.05027 8.12505 4.20924 8.12505 4.375C8.12505 4.54076 8.19089 4.69973 8.3081 4.81694C8.42531 4.93415 8.58429 5 8.75005 5C9.08157 5 9.39951 5.1317 9.63393 5.36612C9.86835 5.60054 10 5.91848 10 6.25Z" fill="#030303"/>
                                </svg>
                                <p>{contact?.[0]?.phone}</p>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.email && (
                              <div className="contacts-item">
                                <svg className="additional-color-2-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g id="Communication / message">
                                    <path id="Vector" d="M11.875 2.5H3.125C2.62772 2.5 2.15081 2.69754 1.79917 3.04917C1.44754 3.40081 1.25 3.87772 1.25 4.375V10.625C1.25 11.1223 1.44754 11.5992 1.79917 11.9508C2.15081 12.3025 2.62772 12.5 3.125 12.5H11.875C12.3723 12.5 12.8492 12.3025 13.2008 11.9508C13.5525 11.5992 13.75 11.1223 13.75 10.625V4.375C13.75 3.87772 13.5525 3.40081 13.2008 3.04917C12.8492 2.69754 12.3723 2.5 11.875 2.5ZM3.125 3.75H11.875C12.0408 3.75 12.1997 3.81585 12.3169 3.93306C12.4342 4.05027 12.5 4.20924 12.5 4.375L7.5 7.425L2.5 4.375C2.5 4.20924 2.56585 4.05027 2.68306 3.93306C2.80027 3.81585 2.95924 3.75 3.125 3.75ZM12.5 10.625C12.5 10.7908 12.4342 10.9497 12.3169 11.0669C12.1997 11.1842 12.0408 11.25 11.875 11.25H3.125C2.95924 11.25 2.80027 11.1842 2.68306 11.0669C2.56585 10.9497 2.5 10.7908 2.5 10.625V5.8L7.175 8.65625C7.27001 8.71111 7.37779 8.73998 7.4875 8.73998C7.59721 8.73998 7.70499 8.71111 7.8 8.65625L12.5 5.8V10.625Z" fill="#030303"/>
                                  </g>
                                </svg>
                                <p>{contact?.[0]?.email}</p>
                              </div>
                            )
                          }
                          {
                            (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.address || !!contact?.[0]?.zipCode) && (
                              <div className="contacts-item">
                                <svg className="additional-color-2-svg" width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g id="Location and Map / location pin">
                                    <path id="Vector" d="M8.40911 2.79988C7.50496 1.80532 6.27867 1.24658 5.00002 1.24658C3.72136 1.24658 2.49507 1.80532 1.59092 2.79988C0.686777 3.79444 0.178833 5.14336 0.178833 6.54988C0.178833 7.95641 0.686777 9.30532 1.59092 10.2999L4.58524 13.5999C4.63806 13.6585 4.7009 13.705 4.77014 13.7367C4.83938 13.7684 4.91364 13.7848 4.98865 13.7848C5.06366 13.7848 5.13792 13.7684 5.20716 13.7367C5.2764 13.705 5.33924 13.6585 5.39206 13.5999L8.40911 10.2686C9.30948 9.27821 9.8153 7.93492 9.8153 6.53426C9.8153 5.1336 9.30948 3.79031 8.40911 2.79988ZM7.59661 9.37488L5.00002 12.2436L2.40342 9.37488C1.89044 8.81008 1.5412 8.09066 1.39984 7.30756C1.25849 6.52447 1.33137 5.71285 1.60928 4.97531C1.88719 4.23777 2.35764 3.60741 2.96117 3.16393C3.5647 2.72045 4.27421 2.48375 5.00002 2.48375C5.72582 2.48375 6.43533 2.72045 7.03886 3.16393C7.64239 3.60741 8.11284 4.23777 8.39075 4.97531C8.66866 5.71285 8.74154 6.52447 8.60019 7.30756C8.45884 8.09066 8.10959 8.81008 7.59661 9.37488ZM3.29547 4.63113C2.83679 5.13724 2.57922 5.82274 2.57922 6.53738C2.57922 7.25203 2.83679 7.93753 3.29547 8.44363C3.63624 8.81913 4.07024 9.07556 4.543 9.18076C5.01576 9.28596 5.50624 9.23525 5.9529 9.03498C6.39956 8.83471 6.78251 8.49381 7.0537 8.05504C7.32489 7.61627 7.47225 7.09918 7.47729 6.56863C7.47985 6.21439 7.41781 5.86317 7.29485 5.53575C7.17188 5.20833 6.99048 4.91136 6.76138 4.66238C6.53619 4.40899 6.26767 4.20709 5.97128 4.0683C5.67488 3.9295 5.35646 3.85656 5.03433 3.85365C4.71221 3.85075 4.39274 3.91794 4.09432 4.05138C3.79589 4.18481 3.5244 4.38184 3.29547 4.63113ZM5.96024 7.55613C5.74493 7.7966 5.46036 7.94732 5.1552 7.98254C4.85004 8.01776 4.54323 7.93528 4.28724 7.74921C4.03124 7.56314 3.84195 7.28503 3.75172 6.96243C3.6615 6.63984 3.67595 6.29278 3.79261 5.9806C3.90926 5.66843 4.12087 5.41052 4.39126 5.25097C4.66165 5.09142 4.97402 5.04014 5.27498 5.10589C5.57594 5.17165 5.84678 5.35036 6.04121 5.61146C6.23565 5.87257 6.34159 6.19986 6.34092 6.53738C6.33266 6.92318 6.18552 7.28959 5.93183 7.55613H5.96024Z" fill="#030303"/>
                                  </g>
                                </svg>
                                <p>{`${!!contact?.[0]?.country ? (`${contact?.[0]?.country},`) : ''} ${!!contact?.[0]?.address ? (`${contact?.[0]?.address},`) : ''} ${!!contact?.[0]?.city ? (`${contact?.[0]?.city},`) : ''} ${!!contact?.[0]?.zipCode ? contact?.[0]?.zipCode : ""}`}</p>
                              </div>
                            )
                          }
                          {
                            isArray(social_links) && !!social_links.length && (
                              <div className="contacts-item">
                                <svg className="additional-color-2-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g id="User Interface / Link">
                                    <path id="Vector" d="M7.56877 9.61869L5.14377 12.0437C4.85017 12.327 4.45806 12.4854 4.05002 12.4854C3.64198 12.4854 3.24987 12.327 2.95627 12.0437C2.81227 11.9003 2.69802 11.7298 2.62005 11.5421C2.54209 11.3544 2.50196 11.1532 2.50196 10.9499C2.50196 10.7467 2.54209 10.5455 2.62005 10.3578C2.69802 10.1701 2.81227 9.99962 2.95627 9.85619L5.38127 7.43119C5.49896 7.3135 5.56508 7.15388 5.56508 6.98744C5.56508 6.821 5.49896 6.66138 5.38127 6.54369C5.26358 6.426 5.10396 6.35988 4.93752 6.35988C4.77108 6.35988 4.61146 6.426 4.49377 6.54369L2.06877 8.97494C1.58024 9.50668 1.31603 10.2066 1.33132 10.9285C1.3466 11.6505 1.6402 12.3386 2.15079 12.8492C2.66138 13.3598 3.3495 13.6534 4.07142 13.6686C4.79335 13.6839 5.49327 13.4197 6.02502 12.9312L8.45627 10.5062C8.57396 10.3885 8.64008 10.2289 8.64008 10.0624C8.64008 9.896 8.57396 9.73638 8.45627 9.61869C8.33858 9.501 8.17896 9.43488 8.01252 9.43488C7.84608 9.43488 7.68646 9.501 7.56877 9.61869ZM12.9313 2.06869C12.4055 1.54619 11.6944 1.25293 10.9531 1.25293C10.2119 1.25293 9.50078 1.54619 8.97502 2.06869L6.54377 4.49369C6.4855 4.55196 6.43927 4.62114 6.40773 4.69728C6.37619 4.77342 6.35996 4.85503 6.35996 4.93744C6.35996 5.01985 6.37619 5.10145 6.40773 5.17759C6.43927 5.25373 6.4855 5.32291 6.54377 5.38119C6.60204 5.43946 6.67123 5.48569 6.74736 5.51722C6.8235 5.54876 6.90511 5.56499 6.98752 5.56499C7.06993 5.56499 7.15154 5.54876 7.22768 5.51722C7.30381 5.48569 7.373 5.43946 7.43127 5.38119L9.85627 2.95619C10.1499 2.67283 10.542 2.51447 10.95 2.51447C11.3581 2.51447 11.7502 2.67283 12.0438 2.95619C12.1878 3.09962 12.302 3.27007 12.38 3.45776C12.4579 3.64545 12.4981 3.8467 12.4981 4.04994C12.4981 4.25318 12.4579 4.45442 12.38 4.64211C12.302 4.82981 12.1878 5.00026 12.0438 5.14369L9.61877 7.56869C9.56019 7.62679 9.51369 7.69591 9.48196 7.77208C9.45023 7.84824 9.4339 7.92993 9.4339 8.01244C9.4339 8.09494 9.45023 8.17664 9.48196 8.2528C9.51369 8.32896 9.56019 8.39809 9.61877 8.45619C9.67687 8.51477 9.746 8.56126 9.82216 8.59299C9.89832 8.62472 9.98001 8.64106 10.0625 8.64106C10.145 8.64106 10.2267 8.62472 10.3029 8.59299C10.379 8.56126 10.4482 8.51477 10.5063 8.45619L12.9313 6.02494C13.4538 5.49918 13.747 4.78805 13.747 4.04681C13.747 3.30558 13.4538 2.59445 12.9313 2.06869ZM5.51877 9.48119C5.57717 9.53911 5.64643 9.58494 5.72258 9.61604C5.79873 9.64715 5.88027 9.66291 5.96252 9.66244C6.04477 9.66291 6.12631 9.64715 6.20246 9.61604C6.27861 9.58494 6.34787 9.53911 6.40627 9.48119L9.48127 6.40619C9.59896 6.2885 9.66508 6.12888 9.66508 5.96244C9.66508 5.796 9.59896 5.63638 9.48127 5.51869C9.36358 5.401 9.20396 5.33488 9.03752 5.33488C8.87108 5.33488 8.71146 5.401 8.59377 5.51869L5.51877 8.59369C5.46019 8.65179 5.41369 8.72091 5.38196 8.79708C5.35023 8.87324 5.3339 8.95493 5.3339 9.03744C5.3339 9.11994 5.35023 9.20164 5.38196 9.2778C5.41369 9.35396 5.46019 9.42309 5.51877 9.48119Z" fill="#030303"/>
                                  </g>
                                </svg>
                                <div className="social-wrapper">
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
                      )
                    }
                  </div>
                </div>
                {/* education */}
                {
                  (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    <div className="education-block block-block additional-color-1-border">
                      <div className="left-side">
                        <h3 className="block-title additional-color-1-text font-size-3">EDUCATION</h3>
                      </div>
                      <div className="right-side">
                        {
                          education.map((itemEd, index) => (
                            <div className="block-info" key={index}>
                              {
                                !!itemEd?.facility && (
                                  <p className="facility-text">{itemEd?.facility}</p>
                                )
                              }
                              {
                                !!itemEd?.degree && (
                                  <p className="degree-text">{itemEd?.degree}</p>
                                )
                              }
                              {
                                !!itemEd?.study && (
                                  <p className="study-text">{itemEd?.study}</p>
                                )
                              }
                              {/* <p className="" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p> */}
                              {
                                (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                  <p className="data-range">
                                    {!!itemEd?.dateFrom?.date && (checkForSymbol([itemEd?.dateTo?.date]) ? moment(itemEd?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEd?.dateFrom?.date).format("MMMM yy"))}
                                    {!!itemEd?.dateTo?.date && (moment(itemEd?.dateTo?.date).format("MMMM yy"))}
                                  </p>
                                )
                              }
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {/* employment */}
                {
                  (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    <div className="work-experience-block block-block additional-color-1-border">
                      <h3 className="block-title additional-color-1-text font-size-3">WORK EXPERIENCE</h3>
                      {
                        employment.map((itemEm, index) => (
                          <div className="work-experience-subblock" key={index}>
                            <div className="left-side">
                              <span className="pointer-circle additional-color-1-background"></span>
                              {
                                !!itemEm?.title && (
                                  <p className="title-text additional-color-1-text">{itemEm?.title}</p>
                                )
                              }
                              {
                                (!!itemEm?.company || !!itemEm?.city) && (
                                  <p className="company-text">
                                    {!!itemEm?.company && (checkForSymbol([itemEm?.city])) ? itemEm?.company + ', ' : itemEm?.company}
                                    {!!itemEm?.city && (itemEm?.city)}
                                  </p>
                                )
                              }
                              {
                                (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                  <p className="date-range">
                                    {!!itemEm?.periodFrom?.date && (checkForSymbol([itemEm?.periodTo?.date]) ? moment(itemEm?.periodFrom?.date).format("MMMM yy") + ' - ' : moment(itemEm?.periodFrom?.date).format("MMMM yy"))}
                                    {!!itemEm?.periodTo?.date && (moment(itemEm?.periodTo?.date).format("MMMM yy"))}
                                  </p>
                                )
                              }
                            </div>
                            <div className="right-side">
                              <div className="list-wrapper" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {/* certificates */}
                {
                  isArray(certificates) && !!certificates.length && (
                    <div className="certificates-block block-block additional-color-1-border">
                      <div className="left-side">
                        <h3 className="block-title additional-color-1-text font-size-3">CERTIFICATES</h3>
                      </div>
                      <div className="right-side">
                        {
                          certificates.map((item, index) => (
                            <span key={index}>
                              {`${item.name}`}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {/* references */}
                {
                 (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                    <div className="references-block block-block additional-color-1-border">
                      <div className="left-side">
                        <h3 className="block-title additional-color-1-text font-size-3">REFERENCES</h3>
                      </div>

                      <div className="right-side">
                        {
                          reference.map((itemRef, index) => (
                            <div className="references-block-item" key={index}>
                              {
                                (!!itemRef?.fullName || !!itemRef?.company) && (
                                  <p className="name-text">
                                    {!!itemRef?.fullName && (checkForSymbol([itemRef?.company])) ? itemRef?.fullName + ', ' : itemRef?.fullName}
                                    {!!itemRef?.company && (itemRef?.company)}
                                  </p>
                                )
                              }
                              {
                                !!itemRef?.email && (
                                  <p className="email-text">{itemRef.email}</p>
                                )
                              }
                              {
                                !!itemRef.phone && (
                                  <p className="phone-text">{itemRef.phone}</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

