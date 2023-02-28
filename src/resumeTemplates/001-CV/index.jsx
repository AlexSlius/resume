import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

export const ResumeCv001 = ({
  refs,
  data,
  idCv,
}) => {
  const {
    contact,
    social_links,
    employment
  } = data;

  return (
    <div className="body-template-resume" ref={refs}>
      <div className="sv_001">
        {
          idCv != "new" && (
            <>
              <div id="cv-chapter-section-cv" className="cv-chapter-section" data-chapter="cv">
                <div id="cv-body-hidden-container" className="cv-body cv-body-1 cv-body-visible page-1 font-size-scheme-1 line-height-scheme-1 color-scheme-1">
                  <div className="cv-body-content">
                    {/* contact */}
                    <div className="cv-body-area area-1 additional-color-3-background">
                      <div className="top-block columns-wrapper">
                        <div className="column-left">
                          {
                            isArray(contact) && (contact[0]?.firstName || contact[0]?.lastName) && (
                              <h1 className="cv-heading additional-color-1-text heading-type-1 font-size-3 line-height-3">
                                {`${contact[0]?.firstName}, ${contact[0]?.lastName}`}
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
                              <div className="profile">
                                <h2 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Profile</h2>
                                <p className="profile-text main-color-1-text font-size-1 line-height-1">Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="column-right">
                          {
                            isArray(contact) && (
                              <h1 className="cv-heading heading-type-2 additional-color-1-text font-weight-300 font-size-3 line-height-3">{contact[0]?.jobTitle}</h1>
                            )
                          }
                          <div className="cv-career-block additional-color-2-border">
                            {
                              isArray(contact) && (!!contact[0]?.country || !!contact[0]?.city || !!contact[0]?.phone || !!contact[0]?.address || !!contact[0]?.email) && (
                                <div className="career-details">
                                  <p className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Details</p>
                                  <p className="career-address main-color-1-text font-size-1 line-height-1">{!!contact[0]?.country && (`${contact[0]?.country} `)} <br />  {`${contact[0]?.address}`}, <br /> {!!contact[0]?.city && (`${contact[0]?.city} City`)} {contact[0]?.zipCode}</p>
                                  {!!contact[0]?.phone && <p className="career-phone main-color-1-text font-size-1 line-height-1">{contact[0]?.phone}</p>}
                                  {!!contact[0]?.email && <p className="career-email main-color-1-text font-size-1 line-height-1">{contact[0]?.email}</p>}
                                </div>
                              )
                            }
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
                          isArray(employment) && employment.length && (
                            <div className="employment-history-block">
                              <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Employment history</h3>
                              {
                                employment.map((itemEm, index) => (
                                  <div key={index} className="desrip-content">
                                    {(!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (<p className="date-range font-size-1 line-height-1 additional-color-2-text">{!!itemEm?.periodFrom?.date && (`${moment(itemEm?.periodFrom?.date).format("MMMM yy")} -`)} {!!itemEm?.periodTo?.date && (`${moment(itemEm?.periodTo?.date).format("MMMM yy")}`)}</p>)}
                                    {(!!itemEm?.title || itemEm?.company || !!itemEm?.city) && (<h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">{!!itemEm?.title && (`${itemEm?.title},`)} {!!itemEm?.company && (`${itemEm?.company},`)} {!!itemEm?.city && (`${itemEm?.city} City`)}</h4>)}
                                    <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                                  </div>
                                ))
                              }
                            </div>
                          )
                        }

                        <div className="extra-curricular-activities-block">
                          <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Extra-curricular activities</h3>
                          <p className="date-range font-size-1 line-height-1 additional-color-2-text">March 2022 - December 2022</p>
                          <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">UX Designer, My own company</h4>
                          <p className="font-size-1 line-height-1">I was doing research for about five different projects. The goal was to find out the
                            biggest issues with the current concept and solution how to solve them.</p>
                        </div>

                        <div className="internships-block">
                          <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Internships</h3>
                          <p className="date-range font-size-1 line-height-1 additional-color-2-text">March 2022 - December 2022</p>
                          <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">Product Designer, Company S.A., Toronto</h4>
                          <ul>
                            <li className="font-size-1 line-height-1 main-color-1-text">Handled each product and package with care and precision.</li>
                            <li className="font-size-1 line-height-1 main-color-1-text">Handled much of the communication between clients and the lead Graphic
                              Designer.</li>
                            <li className="font-size-1 line-height-1 main-color-1-text">Worked productively with Product Team to understand requirements and
                              business specifications around Portfolio Management, Analytics and Risk.</li>
                          </ul>
                        </div>

                        <div className="references-block">
                          <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">References</h3>
                          <p className="date-range font-size-1 line-height-1 additional-color-2-text">March 2022 - December 2022</p>
                          <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">Full name, Company</h4>
                          <p className="references-email font-size-1 line-height-1 main-color-1-text">references@webservice.com</p>
                          <p className="references-phone font-size-1 line-height-1 main-color-1-text">736-343-9384</p>
                        </div>

                      </div>
                      <div className="separator"></div>
                      <div className="column-right">
                        <div className="education-block">
                          <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Education</h3>
                          <p className="date-range font-size-1 line-height-1 additional-color-2-text">July 2022 - August 2022</p>
                          <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">Marketing and Management</h4>
                          <p className="education-text font-size-1 line-height-1 main-color-1-text">Harcum College, Portland</p>
                          <p className="education-text font-size-1 line-height-1 main-color-1-text">
                            I have learned to merge marketing and management skills in a very efficient way and
                            produce great results. Even though managing hundreds of people is hard, all skills
                            are learned to do that.</p>
                        </div>
                        <div className="courses-block">
                          <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Courses</h3>
                          <p className="date-range font-size-1 line-height-1 additional-color-2-text">July 2022 - August 2022</p>
                          <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">Super course 1</h4>
                          <p className="courses-text font-size-1 line-height-1 main-color-1-text">Benjamin Franklin Sidestep Collage, Portland</p>
                        </div>
                        <div className="certificates-block">
                          <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Certificates</h3>
                          <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">Certificate name</h4>
                        </div>
                        <div className="hobbies-block">
                          <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Hobbies</h3>
                          <p className="hobbies-text font-size-1 line-height-1 main-color-1-text">Squash, Surfing, Swimming,
                            Table tennis, Tennis, Tennis polo,
                            Tether car, Tour skating</p>
                        </div>
                      </div>
                    </div>
                    <div className="cv-body-area area-3 additional-color-3-background">
                      <div className="column-left">
                        <div className="skills-block">
                          <h3 className="cv-heading heading-type-5 font-size-1 line-height-1 main-color-2-text additional-color-1-background">Skills</h3>
                          <div className="skills-estimation-block">
                            <div className="skill-item">
                              <p className="skill-name font-size-1 line-height-1 additional-color-1-text">Microsoft Office PowerPoint</p>
                              <div className="skill-estimation">
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                              </div>
                            </div>
                            <div className="skill-item">
                              <p className="skill-name font-size-1 line-height-1 additional-color-1-text">Adobe Illustrator</p>
                              <div className="skill-estimation">
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                              </div>
                            </div>
                            <div className="skill-item">
                              <p className="skill-name font-size-1 line-height-1 additional-color-1-text">Adobe Premiere Pro</p>
                              <div className="skill-estimation">
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                              </div>
                            </div>
                            <div className="skill-item">
                              <p className="skill-name font-size-1 line-height-1 additional-color-1-text">HTML5</p>
                              <div className="skill-estimation">
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                              </div>
                            </div>
                            <div className="skill-item">
                              <p className="skill-name font-size-1 line-height-1 additional-color-1-text">CSS</p>
                              <div className="skill-estimation">
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="column-right">
                        <div className="languages-block">
                          <h3 className="cv-heading heading-type-5 font-size-1 line-height-1 main-color-2-text additional-color-1-background">Language</h3>
                          <div className="skills-estimation-block">
                            <div className="skill-item">
                              <p className="skill-name font-size-1 line-height-1 additional-color-1-text">English</p>
                              <div className="skill-estimation">
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                              </div>
                            </div>
                            <div className="skill-item">
                              <p className="skill-name font-size-1 line-height-1 additional-color-1-text">Ukrainian</p>
                              <div className="skill-estimation">
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                              </div>
                            </div>
                            <div className="skill-item">
                              <p className="skill-name font-size-1 line-height-1 additional-color-1-text">Russian</p>
                              <div className="skill-estimation">
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border additional-color-1-background"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                                <span className="estimation-point additional-color-1-border"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

