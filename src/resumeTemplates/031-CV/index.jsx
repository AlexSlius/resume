import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let photo_block = $('#cv-body-hidden-container .cv-body-content .photo-block').clone();
      let details_block = $('#cv-body-hidden-container .cv-body-content .details-block').clone();
      let links_block = $('#cv-body-hidden-container .cv-body-content .links-block').clone();
      let skills_block = $('#cv-body-hidden-container .cv-body-content .skills-block').clone();
      let languages_block = $('#cv-body-hidden-container .cv-body-content .languages-block').clone();
      let hobbies_block = $('#cv-body-hidden-container .cv-body-content .hobbies-block').clone();
      let references_block = $('#cv-body-hidden-container .cv-body-content .references-block').clone();
      let certificates_block = $('#cv-body-hidden-container .cv-body-content .certificates-block').clone();
      let main_info_block = $('#cv-body-hidden-container .cv-body-content .main-info-block').clone();
      let profile_block = $('#cv-body-hidden-container .cv-body-content .profile-block').clone();
      let employment_history_block = $('#cv-body-hidden-container .cv-body-content .employment-history-block').clone();
      let education_block = $('#cv-body-hidden-container .cv-body-content .education-block').clone();
      let courses_block = $('#cv-body-hidden-container .cv-body-content .courses-block').clone();
      let extra_curricular_activities_block = $('#cv-body-hidden-container .cv-body-content .extra-curricular-activities-block').clone();
      let internships_block = $('#cv-body-hidden-container .cv-body-content .internships-block').clone();

      current_page_number = 1;

      getContentContainer1().append(photo_block);
      if (checkHeight()) {
        photo_block.remove();
        current_page_number++;
        getContentContainer1().append(photo_block);
      }

      getContentContainer1().append(details_block);
      if (checkHeight()) {
        details_block.remove();
        current_page_number++;
        getContentContainer1().append(details_block);
      }

      getContentContainer1().append(links_block);
      if (checkHeight()) {
        links_block.remove();
        current_page_number++;
        getContentContainer1().append(links_block);
      }

      getContentContainer1().append(skills_block);
      if (checkHeight()) {
        skills_block.remove();
        current_page_number++;
        getContentContainer1().append(skills_block);
      }

      getContentContainer1().append(languages_block);
      if (checkHeight()) {
        languages_block.remove();
        current_page_number++;
        getContentContainer1().append(languages_block);
      }

      getContentContainer1().append(hobbies_block);
      if (checkHeight()) {
        hobbies_block.remove();
        current_page_number++;
        getContentContainer1().append(hobbies_block);
      }

      getContentContainer1().append(references_block);
      if (checkHeight()) {
        references_block.remove();
        current_page_number++;
        getContentContainer1().append(references_block);
      }

      getContentContainer1().append(certificates_block);
      if (checkHeight()) {
        certificates_block.remove();
        current_page_number++;
        getContentContainer1().append(certificates_block);
      }

      current_page_number = 1;

      getContentContainer2().append(main_info_block);
      if (checkHeight()) {
        main_info_block.remove();
        current_page_number++;
        getContentContainer2().append(main_info_block);
      }

      getContentContainer2().append(profile_block);
      if (checkHeight()) {
        profile_block.remove();
        current_page_number++;
        getContentContainer2().append(profile_block);
      }

      getContentContainer2().append(employment_history_block);
      if (checkHeight()) {
        employment_history_block.remove();
        current_page_number++;
        getContentContainer2().append(employment_history_block);
      }

      getContentContainer2().append(education_block);
      if (checkHeight()) {
        education_block.remove();
        current_page_number++;
        getContentContainer2().append(education_block);
      }

      getContentContainer2().append(courses_block);
      if (checkHeight()) {
        courses_block.remove();
        current_page_number++;
        getContentContainer2().append(courses_block);
      }

      getContentContainer2().append(extra_curricular_activities_block);
      if (checkHeight()) {
        extra_curricular_activities_block.remove();
        current_page_number++;
        getContentContainer2().append(extra_curricular_activities_block);
      }

      getContentContainer2().append(internships_block);
      if (checkHeight()) {
        internships_block.remove();
        current_page_number++;
        getContentContainer2().append(internships_block);
      }
    }

    function checkHeight() {
      return getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height() - 38;
    }

    function getContentContainer1() {
      return getPageContainer().find('.column-left');
    }

    function getContentContainer2() {
      return getPageContainer().find('.column-right');
    }

    function getPageContainer() {
      let page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
      if (page.length > 0) {
        return page.find('.cv-body-content');
      } else {
        return createNewPage(current_page_number);
      }
    }

    function createNewPage(page_number) {
      let page_element = $('#cv-body-hidden-container').clone();
      page_element.attr('id', '');
      page_element.addClass(['cv-body-visible', 'page-' + current_page_number]);
      page_element.children().remove();

      let page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();
      page_element_container.find('.column-left').children().remove();
      page_element_container.find('.column-right').children().remove();
      page_element.append(page_element_container);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }
    function nameHelper() {
      let columnLeftWidth = $('.cv-body-visible .js-column-left').width() + 30;
      let topOffset = $('.column-right .block-block').first().offset().top - 158;
      if (!$('#cv-chapter-section-cv').hasClass('has-photo')) {
        $('.cv-body-visible .main-info-block').css('margin-left',"-" + columnLeftWidth + "px");
        $('.cv-body-visible .column-left').css('padding-top', topOffset + "px");

      }
    }
    function columnLeftHelper() {
      $('.cv-body-visible .js-column-left').each(function () {
        if ($(this).width() === 0) {
          $(this).addClass('m-empty');
        } else {
          $(this).removeClass('m-empty');
        }
      });
    }

    rebuildingPages();
    columnLeftHelper();
    nameHelper();
  }
}

