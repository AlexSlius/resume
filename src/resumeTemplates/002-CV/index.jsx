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
  stateClasses
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

  return (
    <div className="sv_002">
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


