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
  idCv,
  stateLineSpacing,
  stateFontSize
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
    languages
  } = data;

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  return (
    <div className="sv_001">
      <div id="cv-chapter-section-cv" className="cv-chapter-section" data-chapter="cv">
        <div id="cv-body-hidden-container"
          className={`line-height-scheme-${classFontLineSpacing}
                font-size-scheme-${classFontSize}
                cv-body 
                cv-body-1 
                cv-body-visible 
                page-1 
                color-scheme-1
                `}>
          <div className="cv-body-content">
            {/* contact */}
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
                                  <a className="career-links-link" key={index} href={itemSocial.link}>
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
                                  <p className="skill-name font-size-1 line-height-1 additional-color-1-text">{item.name}</p>
                                  <Estimation level={item.level} />
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
    </div >
  )
}

