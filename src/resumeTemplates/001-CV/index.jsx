import { useEffect } from "react";
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
          <span key={index} className={`estimation-point additional-color-1-border ${(index + 1) <= pros ? "additional-color-1-background" : ""}`}></span>
        ))
      }
    </div>
  )
}

const drawing = () => {
  if (typeof window != "undefined") {
    var font_size_class = '';
    var line_height_class = '';
    var color_class = '';
    var current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

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

      getPageContainer().append(header_block);
      getPageColumnLeft();
      getPageColumnRight();

      current_page_number = 1;

      getPageColumnLeft().append(employment_history_block);
      if (getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number)) {
        employment_history_block.remove();
        current_page_number++;
        getPageColumnLeft().append(employment_history_block);
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

      getPageColumnLeft().append(references_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        references_block.remove();
        current_page_number++;
        getPageColumnLeft().append(references_block);
      }

      current_page_number = 1;

      getPageColumnRight().append(education_block);
      if (getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number)) {
        education_block.remove();
        current_page_number++;
        getPageColumnRight().append(education_block);
      }

      getPageColumnRight().append(courses_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        courses_block.remove();
        current_page_number++;
        getPageColumnRight().append(courses_block);
      }

      getPageColumnRight().append(certificates_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        certificates_block.remove();
        current_page_number++;
        getPageColumnRight().append(certificates_block);
      }

      getPageColumnRight().append(hobbies_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        hobbies_block.remove();
        current_page_number++;
        getPageColumnRight().append(hobbies_block);
      }

      getPageContainer().append(footer_block);
      if (getPageContainer().height() > getPageContainer().parent().height()) {
        footer_block.remove();
        current_page_number++;
        getPageContainer().append(footer_block);
      }
    }

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
        var separator = $('<div class="separator additional-color-3-border"></div>');
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

    rebuildingPages();
  }
}

