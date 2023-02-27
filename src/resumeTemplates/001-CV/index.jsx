import React from "react";
import { isArray } from "lodash";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";


export const ResumeCv = ({
  refs,
}) => {
  const router = useRouter();
  const idCv = router.query.idCv;

  const {
    resumeData: {
      data,
    }
  } = useSelector(state => state);

  const {
    contact
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
                            <div className="career-details">
                              <p className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Details</p>
                              <p className="career-address main-color-1-text font-size-1 line-height-1">United States,<br />5th Avenue Street, <br />New York City, 384846</p>
                              <p className="career-phone main-color-1-text font-size-1 line-height-1">736-343-9384</p>
                              <p className="career-email main-color-1-text font-size-1 line-height-1">designer@webservice.com</p>
                            </div>
                            <div className="career-links">
                              <h1 className="career-links-head font-size-2 line-height-2 additional-color-1-text">Links</h1>
                              <a className="career-links-link instagram" href="#">
                                <svg className="additional-color-1-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M13.6467 1.33335H2.35333C2.22639 1.33158 2.10033 1.35484 1.98238 1.4018C1.86442 1.44876 1.75687 1.51849 1.66586 1.60702C1.57486 1.69555 1.50219 1.80113 1.45199 1.91775C1.4018 2.03437 1.37507 2.15973 1.37333 2.28668V13.7133C1.37507 13.8403 1.4018 13.9657 1.45199 14.0823C1.50219 14.1989 1.57486 14.3045 1.66586 14.393C1.75687 14.4815 1.86442 14.5513 1.98238 14.5982C2.10033 14.6452 2.22639 14.6684 2.35333 14.6667H13.6467C13.7736 14.6684 13.8997 14.6452 14.0176 14.5982C14.1356 14.5513 14.2431 14.4815 14.3341 14.393C14.4251 14.3045 14.4978 14.1989 14.548 14.0823C14.5982 13.9657 14.6249 13.8403 14.6267 13.7133V2.28668C14.6249 2.15973 14.5982 2.03437 14.548 1.91775C14.4978 1.80113 14.4251 1.69555 14.3341 1.60702C14.2431 1.51849 14.1356 1.44876 14.0176 1.4018C13.8997 1.35484 13.7736 1.33158 13.6467 1.33335ZM5.39333 12.4933H3.39333V6.49334H5.39333V12.4933ZM4.39333 5.65334C4.11751 5.65334 3.85298 5.54377 3.65794 5.34874C3.4629 5.1537 3.35333 4.88917 3.35333 4.61334C3.35333 4.33752 3.4629 4.07299 3.65794 3.87795C3.85298 3.68292 4.11751 3.57334 4.39333 3.57334C4.5398 3.55673 4.68812 3.57125 4.82858 3.61593C4.96905 3.66062 5.09849 3.73447 5.20844 3.83265C5.31838 3.93083 5.40635 4.05113 5.46658 4.18567C5.52681 4.3202 5.55795 4.46594 5.55795 4.61334C5.55795 4.76075 5.52681 4.90649 5.46658 5.04102C5.40635 5.17556 5.31838 5.29586 5.20844 5.39404C5.09849 5.49222 4.96905 5.56607 4.82858 5.61076C4.68812 5.65544 4.5398 5.66995 4.39333 5.65334ZM12.6067 12.4933H10.6067V9.27334C10.6067 8.46668 10.32 7.94001 9.59333 7.94001C9.36844 7.94166 9.14946 8.0122 8.96589 8.14213C8.78232 8.27205 8.64299 8.45513 8.56667 8.66668C8.5145 8.82337 8.49189 8.98839 8.5 9.15334V12.4867H6.5C6.5 12.4867 6.5 7.03334 6.5 6.48668H8.5V7.33334C8.68169 7.01808 8.94594 6.75836 9.26429 6.58215C9.58265 6.40593 9.94304 6.31991 10.3067 6.33334C11.64 6.33334 12.6067 7.19335 12.6067 9.04001V12.4933Z" fill="#605C64" />
                                </svg>
                              </a>
                              <a className="career-links-link facebook" href="#">
                                <svg className="additional-color-1-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M13.9333 1.33337H2.06667C1.87218 1.33337 1.68565 1.41064 1.54812 1.54816C1.4106 1.68569 1.33333 1.87222 1.33333 2.06671V13.9334C1.33333 14.0297 1.3523 14.125 1.38916 14.214C1.42601 14.303 1.48003 14.3838 1.54812 14.4519C1.61622 14.52 1.69706 14.574 1.78603 14.6109C1.875 14.6477 1.97036 14.6667 2.06667 14.6667H8.45333V9.50004H6.72V7.50004H8.45333V6.00004C8.41743 5.64788 8.459 5.29213 8.57514 4.95773C8.69129 4.62334 8.87918 4.3184 9.12564 4.06431C9.37211 3.81023 9.67118 3.61313 10.0019 3.48687C10.3326 3.3606 10.6869 3.30821 11.04 3.33337C11.5589 3.33018 12.0775 3.35689 12.5933 3.41337V5.21337H11.5333C10.6933 5.21337 10.5333 5.61337 10.5333 6.19337V7.48004H12.5333L12.2733 9.48004H10.5333V14.6667H13.9333C14.0296 14.6667 14.125 14.6477 14.214 14.6109C14.3029 14.574 14.3838 14.52 14.4519 14.4519C14.52 14.3838 14.574 14.303 14.6108 14.214C14.6477 14.125 14.6667 14.0297 14.6667 13.9334V2.06671C14.6667 1.9704 14.6477 1.87505 14.6108 1.78607C14.574 1.6971 14.52 1.61626 14.4519 1.54816C14.3838 1.48007 14.3029 1.42605 14.214 1.3892C14.125 1.35234 14.0296 1.33337 13.9333 1.33337Z" fill="#605C64" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="profile-secondary-info">
                        <div className="profile-secondary-info-item">
                          <span className="name additional-color-1-text font-weight-300 font-size-1 line-height-1">Birth Date</span>
                          <span className="value additional-color-1-text font-weight-400 font-size-1 line-height-1">14-08-1991</span>
                        </div>
                        <div className="profile-secondary-info-item">
                          <span className="name additional-color-1-text font-weight-300 font-size-1 line-height-1">Place of Birth</span>
                          <span className="value additional-color-1-text font-weight-400 font-size-1 line-height-1">Berlin</span>
                        </div>
                        <div className="profile-secondary-info-item">
                          <span className="name additional-color-1-text font-weight-300 font-size-1 line-height-1">Nationality</span>
                          <span className="value additional-color-1-text font-weight-400 font-size-1 line-height-1">German</span>
                        </div>
                        <div className="profile-secondary-info-item">
                          <span className="name additional-color-1-text font-weight-300 font-size-1 line-height-1">Driving Licence</span>
                          <span className="value additional-color-1-text font-weight-400 font-size-1 line-height-1">Class 1</span>
                        </div>
                      </div>
                    </div>
                    <div className="cv-body-area area-2">
                      <div className="column-left">
                        <div className="employment-history-block">
                          <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">Employment history</h3>
                          <p className="date-range font-size-1 line-height-1 additional-color-2-text">March 2022 - December 2022</p>
                          <h4 className="cv-heading heading-type-4 font-size-1 line-height-1 main-color-1-text">Web Designer, Apple INC., New York City</h4>
                          <ul>
                            <li className="font-size-1 line-height-1 main-color-1-text"><span className="text">Helped to achieve a consistent look and visual theme across the website by
                              promoting uniform fonts, formatting, images, and layout.</span></li>
                            <li className="font-size-1 line-height-1 main-color-1-text"><span className="text">Followed policies and procedures related to application methods and quality
                              standards at all times.</span></li>
                            <li className="font-size-1 line-height-1 main-color-1-text"><span className="text">Managed front-end and back-end development in the company's Portfolio
                              Analyst, Employee Track, and Account Management systems.</span></li>
                          </ul>
                        </div>
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

