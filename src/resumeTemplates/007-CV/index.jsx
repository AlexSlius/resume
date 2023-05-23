import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

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
          <div className="cv-body-content">
            <div className="column-left">
              {
                !!contact?.[0]?.picture && (
                  <div className="photo-wrapper">
                    <svg className="additional-color-2-svg-path" width="130" height="129" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M128.5 64.5C128.5 51.9409 124.776 39.6638 117.798 29.2213C110.821 18.7788 100.904 10.6398 89.3004 5.83365C77.6973 1.02749 64.9296 -0.230027 52.6118 2.22013C40.294 4.6703 28.9794 10.7181 20.0987 19.5987C11.2181 28.4794 5.1703 39.794 2.72013 52.1118C0.269973 64.4296 1.52748 77.1973 6.33365 88.8004C11.1398 100.404 19.2788 110.321 29.7213 117.298C40.1638 124.276 52.4409 128 65 128" stroke="#DFCECE" strokeWidth="2" />
                    </svg>
                    <img src={contact?.[0]?.picture} />
                  </div>
                )
              }
              {
                !!career_objective?.[0]?.data && (
                  <div className="profile-main-block additional-color-1-background">
                    <span className="side-line main-color-1-background"></span>
                    <h3 className="heading-type-3 font-weight-900 font-size-3 line-height-4">PROFILE</h3>
                    <p className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                  </div>
                )
              }

              <div className="profile-additional-block">
                {
                  isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                    <div className="info-1">
                      {
                        !!contact?.[0]?.dateOfBirth && (
                          <p className="info-1-item font-size-1 line-height-1">
                            <span className="item-name">Birth Date</span>
                            <span className="item-value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}</span>
                          </p>
                        )
                      }
                      {
                        !!contact?.[0]?.placeOfBirth && (
                          <p className="info-1-item font-size-1 line-height-1">
                            <span className="item-name">Place of Birth</span>
                            <span className="item-value">{contact?.[0]?.placeOfBirth}</span>
                          </p>
                        )
                      }
                      {
                        !!contact?.[0]?.nationality && (
                          <p className="info-1-item font-size-1 line-height-1">
                            <span className="item-name">Nationality</span>
                            <span className="item-value">{contact?.[0]?.nationality}</span>
                          </p>
                        )
                      }
                      {
                        !!contact?.[0]?.driverLicense && (
                          <p className="info-1-item font-size-1 line-height-1">
                            <span className="item-name">Driving Licence</span>
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
                      <p className="font-weight-700 font-size-1 line-height-1">{`${!!contact?.[0]?.country ? (`${contact?.[0]?.country},`) : ''} ${!!contact?.[0]?.address ? (`${contact?.[0]?.address},`) : ''} ${!!contact?.[0]?.city ? (`${contact?.[0]?.city},`) : ''} ${!!contact?.[0]?.zipCode ? contact?.[0]?.zipCode : ""}`}</p>
                      {
                        !!contact?.[0]?.phone && (<p className="font-weight-700 font-size-1 line-height-1">{contact?.[0]?.phone}</p>)
                      }
                      {
                        !!contact?.[0]?.email && (
                          <p className="font-weight-700 font-size-1 line-height-1">{contact?.[0]?.email}</p>
                        )
                      }
                    </div>
                  )
                }

                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="profile-links">
                      <h4 className="font-weight-700 font-size-1 line-height-1">Links</h4>
                      {
                        social_links.map((item, index) => (
                          <a key={index} className="main-color-1-svg">
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
                    <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">Skills / Languages</h3>
                    <div className="skills-list">
                      {
                        skills.map((item, index) => (
                          <div className="list-item" key={index}>
                            <span className="list-item-name font-size-1 line-height-1">{item.name}</span>
                            {
                              !hide_experience_level && (
                                <p className="list-item-value-wrapper main-color-1-border">
                                  <span className="list-item-value main-color-1-background" style={{ width: `${(+item.level * 100) / 5}%` }}></span>
                                </p>
                              )
                            }
                          </div>
                        ))
                      }

                      {
                        languages.map((item, index) => (
                          <div className="list-item" key={index}>
                            <span className="list-item-name font-size-1 line-height-1">{item.language}</span>
                            <p className="list-item-value-wrapper main-color-1-border">
                              <span className="list-item-value main-color-1-background" style={{ width: `${(+item.level * 100) / 6}%` }}></span>
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
                    <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">Certificates</h3>
                    <p className="font-size-1 line-height-1">
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
                isArray(reference) && !!reference.length && (
                  <div className="references-block block-block">
                    <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">References</h3>
                    {
                      reference.map((itemRef, index) => (
                        <div key={index}>
                          {
                            (!!itemRef?.fullName || !!itemRef?.company) && (
                              <p className="company-name font-size-1 line-height-1">
                                {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                {!!itemRef?.company && (`${itemRef.company}`)}
                              </p>
                            )
                          }
                          {
                            !!itemRef?.email && (
                              <p className="email font-size-1 line-height-1">{itemRef.email}</p>
                            )
                          }
                          {
                            !!itemRef.phone && (
                              <p className="telephone font-size-1 line-height-1">{itemRef.phone}</p>
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
                    <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">Hobbies</h3>
                    <p className="font-size-1 line-height-1">
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
              {
                isArray(contact) && contact?.[0]?.jobTitle && (
                  <h2 className="cv-prophecy main-color-2-text font-size-4 line-height-5 main-color-1-background">{contact?.[0]?.jobTitle}</h2>
                )
              }
              {
                isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                  <h1 className="cv-name font-size-5 line-height-6">
                    {!!contact?.[0]?.firstName && (<><span className="text-line-1 font-weight-300">{contact?.[0]?.firstName}</span>&nbsp;</>)}
                    {!!contact?.[0]?.lastName && (<span className="text-line-2 font-weight-900">{contact?.[0]?.lastName}</span>)}
                  </h1>
                )
              }
              <div className="information-area-1 additional-color-2-background">
                <span className="top-line main-color-1-background"></span>
                {
                  isArray(employment) && !!employment.length && (
                    employment.map((itemEm, index) => (
                      <div className={`employment-history-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          <span className="circle-point main-color-1-background"></span>
                          <span className="dotted-line main-color-1-border"></span>
                          {
                            (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <p className="date-range font-weight-600 font-size-0 line-height-0">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MM/yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MM/yy")}`)}</p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          <span className="block-circle additional-color-1-background"></span>
                          {
                            (index == 0) && (
                              <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">Employment History</h3>
                            )
                          }
                          <p className="font-weight-600 font-size-1 line-height-1">
                            {!!itemEm?.title && (`${itemEm?.title}, `)}
                            {!!itemEm?.company && (` ${itemEm?.company}, `)}
                            {!!itemEm?.city && (`${itemEm?.city} `)}
                          </p>
                          <div className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                        </div>
                      </div>
                    ))
                  )
                }
                {
                  isArray(extra_curricular) && !!extra_curricular.length && (
                    extra_curricular.map((itemEx, index) => (
                      <div key={index} className={`extra-curricular-activities-block block-block ${(index > 0) ? "block-net" : ""}`}>
                        <div className="left-side">
                          <span className="circle-point main-color-1-background"></span>
                          <span className="dotted-line main-color-1-border"></span>
                          {
                            (
                              !!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (<p className="date-range font-weight-600 font-size-0 line-height-0">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MM/yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MM/yy")}`)}</p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          <span className="block-circle additional-color-1-background"></span>
                          {
                            (index == 0) && (
                              <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">Extra-curricular activities</h3>
                            )
                          }
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="font-weight-600 font-size-1 line-height-1">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                            )
                          }
                          <p className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                        </div>
                      </div>
                    ))
                  )
                }
                {
                  isArray(internship) && !!internship.length && (
                    internship.map((itemIn, index) => (
                      <div key={index} className={`internships-block block-block  ${(index > 0) ? "block-net" : ""}`}>
                        <div className="left-side">
                          <span className="circle-point main-color-1-background"></span>
                          <span className="dotted-line main-color-1-border"></span>
                          {
                            (
                              !!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (<p className="date-range font-weight-600 font-size-0 line-height-0">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MM/yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MM/yy")}`)}</p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          {
                            (index == 0) && (
                              <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">Internships</h3>
                            )
                          }
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="font-weight-600 font-size-1 line-height-1">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                            )
                          }
                          <div className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                        </div>
                      </div>
                    ))
                  )
                }
              </div>
              <div className="information-area-2 additional-color-1-background">
                <span className="top-line main-color-1-background"></span>
                {
                  isArray(education) && !!education.length && (
                    education.map((itemEd, index) => (
                      <div className={`education-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          <span className="circle-point main-color-1-background"></span>
                          <span className="dotted-line main-color-1-border"></span>
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range font-weight-600 font-size-0 line-height-0">
                                {
                                  !!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MM/yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MM/yy")}`)
                                }
                              </p>
                            )
                          }
                        </div>
                        <div className="right-side ">
                          {
                            (index == 0) && (
                              <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">Education</h3>
                            )
                          }
                          {
                            (!!itemEd?.study) && (
                              <p className="font-weight-600 font-size-1 line-height-1">{!!itemEd?.study && (`${itemEd?.study}, `)}  {itemEd?.facility && (`${itemEd.facility}`)}</p>
                            )
                          }
                          {
                            itemEd?.degree && (
                              <p className="font-weight-600 font-size-1 line-height-1">{itemEd?.degree}</p>
                            )
                          }
                          <p className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                        </div>
                      </div>
                    ))
                  )
                }

                {
                  isArray(courses) && !!courses.length && (
                    courses.map((itemCo, index) => (
                      <div className={`courses-block block-block ${(index > 0) ? "block-net" : ""}`} key={index}>
                        <div className="left-side">
                          <span className="circle-point main-color-1-background"></span>
                          <span className="dotted-line main-color-1-border"></span>
                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range font-weight-600 font-size-0 line-height-0">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MM/yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MM/yy")}`)}</p>
                            )
                          }
                        </div>
                        <div className="right-side">
                          <span className="block-circle additional-color-1-background"></span>
                          {
                            (index == 0) && (
                              <h3 className="heading-type-3 font-weight-900 font-size-2 line-height-3">Courses</h3>
                            )
                          }
                          {
                            !!itemCo?.title && (
                              <p className="font-weight-600 font-size-1 line-height-1">{itemCo?.title}</p>
                            )
                          }
                          {
                            !!itemCo?.institution && (
                              <p className="font-size-1 line-height-1">{itemCo?.institution}</p>
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