export const ResumeCv001 = ({
  data,
  stateClasses,
  reportTemplateRef,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
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
    <div className="sv_001" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body">
          <div className="cv-body-content">
            <div className="cv-body-area area-1 additional-color-3-background font-size-1 main-color-1-text">
              <div className="top-block columns-wrapper">
                <div className="column-left">
                  {
                    isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                      <h1 className="cv-heading font-size-3">
                        {`${contact?.[0]?.firstName} ${contact?.[0]?.lastName}`}
                      </h1>
                    )
                  }
                  <div className="personal-info-block">
                    <div className="profile-info">
                      {
                        isArray(contact) && contact?.[0]?.picture && (
                          <div className="photo-block">
                            <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                          </div>
                        )
                      }
                      {
                        career_objective?.[0]?.data && (
                          <div className="profile">
                            <h3 className="cv-heading font-size-2">Profile</h3>
                            <div dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                  {
                    isArray(contact) && (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                      <div className="profile-secondary-info">
                        {
                          !!contact?.[0]?.dateOfBirth && (
                            <div className="profile-secondary-info-item additional-color-1-text">
                              <span className="name">Birth Date</span>
                              <span className="value">{moment(contact?.[0].dateOfBirth).format("DD-MM-yy")}</span>
                            </div>
                          )
                        }
                        {
                          !!contact?.[0]?.placeOfBirth && (
                            <div className="profile-secondary-info-item additional-color-1-text">
                              <span className="name">Place of Birth</span>
                              <span className="value">{contact?.[0]?.placeOfBirth}</span>
                            </div>
                          )
                        }
                        {
                          !!contact?.[0]?.nationality && (
                            <div className="profile-secondary-info-item additional-color-1-text">
                              <span className="name">Nationality</span>
                              <span className="value">{contact?.[0]?.nationality}</span>
                            </div>
                          )
                        }
                        {
                          !!contact?.[0]?.driverLicense && (
                            <div className="profile-secondary-info-item additional-color-1-text">
                              <span className="name">Driving Licence</span>
                              <span className="value">{contact?.[0]?.driverLicense}</span>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                </div>
                <div className="column-right">
                  {
                    isArray(contact) && (
                      <h3 className="cv-heading font-size-3">{contact?.[0]?.jobTitle}</h3>
                    )
                  }
                  {
                    isArray(contact) && (!!contact?.[0]?.country || !!contact?.[0]?.city || !!contact?.[0]?.phone || !!contact?.[0]?.address || !!contact?.[0]?.email || (isArray(social_links) && !!social_links.length)) && (
                      <div className="cv-career-block additional-color-2-border">
                        <div className="career-details">
                          <p className="cv-heading font-size-2">Details</p>
                          <p className="career-address">{!!contact?.[0]?.country ? (<>{`${contact?.[0]?.country} `}<br /></>) : ""}   {!!contact?.[0]?.address ? (<>{`${contact?.[0]?.address}, `}<br /></>) : ""}  {!!contact?.[0]?.city && (`${contact?.[0]?.city}`)} {contact?.[0]?.zipCode}</p>
                          {!!contact?.[0]?.phone && <p className="career-phone">{contact?.[0]?.phone}</p>}
                          {!!contact?.[0]?.email && <p className="career-email">{contact?.[0]?.email}</p>}
                        </div>
                        {
                          isArray(social_links) && !!social_links.length && (
                            <div className="career-links">
                              <h3 className="cv-heading font-size-2">Links</h3>
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
            </div>

            <div className="cv-body-area area-2">
              <div className="column-left">
                {/* employment */}

                {
                  (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                    <div className="employment-history-block block-block">
                      <h3 className="cv-heading font-size-2 additional-color-1-text">Employment history</h3>
                      {
                        employment.map((itemEm, index) => (
                          <div className="block-info font-size-1 main-color-1-text desrip-content" key={index}>
                            {(!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <p className="date-range additional-color-2-text">
                                {!!itemEm?.periodFrom?.date && (checkForSymbol([itemEm?.periodTo?.date]) ? moment(itemEm?.periodFrom?.date).format("MMMM yy") + ' - ' : moment(itemEm?.periodFrom?.date).format("MMMM yy"))}
                                {!!itemEm?.periodTo?.date && (moment(itemEm?.periodTo?.date).format("MMMM yy"))}
                              </p>
                            )}
                            {(!!itemEm?.title || itemEm?.company || !!itemEm?.city) && (
                              <h4 className="cv-heading">
                                {!!itemEm?.title && (checkForSymbol([itemEm?.company, itemEm?.city])) ? itemEm?.title + ', ' : itemEm?.title}
                                {!!itemEm?.company && (checkForSymbol([itemEm?.city])) ? itemEm?.company + ', ' : itemEm?.company}
                                {!!itemEm?.city && (itemEm?.city)}
                              </h4>
                            )}
                            <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* extra_curricular */}
                {
                  (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                    <div className="extra-curricular-activities-block block-block">
                      <h3 className="cv-heading font-size-2 additional-color-1-text">Extra-curricular activities</h3>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div className="block-info font-size-1 main-color-1-text" key={index}>
                            {(!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <p className="date-range additional-color-2-text">
                                {!!itemEx?.dateFrom?.date && (checkForSymbol([itemEx?.dateTo?.date]) ? moment(itemEx?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEx?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemEx?.dateTo?.date && (moment(itemEx?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )}

                            {(!!itemEx?.title || itemEx?.employer) && (
                              <h4 className="cv-heading">
                                {!!itemEx?.title && (checkForSymbol([itemEx?.employer])) ? itemEx?.title + ', ' : itemEx?.title}
                                {!!itemEx?.employer && (itemEx?.employer)}
                              </h4>
                            )}

                            <div dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* internship */}
                {
                  (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                    <div className="internships-block block-block">
                      <h3 className="cv-heading font-size-2 additional-color-1-text">Internships</h3>
                      {
                        internship.map((itemIn, index) => (
                          <div className="block-info font-size-1 main-color-1-text" key={index}>
                            {(!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                              <p className="date-range additional-color-2-text">
                                {!!itemIn?.dateFrom?.date && (checkForSymbol([itemIn?.dateTo?.date]) ? moment(itemIn?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemIn?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemIn?.dateTo?.date && (moment(itemIn?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )}

                            {(!!itemIn?.jobTitle || !!itemIn?.employer || !!itemIn?.city) && (
                              <h4 className="cv-heading">
                                {!!itemIn?.jobTitle && (checkForSymbol([itemIn?.employer, itemIn?.city])) ? itemIn?.jobTitle + ', ' : itemIn?.jobTitle}
                                {!!itemIn?.employer && (checkForSymbol([itemIn?.city])) ? itemIn?.employer + ', ' : itemIn?.employer}
                                {!!itemIn?.city && (itemIn?.city)}
                              </h4>
                            )}

                            <div dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

                {/* references */}
                {
                  (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                    <div className="references-block block-block">
                      <h3 className="cv-heading font-size-2 additional-color-1-text">References</h3>
                      {
                        reference.map((itemRef, index) => (
                          <div className="block-info font-size-1 main-color-1-text" key={index}>
                            {/* <p className="date-range additional-color-2-text">March 2022 - December 2022</p> */}
                            {
                              (!!itemRef?.fullName || !!itemRef?.company) && (
                                <h4 className="cv-heading">
                                  {!!itemRef?.fullName && (checkForSymbol([itemRef?.company])) ? itemRef?.fullName + ', ' : itemRef?.fullName}
                                  {!!itemRef?.company && (itemRef?.company)}
                                </h4>
                              )
                            }
                            {
                              !!itemRef?.email && (
                                <p>{itemRef.email}</p>
                              )
                            }
                            {itemRef.phone && (<p>{itemRef.phone}</p>)}
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
                  (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                    <div className="education-block block-block">
                      <h3 className="cv-heading font-size-2 additional-color-1-text">Education</h3>
                      {
                        education.map((itemEd, index) => (
                          <div className="block-info font-size-1 main-color-1-text" key={index}>
                            {(!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range additional-color-2-text">
                                {!!itemEd?.dateFrom?.date && (checkForSymbol([itemEd?.dateTo?.date]) ? moment(itemEd?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEd?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemEd?.dateTo?.date && (moment(itemEd?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )}
                            {
                              (itemEd?.degree) && (
                                <p className="degree-block additional-color-2-text">
                                  {(itemEd?.degree?.length > 0) ? (`${itemEd.degree}, `) : ""}
                                </p>
                              )
                            }
                            {
                              itemEd?.study && (
                                <h4 className="cv-heading">{itemEd.study}</h4>
                              )
                            }
                            {
                              (itemEd?.facility) && (
                                <p className="college-block">
                                  {itemEd?.facility && (`${itemEd.facility}, `)}
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
                  (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                    <div className="courses-block block-block">
                      <h3 className="cv-heading font-size-2 additional-color-1-text">Courses</h3>
                      {
                        courses.map((itemCo, index) => (
                          <div className="block-info font-size-1 main-color-1-text" key={index}>
                            {(!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range additional-color-2-text">
                                {!!itemCo?.dateFrom?.date && (checkForSymbol([itemCo?.dateTo?.date]) ? moment(itemCo?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemCo?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemCo?.dateTo?.date && (moment(itemCo?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )}
                            {
                              !!itemCo?.title && (
                                <h4 className="cv-heading">{itemCo.title}</h4>
                              )
                            }
                            {
                              !!itemCo?.institution && (
                                <p>{itemCo.institution}</p>
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
                    <div className="certificates-block block-block">
                      <h3 className="cv-heading font-size-2 additional-color-1-text">Certificates</h3>
                      <div className="block-info font-size-1 main-color-1-text">
                        {
                          certificates.map((item, index) => (
                            <h4 key={index} className="cv-heading font-size-1 main-color-1-text">
                              <span key={index}>
                                {`${item.name}`}
                              </span>
                            </h4>
                          ))
                        }
                      </div>
                    </div>
                  )
                }

                {/* hobbies */}
                {
                  isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block block-block">
                      <h3 className="cv-heading font-size-2 additional-color-1-text">Hobbies</h3>
                      <div className="block-info font-size-1 main-color-1-text">
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
                    </div>
                  )
                }
              </div>
            </div>

            {
              ((isArray(skills) && !!skills.length) || (isArray(languages) && !!languages.length)) && (
                <div className="cv-body-area area-3">
                  <div className="bottom-block additional-color-3-background">
                    {
                      isArray(skills) && !!skills.length && (
                        <div className="column-left">
                          <div className="skills-block skills-block font-size-1 main-color-1-text">
                            <h3 className="cv-heading main-color-2-text font-size-2 additional-color-1-background">Skills</h3>
                            <div className="skills-estimation-block">
                              {
                                skills.map((item, index) => (
                                  <div className="skill-item" key={index}>
                                    <p className="skill-name">{item.name}</p>
                                    {
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
                            <h3 className="cv-heading font-size-1 main-color-2-text font-size-2 additional-color-1-background">Language</h3>
                            <div className="skills-estimation-block">
                              {
                                languages.map((item, index) => (
                                  <div className="skill-item" key={index}>
                                    <p className="skill-name font-size-1">{item.language}</p>
                                    <Estimation
                                      level={item.level}
                                      startLeng={6}
                                    />
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

