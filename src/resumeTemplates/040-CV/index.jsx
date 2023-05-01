import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

export const ResumeCv040 = ({
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
    hide_experience_level,
  } = data;
  const isContactArray = isArray(contact);
  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";

  return (
    <div className="sv_040" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-1-background">
          <div className="cv-body-content">
            <div className="top-area">
              <div className="column-left">
                <div className="main-info-block block-block additional-color-1-border">
                  <h1 className="cv-name font-size-6 line-height-6 font-weight-300">{!!contact?.[0]?.firstName && (<>{contact?.[0]?.firstName}<br /></>)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}</h1>
                  {
                    isContactArray && contact?.[0]?.jobTitle && (
                      <h3 className="cv-prophecy font-size-4 line-height-3 font-weight-600">{contact?.[0]?.jobTitle}</h3>
                    )
                  }
                </div>
              </div>
              <div className="column-right">
                <div className="personal-info-block block-block additional-color-1-border">
                  <div className="contacts-block">
                    {
                      (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                        <p className="font-size-2 line-height-2 font-weight-400">
                          {!!contact?.[0]?.address && (`${contact?.[0]?.address},`)}
                          {!!contact?.[0]?.city && (`${contact?.[0]?.city}, ${!!contact?.[0]?.zipCode && contact?.[0]?.zipCode} ${!!contact?.[0]?.country && contact?.[0]?.country}`)}
                        </p>
                      )
                    }
                    {
                      !!contact?.[0]?.phone && (
                        <p className="font-size-2 line-height-2 font-weight-400">{contact?.[0]?.phone}</p>
                      )
                    }
                    {
                      !!contact?.[0]?.email && (
                        <p className="font-size-2 line-height-2 font-weight-400">{contact?.[0]?.email}</p>
                      )
                    }
                  </div>
                  <div className="personal-info-list">
                    {
                      !!contact?.[0]?.nationality && (
                        <div className="personal-info-list-item">
                          <p className="item-name font-size-1 line-height-1 font-weight-400 main-color-3-text">NATIONALITY</p>
                          <p className="item-value font-size-2 line-height-2 font-weight-400">{contact?.[0]?.nationality}</p>
                        </div>
                      )
                    }
                    {
                      !!contact?.[0]?.driverLicense && (
                        <div className="personal-info-list-item">
                          <p className="item-name font-size-1 line-height-1 font-weight-400 main-color-3-text">DRIVING LICENSE</p>
                          <p className="item-value font-size-2 line-height-2 font-weight-400">{contact?.[0]?.driverLicense}</p>
                        </div>
                      )
                    }
                    {
                      (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                        <div className="personal-info-list-item">
                          <p className="item-name font-size-1 line-height-1 font-weight-400 main-color-3-text">DATE / PLACE OF BIRTH</p>
                          <p className="item-value font-size-2 line-height-2 font-weight-400">{`${moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} ${contact?.[0]?.placeOfBirth || ""}`} </p>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="center-block additional-color-1-border">
                {
                  !!contact?.[0]?.picture && (
                    <div className="photo-wrapper">
                      <img src={contact?.[0]?.picture} />
                    </div>
                  )
                }
              </div>
            </div>
            <div className="middle-area">
              <div className="column-left">
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Profile</h3>
                      <p className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  )
                }
                {
                  isArray(education) && !!education.length && (
                    <div className="education-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Education</h3>
                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            {
                              (!!itemEd?.study) && (
                                <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">{itemEd?.facility && (`${itemEd.facility}, `)} {!!itemEd?.study && (`${itemEd?.study}, `)} {itemEd?.degree && (`${itemEd?.degree}`)} </p>
                              )
                            }
                            {/* <p className="block-subheading-2 font-size-1 line-height-1 font-weight-400">Bachelor</p> */}
                            {
                              (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(courses) && !!courses.length && (
                    <div className="courses-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Courses</h3>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            {
                              (!!itemCo?.title || !!itemCo?.institution) && (
                                <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                              )
                            }
                            {
                              (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                <div className="languages-and-skills-block block-block additional-color-1-border">
                  {
                    isArray(languages) && !!languages.length && (
                      <div className="languages-block">
                        <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Languages</h3>
                        <div className="estimated-items-list">
                          {
                            languages.map((item, index) => (
                              <div className="estimated-items-list-item" key={index}>
                                <p className="estimated-item-name font-size-2 line-height-2 font-weight-400">{item.language}</p>
                                <div className="estimated-item-value-wrapper">
                                  <div className="estimated-item-value" style={{ width: `${(item.level * 100) / 6}%` }}></div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                  {
                    isArray(skills) && !!skills.length && (
                      <div className="skills-block">
                        <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Skills</h3>
                        <div className="estimated-items-list">
                          {
                            skills.map((item, index) => (
                              <div className="estimated-items-list-item" key={index}>
                                <p className="estimated-item-name font-size-2 line-height-2 font-weight-400">{item.name}</p>
                                {
                                  !hide_experience_level && (
                                    <div className="estimated-item-value-wrapper">
                                      <div className="estimated-item-value" style={{ width: `${(item.level * 100) / 5}%` }}></div>
                                    </div>
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
                {
                  isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Hobbies</h3>
                      <p className="font-size-2 line-height-2 font-weight-400">
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
                <div className="block-block gap-block additional-color-1-border"></div>
              </div>
              <div className="column-right">
                {
                  isArray(employment) && !!employment.length && (
                    <div className="employment-history-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Employment History</h3>
                      {
                        employment.map((itemEm, index) => (
                          <div key={index}>
                            <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">
                              {!!itemEm?.title && (`${itemEm?.title}, `)}
                              {!!itemEm?.company && (` ${itemEm?.company}, `)}
                              {!!itemEm?.city && (`${itemEm?.city} `)}
                            </p>
                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} —`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <div className="font-size-2 line-height-2 font-weight-400 text-blckse" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(internship) && !!internship.length && (
                    <div className="internships-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Internships</h3>
                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            {
                              (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                                <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                              )
                            }
                            {
                              (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <div className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(extra_curricular) && !!extra_curricular.length && (
                    <div className="extra-curricular-activities-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Extra-curricular activities</h3>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <p className="block-subheading font-size-3 line-height-2-2 font-weight-400">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                              )
                            }
                            {
                              (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                                <p className="date-range font-size-2 line-height-2 font-weight-400 main-color-3-text">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-2 line-height-2 font-weight-400" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                <div className="certificates-and-references-block block-block additional-color-1-border">
                  {
                    isArray(certificates) && !!certificates.length && (
                      <div className="certificates-block">
                        <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Certificates</h3>
                        <p className="font-size-2 line-height-2 font-weight-400">
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
                      <div className="references-block additional-color-1-border">
                        <h3 className="block-heading font-size-5 line-height-5 font-weight-400">References</h3>
                        {
                          reference.map((itemRef, index) => (
                            <div key={index}>
                              {
                                (!!itemRef?.fullName || !!itemRef?.company) && (
                                  <p className="font-size-2 line-height-2 font-weight-400">
                                    {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                    {!!itemRef?.company && (`${itemRef.company}`)}
                                  </p>
                                )
                              }
                              {
                                !!itemRef?.email && (
                                  <p className="font-size-2 line-height-2 font-weight-400">{itemRef.email}</p>
                                )
                              }
                              {
                                !!itemRef.phone && (
                                  <p className="font-size-2 line-height-2 font-weight-400">{itemRef.phone}</p>
                                )
                              }
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-block block-block">
                      <h3 className="heading-type-1 block-heading font-size-2 line-height-3 font-weight-400 additional-color-1-text">Links</h3>
                      <div className="social">
                        {
                          social_links.map((item, index) => (
                            <a className="font-size-1 line-height-1 font-weight-500 additional-color-1-border additional-color-3-text" key={index}>{item.name.substring(0, 2)}</a>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-block block-block additional-color-1-border">
                      <h3 className="block-heading font-size-5 line-height-5 font-weight-400">Links</h3>
                      <div className="links-wrapepr">
                        {
                          social_links.map((item, index) => (
                            <a className="font-size-2 line-height-2 font-weight-400 main-color-4-text" key={index}>{item.name}</a>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                <div className="block-block gap-block additional-color-1-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

