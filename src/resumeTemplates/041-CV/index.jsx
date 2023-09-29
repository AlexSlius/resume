import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { checkForSymbol } from "../../utils/checkForSymbol";
import { socialHelper } from "../../utils/socialHelper";

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
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();

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
  dataNew,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  stateClasses,
  reportTemplateRef,
  beforeСontent,
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
  } = dataNew;
  const isContactArray = isArray(contact);
  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";

  useEffect(() => {
    if (!!isDrawing ) {
    drawing();
    handleFalseDrafind();
  }
  }, [isDrawing, data, stateClasses]);

  return (
    <div className="sv_041" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-1-background">
          <div className="cv-body-content font-size-1 main-color-4-text">
            <div className="middle-area">
              <div className="column-left">
                <div className="photo-block">
                  <div className="left-side additional-color-2-background"></div>
                  <div className="right-side">
                    {
                      contact[0]?.picture && (
                        <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                      )
                    }
                  </div>
                </div>
                <div className={`links-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="left-side additional-color-2-background"></div>
                  <div className="right-side">
                    {
                      isArray(social_links) && social_links.length && (
                        social_links.map((item, index) => (
                          <div className="link-wrapper additional-color-2-svg" key={index}>
                            {socialHelper(item.name)} {item.name}
                          </div>
                        ))
                      ) || (
                        <>
                        <div className="link-wrapper additional-color-2-svg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.6466 1.33335H2.35329C2.22634 1.33158 2.10029 1.35484 1.98233 1.4018C1.86438 1.44876 1.75683 1.51849 1.66582 1.60702C1.57482 1.69555 1.50215 1.80113 1.45195 1.91775C1.40176 2.03437 1.37503 2.15973 1.37329 2.28668V13.7133C1.37503 13.8403 1.40176 13.9657 1.45195 14.0823C1.50215 14.1989 1.57482 14.3045 1.66582 14.393C1.75683 14.4815 1.86438 14.5513 1.98233 14.5982C2.10029 14.6452 2.22634 14.6684 2.35329 14.6667H13.6466C13.7736 14.6684 13.8996 14.6452 14.0176 14.5982C14.1355 14.5513 14.2431 14.4815 14.3341 14.393C14.4251 14.3045 14.4978 14.1989 14.548 14.0823C14.5982 13.9657 14.6249 13.8403 14.6266 13.7133V2.28668C14.6249 2.15973 14.5982 2.03437 14.548 1.91775C14.4978 1.80113 14.4251 1.69555 14.3341 1.60702C14.2431 1.51849 14.1355 1.44876 14.0176 1.4018C13.8996 1.35484 13.7736 1.33158 13.6466 1.33335ZM5.39329 12.4933H3.39329V6.49334H5.39329V12.4933ZM4.39329 5.65334C4.11747 5.65334 3.85294 5.54377 3.6579 5.34874C3.46286 5.1537 3.35329 4.88917 3.35329 4.61334C3.35329 4.33752 3.46286 4.07299 3.6579 3.87795C3.85294 3.68292 4.11747 3.57334 4.39329 3.57334C4.53975 3.55673 4.68808 3.57125 4.82854 3.61593C4.96901 3.66062 5.09845 3.73447 5.2084 3.83265C5.31834 3.93083 5.40631 4.05113 5.46654 4.18567C5.52677 4.3202 5.5579 4.46594 5.5579 4.61334C5.5579 4.76075 5.52677 4.90649 5.46654 5.04102C5.40631 5.17556 5.31834 5.29586 5.2084 5.39404C5.09845 5.49222 4.96901 5.56607 4.82854 5.61076C4.68808 5.65544 4.53975 5.66995 4.39329 5.65334ZM12.6066 12.4933H10.6066V9.27334C10.6066 8.46668 10.32 7.94001 9.59329 7.94001C9.3684 7.94166 9.14942 8.0122 8.96585 8.14213C8.78228 8.27205 8.64295 8.45513 8.56663 8.66668C8.51445 8.82337 8.49185 8.98839 8.49996 9.15334V12.4867H6.49996C6.49996 12.4867 6.49996 7.03334 6.49996 6.48668H8.49996V7.33334C8.68164 7.01808 8.9459 6.75836 9.26425 6.58215C9.58261 6.40593 9.943 6.31991 10.3066 6.33334C11.64 6.33334 12.6066 7.19335 12.6066 9.04001V12.4933Z" fill="#605C64" />
                          </svg>
                          <span>Facebook</span>
                        </div>
                        <div className="link-wrapper additional-color-2-svg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.9333 1.33334H2.06659C1.87209 1.33334 1.68557 1.41061 1.54804 1.54813C1.41051 1.68566 1.33325 1.87218 1.33325 2.06668V13.9333C1.33325 14.0296 1.35222 14.125 1.38907 14.214C1.42593 14.3029 1.47994 14.3838 1.54804 14.4519C1.61614 14.52 1.69698 14.574 1.78595 14.6109C1.87492 14.6477 1.97028 14.6667 2.06659 14.6667H8.45325V9.50001H6.71992V7.50001H8.45325V6.00001C8.41735 5.64785 8.45892 5.29209 8.57506 4.9577C8.6912 4.62331 8.8791 4.31837 9.12556 4.06428C9.37203 3.81019 9.6711 3.6131 10.0018 3.48684C10.3325 3.36057 10.6868 3.30818 11.0399 3.33334C11.5588 3.33015 12.0774 3.35686 12.5933 3.41334V5.21334H11.5333C10.6933 5.21334 10.5333 5.61334 10.5333 6.19334V7.48001H12.5333L12.2733 9.48001H10.5333V14.6667H13.9333C14.0296 14.6667 14.1249 14.6477 14.2139 14.6109C14.3029 14.574 14.3837 14.52 14.4518 14.4519C14.5199 14.3838 14.5739 14.3029 14.6108 14.214C14.6476 14.125 14.6666 14.0296 14.6666 13.9333V2.06668C14.6666 1.97037 14.6476 1.87501 14.6108 1.78604C14.5739 1.69707 14.5199 1.61623 14.4518 1.54813C14.3837 1.48004 14.3029 1.42602 14.2139 1.38917C14.1249 1.35231 14.0296 1.33334 13.9333 1.33334Z" fill="#605C64" />
                          </svg>
                          <span>LinkedIn</span>
                        </div>
                        </>
                      )
                    }
                  </div>
                </div>
                <div className={`personal-information-block ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !contact[0]?.email && !contact[0]?.phone && !contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                      <div className={`personal-information-item phone-item-block ${!contact[0]?.phone && !beforeСontent ? 'hide' : ''}`}>
                        <div className="left-side additional-color-2-background">
                          <svg className={`additional-color-1-svg ${!contact[0].phone ? 'empty-field' : ''}`} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.31315 0.196491C2.84424 -0.181893 2.22732 0.0352567 1.7892 0.432981L1.78292 0.438678C0.614075 1.49973 -0.167698 2.20941 0.0307883 3.74385C0.734152 9.18312 7.737 13.2434 9.49541 13.8347C11.2538 14.4259 12.4569 13.3217 13.3947 12.2575C14.0199 11.548 14.218 10.9568 13.7156 10.4838C13.1295 9.93201 12.0455 8.80096 11.84 8.63188L11.8068 8.60459C10.7695 7.75122 10.0437 7.15416 9.37819 8.98662C9.07756 9.81433 7.73357 9.81433 6.79919 9.2146C6.05105 8.73441 5.33598 8.02355 5.07156 7.68592C4.45464 6.89819 3.54761 5.04455 5.07156 4.45332C6.29073 3.98034 6.06503 2.88509 5.62691 2.44316C5.0017 1.81251 3.78206 0.574875 3.31315 0.196491Z" fill="#1E7BC0" />
                          </svg>
                        </div>
                        <div className={`right-side ${!contact[0].phone ? 'empty-field' : ''}`}>
                          <div className="subheading font-size-3">Phone</div>
                          <div className="font-size-2">{contact[0]?.phone || '736-343-9384'}</div>
                        </div>
                      </div>
                      <div className={`personal-information-item email-item-block ${!contact[0]?.email && !beforeСontent ? 'hide' : ''}`}>
                        <div className="left-side additional-color-2-background">
                          <svg className={`additional-color-1-svg width="14 ${!contact[0].email ? 'empty-field' : ''}`} height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.0338717 0.740978C0.0117786 0.823592 0 0.91042 0 1V9C0 9.08958 0.0117786 9.17641 0.0338716 9.25902L4.29289 5L0.0338717 0.740978ZM5 5.70711L0.740979 9.96613C0.823592 9.98822 0.910421 10 1 10H13C13.0896 10 13.1764 9.98822 13.259 9.96613L9 5.70711L7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L5 5.70711ZM8.6461 4.6468L7 6.29289L5.35355 4.64645L0.740978 0.0338716C0.823592 0.0117786 0.91042 0 1 0H13C13.0896 0 13.1764 0.0117786 13.259 0.0338716L8.64679 4.6461C8.64668 4.64621 8.64656 4.64633 8.64645 4.64645C8.64633 4.64656 8.64621 4.64668 8.6461 4.6468ZM9.70711 5L13.9661 9.25902C13.9882 9.17641 14 9.08958 14 9V1C14 0.91042 13.9882 0.823592 13.9661 0.740979L9.70711 5Z" fill="#1E7BC0" />
                          </svg>
                        </div>
                        <div className={`right-side ${!contact[0].email ? 'empty-field' : ''}`}>
                          <div className="subheading font-size-3">Email</div>
                          <div className="font-size-2">{contact[0].email || 'designer@webservice.com'}</div>
                        </div>
                      </div>
                      <div className={`personal-information-item area-item-block ${!contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                        <div className="left-side additional-color-2-background">
                          <svg className={`additional-color-1-svg ${!contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode ? 'empty-field' : ''}`} width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 15C5.5 15 11 10 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 10 5.5 15 5.5 15ZM5.5 8C6.88071 8 8 6.88071 8 5.5C8 4.11929 6.88071 3 5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8Z" fill="#1E7BC0" />
                          </svg>
                        </div>
                        <div className="right-side">
                          <div className={`subheading font-size-3 ${!contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode ? 'empty-field' : ''}`}>Area</div>
                            <span className={`${!contact[0]?.country ? 'empty-field' : ''} ${!contact[0]?.country && !beforeСontent ? 'hide' : ''}`}>
                              {`${checkForSymbol([contact[0]?.address, contact[0]?.city, contact[0]?.zipCode]) ? contact[0]?.country + ', ' : contact[0]?.country || 'United States, '}`}
                            </span>
                            <span className={`${!contact[0]?.address ? 'empty-field' : ''} ${!contact[0]?.address && !beforeСontent ? 'hide' : ''}`}>
                              {`${checkForSymbol([contact[0]?.city, contact[0]?.zipCode]) ? contact[0]?.address + ', ' : contact[0]?.address || '5th Avenue Street, '}`}
                            </span>
                            <span className={`${!contact[0]?.city ? 'empty-field' : ''} ${!contact[0]?.city && !beforeСontent ? 'hide' : ''}`}>
                              {`${checkForSymbol([contact[0]?.zipCode]) ? contact[0]?.city + ', ' : contact[0]?.city || 'New York City, '}`}
                            </span>
                            <span className={`${!contact[0]?.zipCode ? 'empty-field' : ''} ${!contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                              {`${contact[0]?.zipCode || '384846'}`}
                            </span>
                        </div>
                      </div>
                      <div className={`personal-information-item info-item-block ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                        <div className="left-side additional-color-2-background">
                          <svg className={`additional-color-1-svg width="14 ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth ? 'empty-field' : ''}`} height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM7 6C6.44772 6 6 6.44772 6 7V10C6 10.5523 6.44772 11 7 11C7.55228 11 8 10.5523 8 10V7C8 6.44772 7.55228 6 7 6Z" fill="#1E7BC0" />
                          </svg>
                        </div>
                        <div className="right-side">
                          <div className={`subheading font-size-3 ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth ? 'empty-field' : ''}`}>Info</div>
                              <div className={`info-list-item ${!contact[0]?.nationality ? 'empty-field' : ''} ${!contact[0]?.nationality && !beforeСontent ? 'hide' : ''}`}>
                                <div className="font-size-2">Nationality:</div>
                                <div className="font-size-2">{contact[0]?.nationality ? contact[0]?.nationality : 'German'}</div>
                              </div>
                              <div className={`info-list-item ${!contact[0]?.driverLicense ? 'empty-field' : ''} ${!contact[0]?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                                <div className="font-size-2">Driving license:</div>
                                <div className="font-size-2">{contact[0]?.driverLicense ? contact[0]?.driverLicense : 'Class 1'}</div>
                              </div>
                              <div className={`info-list-item ${!contact[0]?.dateOfBirth && !contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                                <div className={`font-size-2 ${!contact[0]?.dateOfBirth && !contact[0]?.placeOfBirth ? 'empty-field' : ''}`}>Date / Place of birth:</div>
                                <div className="font-size-2">
                                  <span className={`${!contact[0]?.dateOfBirth ? 'empty-field' : ''} ${!contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                                    {contact[0]?.dateOfBirth ? moment(contact[0]?.dateOfBirth).format("DD-MM-yy") : '14-08-1991'} {` / `} 
                                  </span>
                                  <span className={`${!contact[0]?.placeOfBirth ? 'empty-field' : ''} ${!contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                                    {contact[0]?.placeOfBirth ? contact[0]?.placeOfBirth : 'Berlin'}
                                  </span>
                                </div>
                              </div>
                        </div>
                      </div>
                </div>
                <div className={`skills-block block-block ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">Skills</div>
                  <div className="estimated-items-list">
                    {
                      skills.map((item, index) => (
                        <div className={`estimated-item ${!item.name ? 'empty-field' : ''}`} key={index}>
                          <div className="item-name font-size-2">{item.name ? item.name : 'Skill name'}</div>
                          {
                            !hide_experience_level && (
                              <div className="estimation-wrapper main-color-2-background">
                                <div className="estimation-value additional-color-1-background" style={{ width: `${item.level ? (+item.level * 100) / 5 : '33.33'}%` }}></div>
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`languages-block block-block ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">Languages</div>
                  <div className="estimated-items-list">
                    {
                      languages.map((item, index) => (
                        <div className={`estimated-item ${!item.language ? 'empty-field' : ''}`} key={index}>
                          <p className="item-name font-size-2">{item.language ? item.language : 'Language'}</p>
                          <div className="estimation-wrapper main-color-2-background">
                            <div className="estimation-value additional-color-1-background" style={{ width: `${item.level ? (+item.level * 100) / 6 : '66.66'}%` }}></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`references-block block-block ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">References</div>
                  {
                    reference.map((itemRef, index) => (
                      <div className="block-info" key={index}>
                        <div className={`font-size-2 ${!itemRef.fullName && !itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemRef.fullName ? 'empty-field' : ''} ${!itemRef.fullName && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemRef.company]) ? itemRef.fullName + ', ' : itemRef.fullName || 'Full name'}
                          </span>
                          <span className={`${!itemRef.company ? 'empty-field' : ''} ${!itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                            {itemRef.company || ', Company'}
                          </span>
                        </div>
                        <div className={`font-size-2 ${!itemRef.email ? 'empty-field' : ''} ${!itemRef.email && !beforeСontent ? 'hide' : ''}`}>
                          {itemRef.email || 'references@webservice.com'}
                        </div>
                        <div className={`font-size-2 ${!itemRef.phone ? 'empty-field' : ''} ${!itemRef.phone && !beforeСontent ? 'hide' : ''}`}>
                          {itemRef.phone || '736-343-9384'}
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">Certificates</div>
                  <div className="certificates-info font-size-2">
                    {
                      certificates.map((item, index) => (
                        <span className={`${!item.name ? 'empty-field' : ''}`} key={index}>
                          {item.name ? item.name : 'Certificate name'}
                        </span>
                      ))
                    }
                  </div>
                </div>
                <div className={`hobbies-block block-block ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-4">Hobbies</div>
                  <div className={`font-size-2 ${!hobbies[0].text ? 'empty-field' : ''}`}>
                    {
                      hobbies.map((item, index) => (
                        <span key={index}>
                          {item.text ? item.text + (hobbies.length - 1 != index ? ', ' : '') : 'Squash, Surfing, Swimming, Table tennis, Tennis, Tennis polo, Tether car, Tour skating'}
                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="column-right">
                <div className={`main-info-block ${!contact[0].firstName && !contact[0].lastName && !contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`cv-name font-size-5 ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].firstName || 'Matthew'} {` `}
                    </span>
                    <span className={`${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].lastName || 'Mcconaughey'}
                    </span>
                  </div>
                  <div className={`cv-profession font-size-3 main-color-1-background ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`${!contact[0].jobTitle ? 'empty-field' : ''}`}>
                      {contact[0].jobTitle || 'Web-designer'}
                    </span>
                  </div>
                </div>
                <div className={`profile-block block-block ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                  <div className="heading-line">
                    <div className="cv-heading font-size-4">Profile</div>
                    <div className="heading-border-line"></div>
                  </div>
                  {
                    career_objective[0]?.data && (
                      <div dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                    ) || (
                      <div className="empty-field">
                        Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                      </div>
                    )
                  }
                </div>
                <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                  <div className="heading-line">
                    <div className="cv-heading font-size-4">Employment History</div>
                    <div className="heading-border-line"></div>
                  </div>
                  {
                    employment.map((itemEm, index) => (
                      <div className="block-info" key={index}>
                        <div className="subheading-line">
                          <div className="to-left">
                            <div className={`font-size-2 ${!itemEm.title ? 'empty-field' : ''} ${!itemEm.title && !beforeСontent ? 'hide' : ''}`}>
                              {itemEm.title || 'Web Designer'}
                            </div>
                            <div className={`font-size-2 ${!itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                              <span className={`${!itemEm.company ? 'empty-field' : ''} ${!itemEm.company && !beforeСontent ? 'hide' : ''}`}>
                                {checkForSymbol([itemEm?.city]) ? itemEm?.company + ', ' : itemEm?.company || 'Apple INC.'}
                              </span>
                              <span className={`${!itemEm.city ? 'empty-field' : ''} ${!itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                                {itemEm.city || ', New York City'}
                              </span>
                            </div>
                          </div>
                          <div className={`date-range font-size-2 ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''} ${!itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MMMM yy") + ' - ' : moment(itemEm.periodFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''} ${!itemEm.periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                          </div>
                        </div>
                        {
                          itemEm.assignment && (
                            <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          ) || (
                            <div className={`empty-field ${!itemEm.assignment && !beforeСontent ? 'hide' : ''}`}>
                              <ul>
                                <li>Helped to achieve a consistent look and visual theme across the website by promoting uniform fonts, formatting, images, and layout.</li>
                                <li>Followed policies and procedures related to application methods and quality standards at all times.</li>
                                <li>Managed front-end and back-end development in the company's Portfolio Analyst, Employee Track, and Account Management systems.</li>
                              </ul>
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
                <div className={`education-block block-block ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="heading-line">
                    <div className="cv-heading font-size-4">Education</div>
                    <div className="heading-border-line"></div>
                  </div>
                  {
                    education.map((itemEd, index) => (
                      <div className="block-info" key={index}>
                        <div className="subheading-line">
                          <div className="to-left">
                            <div className={`font-size-2 ${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.study || 'Marketing and Management'}
                            </div>
                            <div className={`font-size-2 ${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd?.facility || 'Harcum College, Portland'}
                            </div>
                            <div className={`degree-block font-size-2 ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.degree || 'Bachelor'}
                            </div>
                          </div>
                          <div className={`date-range font-size-2 ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''} ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''} ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                          </div>
                        </div>
                        {
                          itemEd.description && (
                            <div dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
                          ) || (
                            <div className={`empty-field ${!itemEd.description && !beforeСontent ? 'hide' : ''}`}>
                              I have learned to merge marketing and management skills in a very efficient way and produce great results. Even though managing hundreds of people is hard, all skills are learned to do that.
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
                <div className={`courses-block block-block ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="heading-line">
                    <div className="cv-heading font-size-4">Courses</div>
                    <div className="heading-border-line"></div>
                  </div>
                  {
                    courses.map((itemCo, index) => (
                      <div className="block-info" key={index}>
                        <div className="subheading-line">
                          <div className="to-left">
                            <div className={`font-size-2 ${!itemCo.title ? 'empty-field' : ''} ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                              {itemCo.title || 'Super course 1'}
                            </div>
                            <div className={`font-size-2 ${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                              {itemCo.institution ? itemCo.institution : 'Benjamin Franklin Sidestep Collage'}
                            </div>
                          </div>
                          <div className={`date-range font-size-2 ${!itemCo.dateFrom?.date && !itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''} ${!itemCo.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemCo.dateFrom?.date && (checkForSymbol([itemCo.dateTo?.date]) ? moment(itemCo.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemCo.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemCo.dateTo?.date ? 'empty-field' : ''} ${!itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemCo.dateTo?.date && (moment(itemCo.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className={`extra-curricular-activities-block block-block ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="heading-line">
                    <div className="cv-heading font-size-4">Extra-curricular activities</div>
                    <div className="heading-border-line"></div>
                  </div>
                  {
                    extra_curricular.map((itemEx, index) => (
                      <div className="block-info" key={index}>
                        <div className="subheading-line">
                          <div className="to-left">
                            <div className={`font-size-2 ${!itemEx.title ? 'empty-field' : ''} ${!itemEx.title && !beforeСontent ? 'hide' : ''}`}>
                              {itemEx.title || 'UX Designer'}
                            </div>
                            <div className={`font-size-2 ${!itemEx.employer ? 'empty-field' : ''} ${!itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                              {itemEx.employer || 'My own company'}
                            </div>
                          </div>
                          <div className={`date-range font-size-2 ${!itemEx.dateFrom?.date && !itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''} ${!itemEx.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEx.dateFrom?.date && (checkForSymbol([itemEx.dateTo?.date]) ? moment(itemEx.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEx.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemEx.dateTo?.date ? 'empty-field' : ''} ${!itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEx.dateTo?.date && (moment(itemEx.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                          </div>
                        </div>
                        {
                          itemEx.description && (
                            <div dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                          ) || (
                            <div className={`empty-field ${!itemEx.description && !beforeСontent ? 'hide' : ''}`}>
                              I was doing research for about five different projects. The goal was to find out the biggest issues with the current concept and solution how to solve them.
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
                <div className={`internships-block block-block ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="heading-line">
                    <div className="cv-heading font-size-4">Internships</div>
                    <div className="heading-border-line"></div>
                  </div>
                  {
                    internship.map((itemIn, index) => (
                      <div className="block-info" key={index}>
                        <div className="subheading-line">
                          <div className="to-left">
                            <div className={`font-size-2 ${!itemIn.jobTitle ? 'empty-field' : ''} ${!itemIn.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                              {itemIn.jobTitle || 'Product Designer'}
                            </div>
                            <div className={`font-size-2 ${!itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                              <span className={`${!itemIn.employer ? 'empty-field' : ''} ${!itemIn.employer && !beforeСontent ? 'hide' : ''}`}>
                                {checkForSymbol([itemIn.city]) ? itemIn.employer + ', ' : itemIn.employer || 'Company S.A.'}
                              </span>
                              <span className={`${!itemIn.city ? 'empty-field' : ''} ${!itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                                {itemIn.city || ', Toronto'}
                              </span>
                            </div>
                          </div>
                          <div className={`date-range font-size-2 ${!itemIn.dateFrom?.date && !itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''} ${!itemIn.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemIn.dateFrom?.date && (checkForSymbol([itemIn.dateTo?.date]) ? moment(itemIn.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemIn.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemIn.dateTo?.date ? 'empty-field' : ''} ${!itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemIn.dateTo?.date && (moment(itemIn.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                          </div>
                        </div>
                        {
                          itemIn.description && (
                            <div dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          ) || (
                            <div className={`empty-field ${!itemIn.description && !beforeСontent ? 'hide' : ''}`}>
                              Handled each product and package with care and precision. Handled much of the communication between clients and the lead Graphic Designer.
                              Worked productively with Product Team to understand requirements and business specifications around Portfolio Management, Analytics and Risk.
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="bottom-area additional-color-2-background"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