export const ResumeCv031 = ({
  data,
  dataNew,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  stateClasses,
  reportTemplateRef,
  beforeСontent,
  objActiveBlock
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
  } = dataNew;
  const isContactArray = isArray(contact);
  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";


  useEffect(() => {
    if (!!isDrawing ) {
    drawing();
    handleFalseDrafind();
  }
  }, [isDrawing, data, stateClasses]);

  return (
    <div className="sv_031" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1 main-color-1-background">
          <div className="cv-body-content font-size-1 main-color-3-text additional-color-1-border">
            <div className="column-left js-column-left">
              {
                contact[0]?.picture && (
                  <div className="photo-block block-block">
                    <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                  </div>
                )
              }
              <div className={`details-block block-block ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !contact[0]?.email && !contact[0]?.phone && !contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-2 additional-color-1-text">Details</div>
                <div className={`contacts-block ${!contact[0]?.email && !contact[0]?.phone && !contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`contact-item ${!contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`${!contact[0]?.country ? 'empty-field' : ''} ${!contact[0]?.country && !beforeСontent ? 'hide' : ''}`}>
                      {`${checkForSymbol([contact[0]?.address, contact[0]?.city, contact[0]?.zipCode]) ? contact[0]?.country + ', ' : contact[0]?.country || 'United States, '}`}
                    </span>
                    <span className={`${!contact[0]?.address ? 'empty-field' : ''} ${!contact[0]?.address && !beforeСontent ? 'hide' : ''}`}>
                      {`${checkForSymbol([contact[0]?.city, contact[0]?.zipCode]) ? contact[0]?.address + ', ' : contact[0]?.address || '5th Avenue Street, '}`}
                    </span>
                    <span className={`${!contact[0]?.city ? 'empty-field' : ''} ${!contact[0]?.city && !beforeСontent ? 'hide' : ''}`}>
                      {`${checkForSymbol([contact[0]?.zipCode]) ? contact[0]?.city + ', ' : contact[0]?.city || 'New York City, '}`}
                    </span>
                    <span className={`${!contact[0]?.zipCode ? 'empty-field' : ''} ${!contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                      {`${contact[0]?.zipCode || '384846'}`}
                    </span>
                  </div>
                  <div className={`contact-item ${!contact[0].phone ? 'empty-field' : ''} ${!contact[0]?.phone && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0]?.phone || '736-343-9384'}
                  </div>
                  <div className={`contact-item ${!contact[0].email ? 'empty-field' : ''} ${!contact[0]?.email && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].email || 'designer@webservice.com'}
                  </div>
                </div>
                <div className={`profile-info-list ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`item-block ${!contact[0]?.nationality && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">NATIONALITY</div>
                    <div className={`value ${!contact[0]?.nationality ? 'empty-field' : ''}`}>
                      {contact[0]?.nationality ? contact[0]?.nationality : 'German'}
                    </div>
                  </div>
                  <div className={`item-block ${!contact[0]?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">DRIVING LICENSE</div>
                    <div className={`value ${!contact[0]?.driverLicense ? 'empty-field' : ''}`}>
                      {contact[0]?.driverLicense ? contact[0]?.driverLicense : 'Class 1'}
                    </div>
                  </div>
                  <div className={`item-block ${!contact[0]?.dateOfBirth && !contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <div className="name">DATE / PLACE OF BIRTH</div>
                    <div className="value">
                      <span className={`${!contact[0]?.dateOfBirth ? 'empty-field' : ''} ${!contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0]?.dateOfBirth ? moment(contact[0]?.dateOfBirth).format("DD-MM-yy") : '14-08-1991'} {` / `} 
                      </span>
                      <span className={`${!contact[0]?.placeOfBirth ? 'empty-field' : ''} ${!contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0]?.placeOfBirth ? contact[0]?.placeOfBirth : 'Berlin'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`links-block block-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-2 additional-color-1-text">Links</div>
                <div className="links-list">
                  {
                    isArray(social_links) && social_links.length && (
                      social_links.map((item, index) => (
                        <a className="links-item additional-color-1-border m-border additional-color-1-text" key={index}>
                          {item.name.substring(0, 2)}
                        </a>
                      ))
                    ) || (
                      <>
                        <a className="links-item empty-field additional-color-1-border m-border additional-color-1-text">Fb</a>
                        <a className="links-item empty-field additional-color-1-border m-border additional-color-1-text">In</a>
                      </>
                    )
                  }
                </div>
              </div>
              <div className={`skills-block block-block ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-2 additional-color-1-text">Skills</div>
                <div className="skills-list">
                  {
                    skills.map((item, index) => (
                      <div className={`skills-list-item ${!item.name ? 'empty-field' : ''}`} key={index}>
                        <div className="skill-name" >{item.name ? item.name : 'Skill name'}</div>
                        {
                          !hide_experience_level && (
                            <div className="estimation-wrapper">
                              <p className="value additional-color-1-background" style={{ width: `${item.level ? (+item.level * 100) / 5 : '33.33'}%` }}></p>
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`languages-block block-block ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-2 additional-color-1-text">Languages</div>
                <div className="languages-list">
                  {
                    languages.map((item, index) => (
                      <div className={`languages-item ${!item.language ? 'empty-field' : ''}`} key={index}>
                        <div className="name">{item.language ? item.language : 'Language'}</div>
                        <div className="estimation-wrapper">
                          <div className="value additional-color-1-background" style={{ width: `${item.level ? (+item.level * 100) / 6 : '66.66'}%` }}></div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`hobbies-block block-block ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-2 additional-color-1-text">Hobbies</div>
                <div className={`${!hobbies[0].text ? 'empty-field' : ''}`}> 
                  {
                    hobbies.map((item, index) => (
                      <span key={index}>
                        {item.text ? item.text + (hobbies.length - 1 != index ? ', ' : '') : 'Squash, Surfing, Swimming, Table tennis, Tennis, Tennis polo, Tether car, Tour skating'}
                      </span>
                    ))
                  }
                </div>
              </div>
              <div className={`references-block block-block ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-2 additional-color-1-text">References</div>
                {
                  reference.map((itemRef, index) => (
                    <div className="block-info" key={index}>
                      <div className={`${!itemRef.fullName && !itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemRef.fullName ? 'empty-field' : ''} ${!itemRef.fullName && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemRef.company]) ? itemRef.fullName + ', ' : itemRef.fullName || 'Full name'}
                        </span>
                        <span className={`${!itemRef.company ? 'empty-field' : ''} ${!itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                          {itemRef.company || ', Company'}
                        </span>
                      </div>
                      <div className={`${!itemRef.email ? 'empty-field' : ''} ${!itemRef.email && !beforeСontent ? 'hide' : ''}`}>
                        {itemRef.email || 'references@webservice.com'}
                      </div>
                      <div className={`${!itemRef.phone ? 'empty-field' : ''} ${!itemRef.phone && !beforeСontent ? 'hide' : ''}`}>
                        {itemRef.phone || '736-343-9384'}
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-2 additional-color-1-text">Certificates</div>
                <div className="certificates-info">
                  {
                    certificates.map((item, index) => (
                      <span className={`${!item.name ? 'empty-field' : ''}`} key={index}>
                        {item.name ? item.name : 'Certificate name'}
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="column-right">
              <div className={`main-info-block ${!contact[0].firstName && !contact[0].lastName && !contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                <div className={`cv-name font-size-4 additional-color-1-text ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                  <span className={`${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].firstName || 'Matthew'}{` `}
                  </span><br/>
                  <span className={`${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].lastName || 'Mcconaughey'}
                  </span>
                </div>
                <div className={`cv-profession font-size-2 ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                  {contact[0].jobTitle || 'Web-designer'}
                </div>
              </div>
              <div className={`profile-block block-block ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                <div className="left-side">
                  <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                  </svg>
                </div>
                <div className="right-side">
                  <div className="cv-heading font-size-3 additional-color-1-text">Profile</div>
                  {
                    career_objective[0]?.data && (
                      <div dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                    ) || (
                      <div className="empty-field">
                        Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                      </div>
                    )
                  }
                </div>
              </div>
              <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                <div className="left-side">
                  <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                  </svg>
                </div>
                <div className="right-side">
                  <div className="cv-heading font-size-3 additional-color-1-text">Employment History</div>
                  {
                    employment.map((itemEm, index) => (
                      <div className="block-info" key={index}>
                        <div className={`cv-subheading font-size-2 ${!itemEm.title && !itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEm.title ? 'empty-field' : ''} ${!itemEm.title && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEm.company]) ? itemEm.title + ', ' : itemEm.title || 'Web Designer'}
                          </span>
                          <span className={`${!itemEm.company ? 'empty-field' : ''} ${!itemEm.company && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEm?.city]) ? itemEm?.company + ', ' : itemEm?.company || ', Apple INC.'}
                          </span>
                          <span className={`${!itemEm.city ? 'empty-field' : ''} ${!itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.city || ', New York City'}
                          </span>
                        </div>
                        <div className={`date-range ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''} ${!itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MMMM yy") + ' - ' : moment(itemEm.periodFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''} ${!itemEm.periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        {
                          itemEm.assignment && (
                            <div dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          ) || (
                            <div className={`empty-field ${!itemEm.assignment && !beforeСontent ? 'hide' : ''}`}>
                              <ul>
                                <li>Helped to achieve a consistent look and visual theme across the website by promoting uniform fonts, formatting, images, and layout.</li>
                                <li>Followed policies and procedures related to application methods and quality standards at all times.</li>
                                <li>Managed front-end and back-end development in the company's Portfolio Analyst, Employee Track, and Account Management systems.</li>
                              </ul>
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`education-block block-block ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="left-side">
                  <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                  </svg>
                </div>
                <div className="right-side">
                  <div className="cv-heading font-size-3 additional-color-1-text">Education</div>
                  {
                    education.map((itemEd, index) => (
                      <div className="block-info" key={index}>
                        <div className={`cv-subheading font-size-2 ${!itemEd.degree && !itemEd.study && !itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEd.facility, itemEd.degree]) ? itemEd.study + ' - ' : itemEd.study || 'Marketing and Management'}
                          </span>
                          <span className={`${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEd?.facility]) ? itemEd?.facility + ', ' : itemEd?.facility || ', Harcum College, Portland'}
                          </span>
                          <span className={`${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.degree || ' - Bachelor'}
                          </span>
                        </div>
                        <div className={`date-range ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''} ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''} ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        {
                          itemEd.description && (
                            <div dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
                          ) || (
                            <div className={`empty-field ${!itemEd.description && !beforeСontent ? 'hide' : ''}`}>
                              I have learned to merge marketing and management skills in a very efficient way and produce great results. Even though managing hundreds of people is hard, all skills are learned to do that.
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`courses-block block-block ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="left-side">
                  <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                  </svg>
                </div>
                <div className="right-side">
                  <div className="cv-heading font-size-3 additional-color-1-text">Courses</div>
                  {
                    courses.map((itemCo, index) => (
                      <div className="block-info" key={index}>
                        <div className={`cv-subheading font-size-2 ${!itemCo.title && !itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemCo.title ? 'empty-field' : ''} ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.title && (checkForSymbol([itemCo.institution])) ? itemCo.title + ', ' : itemCo.title || 'Super course 1'}
                          </span>
                          <span className={`${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.institution ? itemCo.institution : ', Benjamin Franklin Sidestep Collage'}
                          </span>
                        </div>
                        <div className={`date-range ${!itemCo.dateFrom?.date && !itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''} ${!itemCo.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.dateFrom?.date && (checkForSymbol([itemCo.dateTo?.date]) ? moment(itemCo.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemCo.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemCo.dateTo?.date ? 'empty-field' : ''} ${!itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.dateTo?.date && (moment(itemCo.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`extra-curricular-activities-block block-block ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="left-side">
                  <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                  </svg>
                </div>
                <div className="right-side">
                  <div className="cv-heading font-size-3 additional-color-1-text">Extra-curricular activities</div>
                  {
                    extra_curricular.map((itemEx, index) => (
                      <div className="block-info" key={index}>
                        <div className={`cv-subheading font-size-2 ${!itemEx.title && !itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEx.title ? 'empty-field' : ''} ${!itemEx.title && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEx.employer]) ? itemEx.title + ', ' : itemEx.title || 'UX Designer'}
                          </span>
                          <span className={`${!itemEx.employer ? 'empty-field' : ''} ${!itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                            {itemEx.employer || ', My own company'}
                          </span>
                        </div>
                        <div className={`date-range ${!itemEx.dateFrom?.date && !itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''} ${!itemEx.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEx.dateFrom?.date && (checkForSymbol([itemEx.dateTo?.date]) ? moment(itemEx.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEx.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEx.dateTo?.date ? 'empty-field' : ''} ${!itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEx.dateTo?.date && (moment(itemEx.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        {
                          itemEx.description && (
                            <div dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                          ) || (
                            <div className={`empty-field ${!itemEx.description && !beforeСontent ? 'hide' : ''}`}>
                              I was doing research for about five different projects. The goal was to find out the biggest issues with the current concept and solution how to solve them.
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`internships-block block-block ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="left-side">
                  <svg className="additional-color-1-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15.5713C9.61378 14.0899 8.97989 12.8874 8.04627 11.9538C7.11263 11.0201 5.91015 10.3862 4.42872 9.99999C5.91011 9.61376 7.11257 8.97985 8.04621 8.04621C8.97985 7.11257 9.61376 5.91009 10 4.42869C10.3862 5.91009 11.0201 7.11257 11.9538 8.04621C12.8874 8.97985 14.0899 9.61377 15.5713 10C14.0899 10.3862 12.8874 11.0201 11.9538 11.9538C11.0202 12.8874 10.3862 14.0899 10 15.5713Z" stroke="black" strokeWidth="0.960091" />
                  </svg>
                </div>
                <div className="right-side">
                  <div className="cv-heading font-size-3 additional-color-1-text">Internships</div>
                  {
                    internship.map((itemIn, index) => (
                      <div className="block-info" key={index}>
                        <div className={`cv-subheading font-size-2 ${!itemIn.jobTitle && !itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemIn.jobTitle ? 'empty-field' : ''} ${!itemIn.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemIn.employer, itemIn?.city]) ? itemIn.jobTitle + ', ' : itemIn.jobTitle || 'Product Designer'}
                          </span>
                          <span className={`${!itemIn.employer ? 'empty-field' : ''} ${!itemIn.employer && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemIn.city]) ? itemIn.employer + ', ' : itemIn.employer || ', Company S.A.'}
                          </span>
                          <span className={`${!itemIn.city ? 'empty-field' : ''} ${!itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                            {itemIn.city || ', Toronto'}
                          </span>
                        </div>
                        <div className={`date-range ${!itemIn.dateFrom?.date && !itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''} ${!itemIn.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemIn.dateFrom?.date && (checkForSymbol([itemIn.dateTo?.date]) ? moment(itemIn.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemIn.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemIn.dateTo?.date ? 'empty-field' : ''} ${!itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemIn.dateTo?.date && (moment(itemIn.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        {
                          itemIn.description && (
                            <div dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          ) || (
                            <div className={`empty-field ${!itemIn.description && !beforeСontent ? 'hide' : ''}`}>
                              Handled each product and package with care and precision. Handled much of the communication between clients and the lead Graphic Designer.
                              Worked productively with Product Team to understand requirements and business specifications around Portfolio Management, Analytics and Risk.
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

