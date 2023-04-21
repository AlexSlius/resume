import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

export const ResumeCv011 = ({
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
  let classPhoto = (isArray(contact) && contact[0]?.picture) ? "has-photo" : "";

  return (
    <div className="sv_011" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto} color-scheme-state-color-set-0`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content">
            <div className="column-left">
              <div className="personal-info-block">
                {
                  !!contact?.[0]?.picture && (
                    <div className="photo-block">
                      <img src={contact?.[0]?.picture} />
                      <div className="photo-overlay additional-color-2-background"></div>
                    </div>
                  )
                }
                <div className="personal-info">
                  {
                    isArray(contact) && (contact[0]?.firstName || contact[0]?.lastName) && (
                      <h1 className="cv-name font-size-6 line-height-6 font-weight-400 additional-color-2-text">
                        {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)} {!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                      </h1>
                    )
                  }
                  {
                    isArray(contact) && contact[0]?.jobTitle && (
                      <h2 className="cv-prophecy font-size-3 line-height-3 font-weight-400 additional-color-3-text">{contact[0]?.jobTitle.toUpperCase()}</h2>
                    )
                  }
                  <div className="personal-additional-info">
                    {
                      !!contact?.[0]?.nationality && (
                        <div className="info-item">
                          <p className="info-item-name font-size-2 line-height-2 font-weight-400 additional-color-3-text">N AT I O N A L I T Y</p>
                          <p className="info-item-value font-size-2 line-height-2 font-weight-400 additional-color-1-text">{contact?.[0]?.nationality}</p>
                        </div>
                      )
                    }
                    {
                      !!contact?.[0]?.driverLicense && (
                        <div className="info-item">
                          <p className="info-item-name font-size-2 line-height-2 font-weight-400 additional-color-3-text">D R I V I N G L I C E N S E</p>
                          <p className="info-item-value font-size-2 line-height-2 font-weight-400 additional-color-1-text">{contact?.[0]?.driverLicense}</p>
                        </div>
                      )
                    }
                    {
                      (!!contact?.[0]?.dateOfBirth || !!contact?.[0]?.placeOfBirth) && (
                        <div className="info-item">
                          <p className="info-item-name font-size-2 line-height-2 font-weight-400 additional-color-3-text">D A T E / P L A C E O F B I R T H</p>
                          {!!contact?.[0]?.dateOfBirth && (
                            <p className="info-item-value font-size-2 line-height-2 font-weight-400 additional-color-1-text">{moment(contact[0].dateOfBirth).format("DD-MM-yy")}</p>
                          )}
                          {
                            !!contact?.[0]?.placeOfBirth && (
                              <p className="info-item-value font-size-2 line-height-2 font-weight-400 additional-color-1-text"> {contact?.[0]?.placeOfBirth}</p>
                            )
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
              {
                !!career_objective?.[0]?.data && (
                  <div className="profile-block block-block">
                    <h3 className="block-heading heading-type-1 font-size-5 line-height-5 font-weight-400 additional-color-2-text">Profile</h3>
                    <p className="font-size-2 line-height-2 font-weight-400 additional-color-1-text" dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                  </div>
                )
              }
              {
                isArray(employment) && !!employment.length && (
                  <div className="employment-history-block block-block">
                    <h3 className="block-heading heading-type-1 font-size-5 line-height-5 font-weight-400 additional-color-2-text">Employment History</h3>
                    {
                      employment.map((itemEm, index) => (
                        <div key={index}>
                          <p className="block-subheading font-size-3 line-height-3 font-weight-400 additional-color-3-text">
                            {!!itemEm?.title && (`${itemEm?.title}, `)}
                            {!!itemEm?.company && (` ${itemEm?.company}, `)}
                            {!!itemEm?.city && (`${itemEm?.city} `)}
                          </p>
                          {
                            (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <p className="date-range font-size-1 line-height-1 font-weight-300 additional-color-1-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <div className="text-block-wrapper font-size-2 line-height-2 font-weight-400 additional-color-1-text">
                            <div className="text-block">
                              <div className="left-side">
                                <div className="circle-point additional-color-3-background"></div>
                                <div className="vertical-line additional-color-3-background"></div>
                              </div>
                              <div className="right-side" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                            </div>
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
                    <h3 className="block-heading heading-type-1 font-size-5 line-height-5 font-weight-400 additional-color-2-text">Education History</h3>
                    {
                      education.map((itemEd, index) => (
                        <div key={index}>
                          {
                            (!!itemEd?.study) && (
                              <p className="block-subheading font-size-3 line-height-3 font-weight-400 additional-color-3-text">{itemEd?.facility && (`${itemEd.facility}, `)} {!!itemEd?.study && (`${itemEd?.study}, `)} {itemEd?.degree && (`${itemEd?.degree}`)} </p>
                            )
                          }
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range font-size-1 line-height-1 font-weight-300 additional-color-1-text">{!!itemEd?.dateFrom?.date && (`${moment(itemEd?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEd?.dateTo?.date && (`${moment(itemEd?.dateTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <p className="font-size-2 line-height-2 font-weight-400 additional-color-1-text" dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                isArray(courses) && !!courses.length && (
                  <div className="courses-block block-block">
                    <h3 className="block-heading heading-type-1 font-size-5 line-height-5 font-weight-400 additional-color-2-text">Courses</h3>

                    {
                      courses.map((itemCo, index) => (
                        <div key={index}>
                          {
                            (!!itemCo?.title || !!itemCo?.institution) && (
                              <p className="block-subheading font-size-3 line-height-3 font-weight-400 additional-color-3-text">{!!itemCo?.title && (`${itemCo?.title},`)} {!!itemCo?.institution && (itemCo?.institution)}</p>
                            )
                          }
                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range font-size-2 line-height-2 font-weight-300 additional-color-1-text">{!!itemCo?.dateFrom?.date && (`${moment(itemCo?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemCo?.dateTo?.date && (`${moment(itemCo?.dateTo?.date).format("MMMM yy")}`)}</p>
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
                    <h3 className="block-heading heading-type-1 font-size-5 line-height-5 font-weight-400 additional-color-2-text">Extra-curricular activities</h3>
                    {
                      extra_curricular.map((itemEx, index) => (
                        <div key={index}>
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="block-subheading font-size-3 line-height-3 font-weight-400 additional-color-3-text">{!!itemEx?.title && (`${itemEx?.title},`)} {!!itemEx?.employer && (`${itemEx?.employer}`)}</p>
                            )
                          }
                          {
                            (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <p className="date-range font-size-2 line-height-2 font-weight-300 additional-color-1-text">{!!itemEx?.dateFrom?.date && (`${moment(itemEx?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemEx?.dateTo?.date && (`${moment(itemEx?.dateTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <p className="font-size-2 line-height-2 font-weight-400 additional-color-1-text" dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                isArray(internship) && !!internship.length && (
                  <div className="internships-block block-block">
                    <h3 className="block-heading heading-type-1 font-size-5 line-height-5 font-weight-400 additional-color-2-text">Internships</h3>
                    {
                      internship.map((itemIn, index) => (
                        <div key={index}>
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="block-subheading font-size-3 line-height-3 font-weight-400 additional-color-3-text">{!!itemIn.jobTitle && (`${itemIn?.jobTitle},`)} {!!itemIn?.employer && (`${itemIn?.employer},`)} {!!itemIn?.city && (`${itemIn?.city}`)}</p>
                            )
                          }
                          {
                            (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                              <p className="date-range font-size-2 line-height-2 font-weight-300 additional-color-1-text">{!!itemIn?.dateFrom?.date && (`${moment(itemIn?.dateFrom?.date).format("MMMM yy")} -`)} {!!itemIn?.dateTo?.date && (`${moment(itemIn?.dateTo?.date).format("MMMM yy")}`)}</p>
                            )
                          }
                          <div className="text-block-wrapper font-size-2 line-height-2 font-weight-400 additional-color-1-text">
                            <div className="text-block">
                              <div className="left-side">
                                <div className="circle-point additional-color-3-background"></div>
                                <div className="vertical-line additional-color-3-background"></div>
                              </div>
                              <div className="right-side" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
            <div className="column-right">
              {
                isArray(contact) && (!!contact[0]?.email || contact[0]?.phone || (isArray(social_links) && !!social_links.length)) && (
                  <div className="contacts-information-block block-block">
                    <div className="left-block additional-color-2-background"></div>
                    <div className="right-block">
                      <div className="contacts-block">
                        <div className="block-item">
                          <div className="left-side">
                            <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M2.87061 5.11842C2.87061 3.11967 4.50102 1.48926 6.49977 1.48926C8.49852 1.48926 10.1289 3.11967 10.1289 5.11842C10.1289 7.59926 6.88435 11.2501 6.74352 11.4018C6.61352 11.548 6.38602 11.548 6.25602 11.4018C6.12061 11.2501 2.87061 7.59926 2.87061 5.11842ZM7.77457 4.91371C7.88603 5.61391 7.40875 6.27189 6.70855 6.38335C6.00835 6.4948 5.35037 6.01752 5.23891 5.31732C5.12746 4.61711 5.60473 3.95914 6.30494 3.84768C7.00514 3.73623 7.66312 4.2135 7.77457 4.91371Z" fill="white" />
                            </svg>
                          </div>
                          <div className="right-side font-size-2 line-height-2 font-weight-400 additional-color-1-text">
                            5th Avenue Street
                            New York City, 384846
                            United States
                          </div>
                        </div>
                        {
                          !!contact[0]?.phone && (
                            <div className="block-item">
                              <div className="left-side">
                                <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6.25081 6.74873C8.35247 8.8504 8.83456 6.41832 10.1725 7.75623C11.4616 9.0454 12.2037 9.3054 10.5679 10.9412C10.3621 11.1037 9.06206 13.0862 4.48498 8.51457C-0.0921061 3.93748 1.89039 2.63748 2.05289 2.43165C3.69414 0.790401 3.94873 1.5379 5.23789 2.82707C6.58123 4.16498 4.14914 4.64707 6.25081 6.74873Z" fill="white" />
                                </svg>
                              </div>
                              <div className="right-side font-size-2 line-height-2 font-weight-400 additional-color-1-text">{contact[0]?.phone}</div>
                            </div>
                          )
                        }
                        {
                          !!contact[0]?.email && (
                            <div className="block-item">
                              <div className="left-side">
                                <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M1.53242 3.67619C1.50446 3.78221 1.48958 3.89344 1.48958 4.00801V8.99134C1.48958 9.71176 2.07458 10.2913 2.78958 10.2913H10.2104C10.9308 10.2913 11.5104 9.71176 11.5104 8.99134V4.00801C11.5104 3.89151 11.4951 3.7787 11.4664 3.67143L7.76132 7.34958L7.76025 7.35065C7.04836 8.06143 5.94851 8.05619 5.23618 7.35299L5.23468 7.35151L1.53242 3.67619ZM10.3044 2.71137C10.2734 2.70914 10.242 2.70801 10.2104 2.70801H2.78958C2.75607 2.70801 2.72287 2.70927 2.69002 2.71176L6.28997 6.28551L6.29052 6.28605C6.42271 6.41611 6.57851 6.41107 6.70066 6.28892L6.7026 6.28698L6.7026 6.28699L10.3044 2.71137Z" fill="white" />
                                </svg>
                              </div>
                              <div className="right-side font-size-2 line-height-2 font-weight-400 additional-color-1-text">
                                {contact[0]?.email}
                              </div>
                            </div>
                          )
                        }
                        {
                          isArray(social_links) && !!social_links.length && (
                            social_links.map((item, index) => (
                              <div className="block-item" key={index}>
                                <div className="left-side">
                                  {/* <svg className="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.4993 10.4998H8.94645V8.06366C8.94645 7.48274 8.93609 6.73492 8.13882 6.73492C7.33002 6.73492 7.20626 7.36783 7.20626 8.02135V10.4996H5.65344V5.48996H7.14415V6.17457H7.16506C7.46858 5.65469 8.03503 5.34303 8.63589 5.36538C10.2098 5.36538 10.5 6.40241 10.5 7.75157L10.4993 10.4998Z" fill="white" />
                                    <path d="M3.90121 4.80541C3.90112 4.80541 3.90107 4.80541 3.90103 4.80541C3.40667 4.80541 2.99988 4.39795 2.99988 3.90273C2.99988 3.4075 3.40667 3 3.90103 3C4.39533 3 4.80208 3.40741 4.80217 3.90254C4.80217 3.90259 4.80217 3.90263 4.80217 3.90273C4.80217 4.39786 4.39548 4.80536 3.90121 4.80541Z" fill="white" />
                                    <path d="M4.67775 10.5H3.12329V5.49023H4.67775V10.5Z" fill="white" />
                                  </svg> */}
                                  <img src={item.icon} />
                                </div>
                                <div className="right-side font-size-2 line-height-2 font-weight-400 additional-color-1-text">{item.name}</div>
                              </div>
                            ))
                          )
                        }
                      </div>
                    </div>
                  </div>
                )
              }
              {
                isArray(certificates) && !!certificates.length && (
                  <div className="certificates-block block-block">
                    <h3 className="block-heading heading-type-1 font-size-4 line-height-4 font-weight-400 additional-color-3-text">Certificates</h3>
                    <p className="font-size-2 line-height-2 font-weight-400 additional-color-1-text">
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
                    <h3 className="block-heading heading-type-1 font-size-4 line-height-4 font-weight-400 additional-color-3-text">References</h3>
                    {
                      reference.map((itemRef, index) => (
                        <div key={index}>
                          {
                            (!!itemRef?.fullName || !!itemRef?.company) && (
                              <p className="font-size-2 line-height-2 font-weight-400 additional-color-1-text">
                                {!!itemRef?.fullName && (`${itemRef.fullName}, `)}
                                {!!itemRef?.company && (`${itemRef.company}`)}
                              </p>
                            )
                          }
                          {
                            !!itemRef?.email && (
                              <p className="font-size-2 line-height-2 additional-color-1-text">{itemRef.email}</p>
                            )
                          }
                          {
                            !!itemRef.phone && (
                              <p className="font-size-2 line-height-2 additional-color-1-text">{itemRef.phone}</p>
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
                    <h3 className="block-heading heading-type-1 font-size-4 line-height-4 font-weight-400 additional-color-3-text">Hobbies</h3>
                    <p className="font-size-2 line-height-2 additional-color-1-text">
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
              {
                !!(isArray(skills) && skills.length) && (
                  <div className="skills-block block-block">
                    <h3 className="block-heading heading-type-1 font-size-4 line-height-4 font-weight-400 additional-color-3-text">Skills</h3>
                    <div className="skills-list estimated-items-list">
                      {
                        skills.map((item, index) => (
                          <div className="list-item" key={index}>
                            <p className="item-name font-size-2 line-height-2 font-weight-400 additional-color-1-text">{item.name}</p>
                            {
                              !hide_experience_level && (
                                <div className="estimation-wrapper">
                                  <div className="estimation-background additional-color-2-background"></div>
                                  <div className="estimation-value additional-color-2-background" style={{ width: `${(+item.level * 100) / 5}%` }}></div>
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
                  <div className="languages-block block-block">
                    <h3 className="block-heading heading-type-1 font-size-4 line-height-4 font-weight-400 additional-color-3-text">Languages</h3>
                    <div className="skills-list estimated-items-list">
                      {
                        languages.map((item, index) => (
                          <div className="list-item" key={index}>
                            <p className="item-name font-size-2 line-height-2 font-weight-400 additional-color-1-text">{item.language}</p>
                            <div className="estimation-wrapper">
                              <div className="estimation-background additional-color-2-background"></div>
                              <div className="estimation-value additional-color-2-background" style={{ width: `${(+item.level * 100) / 6}%` }}></div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

