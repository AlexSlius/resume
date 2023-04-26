import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

export const ResumeCv032 = ({
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
    <div className="sv_032" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-1-background">
          <div className="cv-body-content">
            <div className="column-left">
              <div className="main-info-block">
                <h1 className="cv-name font-size-6 line-height-6 additional-color-1-text">{!!contact?.[0]?.firstName && (<>{contact?.[0]?.firstName}<br /></>)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}</h1>
                {
                  isContactArray && contact?.[0]?.jobTitle && (
                    <h3 className="cv-prophecy font-size-4 line-height-4 additional-color-1-text">{contact?.[0]?.jobTitle}</h3>
                  )
                }
              </div>
              {
                !!career_objective?.[0]?.data && (
                  <div className="profile-block block-block">
                    <h3 className="block-heading font-size-5 line-height-5 additional-color-1-text">Profile</h3>
                    <p className="font-size-1 line-height-1 main-color-3-text" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                  </div>
                )
              }
              {
                isArray(employment) && !!employment.length && (
                  <div className="employment-history-block block-block">
                    <h3 className="block-heading font-size-5 line-height-5 additional-color-1-text">Employment History</h3>
                    {
                      employment.map((itemEm, index) => (
                        <div key={index}>
                          <p className="block-subheading font-size-2 line-height-2 main-color-3-text">
                            {!!itemEm?.title && (`${itemEm?.title}, `)}
                            {!!itemEm?.company && (` ${itemEm?.company}, `)}
                            {!!itemEm?.city && (`${itemEm?.city} `)}</p>
                          {
                            (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <p className="date-range font-size-1 line-height-1 main-color-2-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} —`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <div className="text-block-list font-size-1 line-height-1 main-color-3-text" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                isArray(education) && !!education.length && (
                  <div className="education-block block-block">
                    <h3 className="block-heading font-size-5 line-height-5 additional-color-1-text">Education</h3>
                    {
                      education.map((itemEd, index) => (
                        <div key={index}>
                          <div className="subheading-line">
                            {
                              (!!itemEd?.study) && (
                                <p className="block-subheading font-size-2 line-height-2 main-color-3-text">{itemEd?.facility && (`${itemEd.facility}, `)} {!!itemEd?.study && (`${itemEd?.study}, `)} {itemEd?.degree && (`${itemEd?.degree}`)} </p>
                              )
                            }
                            {/* <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clipRule="evenodd" d="M4.80046 0.699219C4.80046 3.47843 6.8217 5.49967 9.60091 5.49967C6.8217 5.49967 4.80046 7.52092 4.80046 10.3001C4.80046 7.52092 2.77928 5.49967 0 5.49967C2.77921 5.49967 4.80046 3.47843 4.80046 0.699219Z" fill="#7F6A55" />
                            </svg> */}
                            {/* <p className="block-subheading font-size-2 line-height-2 main-color-3-text">Bachelor</p> */}
                          </div>
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range font-size-1 line-height-1 main-color-2-text">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <p className="font-size-1 line-height-1 main-color-3-text" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                isArray(courses) && !!courses.length && (
                  <div className="courses-block block-block">
                    <h3 className="block-heading font-size-5 line-height-5 additional-color-1-text">Courses</h3>
                    {
                      courses.map((itemCo, index) => (
                        <div key={index}>
                          {
                            (!!itemCo?.title || !!itemCo?.institution) && (
                              <p className="block-subheading font-size-2 line-height-2 main-color-3-text">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                            )
                          }
                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range font-size-1 line-height-1 main-color-2-text">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                isArray(extra_curricular) && !!extra_curricular.length && (
                  <div className="extra-curricular-activities-block block-block">
                    <h3 className="block-heading font-size-5 line-height-5 additional-color-1-text">Extra-curricular activities</h3>

                    {
                      extra_curricular.map((itemEx, index) => (
                        <div key={index}>
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="block-subheading font-size-2 line-height-2 main-color-3-text">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                            )
                          }
                          {
                            (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <p className="date-range font-size-1 line-height-1 main-color-2-text">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <p className="font-size-1 line-height-1 main-color-3-text" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                isArray(internship) && !!internship.length && (
                  <div className="internships-block block-block">
                    <h3 className="block-heading font-size-5 line-height-5 additional-color-1-text">Internships</h3>
                    {
                      internship.map((itemIn, index) => (
                        <div key={index}>
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="block-subheading font-size-2 line-height-2 main-color-3-text">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                            )
                          }
                          {
                            (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                              <p className="date-range font-size-1 line-height-1 main-color-2-text">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <div className="text-block-list font-size-1 line-height-1 main-color-3-text" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
            <div className="column-right additional-color-1-border">
              {
                !!contact?.[0]?.picture && (
                  <div className="photo-block block-block-2">
                    <img src={contact?.[0]?.picture} />
                  </div>
                )
              }
              <div className="details-block block-block-2">
                {
                  (!!contact?.[0]?.address || !!contact?.[0]?.phone || !!contact?.[0]?.email || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                    <>
                      <h3 className="block-heading font-size-3 line-height-3 additional-color-1-text">Details</h3>
                      <div className="contacts-block">
                        {
                          (!!contact?.[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                            <p className="font-size-1 line-height-1 main-color-3-text">
                              {!!contact?.[0]?.address && (`${contact?.[0]?.address},`)}
                              {!!contact?.[0]?.city && (`${contact?.[0]?.city}, ${!!contact?.[0]?.zipCode && contact?.[0]?.zipCode} ${!!contact?.[0]?.country && contact?.[0]?.country}`)}
                            </p>
                          )
                        }
                        {
                          !!contact?.[0]?.phone && (
                            <p className="font-size-1 line-height-1 main-color-3-text">{contact?.[0]?.phone}</p>
                          )
                        }
                        {
                          !!contact?.[0]?.email && (
                            <p className="font-size-1 line-height-1 main-color-3-text">{contact?.[0]?.email}</p>
                          )
                        }
                      </div>
                    </>
                  )
                }
                <div className="personal-info-block">
                  <div className="personal-info-list">
                    {
                      !!contact?.[0]?.nationality && (
                        <div className="info-list-item">
                          <p className="item-name font-size-1 line-height-1 main-color-2-text">NATIONALITY</p>
                          <p className="item-value font-size-1 line-height-1 main-color-3-text">{contact?.[0]?.nationality}</p>
                        </div>
                      )
                    }
                    {
                      !!contact?.[0]?.driverLicense && (
                        <div className="info-list-item">
                          <p className="item-name font-size-1 line-height-1 main-color-2-text">DRIVING LICENSE</p>
                          <p className="item-value font-size-1 line-height-1 main-color-3-text">{contact?.[0]?.driverLicense}</p>
                        </div>
                      )
                    }
                    {
                      (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                        <div className="info-list-item">
                          <p className="item-name font-size-1 line-height-1 main-color-2-text">DATE / PLACE OF BIRTH</p>
                          <p className="item-value font-size-1 line-height-1 main-color-3-text">{`${moment(contact?.[0].dateOfBirth).format("DD-MM-yy")} ${contact?.[0]?.placeOfBirth || ""}`} </p>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
              {
                isArray(social_links) && !!social_links.length && (
                  <div className="links-block block-block-2">
                    <h3 className="block-heading font-size-3 line-height-3 additional-color-1-text">Links</h3>
                    <div className="links-wrapper">
                      {
                        social_links.map((item, index) => (
                          <a className="font-size-1 line-height-1 main-color-3-text" key={index}>{item.name}</a>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              {
                isArray(skills) && !!skills.length && (
                  <div className="skills-block block-block-2">
                    <h3 className="block-heading font-size-3 line-height-3 additional-color-1-text">Skills</h3>

                    <div className="skill-items-list estimated-items-list">
                      {
                        skills.map((item, index) => (
                          <div className="skill-list-item estimated-item" key={index}>
                            <p className="item-name font-size-1 line-height-1 main-color-3-text">{item.name}</p>
                            {
                              !hide_experience_level && (
                                <div className="estimation-wrapper">
                                  {
                                    [...new Array(5)].map((_, index) => (
                                      <svg key={index} className={`star additional-color-1-svg ${(index + 1) <= item.level ? "star-filled" : ""}`} width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.00224 0.699219C5.00224 3.47843 7.02348 5.49967 9.80269 5.49967C7.02348 5.49967 5.00224 7.52092 5.00224 10.3001C5.00224 7.52092 2.98106 5.49967 0.201782 5.49967C2.98099 5.49967 5.00224 3.47843 5.00224 0.699219Z" fill="#7F6A55" />
                                      </svg>
                                    ))
                                  }
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
              {
                isArray(languages) && !!languages.length && (
                  <div className="languages-block block-block-2">
                    <h3 className="block-heading font-size-3 line-height-3 additional-color-1-text">Languages</h3>
                    <div className="language-items-list estimated-items-list">
                      {
                        languages.map((item, index) => (
                          <div className="language-list-item estimated-item" key={index}>
                            <p className="item-name font-size-1 line-height-1 main-color-3-text">{item.language}</p>
                            <div className="estimation-wrapper">
                              {
                                [...new Array(5)].map((_, index) => (
                                  <svg key={index} className={`star additional-color-1-svg ${(index + 1) <= item.level ? "star-filled" : ""}`} width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.00224 0.699219C5.00224 3.47843 7.02348 5.49967 9.80269 5.49967C7.02348 5.49967 5.00224 7.52092 5.00224 10.3001C5.00224 7.52092 2.98106 5.49967 0.201782 5.49967C2.98099 5.49967 5.00224 3.47843 5.00224 0.699219Z" fill="#7F6A55" />
                                  </svg>
                                ))
                              }
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              {
                isArray(hobbies) && !!hobbies.length && (
                  <div className="hobbies-block block-block-2">
                    <h3 className="block-heading font-size-3 line-height-3 additional-color-1-text">Hobbies</h3>
                    <p className="font-size-1 line-height-1 main-color-3-text"> {
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
              {
                isArray(reference) && !!reference.length && (
                  <div className="references-block block-block-2">
                    <h3 className="block-heading font-size-3 line-height-3 additional-color-1-text">References</h3>
                    {
                      reference.map((itemRef, index) => (
                        <div key={index}>
                          {
                            (!!itemRef?.fullName || !!itemRef?.company) && (
                              <p className="font-size-1 line-height-1 main-color-3-text">
                                {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                {!!itemRef?.company && (`${itemRef.company}`)}
                              </p>
                            )
                          }
                          {
                            !!itemRef?.email && (
                              <p className="font-size-1 line-height-1 main-color-3-text">{itemRef.email}</p>
                            )
                          }
                          {
                            !!itemRef.phone && (
                              <p className="font-size-1 line-height-1 main-color-3-text">{itemRef.phone}</p>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          </div>
          <svg className="star-1 additional-color-1-svg-path" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 82.9068C42.1997 62.6061 27.3942 47.8003 7.09325 45C27.3938 42.1996 42.1996 27.3938 45 7.09317C47.8004 27.3938 62.6062 42.1996 82.9068 45C62.6062 47.8004 47.8004 62.6062 45 82.9068Z" fill="#F3EEEA" stroke="#7F6A55" strokeWidth="0.960091" />
          </svg>
        </div>
      </div>
    </div>
  )
}

