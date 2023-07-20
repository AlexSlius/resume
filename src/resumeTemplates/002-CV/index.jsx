import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';
import styled from 'styled-components';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";

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

const drawing = () => {
  if (typeof window != "undefined") {
    var current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let cvBlocksTop = [
        'top-block'
      ];
      let cvBlocksLeft = [
        'employment-history-block',
        'education-block',
        'courses-block',
        'extra-curricular-activities-block',
        'internships-block'
      ];
      let cvBlocksRight = [
        'profile-info-block',
        'skills-block',
        'languages-block',
        'certificates-block',
        'references-block',
        'hobbies-block'
      ];
      let cvBlocksBottom = [
        'bottom-block'
      ];

      let cvDataTop = [];
      let cvDataLeft = [];
      let cvDataRight = [];
      let cvDataBottom = [];

      cvBlocksTop.forEach(function(el){
        cvDataTop.push($('.' + el).clone());
      });
      cvBlocksLeft.forEach(function(el){
        cvDataLeft.push($('.' + el).clone());
      });
      cvBlocksRight.forEach(function(el){
        cvDataRight.push($('.' + el).clone());
      });
      cvBlocksBottom.forEach(function(el){
        cvDataBottom.push($('.' + el).clone());
      });

      current_page_number = 1;
      cvDataTop.forEach(function(el) {
        getPageColumnTop().append(el);
        if(checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnTop().append(el);
        }
      });

      current_page_number = 1;
      cvDataLeft.forEach(function(el) {
        getPageColumnLeft().append(el);
        if(checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnLeft().append(el);
        }
      });

      current_page_number = 1;
      cvDataRight.forEach(function(el) {
        getPageColumnRight().append(el);
        if(checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnRight().append(el);
        }
      });

      current_page_number = 1;
      cvDataBottom.forEach(function(el) {
        getPageColumnBottom().append(el);
        if(checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnBottom().append(el);
        }
      });
    }
    function getPageColumnTop() {
      return getPageContainer().find('.area-1');
    }
    function getPageColumnLeft() {
      return getPageContainer().find('.area-2 .column-left');
    }
    function getPageColumnRight() {
      return getPageContainer().find('.area-2 .column-right');
    }
    function getPageColumnBottom() {
      return getPageContainer().find('.area-3');
    }
    function checkHeight() {
      return getPageContainer().outerHeight() > $('.cv-body.cv-body-visible.page-' + current_page_number).height() - 40;
    }
    function getPageContainer() {
      var page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
      if (page.length > 0) {
        return page.find('.cv-body-content');
      } else {
        return createNewPage(current_page_number);
      }
    }
    function createNewPage() {
      var page_element = $('#cv-body-hidden-container').clone();
      page_element.attr('id', '');
      page_element.attr('class', 'cv-body cv-body-visible cv-body-1 page-' + current_page_number);
      page_element.children().remove();
    
      var page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();
      page_element_container.children().remove();
      page_element.append(page_element_container);

      var area_1 = $('#cv-body-hidden-container .cv-body-content .area-1').clone();
      area_1.children().remove();
      current_page_number === 1 && page_element_container.append(area_1);

      var area_2 = $('#cv-body-hidden-container .cv-body-content .area-2').clone();
      area_2.children().remove();
      page_element_container.append(area_2);

      var area_2_left = $('#cv-body-hidden-container .cv-body-content .area-2 .column-left').clone();
      area_2_left.children().remove();
      area_2.append(area_2_left);

      var area_2_right = $('#cv-body-hidden-container .cv-body-content .area-2 .column-right').clone();
      area_2_right.children().remove();
      area_2.append(area_2_right);
    
      var area_3 = $('#cv-body-hidden-container .cv-body-content .area-3').clone();
      area_3.children().remove();
      page_element_container.append(area_3);
    
      if($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }
    
      return page_element_container;
    }

    setTimeout(function(){
      rebuildingPages();
    }, 100)
    
  }
}

