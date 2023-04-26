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

