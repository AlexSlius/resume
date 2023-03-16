import React from "react";
import { isArray } from "lodash";
import moment from 'moment';
import styled from 'styled-components';

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
          <span key={index} className={`estimation-point additional-color-1-border ${(index + 1) <= pros ? "additional-color-1-background" : ""}`}></span>
        ))
      }
    </div>
  )
}

export const ResumeCv002 = ({
  data,
  idCv,
  stateClasses,
  reportTemplateRef,
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
    languages
  } = data;

  React.useEffect(() => {
    if (typeof window != "undefined") {
      let current_page_number = 1;

      function rebuildingPages() {
        $('.cv-body.cv-body-visible').remove();
        current_page_number = 1;

        let header_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-1').clone();
        let footer_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-3').clone();
        let employment_history_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .employment-history-block').clone();
        let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .extra-curricular-activities-block').clone();
        let internships_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .internships-block').clone();
        let references_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .references-block').clone();

        let education_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .education-block').clone();
        let courses_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .courses-block').clone();
        let certificates_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .certificates-block').clone();
        let hobbies_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .hobbies-block').clone();
        let profile_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .profile-block').clone();
        let skills_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .skills-block').clone();
        let languages_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .languages-block').clone();

        getPageContainer().append(header_block);
        getPageColumnLeft();
        getPageColumnRight();

        console.log("TEST heights: ", getPageContainer().height(), getPageContainer().parent().height());

        // Column left
        current_page_number = 1;
        getPageColumnLeft().append(employment_history_block);
        if (getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height()) {
          employment_history_block.remove();
          current_page_number++;
          getPageColumnLeft().append(employment_history_block);
        }

        getPageColumnLeft().append(education_block);
        if (getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height()) {
          education_block.remove();
          current_page_number++;
          getPageColumnLeft().append(education_block);
        }

        getPageColumnLeft().append(courses_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          courses_block.remove();
          current_page_number++;
          getPageColumnLeft().append(courses_block);
        }

        getPageColumnLeft().append(extra_curricular_activities_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          extra_curricular_activities_block.remove();
          current_page_number++;
          getPageColumnLeft().append(extra_curricular_activities_block);
        }

        getPageColumnLeft().append(internships_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          internships_block.remove();
          current_page_number++;
          getPageColumnLeft().append(internships_block);
        }
        if (!getPageColumnRight()) {
          let col_r = getPageColumnRight();
        }


        // Column right
        current_page_number = 1;
        getPageColumnRight().append(profile_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          profile_block.remove();
          current_page_number++;
          getPageColumnRight().append(profile_block);
        }

        getPageColumnRight().append(skills_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          skills_block.remove();
          current_page_number++;
          getPageColumnRight().append(skills_block);
        }

        getPageColumnRight().append(languages_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          languages_block.remove();
          current_page_number++;
          getPageColumnRight().append(languages_block);
        }

        getPageColumnRight().append(certificates_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          certificates_block.remove();
          current_page_number++;
          getPageColumnRight().append(certificates_block);
        }

        getPageColumnRight().append(references_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          references_block.remove();
          current_page_number++;
          getPageColumnRight().append(references_block);
        }

        getPageColumnRight().append(hobbies_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          hobbies_block.remove();
          current_page_number++;
          getPageColumnRight().append(hobbies_block);
        }

        if (!getPageColumnRight()) {
          let col_r = getPageColumnRight();
        }

        current_page_number = 1;
        getPageContainer().append(footer_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          footer_block.remove();
          current_page_number++;
          getPageContainer().append(footer_block);
        }
      }

      rebuildingPages();

      function createNewPage(page_number) {
        let page_element = $('<div class="cv-body cv-body-visible page-' + page_number + '" data-chapter="cv" data-page="' + page_number + '"></div>');
        let page_element_container = $('<div class="cv-body-content"></div>');
        page_element.append(page_element_container);
        if ($('#cv-chapter-section-cv').find(page_element)) {
          $('#cv-chapter-section-cv').append(page_element);
        }

        return page_element_container;
      }


      function getPageArea2() {
        let area_2 = getPageContainer().find('.cv-body-area.area-2');

        if (area_2.length > 0) {
          return area_2;
        } else {
          area_2 = $('<div class="cv-body-area area-2"></div>');
          getPageContainer().append(area_2);
          return $(area_2);
        }
      }

      function getPageColumnLeft() {
        let column_left = getPageArea2().find('.column-left');
        if (column_left.length > 0) {
          return column_left;
        } else {
          column_left = $('<div class="column-left"></div>');
          getPageArea2().append(column_left);

          // Insert separator
          let separator = $('<div class="separator"></div>');
          getPageArea2().append(separator);

          return $(column_left);
        }
      }

      function getPageColumnRight() {
        let column_right = getPageArea2().find('.column-right');
        if (column_right.length > 0) {
          return column_right;
        } else {
          column_right = $('<div class="column-right"></div>');
          getPageArea2().append(column_right);
          return $(column_right);
        }
      }

      function getPageContainer() {
        let page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
        if (page.length > 0) {
          return page.find('.cv-body-content');
        } else {
          return createNewPage(current_page_number);
        }
      }
    }
  }, [data]);

  return (
    <div className="sv_002" ref={reportTemplateRef}>
      <WrDiv id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section has-photo  line-height-scheme-state-small color-scheme-state-color-set-0`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body">
          <div className="cv-body-content">
            <div className="cv-body-area area-1">
              {
                isArray(contact) && (contact[0]?.firstName || contact[0]?.lastName || contact[0]?.picture || contact[0]?.jobTitle) && (
                  <div className="personal-info-block">
                    {
                      contact[0]?.picture && (
                        <img className="cv-photo" src={contact[0].picture} />
                      )
                    }
                    <div className="cv-headings-wrap">
                      {
                        (contact[0]?.firstName || contact[0]?.lastName) && (
                          <h1 className="cv-heading additional-color-1-text cv-name font-weight-600 font-size-5 line-height-4">{`${contact[0]?.firstName} ${contact[0]?.lastName}`}</h1>
                        )
                      }
                      {
                        contact[0]?.jobTitle && (
                          <h1 className="cv-heading cv-prophecy additional-color-1-text font-weight-400 font-size-3 line-height-3">{contact[0]?.jobTitle}</h1>
                        )
                      }
                    </div>
                  </div>
                )
              }
              {
                isArray(contact) && (!!contact[0]?.dateOfBirth || !!contact[0]?.placeOfBirth || !!contact[0]?.nationality || !!contact[0]?.driverLicense) && (
                  <div className="profile-secondary-info additional-color-2-border">
                    {
                      !!contact[0]?.dateOfBirth && (
                        <>
                          <span className="name main-color-3-text font-size-1 line-height-1">Birth Date</span>
                          <span className="value main-color-1-text font-size-1 line-height-1">{moment(contact[0].dateOfBirth).format("DD-MM-yy")}</span>
                        </>
                      )
                    }
                    {
                      !!contact[0]?.placeOfBirth && (
                        <>
                          <span className="name main-color-3-text font-size-1 line-height-1">Place of Birth</span>
                          <span className="value main-color-1-text font-size-1 line-height-1">{contact[0]?.placeOfBirth}</span>
                        </>
                      )
                    }
                    {
                      !!contact[0]?.nationality && (
                        <>
                          <span className="name main-color-3-text font-size-1 line-height-1">Nationality</span>
                          <span className="value main-color-1-text font-size-1 line-height-1">{contact[0]?.nationality}</span>
                        </>
                      )
                    }
                    {
                      !!contact[0]?.driverLicense && (
                        <>
                          <span className="name main-color-3-text font-size-1 line-height-1">Driving Licence</span>
                          <span className="value main-color-1-text font-size-1 line-height-1">{contact[0]?.driverLicense}</span>
                        </>
                      )
                    }
                  </div>
                )
              }
            </div>

            <div className="cv-body-area middle-area area-2">
              <div className="column-left wrappable-content-container" data-dom-id="area-2---column-left">
                {/* employment */}
                {
                  isArray(employment) && !!employment.length && (
                    <div className="employment-history-block block-block wrappable-block">
                      <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                        Employment history
                        <span className="line-after-block-heading additional-color-2-border"></span>
                      </h3>

                      {
                        employment.map((itemEm, index) => (
                          <div key={index}>
                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range font-size-1 line-height-1 main-color-1-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            {
                              (!!itemEm?.title || itemEm?.company || !!itemEm?.city) && (
                                <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{!!itemEm?.title && (`${itemEm?.title},`)} {!!itemEm?.company && (`${itemEm?.company},`)} {!!itemEm?.city && (`${itemEm?.city}`)}</h4>
                              )
                            }
                            <div className="font-size-1 line-height-1 main-color-1-text" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* education */}
                {
                  isArray(education) && !!education.length && (
                    <div className="education-block block-block wrappable-block">
                      <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                        Education
                        <span className="line-after-block-heading main-color-1-border"></span>
                      </h3>
                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            {
                              (
                                !!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (<p className="date-range font-size-1 line-height-1 main-color-1-text">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            {
                              itemEd?.study && (
                                <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{itemEd.study}</h4>
                              )
                            }
                            {
                              (itemEd?.facility || itemEd?.degree) && (
                                <p className="education-text font-size-1 line-height-1 main-color-1-text">
                                  {itemEd?.facility && (`${itemEd.facility}, `)}
                                  {itemEd?.degree && (`${itemEd.degree}`)}
                                </p>
                              )
                            }
                            {
                              !!itemEd?.description && (
                                <div className="font-size-1 line-height-1 main-color-1-text" dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* courses */}
                {
                  isArray(courses) && !!courses.length && (
                    <div className="courses-block block-block wrappable-block">
                      <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                        Courses
                        <span className="line-after-block-heading additional-color-2-border"></span>
                      </h3>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            {
                              (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1 main-color-1-text">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            {
                              !!itemCo?.title && (
                                <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{itemCo.title}</h4>
                              )
                            }
                            {
                              !!itemCo?.institution && (
                                <p className="courses-text font-size-1 line-height-1 main-color-1-text">{itemCo.institution}</p>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* extra_curricular */}
                {
                  isArray(extra_curricular) && !!extra_curricular.length && (
                    <div className="extra-curricular-activities-block block-block wrappable-block">
                      <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                        Extra-curricular activities
                        <span className="line-after-block-heading additional-color-2-border"></span>
                      </h3>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            {
                              (
                                !!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (<p className="date-range font-size-1 line-height-1 main-color-1-text">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</h4>
                              )
                            }
                            <div className="font-size-1 line-height-1 main-color-1-text" dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* internship */}
                {
                  isArray(internship) && !!internship.length && (
                    <div className="internships-block block-block wrappable-block">
                      <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                        Internships
                        <span className="line-after-block-heading additional-color-2-border"></span>
                      </h3>

                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            {
                              (
                                !!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (<p className="date-range font-size-1 line-height-1 main-color-1-text">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            {(!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (<h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</h4>)}

                            <div className="font-size-1 line-height-1 main-color-1-text" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>

              <div className="separator"></div>

              <div className="column-right" data-dom-id="area-2---column-right">
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-info-block wrappable-block">
                      <div className="profile-block block-block">
                        <h2 className="cv-heading heading-type-3 font-size-2 font-weight-700 line-height-2 additional-color-1-text">
                          Profile
                          <span className="line-after-block-heading additional-color-2-border"></span>
                        </h2>

                        <div className="profile-text main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></div>
                      </div>
                    </div>
                  )
                }

                <div className="skills-block block-block wrappable-block">
                  {
                    isArray(skills) && !!skills.length && (
                      <>
                        <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                          Skills
                          <span className="line-after-block-heading additional-color-2-border"></span>
                        </h3>

                        <div className="skills-estimation-block">
                          {
                            skills.map((item, index) => (
                              <div className="skill-item" key={index}>
                                <p className="skill-name font-size-1 line-height-1 main-color-1-text">{item.name}</p>
                                <Estimation level={item.level} />
                              </div>
                            ))
                          }
                        </div>
                      </>
                    )
                  }

                  {
                    isArray(languages) && !!languages.length && (
                      <div className="languages-block block-block wrappable-block">
                        <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                          Languages
                          <span className="line-after-block-heading additional-color-2-border"></span>
                        </h3>
                        <div className="skills-estimation-block block-block">
                          {
                            languages.map((item, index) => (
                              <div className="skill-item" key={index}>
                                <p className="skill-name font-size-1 line-height-1 main-color-1-text">{item.language}</p>
                                <Estimation
                                  level={item.level}
                                  startLeng={6}
                                />
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }

                  {/* certificates */}
                  {
                    isArray(certificates) && !!certificates.length && (
                      <div className="certificates-block block-block wrappable-block">
                        <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                          Certificates
                          <span className="line-after-block-heading additional-color-2-border"></span>
                        </h3>
                        {
                          certificates.map((item, index) => (
                            <h4 key={index} className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">
                              <span key={index}>
                                {`${item.name}${((certificates.length - 1) != index) ? (", ") : ""}`}
                              </span>
                            </h4>
                          ))
                        }
                      </div>
                    )
                  }

                  {/* references */}
                  {
                    isArray(reference) && !!reference.length && (
                      <div className="references-block block-block wrappable-block">
                        <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                          References
                          <span className="line-after-block-heading additional-color-2-border"></span>
                        </h3>

                        {
                          reference.map((itemRef, index) => (
                            <div key={index}>
                              {/* <p className="date-range font-size-1 line-height-1 additional-color-2-text">March 2022 - December 2022</p> */}
                              {
                                (!!itemRef?.fullName || !!itemRef?.company) && (
                                  <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">
                                    {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                    {!!itemRef?.company && (`${itemRef.company}`)}
                                  </h4>
                                )
                              }
                              {
                                !!itemRef?.email && (
                                  <p className="references-email font-size-1 line-height-1 main-color-1-text">{itemRef.email}</p>
                                )
                              }
                              {
                                !!itemRef.phone && (
                                  <p className="references-phone font-size-1 line-height-1 main-color-1-text">{itemRef.phone}</p>
                                )
                              }
                            </div>
                          ))
                        }
                      </div>
                    )
                  }

                  {/* hobbies */}
                  {
                    isArray(hobbies) && !!hobbies.length && (
                      <div className="hobbies-block block-block wrappable-block">
                        <h3 className="cv-heading heading-type-3 font-weight-700 font-size-2 line-height-2 additional-color-1-text">
                          Hobbies
                          <span className="line-after-block-heading additional-color-2-border"></span>
                        </h3>

                        <p className="hobbies-text font-size-1 line-height-1 main-color-1-text">
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
            </div>

            <div className="cv-body-area bottom-area area-3 additional-color-1-border">

              {
                isArray(contact) && (!!contact[0]?.country || !!contact[0]?.city || !!contact[0]?.phone || !!contact[0]?.address || !!contact[0]?.email) && (
                  <div className="column-left wrappable-wrapper">
                    <div className="career-details-block block-block wrappable-block">
                      <p className="cv-heading heading-type-3 font-weight-700 font-size-1 line-height-1 additional-color-1-text">Details</p>
                      {
                        !!contact[0]?.phone && (
                          <p className="career-phone font-size-1 line-height-1">
                            <span className="contact-item-name additional-color-1-text">Phone:</span>
                            <span className="contact-item-value main-color-1-text">{contact[0]?.phone}</span>
                          </p>
                        )
                      }
                      {
                        !!contact[0]?.email && (
                          <p className="career-phone font-size-1 line-height-1">
                            <span className="contact-item-name additional-color-1-text">Email:</span>
                            <span className="contact-item-value main-color-1-text">{contact[0]?.email}</span>
                          </p>
                        )
                      }
                      {
                        (!!contact[0]?.country || !!contact[0]?.city || !!contact[0]?.address || !!contact[0]?.zipCode) && (
                          <p className="career-phone font-size-1 line-height-1">
                            <span className="contact-item-name additional-color-1-text">Address:</span>
                            <span className="contact-item-value main-color-1-text">{`${!!contact[0]?.country ? (`${contact[0]?.country},`) : ''} ${!!contact[0]?.address ? (`${contact[0]?.address},`) : ''} ${!!contact[0]?.city ? (`${contact[0]?.city},`) : ''} ${!!contact[0]?.zipCode ? contact[0]?.zipCode : ""}`}</span>
                          </p>
                        )
                      }

                    </div>
                  </div>
                )
              }
              {
                isArray(social_links) && !!social_links.length && (
                  <div className="column-right wrappable-wrapper">
                    <div className="career-links block-block wrappable-block">
                      <h1 className="career-links-head font-weight-700 font-size-1 line-height-1 additional-color-1-text">Links</h1>
                      {
                        social_links.map((itemSocial, index) => (
                          <a className="career-links-link" key={index} href={itemSocial.link}>
                            <img src={itemSocial.icon} alt={itemSocial.name} />
                          </a>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </WrDiv>
    </div >
  )
}

const WrDiv = styled.div`
//   .additional-color-1 {
//     color: red!important;
//     }
    
//     .additional-color-1-background {
//     background-color: red!important;
//     }
    
//     .additional-color-1-border {
//     border-color: red!important;
//     }
`;


