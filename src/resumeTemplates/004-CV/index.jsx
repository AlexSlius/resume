import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

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

export const ResumeCv004 = ({
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
    hide_experience_level
  } = data;

  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";

  React.useEffect(() => {
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
        }

        getPageColumnLeft().append(skills_block);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          skills_block.remove();
          current_page_number++;
          getPageColumnLeft().append(skills_block);
        }

        getPageColumnLeft().append(languages_block);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          languages_block.remove();
          current_page_number++;
          getPageColumnLeft().append(languages_block);
        }

        getPageColumnLeft().append(hobbies_block);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          hobbies_block.remove();
          current_page_number++;
          getPageColumnLeft().append(hobbies_block);
        }

        if (!getPageColumnRight()) {
          let col_r = getPageColumnRight();
        }

        // Column right
        current_page_number = 1;
        getPageColumnRight().append(profile_block_has_photo);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          profile_block_has_photo.remove();
          current_page_number++;
          getPageColumnRight().append(profile_block_has_photo);
        }

        getPageColumnRight().append(details_block);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          details_block.remove();
          current_page_number++;
          getPageColumnRight().append(details_block);
        }

        getPageColumnRight().append(education_block);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          education_block.remove();
          current_page_number++;
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
          getPageColumnRight().append(extra_curricular_activities_block);
        }

        getPageColumnRight().append(internships_block);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          internships_block.remove();
          current_page_number++;
          getPageColumnRight().append(internships_block);
        }


        getPageColumnRight().append(certificates_block);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          certificates_block.remove();
          current_page_number++;
          getPageColumnRight().append(certificates_block);
        }

        getPageColumnRight().append(references_block);
        if (getPageContainer().parent().height() > getPageContainer().parent().parent().height()) {
          references_block.remove();
          current_page_number++;
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
        let page_wrapper = $('<div class="cv-body-content"></div>');
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
  }, [data]);

  return (
    <div className="sv_004" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-0`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content">
            <div className="profile-info-block no-photo">
              {
                isArray(contact) && contact?.[0]?.jobTitle && (
                  <h3 className="profile-speciality main-color-1-text font-size-2 line-height-2 toggle-photo-state toggle-photo-state-active">{contact?.[0]?.jobTitle}</h3>
                )
              }
              {
                isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                  <h1 className="profile-name additional-color-1-text font-size-4 line-height-4 font-family-arsenal toggle-photo-state toggle-photo-state-active">{contact?.[0]?.firstName} {contact?.[0]?.lastName}</h1>
                )
              }
              <p className="main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
            </div>
            <div className="main-columns-wrapper">
              {
                ((isArray(contact) && contact?.[0]?.picture) || (isArray(skills) && !!skills.length) || (isArray(languages) && !!languages.length) || (isArray(hobbies) && !!hobbies.length)) && (
                  <div className="column-1 column-left additional-color-1-background toggle-photo-state toggle-photo-state-active">
                    {
                      contact?.[0]?.picture && (
                        <div className="photo-block">
                          <img src={contact?.[0].picture} />
                        </div>
                      )
                    }
                    <div className="informations-container">
                      {/* skills */}
                      {
                        isArray(skills) && !!skills.length && (
                          <div className="skills-block block-block main-color-2-border toggle-photo-state toggle-photo-state-active">
                            <h3 className="heading-type-3 main-color-2-text font-size-3 line-height-3 font-family-arsenal">SKILLS</h3>
                            {
                              skills.map((item, index) => (
                                <p key={index} className="block-list-item main-color-2-text skill-item font-size-1 line-height-1">{item.name}</p>
                              ))
                            }
                          </div>
                        )
                      }
                      {/* languages */}
                      {
                        isArray(languages) && !!languages.length && (
                          <div className="languages-block block-block main-color-2-border">
                            <>
                              <h3 className="heading-type-3 main-color-2-text font-size-3 line-height-3 font-family-arsenal">LANGUAGES</h3>

                              {
                                languages.map((item, index) => (
                                  <div key={index} className="block-list-item language-item">
                                    <p className="language-name main-color-2-text font-size-1 line-height-1">{item.language}</p>
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
                          <div className="hobbies-block block-block main-color-2-border">
                            <h3 className="heading-type-3 main-color-2-text font-size-3 line-height-3 font-family-arsenal">HOBBIES</h3>
                            <p className="block-list-item main-color-2-text font-size-1 line-height-1">Squash, Surfing, Swimming,<br />
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
                <div className="profile-info-block is-photo">
                  {
                    isArray(contact) && contact?.[0]?.jobTitle && (
                      <h3 className="profile-speciality main-color-1-text font-size-2 line-height-2 toggle-photo-state toggle-photo-state-active">{contact?.[0]?.jobTitle}</h3>
                    )
                  }
                  {
                    isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                      <h1 className="profile-name additional-color-1-text font-size-4 line-height-4 font-family-arsenal toggle-photo-state toggle-photo-state-active">{contact?.[0]?.firstName} {contact?.[0]?.lastName}</h1>
                    )
                  }
                  <p className="main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                </div>

                <div className="details-block block-block additional-color-2-border">
                  <div className="details-content-wrapper">
                    {
                      isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                        <div className="person-details left-side">
                          {
                            !!contact?.[0]?.dateOfBirth && (
                              <div className="details-item">
                                <span className="details-item-name main-color-1-text font-weight-300 font-size-1 line-height-1">Birth Date</span>
                                <span className="details-item-value main-color-1-text font-weight-500 font-size-1 line-height-1">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}</span>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.placeOfBirth && (
                              <div className="details-item">
                                <span className="details-item-name main-color-1-text font-weight-300 font-size-1 line-height-1">Birth Date</span>
                                <span className="details-item-value main-color-1-text font-weight-500 font-size-1 line-height-1">{contact?.[0]?.placeOfBirth}</span>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.nationality && (
                              <div className="details-item">
                                <span className="details-item-name main-color-1-text font-weight-300 font-size-1 line-height-1">Birth Date</span>
                                <span className="details-item-value main-color-1-text font-weight-500 font-size-1 line-height-1">{contact?.[0]?.nationality}</span>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.driverLicense && (
                              <div className="details-item">
                                <span className="details-item-name main-color-1-text font-weight-300 font-size-1 line-height-1">Birth Date</span>
                                <span className="details-item-value main-color-1-text font-weight-500 font-size-1 line-height-1">{contact?.[0]?.driverLicense}</span>
                              </div>
                            )
                          }
                        </div>
                      )
                    }
                    {
                      isArray(contact) && (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.phone || !!contact?.[0]?.address || !!contact?.[0]?.email || (isArray(social_links) && !!social_links.length)) && (
                        <div className="contacts font-size-state">
                          {
                            !!contact?.[0]?.phone && (
                              <div className="contacts-item">
                                <svg className="additional-color-2-svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.94 7.66659C11.7933 7.66659 11.64 7.61992 11.4933 7.58659C11.1966 7.52023 10.9047 7.43335 10.62 7.32659C10.3107 7.21407 9.97076 7.21991 9.66553 7.34299C9.36031 7.46606 9.11138 7.69768 8.96666 7.99325L8.81999 8.29992C8.17254 7.93272 7.57441 7.48468 7.03999 6.96659C6.52189 6.43217 6.07386 5.83404 5.70666 5.18659L6.01333 5.04659C6.3089 4.90186 6.54051 4.65294 6.66359 4.34771C6.78666 4.04249 6.79251 3.70253 6.67999 3.39325C6.57412 3.10594 6.48726 2.81197 6.41999 2.51325C6.38666 2.36659 6.35999 2.21325 6.33999 2.06659C6.25904 1.597 6.01308 1.17175 5.64641 0.867411C5.27974 0.563076 4.81646 0.399658 4.33999 0.406585H2.33333C2.05149 0.406216 1.77276 0.465417 1.5154 0.580308C1.25805 0.695198 1.02788 0.863184 0.839993 1.07325C0.648206 1.28902 0.505403 1.54375 0.421395 1.81994C0.337387 2.09613 0.314165 2.38724 0.353326 2.67325C0.715717 5.44801 1.98347 8.02569 3.95999 10.0066C5.94089 11.9831 8.51857 13.2509 11.2933 13.6133C11.3799 13.6199 11.4668 13.6199 11.5533 13.6133C12.0449 13.614 12.5196 13.4336 12.8867 13.1066C13.0967 12.9187 13.2647 12.6885 13.3796 12.4312C13.4945 12.1738 13.5537 11.8951 13.5533 11.6133V9.61325C13.5497 9.15261 13.3872 8.70733 13.0933 8.35265C12.7993 7.99797 12.392 7.75563 11.94 7.66659ZM12.2667 11.6666C12.2664 11.7596 12.2468 11.8516 12.2089 11.9365C12.171 12.0215 12.1157 12.0976 12.0467 12.1599C11.9736 12.2265 11.8866 12.276 11.7921 12.3048C11.6975 12.3336 11.5978 12.3411 11.5 12.3266C9.01217 12.0017 6.70016 10.8679 4.91999 9.09992C3.13831 7.31823 1.99468 4.99816 1.66666 2.49992C1.65218 2.40214 1.65962 2.30237 1.68844 2.20782C1.71727 2.11327 1.76676 2.02632 1.83333 1.95325C1.89641 1.88335 1.97358 1.82761 2.05976 1.78969C2.14594 1.75177 2.23917 1.73254 2.33333 1.73325H4.33333C4.48743 1.72949 4.63808 1.77924 4.75964 1.87405C4.88119 1.96886 4.96613 2.10286 4.99999 2.25325C4.99999 2.43325 5.05999 2.61992 5.09999 2.79992C5.17704 3.14916 5.27954 3.4923 5.40666 3.82659L4.47333 4.26659C4.3129 4.34023 4.18823 4.47449 4.12666 4.63992C4.05998 4.80223 4.05998 4.98428 4.12666 5.14659C5.08613 7.20176 6.73816 8.85378 8.79333 9.81325C8.95563 9.87993 9.13768 9.87993 9.29999 9.81325C9.46542 9.75168 9.59968 9.62701 9.67333 9.46659L10.0933 8.53325C10.4373 8.65867 10.7891 8.76111 11.1467 8.83992C11.32 8.87992 11.5067 8.91325 11.6867 8.93992C11.837 8.97379 11.9711 9.05873 12.0659 9.18028C12.1607 9.30183 12.2104 9.45248 12.2067 9.60659L12.2667 11.6666ZM8.33333 0.333252C8.17999 0.333252 8.01999 0.333252 7.86666 0.333252C7.68985 0.348281 7.52625 0.432932 7.41185 0.568583C7.29745 0.704235 7.24163 0.879774 7.25666 1.05659C7.27169 1.2334 7.35634 1.397 7.49199 1.51139C7.62764 1.62579 7.80318 1.68161 7.97999 1.66659H8.33333C9.39419 1.66659 10.4116 2.08801 11.1618 2.83816C11.9119 3.5883 12.3333 4.60572 12.3333 5.66659C12.3333 5.78659 12.3333 5.89992 12.3333 6.01992C12.3185 6.19579 12.3741 6.37035 12.4878 6.50532C12.6016 6.64029 12.7642 6.72465 12.94 6.73992H12.9933C13.1602 6.7406 13.3213 6.67865 13.4447 6.56633C13.5682 6.454 13.645 6.29947 13.66 6.13325C13.66 5.97992 13.66 5.81992 13.66 5.66659C13.66 4.25325 13.099 2.89771 12.1003 1.8977C11.1015 0.897702 9.74666 0.335019 8.33333 0.333252ZM9.66666 5.66659C9.66666 5.8434 9.7369 6.01297 9.86192 6.13799C9.98695 6.26301 10.1565 6.33325 10.3333 6.33325C10.5101 6.33325 10.6797 6.26301 10.8047 6.13799C10.9298 6.01297 11 5.8434 11 5.66659C11 4.95934 10.719 4.28106 10.2189 3.78097C9.71885 3.28087 9.04057 2.99992 8.33333 2.99992C8.15652 2.99992 7.98695 3.07016 7.86192 3.19518C7.7369 3.32021 7.66666 3.48977 7.66666 3.66659C7.66666 3.8434 7.7369 4.01297 7.86192 4.13799C7.98695 4.26301 8.15652 4.33325 8.33333 4.33325C8.68695 4.33325 9.02609 4.47373 9.27613 4.72378C9.52618 4.97382 9.66666 5.31296 9.66666 5.66659Z" fill="#030303" />
                                </svg>
                                <p className="main-color-1-text font-size-1 line-height-1 font-weight-500">{contact?.[0]?.phone}</p>
                              </div>
                            )
                          }
                          {
                            !!contact?.[0]?.email && (
                              <div className="contacts-item">
                                <svg className="additional-color-2-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.6667 2.66675H3.33337C2.80294 2.66675 2.29423 2.87746 1.91916 3.25253C1.54409 3.62761 1.33337 4.13632 1.33337 4.66675V11.3334C1.33337 11.8638 1.54409 12.3726 1.91916 12.7476C2.29423 13.1227 2.80294 13.3334 3.33337 13.3334H12.6667C13.1971 13.3334 13.7058 13.1227 14.0809 12.7476C14.456 12.3726 14.6667 11.8638 14.6667 11.3334V4.66675C14.6667 4.13632 14.456 3.62761 14.0809 3.25253C13.7058 2.87746 13.1971 2.66675 12.6667 2.66675ZM3.33337 4.00008H12.6667C12.8435 4.00008 13.0131 4.07032 13.1381 4.19534C13.2631 4.32037 13.3334 4.48994 13.3334 4.66675L8.00004 7.92008L2.66671 4.66675C2.66671 4.48994 2.73695 4.32037 2.86197 4.19534C2.98699 4.07032 3.15656 4.00008 3.33337 4.00008ZM13.3334 11.3334C13.3334 11.5102 13.2631 11.6798 13.1381 11.8048C13.0131 11.9298 12.8435 12.0001 12.6667 12.0001H3.33337C3.15656 12.0001 2.98699 11.9298 2.86197 11.8048C2.73695 11.6798 2.66671 11.5102 2.66671 11.3334V6.18675L7.65337 9.23342C7.75472 9.29193 7.86968 9.32273 7.98671 9.32273C8.10373 9.32273 8.21869 9.29193 8.32004 9.23342L13.3334 6.18675V11.3334Z" fill="#030303" />
                                </svg>
                                <p className="main-color-1-text font-size-1 line-height-1 font-weight-500">{contact?.[0]?.email}</p>
                              </div>
                            )
                          }
                          {
                            (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.address || !!contact?.[0]?.zipCode) && (
                              <div className="contacts-item">
                                <svg className="additional-color-2-svg" width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.24996 2.98669C8.25539 1.92582 6.90648 1.32983 5.49996 1.32983C4.09343 1.32983 2.74452 1.92582 1.74996 2.98669C0.755394 4.04755 0.196655 5.4864 0.196655 6.98669C0.196655 8.48698 0.755394 9.92582 1.74996 10.9867L5.04371 14.5067C5.10181 14.5692 5.17093 14.6188 5.2471 14.6526C5.32326 14.6865 5.40495 14.7039 5.48746 14.7039C5.56996 14.7039 5.65165 14.6865 5.72782 14.6526C5.80398 14.6188 5.8731 14.5692 5.93121 14.5067L9.24996 10.9534C10.2404 9.8969 10.7968 8.46406 10.7968 6.97002C10.7968 5.47599 10.2404 4.04314 9.24996 2.98669ZM8.35621 10L5.49996 13.06L2.64371 10C2.07942 9.39757 1.69525 8.63019 1.53977 7.79488C1.38428 6.95958 1.46445 6.09385 1.77015 5.30714C2.07584 4.52043 2.59334 3.84805 3.25723 3.37501C3.92111 2.90196 4.70157 2.64948 5.49996 2.64948C6.29834 2.64948 7.0788 2.90196 7.74269 3.37501C8.40657 3.84805 8.92407 4.52043 9.22976 5.30714C9.53546 6.09385 9.61563 6.95958 9.46015 7.79488C9.30466 8.63019 8.92049 9.39757 8.35621 10ZM3.62496 4.94002C3.1204 5.47987 2.83708 6.21107 2.83708 6.97336C2.83708 7.73564 3.1204 8.46684 3.62496 9.00669C3.99981 9.40721 4.4772 9.68074 4.99724 9.79296C5.51728 9.90517 6.0568 9.85108 6.54813 9.63746C7.03945 9.42384 7.46069 9.06021 7.75901 8.59219C8.05732 8.12417 8.21941 7.5726 8.22496 7.00669C8.22777 6.62882 8.15953 6.25419 8.02427 5.90495C7.88901 5.5557 7.68947 5.23893 7.43746 4.97336C7.18975 4.70307 6.89438 4.48771 6.56835 4.33967C6.24231 4.19162 5.89204 4.11381 5.53771 4.11071C5.18337 4.10761 4.83196 4.17929 4.50369 4.32161C4.17542 4.46394 3.87678 4.67411 3.62496 4.94002ZM6.55621 8.06002C6.31936 8.31652 6.00634 8.47729 5.67066 8.51486C5.33498 8.55242 4.9975 8.46445 4.7159 8.26597C4.4343 8.0675 4.22608 7.77085 4.12684 7.42674C4.02759 7.08264 4.04349 6.71245 4.1718 6.37946C4.30012 6.04647 4.53289 5.77137 4.83032 5.60118C5.12775 5.43099 5.47136 5.37629 5.80242 5.44643C6.13347 5.51657 6.4314 5.70719 6.64527 5.98571C6.85915 6.26422 6.97568 6.61334 6.97496 6.97336C6.96586 7.38487 6.80401 7.77571 6.52496 8.06002H6.55621Z" fill="#030303" />
                                </svg>
                                <p className="main-color-1-text font-size-1 line-height-1 font-weight-500">{`${!!contact?.[0]?.country ? (`${contact?.[0]?.country},`) : ''} ${!!contact?.[0]?.address ? (`${contact?.[0]?.address},`) : ''} ${!!contact?.[0]?.city ? (`${contact?.[0]?.city},`) : ''} ${!!contact?.[0]?.zipCode ? contact?.[0]?.zipCode : ""}`}</p>
                              </div>
                            )
                          }
                          {
                            isArray(social_links) && !!social_links.length && (
                              <div className="contacts-item">
                                <svg className="additional-color-2-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.56877 9.61869L5.14377 12.0437C4.85017 12.327 4.45806 12.4854 4.05002 12.4854C3.64198 12.4854 3.24987 12.327 2.95627 12.0437C2.81227 11.9003 2.69802 11.7298 2.62005 11.5421C2.54209 11.3544 2.50196 11.1532 2.50196 10.9499C2.50196 10.7467 2.54209 10.5455 2.62005 10.3578C2.69802 10.1701 2.81227 9.99962 2.95627 9.85619L5.38127 7.43119C5.49896 7.3135 5.56508 7.15388 5.56508 6.98744C5.56508 6.821 5.49896 6.66138 5.38127 6.54369C5.26358 6.426 5.10396 6.35988 4.93752 6.35988C4.77108 6.35988 4.61146 6.426 4.49377 6.54369L2.06877 8.97494C1.58024 9.50668 1.31603 10.2066 1.33132 10.9285C1.3466 11.6505 1.6402 12.3386 2.15079 12.8492C2.66138 13.3598 3.3495 13.6534 4.07142 13.6686C4.79335 13.6839 5.49327 13.4197 6.02502 12.9312L8.45627 10.5062C8.57396 10.3885 8.64008 10.2289 8.64008 10.0624C8.64008 9.896 8.57396 9.73638 8.45627 9.61869C8.33858 9.501 8.17896 9.43488 8.01252 9.43488C7.84608 9.43488 7.68646 9.501 7.56877 9.61869ZM12.9313 2.06869C12.4055 1.54619 11.6944 1.25293 10.9531 1.25293C10.2119 1.25293 9.50078 1.54619 8.97502 2.06869L6.54377 4.49369C6.4855 4.55196 6.43927 4.62114 6.40773 4.69728C6.37619 4.77342 6.35996 4.85503 6.35996 4.93744C6.35996 5.01985 6.37619 5.10145 6.40773 5.17759C6.43927 5.25373 6.4855 5.32291 6.54377 5.38119C6.60204 5.43946 6.67123 5.48569 6.74736 5.51722C6.8235 5.54876 6.90511 5.56499 6.98752 5.56499C7.06993 5.56499 7.15154 5.54876 7.22768 5.51722C7.30381 5.48569 7.373 5.43946 7.43127 5.38119L9.85627 2.95619C10.1499 2.67283 10.542 2.51447 10.95 2.51447C11.3581 2.51447 11.7502 2.67283 12.0438 2.95619C12.1878 3.09962 12.302 3.27007 12.38 3.45776C12.4579 3.64545 12.4981 3.8467 12.4981 4.04994C12.4981 4.25318 12.4579 4.45442 12.38 4.64211C12.302 4.82981 12.1878 5.00026 12.0438 5.14369L9.61877 7.56869C9.56019 7.62679 9.51369 7.69591 9.48196 7.77208C9.45023 7.84824 9.4339 7.92993 9.4339 8.01244C9.4339 8.09494 9.45023 8.17664 9.48196 8.2528C9.51369 8.32896 9.56019 8.39809 9.61877 8.45619C9.67687 8.51477 9.746 8.56126 9.82216 8.59299C9.89832 8.62472 9.98001 8.64106 10.0625 8.64106C10.145 8.64106 10.2267 8.62472 10.3029 8.59299C10.379 8.56126 10.4482 8.51477 10.5063 8.45619L12.9313 6.02494C13.4538 5.49918 13.747 4.78805 13.747 4.04681C13.747 3.30558 13.4538 2.59445 12.9313 2.06869ZM5.51877 9.48119C5.57717 9.53911 5.64643 9.58494 5.72258 9.61604C5.79873 9.64715 5.88027 9.66291 5.96252 9.66244C6.04477 9.66291 6.12631 9.64715 6.20246 9.61604C6.27861 9.58494 6.34787 9.53911 6.40627 9.48119L9.48127 6.40619C9.59896 6.2885 9.66508 6.12888 9.66508 5.96244C9.66508 5.796 9.59896 5.63638 9.48127 5.51869C9.36358 5.401 9.20396 5.33488 9.03752 5.33488C8.87108 5.33488 8.71146 5.401 8.59377 5.51869L5.51877 8.59369C5.46019 8.65179 5.41369 8.72091 5.38196 8.79708C5.35023 8.87324 5.3339 8.95493 5.3339 9.03744C5.3339 9.11994 5.35023 9.20164 5.38196 9.2778C5.41369 9.35396 5.46019 9.42309 5.51877 9.48119Z" fill="#030303" />
                                </svg>
                                <div className="social-wrapper">
                                  {
                                    social_links.map((item, index) => (
                                      <a key={index} className="main-color-1-text font-size-1 line-height-1 font-weight-500">{item.name}</a>
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
                  isArray(education) && !!education.length && (
                    <div className="education-block block-block additional-color-2-border">
                      <div className="left-side">
                        <h3 className="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">EDUCATION</h3>
                      </div>
                      <div className="right-side">
                        {
                          education.map((itemEd, index) => (
                            <div key={index}>
                              {
                                !!itemEd?.study && (
                                  <p className="main-color-1-text font-weight-500 font-size-1 line-height-1">{itemEd?.study}</p>
                                )
                              }
                              {
                                !!itemEd?.facility && (
                                  <p className="main-color-1-text font-weight-500 font-size-1 line-height-1">{itemEd?.facility}</p>
                                )
                              }
                              <p className="main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                              {
                                (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                  <p className="main-color-1-text font-size-1 line-height-1">
                                    {
                                      !!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("yy")}`)
                                    }
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
                  isArray(employment) && !!employment.length && (
                    <div className="work-experience-block block-block additional-color-2-border">
                      <h3 className="block-heading additional-color-1-text font-size-3 line-height-3 font-family-arsenal">
                        <div className="left-side">WORK EXPERIENCE</div>
                        <div className="right-side"></div>
                      </h3>

                      {
                        employment.map((itemEm, index) => (
                          <div className="work-experience-subblock" key={index}>
                            <div className="left-side">
                              <span className="pointer-circle additional-color-1-background"></span>
                              {
                                !!itemEm?.title && (
                                  <p className="additional-color-1-text font-weight-600 font-size-1 line-height-1">{itemEm?.title}</p>
                                )
                              }
                              {
                                (!!itemEm?.employer || !!itemEm?.city) && (
                                  <p className="additional-color-1-text font-size-1 line-height-1">{!!itemEm?.company && (`${itemEm?.company},`)} {!!itemEm?.city && (`${itemEm?.city} `)}</p>
                                )
                              }
                              {
                                (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                  <p className="additional-color-1-text date-range font-size-1 line-height-1">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                                )
                              }
                            </div>
                            <div className="right-side">
                              <div className="list-wrapper main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}>
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
                    <div className="certificates-block block-block additional-color-2-border">
                      <div className="left-side">
                        <h3 className="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">CERTIFICATES</h3>
                      </div>
                      <div className="right-side">
                        <p className="additional-color-1-text font-size-1 line-height-1">
                          {
                            certificates.map((item, index) => (
                              <span key={index}>
                                {`${item.name}${((certificates.length - 1) != index) ? (", ") : ""}`}
                              </span>
                            ))
                          }
                        </p>
                      </div>
                    </div>
                  )
                }
                {/* references */}
                {
                  isArray(reference) && !!reference.length && (
                    <div className="references-block block-block additional-color-2-border">
                      <div className="left-side">
                        <h3 className="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">REFERENCES</h3>
                      </div>

                      <div className="right-side">
                        {
                          reference.map((itemRef, index) => (
                            <div key={index}>
                              {
                                (!!itemRef?.fullName || !!itemRef?.company) && (
                                  <p className="main-color-1-text font-size-1 line-height-1">
                                    {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                    {!!itemRef?.company && (`${itemRef.company}`)}
                                  </p>
                                )
                              }
                              {
                                !!itemRef?.email && (
                                  <p className="main-color-1-text font-size-1 line-height-1">{itemRef.email}</p>
                                )
                              }
                              {
                                !!itemRef.phone && (
                                  <p className="main-color-1-text font-size-1 line-height-1">{itemRef.phone}</p>
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

