import React from "react";
import { isArray } from "lodash";
import moment from 'moment';

export const ResumeCv010 = ({
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
    <div className="sv_010" ref={reportTemplateRef}>
      {/* <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1 `} data-chapter="cv"> */}
      <div id="cv-chapter-section-cv" className="cv-chapter-section" data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content additional-color-4-background additional-color-2-text" style={{color: "rgb(80, 182, 226)", backgroundColor: "rgb(45, 20, 44)"}}>
            <div className="column-left">
              <div className="top-block">
                <h1 className="cv-name font-size-5 line-height-6">Matthew Mcconaughey</h1>
                <h2 className="cv-prophecy font-size-3 line-height-4 main-color-4-text">W E B D E S I G N E R</h2>
              </div>
              <div className="profile-block block-block">
                <h3 className="heading-type-1 font-size-4 line-height-5">Profile</h3>
                <p className="font-size-2 line-height-2">Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.</p>
              </div>
              <div className="references-block block-block">
                <h3 className="heading-type-1 font-size-4 line-height-5">References</h3>
                <p className="font-size-2 line-height-2">Full name, Company</p>
                <p className="font-size-2 line-height-2">references@webservice.com</p>
                <p className="font-size-2 line-height-2">736-343-9384</p>
              </div>
              <div className="employment-history-block block-block">
                <h3 className="heading-type-1 font-size-4 line-height-5">Employment History</h3>
                <p className="subheading font-size-3 line-height-4 main-color-4-text">Web Designer, Apple INC., New York City</p>
                <div className="date-range font-size-1 line-height-0">
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>M A R C H 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>D E C E M B E R 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="text-block">
                  <div className="bullet">
                    <div className="inner-bullet-1">
                      <div className="inner-bullet-2"></div>
                    </div>
                  </div>
                  <p className="text-block-text font-size-2 line-height-2">Helped to achieve a consistent look and visual theme across the website by promoting uniform fonts, formatting, images, and layout.</p>
                </div>
                <div className="text-block">
                  <div className="bullet">
                    <div className="inner-bullet-1">
                      <div className="inner-bullet-2"></div>
                    </div>
                  </div>
                  <p className="text-block-text font-size-2 line-height-2">Followed policies and procedures related to application methods and quality standards at all times.</p>
                </div>
                <div className="text-block">
                  <div className="bullet">
                    <div className="inner-bullet-1">
                      <div className="inner-bullet-2"></div>
                    </div>
                  </div>
                  <p className="text-block-text font-size-2 line-height-2">Managed front-end and back-end development in the company's Portfolio Analyst, Employee Track, and Account Management systems.</p>
                </div>
              </div>

              <div className="education-block block-block">
                <h3 className="heading-type-1 font-size-4 line-height-5">Education</h3>
                <p className="subheading font-size-3 line-height-4 main-color-4-text">Marketing and Management, Harcum College, Portland</p>
                <div className="date-range font-size-1 line-height-0">
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>J U LY 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>A U G U S T 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <p className="subheading-additional font-size-2 line-height-2">Bachelor</p>
                </div>
                <p className="font-size-2 line-height-2">I have learned to merge marketing and management skills in a very efficient way and produce great results. Even though managing hundreds of people is hard, all skills are learned to do that.</p>
              </div>

              <div className="courses-block block-block">
                <h3 className="heading-type-1 font-size-4 line-height-5">Courses</h3>
                <p className="subheading font-size-3 line-height-4 main-color-4-text">Super course 1, Benjamin Franklin Sidestep Collage</p>
                <div className="date-range font-size-1 line-height-0">
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>J U LY 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>A U G U S T 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="extra-curricular-activities-block block-block">
                <h3 className="heading-type-1 font-size-4 line-height-5">Extra-curricular activities</h3>
                <p className="subheading font-size-3 line-height-4 main-color-4-text">UX Designer, My own company</p>
                <div className="date-range font-size-1 line-height-0">
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>A U G U S T 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>D E C E M B E R 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="font-size-2 line-height-2">I was doing research for about five different projects. The goal was to find out the biggest issues with the current concept and solution how to solve them.</p>
              </div>

              <div className="internships-block block-block">
                <h3 className="heading-type-1 font-size-4 line-height-5">Internships</h3>
                <p className="subheading font-size-3 line-height-4 main-color-4-text">Product Designer, Company S.A., Toronto</p>
                <div className="date-range font-size-1 line-height-0">
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>J A N U A R Y 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="date-range-item">
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5V4.5V9H0L5 4.5L0 0Z" fill="url(#paint0_linear_160_842)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_842" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>D E C E M B E R 2 0 2 2</span>
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V9L5 4.5L0 0Z" fill="url(#paint0_linear_160_845)" fill-opacity="0.2" />
                      <defs>
                        <linearGradient id="paint0_linear_160_845" x1="2.5" y1="0" x2="2.5" y2="9" gradientUnits="userSpaceOnUse">
                          <stop offset="0.104167" stop-color="#D13B83" />
                          <stop offset="0.895833" stop-color="#477A97" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="text-block">
                  <div className="bullet">
                    <div className="inner-bullet-1">
                      <div className="inner-bullet-2"></div>
                    </div>
                  </div>
                  <p className="text-block-text font-size-2 line-height-2">Handled each product and package with care and precision.</p>
                </div>
                <div className="text-block">
                  <div className="bullet">
                    <div className="inner-bullet-1">
                      <div className="inner-bullet-2"></div>
                    </div>
                  </div>
                  <p className="text-block-text font-size-2 line-height-2">Handled much of the communication between clients and the lead Graphic Designer.</p>
                </div>
                <div className="text-block">
                  <div className="bullet">
                    <div className="inner-bullet-1">
                      <div className="inner-bullet-2"></div>
                    </div>
                  </div>
                  <p className="text-block-text font-size-2 line-height-2">Worked productively with Product Team to understand requirements and business specifications around Portfolio Management, Analytics and Risk.</p>
                </div>
              </div>
            </div>
            <div className="column-right">
              <div className="information-block additional-color-5-background">
                <div className="photo-block">
                  <svg className="svg-1" width="157" height="157" viewBox="0 0 157 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="78.5" cy="78.5" r="77.5" stroke="url(#paint0_linear_160_945)" stroke-width="2" />
                    <defs>
                      <linearGradient id="paint0_linear_160_945" x1="156" y1="155.962" x2="0.999996" y2="155.962" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#60A9CC" />
                        <stop offset="1" stop-color="#D13B83" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg className="svg-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_160_947)">
                      <circle cx="10" cy="10" r="6" fill="url(#paint0_radial_160_947)" fill-opacity="0.4" />
                    </g>
                    <circle cx="9.33333" cy="10.3333" r="3.33333" fill="url(#paint1_radial_160_947)" />
                    <defs>
                      <filter id="filter0_f_160_947" x="0" y="0" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_160_947" />
                      </filter>
                      <radialGradient id="paint0_radial_160_947" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 10) rotate(90) scale(6)">
                        <stop offset="0.640625" stop-color="#D13B83" />
                        <stop offset="0.9999" stop-color="#60A9CC" />
                        <stop offset="1" stop-color="#D36D9E" />
                      </radialGradient>
                      <radialGradient id="paint1_radial_160_947" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.33333 10.3333) rotate(90) scale(3.33333)">
                        <stop stop-color="white" />
                        <stop offset="0.7625" stop-color="#D36D9E" />
                        <stop offset="0.989583" stop-color="#D13B83" />
                      </radialGradient>
                    </defs>
                  </svg>
                  <img src="./image/photo.jpg" />
                </div>

                <div className="details-block block-block">
                  <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Details</h3>
                  <p className="font-size-2 line-height-2">5th Avenue Street </p>
                  <p className="font-size-2 line-height-2">New York City, 384846 </p>
                  <p className="font-size-2 line-height-2">United States </p>
                  <p className="font-size-2 line-height-2">736-343-9384 </p>
                  <p className="email font-size-2 line-height-2">designer@webservice.com</p>
                  <div className="details-block-item">
                    <p className="item-name main-color-4-text font-size-1 line-height-0">N AT I O N A L I T Y</p>
                    <p className="item-value additional-color-2-text font-size-2 line-height-1-1">German</p>
                  </div>
                  <div className="details-block-item">
                    <p className="item-name main-color-4-text font-size-1 line-height-0">D R I V I N G L I C E N S E</p>
                    <p className="item-value additional-color-2-text font-size-2 line-height-1-1">Class 1</p>
                  </div>
                  <div className="details-block-item">
                    <p className="item-name main-color-4-text font-size-1 line-height-0">D A T E / P L A C E O F B I R T H</p>
                    <p className="item-value additional-color-2-text font-size-2 line-height-1-1">14-08-1991<br /> Berlin</p>
                  </div>
                </div>

                <div className="links-block block-block">
                  <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Links</h3>
                  <a className="font-size-2 line-height-2" href="#">Linkedin</a>
                  <a className="font-size-2 line-height-2" href="#">Facebook</a>
                </div>

                <div className="skills-block block-block">
                  <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Skills</h3>
                  <div className="skills-list">
                    <div className="skills-list-item">
                      <p className="skill-item-name font-size-2 line-height-3">Computer Skills</p>
                      <div className="item-value-container additional-color-3-background">
                        <span className="item-value" style={{ width: "75%" }}>
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                    <div className="skills-list-item">
                      <p className="skill-item-name font-size-2 line-height-3">Adobe Premiere Pro</p>
                      <div className="item-value-container additional-color-3-background">
                        <span className="item-value" style={{ width: "100%" }}>
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                    <div className="skills-list-item">
                      <p className="skill-item-name font-size-2 line-height-3">Microsoft Office PowerPoint</p>
                      <div className="item-value-container additional-color-3-background">
                        <span className="item-value" style={{ width: "25%" }}>
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                    <div className="skills-list-item">
                      <p className="skill-item-name font-size-2 line-height-3">CSS</p>
                      <div className="item-value-container additional-color-3-background">
                        <span className="item-value" style={{ width: "30%" }}>
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                    <div className="skills-list-item">
                      <p className="skill-item-name font-size-2 line-height-3">HTML5</p>
                      <div className="item-value-container additional-color-3-background">
                        <span className="item-value">
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                    <div className="skills-list-item">
                      <p className="skill-item-name font-size-2 line-height-3">Adobe Illustrator</p>
                      <div className="item-value-container additional-color-3-background">
                        <span className="item-value">
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="certificates-block block-block">
                  <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Certificates</h3>
                  <p className="font-size-2 line-height-3">Certificate name</p>
                </div>
                <div className="hobbies-block block-block">
                  <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Hobbies</h3>
                  <p className="font-size-2 line-height-3">Squash, Surfing, Swimming, Table tennis, Tennis, Tennis polo, Tether car,Tour skating</p>
                </div>
                <div className="languages-block block-block">
                  <h3 className="heading-type-1 font-size-3 line-height-4 main-color-4-text">Languages</h3>
                  <div className="languages-list">
                    <div className="languages-list-item">
                      <p className="list-item-name font-size-2 line-height-3">Russian</p>
                      <div className="item-value-container">
                        <span className="item-value">
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                    <div className="languages-list-item">
                      <p className="list-item-name font-size-2 line-height-3">English</p>
                      <div className="item-value-container">
                        <span className="item-value">
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                    <div className="languages-list-item">
                      <p className="list-item-name font-size-2 line-height-3">Ukrainian</p>
                      <div className="item-value-container">
                        <span className="item-value">
                          <svg className="item-value-point" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_216_2030)">
                              <circle cx="10" cy="9" r="6" fill="url(#paint0_radial_216_2030)" fill-opacity="0.4" />
                            </g>
                            <circle cx="10.3333" cy="9.33333" r="3.33333" fill="url(#paint1_radial_216_2030)" />
                            <defs>
                              <filter id="filter0_f_216_2030" x="0" y="-1" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_216_2030" />
                              </filter>
                              <radialGradient id="paint0_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 9) rotate(90) scale(6)">
                                <stop offset="0.640625" stop-color="#4685A4" />
                                <stop offset="0.9999" stop-color="#60A9CC" />
                                <stop offset="1" stop-color="#60A9CC" />
                              </radialGradient>
                              <radialGradient id="paint1_radial_216_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.3333 9.33333) rotate(90) scale(3.33333)">
                                <stop stop-color="white" />
                                <stop offset="0.7625" stop-color="#60A9CC" />
                                <stop offset="0.989583" stop-color="#4685A4" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="empty-gap additional-color-3-background"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

