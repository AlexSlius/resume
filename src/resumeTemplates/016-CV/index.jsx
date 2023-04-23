import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { levelLanguage } from "../../helpers/levelLanguage";

export const ResumeCv016 = ({
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
  } = data;
  const isContactArray = isArray(contact);

  return (
    <div className="sv_016" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content">
            <div className="circle-shade"></div>
            <div className="top-area">
              {
                !!contact?.[0]?.picture && (
                  <div className="column-left">
                    <div className="photo-wrapper">
                      <img src={contact?.[0]?.picture} />
                    </div>
                  </div>
                )
              }
              <div className="column-right">
                <div className="name-and-prophecy-wrapper">
                  {
                    isContactArray && contact[0]?.jobTitle && (
                      <h2 className="cv-prophecy font-size-5 line-height-7 main-color-2-text font-weight-300">{contact[0]?.jobTitle}</h2>
                    )
                  }
                  {
                    isContactArray && (contact[0]?.firstName || contact[0]?.lastName) && (
                      <h1 className="cv-name font-size-6 line-height-8 main-color-2-text font-weight-400">
                        {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                      </h1>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="middle-area">
              <div className="column-left">
                {
                  (!!contact[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country || !!contact[0]?.phone || !!contact[0]?.email) && (
                    <div className="details-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">details</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">01</h3>
                      </div>
                      <div className="underheading-line"></div>
                      <div className="grayline"></div>
                      {
                        (!!contact[0]?.address || !!contact?.[0]?.city || contact?.[0]?.city || !!contact?.[0]?.zipCode || !!contact?.[0]?.country) && (
                          <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">
                            {!!contact[0]?.address && (`${contact[0]?.address},`)}
                            {!!contact?.[0]?.city && (`${contact?.[0]?.city}, ${!!contact?.[0]?.zipCode && contact?.[0]?.zipCode} ${!!contact?.[0]?.country && contact?.[0]?.country}`)}
                          </p>
                        )
                      }
                      {
                        !!contact[0]?.phone && (
                          <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{contact[0]?.phone}</p>
                        )
                      }
                      {
                        !!contact[0]?.email && (
                          <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{contact[0]?.email}</p>
                        )
                      }
                    </div>
                  )
                }
                {
                  (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth || !!contact?.[0]?.nationality || !!contact?.[0]?.driverLicense) && (
                    <div className="additional-details-block">
                      {
                        !!contact?.[0]?.nationality && (
                          <div className="block-item">
                            <p className="item-name font-size-1 line-height-2 main-color-3-text font-weight-300">nationality:</p>
                            <p className="item-value font-size-1 line-height-2 main-color-2-text font-weight-300">{contact?.[0]?.nationality}</p>
                          </div>
                        )
                      }
                      {
                        !!contact?.[0]?.driverLicense && (
                          <div className="block-item">
                            <p className="item-name font-size-1 line-height-2 main-color-3-text font-weight-300">driving license:</p>
                            <p className="item-value font-size-1 line-height-2 main-color-2-text font-weight-300">{contact?.[0]?.driverLicense}</p>
                          </div>
                        )
                      }
                      {
                        (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                          <div className="block-item">
                            <p className="item-name font-size-1 line-height-2 main-color-3-text font-weight-300">data/place of birth:</p>
                            {
                              !!contact?.[0]?.dateOfBirth && (
                                <p className="item-value font-size-1 line-height-2 main-color-2-text font-weight-300">{moment(contact[0].dateOfBirth).format("DD-MM-yy")}</p>
                              )
                            }
                            {
                              !!contact?.[0]?.placeOfBirth && (
                                <p className="item-value font-size-1 line-height-2 main-color-2-text font-weight-300">{contact?.[0]?.placeOfBirth || ""}</p>
                              )
                            }
                          </div>
                        )
                      }
                    </div>
                  )
                }
                {
                  isArray(social_links) && !!social_links.length && (
                    <div className="links-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">links</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">02</h3>
                      </div>
                      <div className="underheading-line"></div>
                      {
                        social_links.map((item, index) => (
                          <a className="font-size-2 line-height-4 main-color-2-text font-weight-300" key={index}>{item.name}</a>
                        ))
                      }
                    </div>
                  )
                }
                {
                  !!(isArray(skills) && skills.length) && (
                    <div className="skills-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">skills</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">03</h3>
                      </div>
                      <div className="underheading-line"></div>
                      <div className="skills-list estimated-items-list">
                        {
                          skills.map((item, index) => (
                            <p className="estimated-item font-size-1 line-height-2 main-color-2-text font-weight-300" key={index}>{item.name}</p>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  isArray(hobbies) && !!hobbies.length && (
                    <div className="hobbies-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">hobbies</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">04</h3>
                      </div>
                      <div className="underheading-line"></div>
                      <p className="font-size-1 line-height-2 main-color-2-text font-weight-300"> {
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
                  isArray(languages) && !!languages.length && (
                    <div className="languages-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">languages</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">05</h3>
                      </div>
                      <div className="underheading-line"></div>
                      <div className="languages-list estimated-items-list">
                        {
                          languages.map((item, index) => (
                            <p className="estimated-item font-size-1 line-height-2 main-color-2-text font-weight-300" key={index}>{`${item.language} ${levelLanguage(item.level)}`}</p>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  isArray(reference) && !!reference.length && (
                    <div className="references-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 font-weight-300">references</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 font-weight-300">06</h3>
                      </div>
                      <div className="underheading-line"></div>
                      {
                        reference.map((itemRef, index) => (
                          <div key={index}>
                            {
                              (!!itemRef?.fullName || !!itemRef?.company) && (
                                <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">
                                  {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                  {!!itemRef?.company && (`${itemRef.company}`)}
                                </p>
                              )
                            }
                            {
                              !!itemRef?.email && (
                                <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{itemRef.email}</p>
                              )
                            }
                            {
                              !!itemRef.phone && (
                                <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">{itemRef.phone}</p>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
              <div className="column-right">
                {
                  !!career_objective?.[0]?.data && (
                    <div className="profile-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">profile</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">07</h3>
                      </div>
                      <div className="underheading-line"></div>
                      <p className="font-size-1 line-height-2 main-color-2-text font-weight-300" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                    </div>
                  )
                }
                {
                  isArray(employment) && !!employment.length && (
                    <div className="employment-history-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">employment history </h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">08</h3>
                      </div>
                      <div className="underheading-line"></div>
                      {
                        employment.map((itemEm, index) => (
                          <div key={index}>
                            <p className="block-subheading font-size-2 line-height-3 main-color-2-text font-weight-300">
                              {!!itemEm?.title && (`${itemEm?.title}, `)}
                              {!!itemEm?.company && (` ${itemEm?.company}, `)}
                              {!!itemEm?.city && (`${itemEm?.city} `)}
                            </p>
                            {
                              (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                                <p className="date-range font-size-1 line-height-1 main-color-2-text font-weight-300">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <div className="text-block-list font-size-1 line-height-2 main-color-2-text font-weight-300 " dangerouslySetInnerHTML={{ __html: itemEm.assignment }}>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(education) && !!education.length && (
                    <div className="education-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">education</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">09</h3>
                      </div>
                      <div className="underheading-line"></div>
                      {
                        education.map((itemEd, index) => (
                          <div key={index}>
                            {
                              (!!itemEd?.study) && (
                                <p className="block-subheading font-size-2 line-height-3 main-color-2-text font-weight-300">{itemEd?.facility && (`${itemEd.facility}, `)} {!!itemEd?.study && (`${itemEd?.study}, `)} {itemEd?.degree && (`${itemEd?.degree}`)} </p>
                              )
                            }
                            {
                              (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1 main-color-2-text font-weight-300">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-1 line-height-2 main-color-2-text font-weight-300" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(courses) && !!courses.length && (
                    <div className="courses-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">courses</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">10</h3>
                      </div>
                      <div className="underheading-line"></div>
                      {
                        courses.map((itemCo, index) => (
                          <div key={index}>
                            {
                              (!!itemCo?.title || !!itemCo?.institution) && (
                                <p className="block-subheading font-size-2 line-height-3 main-color-2-text font-weight-300">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                              )
                            }
                            {
                              (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1 main-color-2-text font-weight-300">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(certificates) && !!certificates.length && (
                    <div className="certificates-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">certificates</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">11</h3>
                      </div>
                      <div className="underheading-line"></div>
                      <p className="font-size-1 line-height-2 main-color-2-text font-weight-300">
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
                  isArray(extra_curricular) && !!extra_curricular.length && (
                    <div className="extra-curricular-activities-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">extra-curricular activities</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">12</h3>
                      </div>
                      <div className="underheading-line"></div>
                      {
                        extra_curricular.map((itemEx, index) => (
                          <div key={index}>
                            {
                              (!!itemEx?.title || itemEx?.employer) && (
                                <p className="block-subheading font-size-2 line-height-3 main-color-2-text font-weight-300">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                              )
                            }
                            {
                              (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1 main-color-2-text font-weight-300">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <p className="font-size-1 line-height-2 main-color-2-text font-weight-300" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                {
                  isArray(internship) && !!internship.length && (
                    <div className="internships-block block-block">
                      <div className="heading-wrapper">
                        <h3 className="heading-type-1 font-size-4 line-height-6 main-color-2-text font-weight-300">internships</h3>
                        <h3 className="heading-type-1 font-size-3 line-height-5 main-color-2-text font-weight-300">13</h3>
                      </div>
                      <div className="underheading-line"></div>
                      {
                        internship.map((itemIn, index) => (
                          <div key={index}>
                            {
                              (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                                <p className="block-subheading font-size-2 line-height-3 main-color-2-text font-weight-300">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                              )
                            }
                            {
                              (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                                <p className="date-range font-size-1 line-height-1 main-color-2-text font-weight-300">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                              )
                            }
                            <div className="text-block-list font-size-1 line-height-2 main-color-2-text font-weight-300" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

