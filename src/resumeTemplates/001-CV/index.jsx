import React, { useEffect, useState } from "react";
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
          <span key={index} className={`estimation-point additional-color-1-border ${(index + 1) <= pros ? "additional-color-1-background" : ""}`}></span>
        ))
      }
    </div>
  )
}

export const ResumeCv001 = ({
  data,
  stateClasses,
  stateLineSpacing,
  stateFontSize,
  templateClass,
  reportTemplateRef,
}) => {
  const [classFontSize, setClassFontSize] = useState(1);
  const [classFontLineSpacing, setClassFontLineSpacing] = useState(1);

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

  useEffect(() => {
    switch (stateLineSpacing) {
      case 0: {
        setClassFontLineSpacing(1);
        break;
      }
      case 50: {
        setClassFontLineSpacing(2);
        break;
      }
      case 100: {
        setClassFontLineSpacing(3);
        break;
      }
    }

  }, [stateLineSpacing]);

  useEffect(() => {
    switch (stateFontSize) {
      case 0: {
        setClassFontSize(1);
        break;
      }
      case 50: {
        setClassFontSize(2);
        break;
      }
      case 100: {
        setClassFontSize(3);
        break;
      }
    }
  }, [stateFontSize]);

  useEffect(() => {
    if (typeof window != "undefined") {
      var current_page_number = 1;
      var font_size_class = '';
      var line_height_class = '';
      var color_class = '';

      async function rebuildingPages() {
        var header_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-1').clone();
        var footer_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-3').clone();
        var employment_history_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .employment-history-block').clone();
        var extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .extra-curricular-activities-block').clone();
        var internships_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .internships-block').clone();
        var references_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .references-block').clone();

        var education_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .education-block').clone();
        var courses_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .courses-block').clone();
        var certificates_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .certificates-block').clone();
        var hobbies_block = $('#cv-body-hidden-container .cv-body-content .cv-body-area.area-2 .hobbies-block').clone();

        await getPageContainer().append(header_block);

        getPageColumnLeft();
        getPageColumnRight();

        current_page_number = 1;

        await getPageColumnLeft().append(employment_history_block);
        if (getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number)) {
          employment_history_block.remove();
          current_page_number++;
          getPageColumnLeft().append(employment_history_block);
        }

        await getPageColumnLeft().append(extra_curricular_activities_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          extra_curricular_activities_block.remove();
          current_page_number++;
          getPageColumnLeft().append(extra_curricular_activities_block);
        }

        await getPageColumnLeft().append(internships_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          internships_block.remove();
          current_page_number++;
          getPageColumnLeft().append(internships_block);
        }

        await getPageColumnLeft().append(references_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          references_block.remove();
          current_page_number++;
          getPageColumnLeft().append(references_block);
        }

        current_page_number = 1;

        await getPageColumnRight().append(education_block);
        if (getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number)) {
          education_block.remove();
          current_page_number++;
          getPageColumnRight().append(education_block);
        }

        await getPageColumnRight().append(courses_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          courses_block.remove();
          current_page_number++;
          getPageColumnRight().append(courses_block);
        }

        await getPageColumnRight().append(certificates_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          certificates_block.remove();
          current_page_number++;
          getPageColumnRight().append(certificates_block);
        }

        await getPageColumnRight().append(hobbies_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          hobbies_block.remove();
          current_page_number++;
          getPageColumnRight().append(hobbies_block);
        }

        await getPageContainer().append(footer_block);
        if (getPageContainer().height() > getPageContainer().parent().height()) {
          footer_block.remove();
          current_page_number++;
          getPageContainer().append(footer_block);
        }

        if (!getPageColumnRight()) {
          var col_r = getPageColumnRight();
        }
      }

      rebuildingPages();

      function getPageArea2() {
        var area_2 = getPageContainer().find('.cv-body-area.area-2');

        if (area_2.length > 0) {
          return area_2;
        } else {
          area_2 = $('<div class="cv-body-area area-2"></div>');
          getPageContainer().append(area_2);
          return $(area_2);
        }
      }

      function getPageColumnLeft() {
        var column_left = getPageArea2().find('.column-left');
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
        var column_right = getPageArea2().find('.column-right');
        if (column_right.length > 0) {
          return column_right;
        } else {
          column_right = $('<div class="column-right"></div>');
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
        var page_element = $('<div class="cv-body cv-body-1 cv-body-visible page-' + page_number + ' ' + font_size_class + ' ' + line_height_class + ' ' + color_class + '" data-chapter="cv" data-page="' + page_number + '"></div>');
        page_element.attr('data-chapter', 'cv');
        page_element.attr('data-page', page_number);
        var page_element_container = $('<div class="cv-body-content"></div>');
        page_element.append(page_element_container);
        if ($('#cv-chapter-section-cv').find(page_element)) {
          $('#cv-chapter-section-cv').append(page_element);
        }
        return page_element_container;
      }
    }
  }, [data]);

  return (
    <div className="sv_001" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${templateClass} ${stateClasses} cv-chapter-section font-size-scheme-${classFontSize} line-height-scheme-${classFontLineSpacing} color-scheme-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body">
          <div className="cv-body-content">
            <div className="cv-body-area area-1 additional-color-3-background">
              <div className="top-block columns-wrapper">
                <div className="column-left">
                  {
                    isArray(contact) && (contact[0]?.firstName || contact[0]?.lastName) && (
                      <h1 className="cv-heading additional-color-1-text heading-type-1 font-size-3 line-height-3">
                        {`${contact[0]?.firstName} ${contact[0]?.lastName}`}
                      </h1>
                    )
                  }
                  <div className="personal-info-block">
                    <div className="profile-info">
                      {
                        isArray(contact) && contact[0]?.picture && (
                          <img className="cv-photo active" src={contact[0]?.picture} />
                        )
                      }
                      {
                        career_objective?.[0]?.data && (
                          <div className="profile">
                            <h2 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Profile</h2>
                            <div dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className="column-right">
                  {
                    isArray(contact) && (
                      <h1 className="cv-heading heading-type-2 additional-color-1-text font-weight-300 font-size-3 line-height-3">{contact[0]?.jobTitle}</h1>
                    )
                  }
                  {
                    isArray(contact) && (!!contact[0]?.country || !!contact[0]?.city || !!contact[0]?.phone || !!contact[0]?.address || !!contact[0]?.email || (isArray(social_links) && !!social_links.length)) && (
                      <div className="cv-career-block additional-color-2-border">
                        <div className="career-details">
                          <p className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Details</p>
                          <p className="career-address main-color-1-text font-size-1 line-height-1">{!!contact[0]?.country && (`${contact[0]?.country} `)} <br />  {`${contact[0]?.address}`}, <br /> {!!contact[0]?.city && (`${contact[0]?.city}`)} {contact[0]?.zipCode}</p>
                          {!!contact[0]?.phone && <p className="career-phone main-color-1-text font-size-1 line-height-1">{contact[0]?.phone}</p>}
                          {!!contact[0]?.email && <p className="career-email main-color-1-text font-size-1 line-height-1">{contact[0]?.email}</p>}
                        </div>
                        {
                          isArray(social_links) && social_links.length && (
                            <div className="career-links">
                              <h1 className="career-links-head font-size-2 line-height-2 additional-color-1-text">Links</h1>
                              {
                                social_links.map((itemSocial, index) => (
                                  <a className="career-links-link" key={index} >
                                    <img src={itemSocial.icon} alt={itemSocial.name} />
                                  </a>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              </div>
              {
                isArray(contact) && (!!contact[0]?.dateOfBirth || !!contact[0]?.placeOfBirth || !!contact[0]?.nationality || !!contact[0]?.driverLicense) && (
                  <div className="profile-secondary-info">
                    {
                      !!contact[0]?.dateOfBirth && (
                        <div className="profile-secondary-info-item">
                          <span className="name additional-color-1-text font-weight-300 font-size-1 line-height-1">Birth Date</span>
                          <span className="value additional-color-1-text font-weight-400 font-size-1 line-height-1">{moment(contact[0].dateOfBirth).format("DD-MM-yy")}</span>
                        </div>
                      )
                    }
                    {
                      !!contact[0]?.placeOfBirth && (
                        <div className="profile-secondary-info-item">
                          <span className="name additional-color-1-text font-weight-300 font-size-1 line-height-1">Place of Birth</span>
                          <span className="value additional-color-1-text font-weight-400 font-size-1 line-height-1">{contact[0]?.placeOfBirth}</span>
                        </div>
                      )
                    }
                    {
                      !!contact[0]?.nationality && (
                        <div className="profile-secondary-info-item">
                          <span className="name additional-color-1-text font-weight-300 font-size-1 line-height-1">Nationality</span>
                          <span className="value additional-color-1-text font-weight-400 font-size-1 line-height-1">{contact[0]?.nationality}</span>
                        </div>
                      )
                    }
                    {
                      !!contact[0]?.driverLicense && (
                        <div className="profile-secondary-info-item">
                          <span className="name additional-color-1-text font-weight-300 font-size-1 line-height-1">Driving Licence</span>
                          <span className="value additional-color-1-text font-weight-400 font-size-1 line-height-1">{contact[0]?.driverLicense}</span>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>

            <div className="cv-body-area area-2">
              <div className="column-left">
                {/* employment */}
                {
                  (isArray(employment) && !!employment.length) && (
                    <div className="employment-history-block">
                      <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Employment history</h3>
                      {
                        employment.map((itemEm, index) => (
                          <div key={index} className="desrip-content">
                            {(!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (<p className="date-range font-size-1 line-height-1 additional-color-2-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>)}
                            {(!!itemEm?.title || itemEm?.company || !!itemEm?.city) && (<h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{!!itemEm?.title && (`${itemEm?.title},`)} {!!itemEm?.company && (`${itemEm?.company},`)} {!!itemEm?.city && (`${itemEm?.city}`)}</h4>)}
                            <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* extra_curricular */}
                {
                  isArray(extra_curricular) && !!extra_curricular.length && (
                    <div className="extra-curricular-activities-block">
                      <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Extra-curricular activities</h3>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            {(!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (<p className="date-range font-size-1 line-height-1 additional-color-2-text">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>)}

                            {(!!itemEx?.title || itemEx?.employer) && (<h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</h4>)}

                            <div dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* internship */}
                {
                  isArray(internship) && !!internship.length && (
                    <div className="internships-block">
                      <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Internships</h3>

                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            {(!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (<p className="date-range font-size-1 line-height-1 additional-color-2-text">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>)}

                            {(!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (<h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</h4>)}

                            <div dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* references */}
                {
                  isArray(reference) && !!reference.length && (
                    <div className="references-block">
                      <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">References</h3>

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
                            {itemRef.phone && (<p className="references-phone font-size-1 line-height-1 main-color-1-text">{itemRef.phone}</p>)}
                          </div>
                        ))
                      }
                    </div>
                  )
                }

              </div>
              <div className="separator"></div>
              <div className="column-right">
                {/* education */}
                {
                  isArray(education) && !!education.length && (
                    <div className="education-block">
                      <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Education</h3>
                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            {(!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (<p className="date-range font-size-1 line-height-1 additional-color-2-text">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>)}
                            {
                              itemEd?.study && (
                                <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{itemEd.study}</h4>
                              )
                            }
                            {
                              (itemEd?.facility || itemEd?.degree) && (
                                <p className="education-text font-size-1 line-height-1 main-color-1-text">
                                  {itemEd?.facility && (`${itemEd.facility}, `)}
                                  {itemEd?.degree && (`${itemEd.degree}, `)}
                                </p>
                              )
                            }
                            {
                              !!itemEd?.description && (
                                <div dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
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
                    <div className="courses-block">
                      <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Courses</h3>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            {(!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (<p className="date-range font-size-1 line-height-1 additional-color-2-text">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>)}
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

                {/* certificates */}
                {
                  isArray(certificates) && !!certificates.length && (
                    <div className="certificates-block">
                      <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Certificates</h3>
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

                {/* hobbies */}
                {
                  isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block">
                      <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Hobbies</h3>

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

            {
              ((isArray(skills) && !!skills.length) || (isArray(languages) && !!languages.length)) && (
                <div className="cv-body-area area-3 additional-color-3-background">
                  {
                    isArray(skills) && !!skills.length && (
                      <div className="column-left">
                        <div className="skills-block">
                          <h3 className="cv-heading heading-type-5 font-size-1 line-height-1 main-color-2-text additional-color-1-background">Skills</h3>
                          <div className="skills-estimation-block">
                            {
                              skills.map((item, index) => (
                                <div className="skill-item" key={index}>
                                  <p className="skill-name font-size-1 line-height-1 additional-color-1-text">{item.name}</p>{
                                    !hide_experience_level && (
                                      <Estimation level={item.level} />
                                    )
                                  }

                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    )
                  }

                  {
                    isArray(languages) && !!languages.length && (
                      <div className="column-right">
                        <div className="languages-block">
                          <h3 className="cv-heading heading-type-5 font-size-1 line-height-1 main-color-2-text additional-color-1-background">Language</h3>
                          {
                            languages.map((item, index) => (
                              <div className="skills-estimation-block" key={index}>
                                <div className="skill-item">
                                  <p className="skill-name font-size-1 line-height-1 additional-color-1-text">{item.language}</p>
                                  <Estimation
                                    level={item.level}
                                    startLeng={6}
                                  />
                                </div>
                              </div>
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
      </div>
    </div>
  )
}

