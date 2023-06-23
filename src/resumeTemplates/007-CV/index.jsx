import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";

export const ResumeCv007 = ({
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


  React.useEffect(() => {
    if (typeof window != 'undefined') {
      let current_page_number = 1;

      function rebuildingPages() {
        $('.cv-body.cv-body-visible').remove();

        var photo_block = $('#cv-body-hidden-container .cv-body-content .photo-wrapper').clone();
        var profile_main_block = $('#cv-body-hidden-container .cv-body-content .profile-main-block').clone();
        var profile_additional_block = $('#cv-body-hidden-container .cv-body-content .profile-additional-block').clone();
        var skills_and_languages_block = $('#cv-body-hidden-container .cv-body-content .skills-languages-block').clone();
        var certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();
        var references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
        var hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();

        var main_info_block = $('#cv-body-hidden-container .cv-body-content .main-info-block').clone();
        var employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
        var extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
        var internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();
        var education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
        var courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();


        // getPageContainer().append(header_block);
        getPageColumnLeft();
        getPageColumnRight();

        current_page_number = 1;

        getPageColumnLeft().append(photo_block);
        if (checkHeight()) {
          photo_block.remove();
          current_page_number++;
          getPageColumnLeft().append(photo_block);
        }

        getPageColumnLeft().append(profile_main_block);
        if (checkHeight()) {
          profile_main_block.remove();
          current_page_number++;
          getPageColumnLeft().append(profile_main_block);
        }

        getPageColumnLeft().append(profile_additional_block);
        if (checkHeight()) {
          profile_additional_block.remove();
          current_page_number++;
          getPageColumnLeft().append(profile_additional_block);
        }

        getPageColumnLeft().append(skills_and_languages_block);
        if (checkHeight()) {
          skills_and_languages_block.remove();
          current_page_number++;
          getPageColumnLeft().append(skills_and_languages_block);
        }

        getPageColumnLeft().append(certificates_block);
        if (checkHeight()) {
          certificates_block.remove();
          current_page_number++;
          getPageColumnLeft().append(certificates_block);
        }

        getPageColumnLeft().append(references_block);
        if (checkHeight()) {
          references_block.remove();
          current_page_number++;
          getPageColumnLeft().append(references_block);
        }

        getPageColumnLeft().append(hobbies_block);
        if (checkHeight()) {
          hobbies_block.remove();
          current_page_number++;
          getPageColumnLeft().append(hobbies_block);
        }

        current_page_number = 1;

        getContentArea2().append(main_info_block);
        if (checkHeight()) {
          main_info_block.remove();
          current_page_number++;
          getContentArea2().append(main_info_block);
        }

        getContentArea3().append(employment_history_block);
        if (checkHeight()) {
          employment_history_block.remove();
          current_page_number++;
          getContentArea3().append(employment_history_block);
        }

        getContentArea3().append(extra_curricular_activities_block);
        if (checkHeight()) {
          extra_curricular_activities_block.remove();
          current_page_number++;
          getContentArea3().append(extra_curricular_activities_block);
        }

        getContentArea3().append(internships_block);
        if (checkHeight()) {
          internships_block.remove();
          current_page_number++;
          getContentArea3().append(internships_block);
        }

        getContentArea4().append(education_block);
        if (checkHeight()) {
          education_block.remove();
          current_page_number++;
          getContentArea4().append(education_block);
        }

        getContentArea4().append(courses_block);
        if (checkHeight()) {
          courses_block.remove();
          current_page_number++;
          getContentArea4().append(courses_block);
        }
      }

      function checkHeight() {
        return getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
      }

      function getContentArea2() {
        return getPageColumnRight().find('.information-area-0');
      }

      function getContentArea3() {
        return getPageColumnRight().find('.information-area-1');
      }

      function getContentArea4() {
        return getPageColumnRight().find('.information-area-2');
      }

      function getPageColumnLeft() {
        var column_left = getPageContainer().find('.column-left');

        if (column_left.length > 0) {
          return column_left;
        } else {
          column_left = $('<div class="column-left"></div>');
          getPageArea2().append(column_left);

          // Insert separator
          var separator = $('<div class="separator"></div>');
          getPageArea2().append(separator);

          return $(column_left);
        }
      }

      function getPageColumnRight() {
        var column_right = getPageContainer().find('.column-right');
        if (column_right.length > 0) {
          return column_right;
        } else {
          column_right = $('#cv-body-hidden-container .cv-body-content .column-right').clone();
          column_right.find('.information-area-0').children().remove();
          column_right.find('.information-area-1').children().remove();
          column_right.find('.information-area-2').children().remove();
          getPageArea2().append(column_right);
          return $(column_right);
        }
      }

      function getPageContainer() {
        var page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
        if (page.length > 0) {
          return page.find('.cv-body-content');
        } else {
          return createNewPage(current_page_number);
        }
      }

      function createNewPage(page_number) {
        var page_element = $('#cv-body-hidden-container').clone();
        page_element.attr('id', '');
        page_element.attr('class', 'cv-body cv-body-visible cv-body-1 page-' + current_page_number);
        page_element.children().remove();

        var page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();
        page_element_container.children().remove();
        page_element.append(page_element_container);

        var column_left = $('#cv-body-hidden-container .cv-body-content .column-left').clone();
        column_left.children().remove();
        page_element_container.append(column_left);

        var column_right = $('#cv-body-hidden-container .cv-body-content .column-right').clone();
        column_right.find('.information-area-0').children().remove();
        column_right.find('.information-area-1').children().remove();
        column_right.find('.information-area-2').children().remove();
        page_element_container.append(column_right);

        if ($('#cv-chapter-section-cv').find(page_element)) {
          $('#cv-chapter-section-cv').append(page_element);
        }

        return page_element_container;
      }

      rebuildingPages();
    }
  }, [data, stateClasses]);

  return (
    <div className="sv_007" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1 `} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text">
            <div className="column-left">
              {
                !!contact?.[0]?.picture && (
                  <div className="photo-wrapper">
                    <svg className="additional-color-2-svg-path" width="130" height="129" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M128.5 64.5C128.5 51.9409 124.776 39.6638 117.798 29.2213C110.821 18.7788 100.904 10.6398 89.3004 5.83365C77.6973 1.02749 64.9296 -0.230027 52.6118 2.22013C40.294 4.6703 28.9794 10.7181 20.0987 19.5987C11.2181 28.4794 5.1703 39.794 2.72013 52.1118C0.269973 64.4296 1.52748 77.1973 6.33365 88.8004C11.1398 100.404 19.2788 110.321 29.7213 117.298C40.1638 124.276 52.4409 128 65 128" stroke="#DFCECE" strokeWidth="2" />
                    </svg>
                    <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                  </div>
                )
              }
              {
                !!career_objective?.[0]?.data && (
                  <div className="profile-main-block additional-color-1-background">
                    <div className="profile-main-info">
                      <p className="cv-heading font-size-3">PROFILE</p>
                      <p className="profile-main-text" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  </div>
                )
              }

              <div className="profile-additional-block">
                {
                  isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                    <div className="info-1">
                      {
                        !!contact?.[0]?.dateOfBirth && (
                          <p className="info-1-item">
                            <span className="item-name additional-color-3-text">Birth Date</span>
                            <span className="item-value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}</span>
                          </p>
                        )
                      }
                      {
                        !!contact?.[0]?.placeOfBirth && (
                          <p className="info-1-item">
                            <span className="item-name additional-color-3-text">Place of Birth</span>
                            <span className="item-value">{contact?.[0]?.placeOfBirth}</span>
                          </p>
                        )
                      }
                      {
                        !!contact?.[0]?.nationality && (
                          <p className="info-1-item">
                            <span className="item-name additional-color-3-text">Nationality</span>
                            <span className="item-value">{contact?.[0]?.nationality}</span>
                          </p>
                        )
                      }
                      {
                        !!contact?.[0]?.driverLicense && (
                          <p className="info-1-item">
                            <span className="item-name additional-color-3-text">Driving Licence</span>
                            <span className="item-value">{contact?.[0]?.driverLicense}</span>
                          </p>
                        )
                      }
                    </div>
                  )
                }

                {
                  (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.email || !!contact?.[0]?.phone || !!contact?.[0]?.address || !!contact?.[0]?.zipCode) && (
                    <div className="info-2">
                      <p>
                        {`
                          ${!!contact?.[0]?.country ? (`${contact?.[0]?.country},`) : ''} ${!!contact?.[0]?.address ? (`${contact?.[0]?.address},`) : ''}
                          ${!!contact?.[0]?.city ? (`${contact?.[0]?.city},`) : ''}
                          ${!!contact?.[0]?.zipCode ? contact?.[0]?.zipCode : ""}
                        `}
                      </p>
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
                  isArray(social_links) && !!social_links.length && (
                    <div className="profile-links">
                      <h4 className="profile-links-title">Links</h4>
                      {
                        social_links.map((item, index) => (
                          <a key={index}>
                            <img src={item.icon} />
                          </a>
                        ))
                      }
                    </div>
                  )
                }
              </div>

              {
                (!!(isArray(skills) && skills.length) || !!(isArray(languages) && languages.length)) && (
                  <div className="skills-languages-block block-block">
                    <p className="cv-heading font-size-3">Skills / Languages</p>
                    <div className="skills-list">
                      {
                        skills.map((item, index) => (
                          <div className="list-item" key={index}>
                            <span className="list-item-name font-size-1">{item.name}</span>
                            {
                              !hide_experience_level && (
                                <p className="list-item-value-wrapper">
                                  <span className="list-item-value" style={{ width: `${(+item.level * 100) / 5}%` }}></span>
                                </p>
                              )
                            }
                          </div>
                        ))
                      }

                      {
                        languages.map((item, index) => (
                          <div className="list-item" key={index}>
                            <span className="list-item-name">{item.language}</span>
                            <p className="list-item-value-wrapper">
                              <span className="list-item-value" style={{ width: `${(+item.level * 100) / 6}%` }}></span>
                            </p>
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
                    <p>
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
                              <p className="company-name">
                                {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                {!!itemRef?.company && (`${itemRef.company}`)}
                              </p>
                            )
                          }
                          {
                            !!itemRef?.email && (
                              <p className="email">{itemRef.email}</p>
                            )
                          }
                          {
                            !!itemRef.phone && (
                              <p className="telephone">{itemRef.phone}</p>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                )
              }

              {
                 isArray(hobbies) && !!hobbies.length && (
                  <div className="hobbies-block block-block">
                    <p className="cv-heading font-size-3">Hobbies</p>
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
            </div>
            <div className="column-right">
              <div className="information-area-0">
                <div className="main-info-block block-block">
                  {
                    isArray(contact) && contact?.[0]?.jobTitle && (
                      <h2 className="cv-prophecy main-color-2-text font-size-4">{contact?.[0]?.jobTitle}</h2>
                    )
                  }
                  {
                    isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                      <h1 className="cv-name font-size-5">
                        {!!contact?.[0]?.firstName && (<><span className="text-line-1">{contact?.[0]?.firstName}</span>&nbsp;</>)}
                        {!!contact?.[0]?.lastName && (<span className="text-line-2">{contact?.[0]?.lastName}</span>)}
                      </h1>
                    )
                  }
                </div>
                </div>
              <div className="information-area-1 additional-color-2-background">
                <span className="top-line main-color-1-background"></span>
                {
                 (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    employment.map((itemEm, index) => (
                      <div className={`employment-history-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          <span className="dotted-line"></span>
                          {
                            (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <p className="date-range">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MM/yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MM/yy")}`)}</p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          {
                            (index == 0) && (
                              <p className="cv-heading font-size-2">Employment History</p>
                            )
                          }
                          <p className="cv-subheading">
                            <span className="circle-point"></span>
                            {!!itemEm?.title && (`${itemEm?.title}, `)}
                            {!!itemEm?.company && (` ${itemEm?.company}, `)}
                            {!!itemEm?.city && (`${itemEm?.city} `)}
                          </p>
                          <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                        </div>
                      </div>
                    ))
                  )
                }
                {
                  (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                    extra_curricular.map((itemEx, index) => (
                      <div key={index} className={`extra-curricular-activities-block block-block ${(index > 0) ? "block-net" : ""}`}>
                        <div className="left-side">
                          <span className="dotted-line"></span>
                          {
                            (
                              !!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (<p className="date-range">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MM/yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MM/yy")}`)}</p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          <span className="block-circle"></span>
                          {
                            (index == 0) && (
                              <p className="cv-heading font-size-2">Extra-curricular activities</p>
                            )
                          }
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="cv-subheading">
                                <span className="circle-point"></span>
                                {!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                        </div>
                      </div>
                    ))
                  )
                }
                {
                  (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    internship.map((itemIn, index) => (
                      <div key={index} className={`internships-block block-block  ${(index > 0) ? "block-net" : ""}`}>
                        <div className="left-side">
                          <span className="dotted-line"></span>
                          {
                            (
                              !!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (<p className="date-range">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MM/yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MM/yy")}`)}</p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          {
                            (index == 0) && (
                              <p className="cv-heading font-size-2">Internships</p>
                            )
                          }
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="cv-subheading">
                                <span className="circle-point"></span>
                                {!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                            )
                          }
                          <div dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                        </div>
                      </div>
                    ))
                  )
                }
              </div>
              <div className="information-area-2 additional-color-1-background">
                {
                   (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    education.map((itemEd, index) => (
                      <div className={`education-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          <span className="dotted-line"></span>
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range">
                                {
                                  !!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MM/yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MM/yy")}`)
                                }
                              </p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          {
                            (index == 0) && (
                              <p className="cv-heading font-size-2">Education</p>
                            )
                          }
                          {
                            (!!itemEd?.study) && (
                              <p className="cv-subheading">
                                <span className="circle-point"></span>
                                {!!itemEd?.study && (`${itemEd?.study}, `)}  {itemEd?.facility && (`${itemEd.facility}`)}</p>
                            )
                          }
                          {
                            itemEd?.degree && (
                              <p className="cv-subheading">{itemEd?.degree}</p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                        </div>
                      </div>
                    ))
                  )
                }

                {
                   (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                    courses.map((itemCo, index) => (
                      <div className={`courses-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          <span className="dotted-line"></span>
                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MM/yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MM/yy")}`)}</p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          {
                            (index == 0) && (
                              <p className="cv-heading font-size-2">Courses</p>
                            )
                          }
                          {
                            !!itemCo?.title && (
                              <p className="cv-subheading">
                                <span className="circle-point"></span>
                                {itemCo?.title}
                              </p>
                            )
                          }
                          {
                            !!itemCo?.institution && (
                              <p>{itemCo?.institution}</p>
                            )
                          }
                        </div>
                      </div>
                    ))
                  )
                }
              </div>
            </div>
          </div>

          <div className="nine-points nine-points-1">
            <div className="inner-wrapper">
              <div className="point p1 additional-color-1-background"></div>
              <div className="point p2 additional-color-1-background"></div>
              <div className="point p3 additional-color-1-background"></div>
              <div className="point p4 additional-color-1-background"></div>
              <div className="point p5 additional-color-1-background"></div>
              <div className="point p6 additional-color-1-background"></div>
              <div className="point p7 additional-color-1-background"></div>
              <div className="point p8 additional-color-1-background"></div>
              <div className="point p9 additional-color-1-background"></div>
            </div>
          </div>

          <div className="nine-points nine-points-2">
            <div className="inner-wrapper">
              <div className="point p1 additional-color-1-background"></div>
              <div className="point p2 additional-color-1-background"></div>
              <div className="point p3 additional-color-1-background"></div>
              <div className="point p4 additional-color-1-background"></div>
              <div className="point p5 additional-color-1-background"></div>
              <div className="point p6 additional-color-1-background"></div>
              <div className="point p7 additional-color-1-background"></div>
              <div className="point p8 additional-color-1-background"></div>
              <div className="point p9 additional-color-1-background"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

