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

      let name_and_photo_block = $('#cv-body-hidden-container .cv-body-content .name-and-photo-block').clone();
      let profile_icon = $('#cv-body-hidden-container .cv-body-content .profile-icon').clone();
      let details_block = $('#cv-body-hidden-container .cv-body-content .details-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let hobbies_and_references = $('#cv-body-hidden-container .cv-body-content .hobbies-and-references-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_and_sertificates = $('#cv-body-hidden-container .cv-body-content .courses-and-sertificates-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();

      current_page_number = 1;

      getContentContainer1().append(name_and_photo_block);
      if (checkHeight()) {
        name_and_photo_block.remove();
        current_page_number++;
        getContentContainer1().append(name_and_photo_block);
      }

      getContentContainer1().append(profile_icon);
      if (checkHeight()) {
        profile_icon.remove();
        current_page_number++;
        getContentContainer1().append(profile_icon);
      }

      current_page_number = 1;

      getContentContainer2().append(employment_history_block);
      if (checkHeight()) {
        employment_history_block.remove();
        current_page_number++;
        getContentContainer2().append(employment_history_block);
      }

      getContentContainer2().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        current_page_number++;
        getContentContainer2().append(internships_block);
      }

      getContentContainer2().append(skills_block);
      if (checkHeight()) {
        skills_block.remove();
        current_page_number++;
        getContentContainer2().append(skills_block);
      }

      getContentContainer2().append(details_block);
      if (checkHeight()) {
        details_block.remove();
        current_page_number++;
        getContentContainer2().append(details_block);
      }

      current_page_number = 1;

      getContentContainer3().append(profile_block);
      if (checkHeight()) {
        profile_block.remove();
        current_page_number++;
        getContentContainer3().append(profile_block);
      }

      getContentContainer3().append(education_block);
      if (checkHeight()) {
        education_block.remove();
        current_page_number++;
        getContentContainer3().append(education_block);
      }

      getContentContainer3().append(courses_and_sertificates);
      if (checkHeight()) {
        courses_and_sertificates.remove();
        current_page_number++;
        getContentContainer3().append(courses_and_sertificates);
      }

      getContentContainer3().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getContentContainer3().append(extra_curricular_activities_block);
      }

      getContentContainer3().append(languages_block);
      if (checkHeight()) {
        languages_block.remove();
        current_page_number++;
        getContentContainer3().append(languages_block);
      }

      getContentContainer3().append(hobbies_and_references);
      if (checkHeight()) {
        hobbies_and_references.remove();
        current_page_number++;
        getContentContainer3().append(hobbies_and_references);
      }
    }

    function checkHeight() {
      return getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
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

      page_element_container.find('.top-area').children().remove();
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

export const ResumeCv017 = ({
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
    if (!!isDrawing ) {
    drawing();
    handleFalseDrafind();
  }
  }, [isDrawing, data, stateClasses]);

  return (
    <div className="sv_017" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1 ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text additional-color-1-background">
            <div className="top-area">
              <div className="name-and-photo-block block-block">
                <div className="name-and-prophecy-wrapper">
                  {
                    isContactArray && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                      <p className="cv-name font-size-6">
                        {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                      </p>
                    )
                  }
                  {
                    isContactArray && contact?.[0]?.jobTitle && (
                      <p className="cv-prophecy font-size-5">{contact?.[0]?.jobTitle}</p>
                    )
                  }
                </div>
                {
                  !!conta?.picture && (
                      <div className="photo-wrapper">
                        <div className="photo" style={{ backgroundImage: `url(${conta?.picture})` }}></div>
                      </div>
                  )
                }
              </div>
              <div className="profile-icon"></div>
            </div>
            <div className="middle-area">
              <div className="column-left">
                {
                  (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    <div className="employment-history-block block-block m-left">
                      <p className="cv-heading font-size-4">employment history </p>   
                      <div className="bg-block">
                        {
                          employment.map((itemEm, index) => (
                            <div className="block-info" key={index}>
                              <div className="top-bg"></div>
                              <div className="right-bg"></div>
                              <div className="bottom-bg"></div>
                              <p className="cv-subheading font-size-2">
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
                    </div>
                  )
                }
                {
                 (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    <div className="internships-block block-block m-left">
                      <p className="cv-heading font-size-4">internships</p>
                      <div className="bg-block">
                        {
                          internship.map((itemIn, index) => (
                            <div className="block-info" key={index}>
                              <div className="top-bg"></div>
                              <div className="right-bg"></div>
                              <div className="bottom-bg"></div>
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
                {
                  !!(isArray(skills) && skills.length) && (
                    <div className="skills-block block-block m-left">
                      <p className="cv-heading font-size-4">skills</p>
                      <div className="bg-block">
                        <div className="skills-list estimated-items-list">
                          <div className="top-bg"></div>
                          <div className="right-bg"></div>
                          <div className="bottom-bg"></div>
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
                      </div>
                    </div>
                  )
                }
                {
                  (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country || !!contact?.[0]?.phone || !!contact?.[0]?.email) && (
                    <div className="details-block block-block m-left">
                      <p className="cv-heading font-size-4">details</p>
                      <div className="bg-block">
                        <div className="left-side">
                          <div className="top-bg"></div>
                          <div className="right-bg"></div>
                          <div className="bottom-bg"></div>
                          <div className="details-address details-item">
                            {
                              (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                                    <path d="M5 0C3.67392 0 2.40215 0.505711 1.46447 1.40588C0.526784 2.30605 0 3.52695 0 4.79998C0 8.03997 4.40625 11.7 4.59375 11.856C4.70696 11.9489 4.85103 12 5 12C5.14897 12 5.29304 11.9489 5.40625 11.856C5.625 11.7 10 8.03997 10 4.79998C10 3.52695 9.47322 2.30605 8.53553 1.40588C7.59785 0.505711 6.32608 0 5 0ZM5 10.59C3.66875 9.38997 1.25 6.80398 1.25 4.79998C1.25 3.84521 1.64509 2.92954 2.34835 2.25441C3.05161 1.57928 4.00544 1.2 5 1.2C5.99456 1.2 6.94839 1.57928 7.65165 2.25441C8.35491 2.92954 8.75 3.84521 8.75 4.79998C8.75 6.80398 6.33125 9.39597 5 10.59ZM5 2.39999C4.50555 2.39999 4.0222 2.54075 3.61107 2.80446C3.19995 3.06818 2.87952 3.44301 2.6903 3.88155C2.50108 4.32009 2.45157 4.80265 2.54804 5.2682C2.6445 5.73375 2.8826 6.16139 3.23223 6.49704C3.58186 6.83268 4.02732 7.06126 4.51227 7.15386C4.99723 7.24647 5.49989 7.19894 5.95671 7.01729C6.41352 6.83564 6.80397 6.52803 7.07867 6.13335C7.35338 5.73867 7.5 5.27466 7.5 4.79998C7.5 4.16347 7.23661 3.55302 6.76777 3.10293C6.29893 2.65285 5.66304 2.39999 5 2.39999ZM5 5.99998C4.75277 5.99998 4.5111 5.9296 4.30554 5.79774C4.09998 5.66589 3.93976 5.47847 3.84515 5.2592C3.75054 5.03993 3.72579 4.79865 3.77402 4.56588C3.82225 4.3331 3.9413 4.11928 4.11612 3.95146C4.29093 3.78364 4.51366 3.66935 4.75614 3.62305C4.99861 3.57674 5.24995 3.60051 5.47835 3.69133C5.70676 3.78216 5.90199 3.93596 6.03934 4.1333C6.17669 4.33064 6.25 4.56265 6.25 4.79998C6.25 5.11824 6.1183 5.42347 5.88388 5.64851C5.64946 5.87355 5.33152 5.99998 5 5.99998Z" fill="#75BE87"/>
                                  </svg>
                                  <p>
                                    {!!contact?.[0]?.address && (`${contact?.[0]?.address},`)}
                                    {!!contact?.[0]?.city && (`${contact?.[0]?.city}, ${!!contact?.[0]?.zipCode && contact?.[0]?.zipCode} ${!!contact?.[0]?.country && contact?.[0]?.country}`)}
                                  </p>
                                </>
                              )
                            }
                          </div>
                          <div className="details-phone details-item">
                            {
                              !!contact?.[0]?.phone && (
                                <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M8.70921 5.50338C8.59914 5.50338 8.48407 5.46836 8.374 5.44334C8.15129 5.39354 7.93229 5.32834 7.7186 5.24822C7.4865 5.16378 7.23138 5.16817 7.00232 5.26053C6.77326 5.35289 6.58645 5.52671 6.47784 5.74853L6.36777 5.97867C5.88189 5.7031 5.43301 5.36687 5.03195 4.97805C4.64314 4.57699 4.30691 4.12812 4.03134 3.64223L4.26148 3.53717C4.4833 3.42856 4.65711 3.24175 4.74948 3.01269C4.84184 2.78363 4.84622 2.52851 4.76179 2.29641C4.68233 2.08079 4.61715 1.86018 4.56667 1.636C4.54165 1.52594 4.52164 1.41087 4.50663 1.3008C4.44588 0.948392 4.26129 0.629257 3.98612 0.400866C3.71095 0.172474 3.36328 0.049835 3.00571 0.0550337H1.49979C1.28828 0.0547567 1.0791 0.0991848 0.885968 0.185406C0.692833 0.271626 0.520102 0.397693 0.379098 0.555341C0.235169 0.717267 0.128001 0.908432 0.0649567 1.1157C0.00191211 1.32297 -0.0155146 1.54143 0.0138738 1.75608C0.285834 3.83842 1.23723 5.77287 2.72053 7.25945C4.20712 8.74276 6.14156 9.69415 8.22391 9.96611C8.28886 9.97108 8.35408 9.97108 8.41903 9.96611C8.78796 9.96666 9.14417 9.8313 9.41964 9.58588C9.57729 9.44488 9.70336 9.27215 9.78958 9.07901C9.8758 8.88588 9.92023 8.6767 9.91995 8.46519V6.96427C9.91725 6.61858 9.7953 6.28441 9.57471 6.01824C9.35411 5.75207 9.04839 5.5702 8.70921 5.50338ZM8.95436 8.50522C8.95419 8.57503 8.93942 8.64404 8.91098 8.7078C8.88255 8.77157 8.84109 8.82867 8.78926 8.87545C8.73442 8.9254 8.66917 8.96254 8.59822 8.98417C8.52726 9.00581 8.45238 9.01139 8.37901 9.00052C6.512 8.75669 4.77692 7.90585 3.44098 6.57904C2.10389 5.24195 1.24564 3.50083 0.999479 1.626C0.98861 1.55262 0.994194 1.47774 1.01583 1.40679C1.03746 1.33584 1.0746 1.27058 1.12456 1.21575C1.17189 1.16329 1.22981 1.12146 1.29448 1.093C1.35916 1.06454 1.42913 1.05011 1.49979 1.05064H3.00071C3.11636 1.04782 3.22942 1.08516 3.32063 1.15631C3.41185 1.22746 3.4756 1.32802 3.50101 1.44088C3.50101 1.57597 3.54604 1.71605 3.57606 1.85114C3.63388 2.11323 3.7108 2.37074 3.8062 2.62161L3.10577 2.95181C2.98538 3.00708 2.89182 3.10783 2.84561 3.23198C2.79557 3.35379 2.79557 3.49041 2.84561 3.61222C3.56565 5.15454 4.80544 6.39432 6.34776 7.11436C6.46956 7.1644 6.60619 7.1644 6.72799 7.11436C6.85214 7.06816 6.9529 6.9746 7.00816 6.85421L7.32336 6.15378C7.58147 6.24789 7.84555 6.32478 8.11384 6.38392C8.24392 6.41394 8.38401 6.43895 8.51909 6.45896C8.63195 6.48438 8.73252 6.54812 8.80367 6.63934C8.87482 6.73056 8.91216 6.84362 8.90933 6.95927L8.95436 8.50522ZM6.00255 0C5.88748 0 5.7674 0 5.65233 0C5.51964 0.0112786 5.39687 0.0748061 5.31102 0.176607C5.22517 0.278408 5.18327 0.410143 5.19455 0.542833C5.20583 0.675523 5.26936 0.798297 5.37116 0.884148C5.47296 0.969999 5.6047 1.01189 5.73739 1.00061H6.00255C6.79869 1.00061 7.56222 1.31688 8.12517 1.87983C8.68813 2.44279 9.00439 3.20632 9.00439 4.00246C9.00439 4.09251 9.00439 4.17756 9.00439 4.26762C8.9933 4.3996 9.035 4.5306 9.12034 4.63189C9.20569 4.73318 9.32771 4.79649 9.45967 4.80795H9.49969C9.62494 4.80846 9.74582 4.76197 9.83845 4.67768C9.93108 4.59338 9.98873 4.47741 10 4.35267C10 4.2376 10 4.11753 10 4.00246C10 2.9418 9.579 1.92452 8.82948 1.17406C8.07995 0.423597 7.0632 0.00132581 6.00255 0ZM7.00316 4.00246C7.00316 4.13515 7.05587 4.2624 7.1497 4.35623C7.24352 4.45005 7.37078 4.50276 7.50347 4.50276C7.63616 4.50276 7.76341 4.45005 7.85724 4.35623C7.95107 4.2624 8.00378 4.13515 8.00378 4.00246C8.00378 3.4717 7.79293 2.96268 7.41763 2.58737C7.04233 2.21207 6.53331 2.00123 6.00255 2.00123C5.86986 2.00123 5.7426 2.05394 5.64878 2.14776C5.55495 2.24159 5.50224 2.36885 5.50224 2.50153C5.50224 2.63422 5.55495 2.76148 5.64878 2.85531C5.7426 2.94913 5.86986 3.00184 6.00255 3.00184C6.26793 3.00184 6.52244 3.10726 6.71009 3.29491C6.89774 3.48257 7.00316 3.73708 7.00316 4.00246Z" fill="#75BE87"/>
                                </svg>
                                  <p>{contact?.[0]?.phone}</p>
                                </>
                                
                              )
                            }
                          </div>
                          <div className="details-email details-item">
                            {
                              !!contact?.[0]?.email && (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M8.5 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V6.5C0 6.89782 0.158035 7.27936 0.43934 7.56066C0.720644 7.84196 1.10218 8 1.5 8H8.5C8.89782 8 9.27936 7.84196 9.56066 7.56066C9.84196 7.27936 10 6.89782 10 6.5V1.5C10 1.10218 9.84196 0.720644 9.56066 0.43934C9.27936 0.158035 8.89782 0 8.5 0ZM1.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645C8.94732 1.24021 9 1.36739 9 1.5L5 3.94L1 1.5C1 1.36739 1.05268 1.24021 1.14645 1.14645C1.24021 1.05268 1.36739 1 1.5 1ZM9 6.5C9 6.63261 8.94732 6.75979 8.85355 6.85355C8.75979 6.94732 8.63261 7 8.5 7H1.5C1.36739 7 1.24021 6.94732 1.14645 6.85355C1.05268 6.75979 1 6.63261 1 6.5V2.64L4.74 4.925C4.81601 4.96888 4.90223 4.99199 4.99 4.99199C5.07777 4.99199 5.16399 4.96888 5.24 4.925L9 2.64V6.5Z" fill="#75BE87"/>
                                  </svg>
                                  <p>{contact?.[0]?.email}</p>
                                </>
                              )
                            }
                          </div>
                        </div>
                        <div className="right-side">
                          {
                            (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                              <div className="additional-details-block">
                                {
                                  (!!contact?.[0]?.placeOfBirth) && (
                                    <div className="block-item">
                                      <p className="item-name">Place of birth</p>
                                      {
                                        !!contact?.[0]?.placeOfBirth && (
                                          <p className="item-value">{contact?.[0]?.placeOfBirth || ""}</p>
                                        )
                                      }
                                    </div>
                                  )
                                }
                                {
                                  !!contact?.[0]?.nationality && (
                                    <div className="block-item">
                                      <p className="item-name">Nationality</p>
                                      <p className="item-value">{contact?.[0]?.nationality}</p>
                                    </div>
                                  )
                                }
                                {
                                  (!!contact?.[0]?.dateOfBirth) && (
                                    <div className="block-item">
                                      <p className="item-name">Date of birth</p>
                                      {
                                        !!contact?.[0]?.dateOfBirth && (
                                          <p className="item-value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}</p>
                                        )
                                      }
                                    </div>
                                  )
                                }
                                {
                                  !!contact?.[0]?.driverLicense && (
                                    <div className="block-item">
                                      <p className="item-name">Driving license</p>
                                      <p className="item-value">{contact?.[0]?.driverLicense}</p>
                                    </div>
                                  )
                                }
                              </div>
                            )
                          }
                          {
                            isArray(social_links) && !!social_links.length && (
                              <div className="links-block">
                                {
                                  social_links.map((item, index) => (
                                    <a key={index}><img src={item.icon} alt={item.name} /></a>
                                  ))
                                }
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="column-right">
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-block block-block m-right">
                      <p className="cv-heading font-size-4">profile</p>
                      <div className="bg-block">
                        <div className="top-bg"></div>
                        <div className="left-bg"></div>
                        <div className="bottom-bg"></div>
                        <p dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                      </div>
                    </div>
                  )
                }
                {
                  (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    <div className="education-block block-block m-right">
                      <p className="cv-heading font-size-4">education</p>
                      <div className="bg-block">
                        {
                          education.map((itemEd, index) => (
                            <div className="block-info" key={index}>
                              <div className="top-bg"></div>
                              <div className="left-bg"></div>
                              <div className="bottom-bg"></div>
                              {
                                (!!itemEd?.study || !!itemEd?.facility) && (
                                  <p className="cv-subheading font-size-2">
                                    {itemEd?.facility && (`${itemEd.facility}, `)}
                                    {!!itemEd?.study && (`${itemEd?.study}`)}
                                  </p>
                                )
                              }
                              {
                                (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date || !!itemEd?.degree) && (
                                  <p className="date-range">
                                    {!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)}
                                    {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}
                                    <span className="cv-degree">{itemEd?.degree && (`${itemEd?.degree}`)}</span>
                                  </p>
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
                <div className="courses-and-sertificates-block block-block">
                  <div className="left-side">
                    {
                      (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                        <div className="courses-block block-block m-right m-small">
                          <p className="cv-heading font-size-4">courses</p>
                          <div className="bg-block">
                            {
                              courses.map((itemCo, index) => (
                                <div className="block-info" key={index}>
                                  <div className="top-bg"></div>
                                  <div className="left-bg"></div>
                                  <div className="bottom-bg"></div>
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
                  </div>
                  <div className="right-side">
                    {
                      isArray(certificates) && !!certificates.length && (
                        <div className="certificates-block block-block m-right m-small">
                          <p className="cv-heading font-size-4">certificates</p>
                          <div className="bg-block">
                            <p className="certificates-info">
                              <div className="top-bg"></div>
                              <div className="left-bg"></div>
                              <div className="bottom-bg"></div>
                              {
                                certificates.map((item, index) => (
                                  <span className="cv-subheading font-size-2" key={index}>
                                    {`${item.name}${((certificates.length - 1) != index) ? (", ") : ""}`}
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
                {
                  (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                    <div className="extra-curricular-activities-block block-block m-right">
                      <p className="cv-heading font-size-4">extra-curricular activities</p>
                      <div className="bg-block">
                        {
                          extra_curricular.map((itemEx, index) => (
                            <div className="block-info" key={index}>
                              <div className="top-bg"></div>
                              <div className="left-bg"></div>
                              <div className="bottom-bg"></div>
                              {
                                (!!itemEx?.title || itemEx?.employer) && (
                                  <p className="cv-subheading font-size-2">
                                    {!!itemEx?.title && (`${itemEx?.title},`)}
                                    {!!itemEx?.employer && (`${itemEx?.employer}`)}
                                  </p>
                                )
                              }
                              {
                                (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                                  <p className="date-range">
                                    {!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)}
                                    {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}
                                  </p>
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
                  isArray(languages) && !!languages.length && (
                    <div className="languages-block block-block m-right">
                      <h3 className="cv-heading font-size-4">languages</h3>
                      <div className="bg-block">
                        <div className="languages-list estimated-items-list">
                          <div className="top-bg"></div>
                          <div className="left-bg"></div>
                          <div className="bottom-bg"></div>
                          {
                            languages.map((item, index) => (
                              <p className="languages-item" key={index}>
                                <span className="languages-name">{item.language}</span>
                                <span className="languages-value font-size-3">{levelLanguage(item.level)}</span>
                              </p>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  )
                }
                <div className="hobbies-and-references-block block-block">
                  <div className="left-side">
                    {
                      isArray(hobbies) && !!hobbies.length && (
                        <div className="hobbies-block block-block m-right m-small">
                          <p className="cv-heading font-size-4">hobbies</p>
                          <div className="bg-block">
                            <div className="top-bg"></div>
                            <div className="left-bg"></div>
                            <div className="bottom-bg"></div>
                            <p> {
                              hobbies.map((item, index) => (
                                <span key={index}>
                                  {`${item.text}${((hobbies.length - 1) != index) ? (", ") : ""}`}
                                </span>
                              ))
                            }
                            </p>
                          </div>
                        </div>
                      )
                    }
                  </div>
                  <div className="right-side">
                    {
                      (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                        <div className="references-block block-block m-right m-small">
                          <p className="cv-heading font-size-4">references</p>
                          <div className="bg-block">
                            {
                              reference.map((itemRef, index) => (
                                <div className="block-info" key={index}>
                                  <div className="top-bg"></div>
                                  <div className="left-bg"></div>
                                  <div className="bottom-bg"></div>
                                  {
                                    (!!itemRef?.fullName) && (
                                      <p className="references-name font-size-2">
                                        {!!itemRef?.fullName && (`${itemRef.fullName}`)}
                                      </p>
                                    )
                                  }
                                  {
                                    (!!itemRef?.company) && (
                                      <p>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