export const ResumeCv002 = ({
  data,
  dataNew,
  stateClasses,
  reportTemplateRef,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  objActiveBlock,
  beforeСontent,
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
  } = dataNew;

  useEffect(() => {
    if (isTemplate) {
        drawing();
    }

    if (!!isDrawing && !isTemplate) {
        drawing();
        handleFalseDrafind();
    }
}, [isDrawing, data, stateClasses]);

  return (
    <div className="sv_002" ref={reportTemplateRef}>
      <WrDiv id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section has-photo`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body">
          <div className="cv-body-content additional-color-2-border font-size-1 main-color-1-text">
            <div className="cv-body-area area-1">
              <div className="top-block">
                <div className="personal-info-block">
                  {
                    contact?.[0]?.picture && (
                      <div className="photo-block">
                        <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                      </div>
                    )
                  }
                  <div className="cv-heading-wrap">
                    <div className="cv-name font-size-4 additional-color-1-text">
                      <span className={`${!contact[0].firstName ? 'empty-field' : ''}`}>
                        {`${contact[0].firstName || 'Matthew'} `}
                      </span>
                      <span className={`${!contact[0].lastName ? 'empty-field' : ''}`}>
                        {`${contact[0].lastName || 'Mcconaughey'}`}
                      </span>
                    </div>
                    <div className={`cv-profession font-size-2 additional-color-1-text ${!contact[0].jobTitle ? 'empty-field' : ''}`}>
                      {contact[0].jobTitle || 'Web-designer'}
                    </div>
                  </div>
                </div>
                <div className="profile-secondary-info additional-color-2-border m-default">
                  <div className="item-block">
                    <span className="name additional-color-2-text">Birth Date</span>
                    {
                      contact[0]?.dateOfBirth && (
                        <span className="value additional-color-1-text">{moment(contact[0].dateOfBirth).format("DD-MM-yy")}</span>
                      ) || (
                        <span className="value empty-field additional-color-1-text">14-08-1991</span>
                      )
                    }
                  </div>
                  <div className="item-block">
                    <span className="name additional-color-2-text">Place of Birth</span>
                    {
                      contact[0]?.placeOfBirth && (
                        <span className="value additional-color-1-text">{contact[0].placeOfBirth}</span>
                      ) || (
                        <span className="value empty-field additional-color-1-text">Berlin</span>
                      )
                    }
                  </div>
                  <div className="item-block">
                    <span className="name additional-color-2-text">Nationality</span>
                    {
                      contact[0]?.nationality && (
                        <span className="value additional-color-1-text">{contact[0].nationality}</span>
                      ) || (
                        <span className="value empty-field additional-color-1-text">German</span>
                      )
                    }
                  </div>
                  <div className="item-block">
                    <span className="name additional-color-2-text">Driving Licence</span>
                    {
                      contact[0]?.driverLicense && (
                        <span className="value additional-color-1-text">{contact[0].driverLicense}</span>
                      ) || (
                        <span className="value empty-field additional-color-1-text">Class 1</span>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="cv-body-area middle-area area-2">
              <div className="column-left additional-color-2-border">
                <div className="employment-history-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Employment history
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    employment.map((itemEm, index) => (
                      <div className="block-info" key={index}>
                        <div className="cv-subheading">
                          <span className={`${!itemEm.title ? 'empty-field' : ''}`}>
                            {checkForSymbol([itemEm.company]) ? itemEm.title + ', ' : itemEm.title || 'Web Designer'}
                          </span>
                          <span className={`${!itemEm.company ? 'empty-field' : ''}`}>
                            {itemEm.company || ', Apple INC.'}
                          </span>
                        </div>
                        <div className={`${!itemEm.city ? 'empty-field' : ''}`}>
                          {itemEm.city || 'New York City'}
                        </div>
                        <div className="date-range additional-color-2-text">
                          <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''}`}>
                            {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MMMM yy") + ' - ' : moment(itemEm.periodFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''}`}>
                            {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        {
                          itemEm.assignment && (
                            <div className="text-block" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          ) || (
                            <div className="text-block empty-field">
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
                <div className="education-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Education
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    education.map((itemEd, index) => (
                      <div className="block-info" key={index}>
                        <div className={`cv-subheading ${!itemEd.study ? 'empty-field' : ''}`}>
                          {itemEd.study ? itemEd.study : 'Marketing and Management'}
                        </div>
                        <div className={`cv-college ${!itemEd.facility ? 'empty-field' : ''}`}>
                          {itemEd.facility ? itemEd.facility : 'Harcum College, Portland'}
                        </div>
                        <div className={`cv-degree ${!itemEd.degree ? 'empty-field' : ''}`}>
                          {itemEd.degree ? itemEd.degree : 'Bachelor'}
                        </div>
                        <div className="date-range additional-color-2-text">
                          <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''}`}>
                            {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''}`}>
                            {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        {
                          itemEd.description && (
                            <div className="text-block" dangerouslySetInnerHTML={{ __html: itemEd.description }}></div>
                          ) || (
                            <div className="text-block empty-field">
                              I have learned to merge marketing and management skills in a very efficient way and produce great results. Even though managing hundreds of people is hard, all skills are learned to do that.
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div >
                <div className="courses-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Courses
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    courses.map((itemCo, index) => (
                      <div className="block-info" key={index}>
                        <div className={`cv-subheading ${!itemCo.title ? 'empty-field' : ''}`}>
                          {itemCo.title ? itemCo.title : 'Super course 1'}
                        </div>
                        <div className={`${!itemCo.institution ? 'empty-field' : ''}`}>
                          {itemCo.institution ? itemCo.institution : 'Benjamin Franklin Sidestep Collage, Portland'}
                        </div>
                        <div className="date-range additional-color-2-text">
                          <span className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''}`}>
                            {itemCo.dateFrom?.date && (checkForSymbol([itemCo.dateTo?.date]) ? moment(itemCo.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemCo.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemCo.dateTo?.date ? 'empty-field' : ''}`}>
                            {itemCo.dateTo?.date && (moment(itemCo.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="extra-curricular-activities-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Extra-curricular activities
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    extra_curricular.map((itemEx, index) => (
                      <div className="block-info" key={index}>
                        <div className="cv-subheading">
                          <span className={`${!itemEx.title ? 'empty-field' : ''}`}>
                            {checkForSymbol([itemEx.employer]) ? itemEx.title + ', ' : itemEx.title || 'UX Designer'}
                          </span>
                          <span className={`${!itemEx.employer ? 'empty-field' : ''}`}>
                            {itemEx.employer || ', My own company'}
                          </span>
                        </div>
                        <div className="date-range additional-color-2-text">
                          <span className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''}`}>
                            {itemEx.dateFrom?.date && (checkForSymbol([itemEx.dateTo?.date]) ? moment(itemEx.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEx.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEx.dateTo?.date ? 'empty-field' : ''}`}>
                            {itemEx.dateTo?.date && (moment(itemEx.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        {
                          itemEx.description && (
                            <div className="text-block" dangerouslySetInnerHTML={{ __html: itemEx.description }}></div>
                          ) || (
                            <div className="text-block empty-field">
                              I was doing research for about five different projects. The goal was to find out the biggest issues with the current concept and solution how to solve them.
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
                <div className="internships-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Internships
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    internship.map((itemIn, index) => (
                      <div className="block-info" key={index}>
                        <div className="cv-subheading">
                          <span className={`${!itemIn.jobTitle ? 'empty-field' : ''}`}>
                            {checkForSymbol([itemIn.employer]) ? itemIn.jobTitle + ', ' : itemIn.jobTitle || 'Product Designer'}
                          </span>
                          <span className={`${!itemIn.employer ? 'empty-field' : ''}`}>
                            {itemIn.employer || ', Company S.A.'}
                          </span>
                        </div>
                        <div className={`${!itemIn.city ? 'empty-field' : ''}`}>
                          {itemIn.city || 'Toronto'}
                        </div>
                        <div className="date-range additional-color-2-text">
                          <span className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''}`}>
                            {itemIn.dateFrom?.date && (checkForSymbol([itemIn.dateTo?.date]) ? moment(itemIn.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemIn.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemIn.dateTo?.date ? 'empty-field' : ''}`}>
                            {itemIn.dateTo?.date && (moment(itemIn.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        {
                          itemIn.description && (
                            <div className="text-block" dangerouslySetInnerHTML={{ __html: itemIn.description }}></div>
                          ) || (
                            <div className="text-block empty-field">
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
              <div className="column-right">
                <div className="profile-info-block">
                  <div className="profile-block block-block">
                    <div className="cv-heading font-size-2 additional-color-1-text">Profile
                      <span className="line-after-block-heading additional-color-1-border"></span>
                    </div>
                    {
                      career_objective?.[0]?.data && (
                        <div dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                      ) || (
                        <div className="empty-field">
                          Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                        </div>
                      )
                    } 
                  </div>
                </div>
                <div className="skills-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Skills
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  <div className="skills-estimation-block">
                    {
                      skills.map((item, index) => (
                        <div className={`skill-item ${!item.name? 'empty-field' : ''}`} key={index}>
                          <div className="skill-name">
                            {item.name ? item.name : 'Skill name'}
                          </div>
                          {
                            !hide_experience_level && (
                              <Estimation level={item.level} />
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="languages-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Languages
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  <div className="skills-estimation-block">
                    {
                      languages.map((item, index) => (
                        <div className={`skill-item ${!item.language? 'empty-field' : ''}`} key={index}>
                          <div className="skill-name">
                            {item.language ? item.language : 'Language'}
                          </div>
                          <Estimation
                            level={item.level}
                            startLeng={6}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="certificates-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Certificates
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    certificates.map((item, index) => (
                      <div className="block-info" key={index}>
                        <div key={index} className={`${!item.name ? 'empty-field' : ''}`}>
                          {item.name ? item.name : 'Certificate name'}
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="references-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">References
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    reference.map((itemRef, index) => (
                      <div className="block-info" key={index}>
                        <div className="cv-subheading">
                          <span className={`${!itemRef.fullName ? 'empty-field' : ''}`}>
                            {checkForSymbol([itemRef.company]) ? itemRef.fullName + ', ' : itemRef.fullName || 'Full name'}
                          </span>
                          <span className={`${!itemRef.company ? 'empty-field' : ''}`}>
                            {itemRef.company || ', Company'}
                          </span>
                        </div>
                        <p className={`${!itemRef.email ? 'empty-field' : ''}`}>
                          {itemRef.email || 'references@webservice.com'}
                        </p>
                        <p className={`${!itemRef.phone ? 'empty-field' : ''}`}>
                          {itemRef.phone || '736-343-9384'}
                        </p>
                      </div>
                    ))
                  }
                </div>
                <div className="hobbies-block block-block">
                  <div className="cv-heading font-size-2 additional-color-1-text">Hobbies
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
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
              </div>
            </div>
            <div className="cv-body-area area-3">
              <div className="bottom-block additional-color-2-border">
                <div className="column-left">
                  <div className="details-block block-block">
                    <div className="cv-heading">Details</div>
                      <div className="block-item">
                        <div className="name additional-color-2-text">Phone:</div>
                        <div className={`value ${!contact[0].phone ? 'empty-field' : ''}`}>
                          {contact[0].phone || '736-343-9384'}
                        </div>
                      </div>
                      <div className="block-item">
                        <div className="name additional-color-2-text">Email:</div>
                        <div className={`value ${!contact[0].email ? 'empty-field' : ''}`}>
                          {contact[0].email || 'designer@webservice.com'}
                        </div>
                      </div>
                      <div className="block-item">
                        <div className="name additional-color-2-text">Address:</div>
                        <div className=" value">
                          <span className={`${!contact[0].country ? 'empty-field' : ''}`}>
                            {`${checkForSymbol([contact[0].address, contact[0].city, contact[0].zipCode]) ? contact[0].country + ', ' : contact[0].country || 'United States, '}`}
                          </span>
                          <span className={`${!contact[0].address ? 'empty-field' : ''}`}>
                            {`${checkForSymbol([contact[0].city, contact[0].zipCode]) ? contact[0].address + ', ' : contact[0].address || '5th Avenue Street, '}`}
                          </span>
                          <span className={`${!contact[0].city ? 'empty-field' : ''}`}>
                            {`${checkForSymbol([contact[0].zipCode]) ? contact[0].city + ', ' : contact[0].city || 'New York City, '}`}
                          </span>
                          <span className={`${!contact[0].zipCode ? 'empty-field' : ''}`}>
                            {`${contact[0].zipCode || '384846'}`}
                          </span>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="column-right">
                  <div className="career-links block-block">
                    <div className="cv-heading">Links</div>
                    {
                      isArray(social_links) && social_links.length && (
                        social_links.map((itemSocial, index) => (
                          <a className="links-item" key={index}>
                            {/* <img src={itemSocial.icon} alt={itemSocial.name}/> */}
                          </a>
                        ))
                      ) || (
                        <>
                          <a className="links-item empty-field">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M13.6466 1.33335H2.35329C2.22634 1.33158 2.10029 1.35484 1.98233 1.4018C1.86438 1.44876 1.75683 1.51849 1.66582 1.60702C1.57482 1.69555 1.50215 1.80113 1.45195 1.91775C1.40176 2.03437 1.37503 2.15973 1.37329 2.28668V13.7133C1.37503 13.8403 1.40176 13.9657 1.45195 14.0823C1.50215 14.1989 1.57482 14.3045 1.66582 14.393C1.75683 14.4815 1.86438 14.5513 1.98233 14.5982C2.10029 14.6452 2.22634 14.6684 2.35329 14.6667H13.6466C13.7736 14.6684 13.8996 14.6452 14.0176 14.5982C14.1355 14.5513 14.2431 14.4815 14.3341 14.393C14.4251 14.3045 14.4978 14.1989 14.548 14.0823C14.5982 13.9657 14.6249 13.8403 14.6266 13.7133V2.28668C14.6249 2.15973 14.5982 2.03437 14.548 1.91775C14.4978 1.80113 14.4251 1.69555 14.3341 1.60702C14.2431 1.51849 14.1355 1.44876 14.0176 1.4018C13.8996 1.35484 13.7736 1.33158 13.6466 1.33335ZM5.39329 12.4933H3.39329V6.49334H5.39329V12.4933ZM4.39329 5.65334C4.11747 5.65334 3.85294 5.54377 3.6579 5.34874C3.46286 5.1537 3.35329 4.88917 3.35329 4.61334C3.35329 4.33752 3.46286 4.07299 3.6579 3.87795C3.85294 3.68292 4.11747 3.57334 4.39329 3.57334C4.53975 3.55673 4.68808 3.57125 4.82854 3.61593C4.96901 3.66062 5.09845 3.73447 5.2084 3.83265C5.31834 3.93083 5.40631 4.05113 5.46654 4.18567C5.52677 4.3202 5.5579 4.46594 5.5579 4.61334C5.5579 4.76075 5.52677 4.90649 5.46654 5.04102C5.40631 5.17556 5.31834 5.29586 5.2084 5.39404C5.09845 5.49222 4.96901 5.56607 4.82854 5.61076C4.68808 5.65544 4.53975 5.66995 4.39329 5.65334ZM12.6066 12.4933H10.6066V9.27334C10.6066 8.46668 10.32 7.94001 9.59329 7.94001C9.3684 7.94166 9.14942 8.0122 8.96585 8.14213C8.78228 8.27205 8.64295 8.45513 8.56663 8.66668C8.51445 8.82337 8.49185 8.98839 8.49996 9.15334V12.4867H6.49996C6.49996 12.4867 6.49996 7.03334 6.49996 6.48668H8.49996V7.33334C8.68164 7.01808 8.9459 6.75836 9.26425 6.58215C9.58261 6.40593 9.943 6.31991 10.3066 6.33334C11.64 6.33334 12.6066 7.19335 12.6066 9.04001V12.4933Z" fill="#605C64"/>
                            </svg>
                          </a>
                          <a className="links-item empty-field">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M13.9333 1.33334H2.06659C1.87209 1.33334 1.68557 1.41061 1.54804 1.54813C1.41051 1.68566 1.33325 1.87218 1.33325 2.06668V13.9333C1.33325 14.0296 1.35222 14.125 1.38907 14.214C1.42593 14.3029 1.47994 14.3838 1.54804 14.4519C1.61614 14.52 1.69698 14.574 1.78595 14.6109C1.87492 14.6477 1.97028 14.6667 2.06659 14.6667H8.45325V9.50001H6.71992V7.50001H8.45325V6.00001C8.41735 5.64785 8.45892 5.29209 8.57506 4.9577C8.6912 4.62331 8.8791 4.31837 9.12556 4.06428C9.37203 3.81019 9.6711 3.6131 10.0018 3.48684C10.3325 3.36057 10.6868 3.30818 11.0399 3.33334C11.5588 3.33015 12.0774 3.35686 12.5933 3.41334V5.21334H11.5333C10.6933 5.21334 10.5333 5.61334 10.5333 6.19334V7.48001H12.5333L12.2733 9.48001H10.5333V14.6667H13.9333C14.0296 14.6667 14.1249 14.6477 14.2139 14.6109C14.3029 14.574 14.3837 14.52 14.4518 14.4519C14.5199 14.3838 14.5739 14.3029 14.6108 14.214C14.6476 14.125 14.6666 14.0296 14.6666 13.9333V2.06668C14.6666 1.97037 14.6476 1.87501 14.6108 1.78604C14.5739 1.69707 14.5199 1.61623 14.4518 1.54813C14.3837 1.48004 14.3029 1.42602 14.2139 1.38917C14.1249 1.35231 14.0296 1.33334 13.9333 1.33334Z" fill="#605C64"/>
                            </svg>
                          </a>
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrDiv>
    </div>
  )
}

const WrDiv = styled.div`
//   .additional-color-1 {
//     color: red!important;
//     }
    
//     .additional-color-1-background {
//     background-color: red!important;
//     }
    
//     .additional-color-1-border {
//     border-color: red!important;
//     }
`;


