import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { checkForSymbol } from "../../utils/checkForSymbol";
import { socialHelper } from "../../utils/socialHelper";

const Estimation = ({
  level = 3,
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
        'extra-curricular-activities-block',
        'internships-block',
        'references-block'
      ];
      let cvBlocksRight = [
        'education-block',
        'courses-block',
        'certificates-block',
        'hobbies-block'
      ];
      let cvBlocksBottom = [
        'bottom-block'
      ];

      let cvDataTop = [];
      let cvDataLeft = [];
      let cvDataRight = [];
      let cvDataBottom = [];

      cvBlocksTop.forEach(function (el) {
        cvDataTop.push($('.' + el).clone());
      });
      cvBlocksLeft.forEach(function (el) {
        cvDataLeft.push($('.' + el).clone());
      });
      cvBlocksRight.forEach(function (el) {
        cvDataRight.push($('.' + el).clone());
      });
      cvBlocksBottom.forEach(function (el) {
        cvDataBottom.push($('.' + el).clone());
      });

      current_page_number = 1;
      cvDataTop.forEach(function (el) {
        getPageColumnTop().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnTop().append(el);
        }
      });

      current_page_number = 1;
      cvDataRight.forEach(function (el) {
        getPageColumnRight().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnRight().append(el);
        }
      });

      current_page_number = 1;
      cvDataLeft.forEach(function (el) {
        getPageColumnLeft().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnLeft().append(el);
        }
      });

      current_page_number = 1;
      cvDataBottom.forEach(function (el) {
        getPageColumnBottom().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnBottom().append(el);
        }
      });
      checkEmpty();
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
      return getPageContainer().outerHeight() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
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

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }
      return page_element_container;
    }
    function checkEmpty() {
      $('.cv-body-area').each(function (index, el) {
        if ($(this).height() === 0) {
          $(this).remove();
        }
      });
    }
    function secondaryInfoHelper() {
      $('.cv-body-visible .js-profile-secondary-info .item-block').each(function () {
        $('.js-profile-secondary-info').removeClass('m-transfer');
        if ($(this).height() > 15) {
          $('.js-profile-secondary-info').addClass('m-transfer');
          return;
        } else {
          $('.js-profile-secondary-info').removeClass('m-transfer');
        }
      })
    }
    rebuildingPages();
    secondaryInfoHelper();
  }
}

export const ResumeCv001 = ({
  data,
  dataNew,
  stateClasses,
  reportTemplateRef,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  objActiveBlock,
  beforeСontent,
  isPdf = false
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
    if (isPdf) return;

    if (!!isDrawing) {
      handleFalseDrafind();
      drawing();
    }
  }, [isDrawing, data, stateClasses]);

  if (objActiveBlock) {
    if (typeof window != 'undefined')
      hideEmpty();
  }
  function hideEmpty() {
    employment.forEach(function (el, i) {
      if (i < (employment.length - 1)) {
        $('.employment-history-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.employment === false && (el.assignment !== "" || el.city !== "" || el.company !== "" || el.country !== "" || el.title !== "" || el.periodFrom !== null || el.periodTo !== null)) {
        $('.employment-history-block').find('.empty-field').hide();
      }
      if (objActiveBlock.employment && employment.length === 1) {
        $('.employment-history-block').find('.empty-field').show();
      }
      if (objActiveBlock.employment) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    education.forEach(function (el, i) {
      if (i < (education.length - 1)) {
        $('.education-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.education === false && (el.awards !== "" || el.study !== "" || el.facility !== "" || el.description !== "" || el.degree !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.education-block').find('.empty-field').hide();
      }
      if (objActiveBlock.education && education.length === 1) {
        $('.education-block').find('.empty-field').show();
      }
      if (objActiveBlock.education) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    courses.forEach(function (el, i) {
      if (i < (courses.length - 1)) {
        $('.courses-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.courses === false && (el.title !== "" || el.institution !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.courses-block').find('.empty-field').hide();
      }
      if (objActiveBlock.courses && courses.length === 1) {
        $('.courses-block').find('.empty-field').show();
      }
      if (objActiveBlock.courses) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    extra_curricular.forEach(function (el, i) {
      if (i < (extra_curricular.length - 1)) {
        $('.extra-curricular-activities-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.extra_curricular === false && (el.city !== "" || el.country !== "" || el.description !== "" || el.employer !== "" || el.title !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.extra-curricular-activities-block').find('.empty-field').hide();
      }
      if (objActiveBlock.extra_curricular && extra_curricular.length === 1) {
        $('.extra-curricular-activities-block').find('.empty-field').show();
      }
      if (objActiveBlock.extra_curricular) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    internship.forEach(function (el, i) {
      if (i < (internship.length - 1)) {
        $('.internships-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.internship === false && (el.city !== "" || el.country !== "" || el.description !== "" || el.employer !== "" || el.jobTitle !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.internships-block').find('.empty-field').hide();
      }
      if (objActiveBlock.internship && internship.length === 1) {
        $('.internships-block').find('.empty-field').show();
      }
      if (objActiveBlock.internship) {
        $('div, span, p').not('.empty-field').show();
      }
    });
    reference.forEach(function (el, i) {
      if (i < (reference.length - 1)) {
        $('.references-block').find('.block-info').eq(i).find('.empty-field').hide();
      }
      if (objActiveBlock.reference === false && (el.company !== "" || el.email !== "" || el.fullName !== "" || el.phone !== "")) {
        $('.references-block').find('.empty-field').hide();
      }
      if (objActiveBlock.reference && reference.length === 1) {
        $('.references-block').find('.empty-field').show();
      }
      if (objActiveBlock.reference) {
        $('div, span, p').not('.empty-field').show();
      }
    });
  }

  return (
    <div className="sv_001" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body">
          <div className="cv-body-content font-size-1 main-color-1-text">
            <div className="cv-body-area area-1 additional-color-3-background font-size-1 main-color-1-text">
              <div className={`top-block columns-wrapper ${objActiveBlock?.contact ? "active" : ""}`}>
                <div className="column-left">
                  {
                    isArray(contact) && (
                      <div className={`cv-name font-size-3 ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                          {contact[0].firstName || 'Matthew'}{` `}
                        </span>
                        <span className={`${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                          {contact[0].lastName || 'Mcconaughey'}
                        </span>
                      </div>
                    )
                  }
                  <div className="personal-info-block">
                    <div className="profile-info">
                      {
                        isArray(contact) && contact[0]?.picture && (
                          <div className="photo-block">
                            <div className="photo" style={{ backgroundImage: `url(${contact[0].picture})` }}></div>
                          </div>
                        )
                      }
                      <div className={`profile ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                        <div className="cv-heading font-size-2">Profile</div>
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
                  </div>
                  {
                    isArray(contact) && (
                      <div className="profile-secondary-info js-profile-secondary-info">
                        <div className={`item-block ${!contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          <span className="name">Birth Date</span>
                          {
                            contact[0]?.dateOfBirth && (
                              <span className="value additional-color-1-text">{moment(contact[0].dateOfBirth).format("DD-MM-yy")}</span>
                            ) || (
                              <span className="value empty-field additional-color-1-text">14-08-1991</span>
                            )
                          }
                        </div>
                        <div className={`item-block ${!contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          <span className="name">Place of Birth</span>
                          {
                            contact[0]?.placeOfBirth && (
                              <span className="value additional-color-1-text">{contact[0].placeOfBirth}</span>
                            ) || (
                              <span className="value empty-field additional-color-1-text">Berlin</span>
                            )
                          }
                        </div>
                        <div className={`item-block ${!contact[0]?.nationality && !beforeСontent ? 'hide' : ''}`}>
                          <span className="name">Nationality</span>
                          {
                            contact[0]?.nationality && (
                              <span className="value additional-color-1-text">{contact[0].nationality}</span>
                            ) || (
                              <span className="value empty-field additional-color-1-text">German</span>
                            )
                          }
                        </div>
                        <div className={`item-block ${!contact[0]?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                          <span className="name">Driving Licence</span>
                          {
                            contact[0]?.driverLicense && (
                              <span className="value additional-color-1-text">{contact[0].driverLicense}</span>
                            ) || (
                              <span className="value empty-field additional-color-1-text">Class 1</span>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className="column-right">
                  {
                    isArray(contact) && (
                      <div className={`cv-profession font-size-3 ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0]?.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0].jobTitle || 'Web-designer'}
                      </div>
                    )
                  }
                  {
                    isArray(contact) && (
                      <div className={`details-block additional-color-2-border ${!social_links.length && !contact[0].country && !contact[0].email && !contact[0].phone && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                        <div className={`details-block-info ${!contact[0].country && !contact[0].email && !contact[0].phone && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                          <div className="cv-heading font-size-2">Details</div>
                          <p className={`address ${!contact[0].country && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!contact[0].address ? 'empty-field' : ''} ${!contact[0].address && !beforeСontent ? 'hide' : ''}`}>
                              {`${contact[0].address ? checkForSymbol([contact[0].city, contact[0].zipCode, contact[0].country]) ? contact[0].address + ', ' : contact[0].address : '5th Avenue Street, '}`}
                            </span>
                            <span className={`${!contact[0].city ? 'empty-field' : ''} ${!contact[0].city && !beforeСontent ? 'hide' : ''}`}>
                              {`${contact[0].city ? checkForSymbol([contact[0].zipCode, contact[0].country]) ? contact[0].city + ', ' : contact[0].city : contact[0].address && !contact[0].zipCode && !contact[0].country ? ', New York City, ' : 'New York City, '}`}
                            </span>
                            <span className={`${!contact[0].zipCode ? 'empty-field' : ''} ${!contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                              {`${contact[0].zipCode ? checkForSymbol([contact[0].country]) ? contact[0].zipCode + ', ' : contact[0].zipCode : contact[0].city && !contact[0].country ? ', 384846, ' : '384846, '}`}
                            </span>
                            <span className={`${!contact[0].country ? 'empty-field' : ''} ${!contact[0].country && !beforeСontent ? 'hide' : ''}`}>
                              {`${contact[0].country ? contact[0].country : contact[0].zipCode ? ', United States' : 'United States'}`}
                            </span>
                          </p>
                          <p className={`phone ${!contact[0].phone ? 'empty-field' : ''} ${!contact[0]?.phone && !beforeСontent ? 'hide' : ''}`}>
                            {contact[0].phone || '736-343-9384'}
                          </p>
                          <p className={`email ${!contact[0].email ? 'empty-field' : ''} ${!contact[0]?.email && !beforeСontent ? 'hide' : ''}`}>
                            {contact[0].email || 'designer@webservice.com'}
                          </p>
                        </div>
                        <div className={`links-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                          <div className="cv-heading font-size-2">Links </div>
                          {
                            isArray(social_links) && social_links.length && (
                              social_links.map((itemSocial, index) => (
                                <a href={itemSocial.link} className="links-item additional-color-1-svg" key={index}>
                                  {socialHelper(itemSocial.name)}
                                </a>
                              ))
                            ) || (
                              <>
                                <a className="links-item empty-field additional-color-1-svg">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><path d="M11.5,0A11.49,11.49,0,0,0,9.88,22.87V15.22H6.64V12H9.88V9.27c0-3.07,1.5-4.42,4-4.42A20.41,20.41,0,0,1,16.36,5V8.09H14.58c-1.08,0-1.46.57-1.46,1.73V12h3.24l-.65,3.24H13.12v7.65A11.49,11.49,0,0,0,11.5,0Z" /><path d="M11.3,23h0Z" /></g></g></svg>
                                </a>
                                <a className="links-item empty-field additional-color-1-svg">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><path d="M11.5,0A11.5,11.5,0,1,0,23,11.5,11.5,11.5,0,0,0,11.5,0ZM7.73,17.87H4.84V9.18H7.73ZM6.29,8A1.45,1.45,0,1,1,7.73,6.57,1.44,1.44,0,0,1,6.29,8Zm11.87,9.85H15.38V13.64c0-1,0-2.3-1.45-2.3s-1.67,1.1-1.67,2.23v4.3H9.47V9.18h2.68v1.18h0A3,3,0,0,1,14.82,9c2.82,0,3.34,1.8,3.34,4.14Z" /></g></g></svg>
                                </a>
                              </>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="cv-body-area area-2">
              <div className="column-left additional-color-1-border">
                <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2 additional-color-1-text">Employment history</div>
                  {
                    employment.map((itemEm, index) => (
                      <div className="block-info" key={index}>
                        <div className={`date-range additional-color-2-text ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''} ${!itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MMMM yy") + ' - ' : moment(itemEm.periodFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''} ${!itemEm.periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        <div className={`cv-subheading ${!itemEm.title && !itemEm.company && itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEm.title ? 'empty-field' : ''} ${!itemEm.title && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEm.company, itemEm.city]) ? (itemEm.title || 'Web Designer') + ', ' : itemEm.title || 'Web Designer'}
                          </span>
                          <span className={`${!itemEm.company ? 'empty-field' : ''} ${!itemEm.company && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEm.city]) ? (itemEm.company || 'Apple INC.') + ', ' : itemEm.company || ', Apple INC.'}
                          </span>
                          <span className={`${!itemEm.city ? 'empty-field' : ''} ${!itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.city || ', New York City'}
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
                <div className={`extra-curricular-activities-block block-block ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2 additional-color-1-text">Extra-curricular activities</div>
                  {
                    extra_curricular.map((itemEx, index) => (
                      <div className="block-info" key={index}>
                        <div className={`date-range additional-color-2-text ${!itemEx.dateFrom?.date && !itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''} ${!itemEx.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEx.dateFrom?.date && (checkForSymbol([itemEx.dateTo?.date]) ? moment(itemEx.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEx.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEx.dateTo?.date ? 'empty-field' : ''} ${!itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEx.dateTo?.date && (moment(itemEx.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        <div className={`cv-subheading ${!itemEx.title && !itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEx.title ? 'empty-field' : ''} ${!itemEx.title && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEx.employer]) ? (itemEx.title || 'UX Designer') + ', ' : itemEx.title || 'UX Designer'}
                          </span>
                          <span className={`${!itemEx.employer ? 'empty-field' : ''} ${!itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                            {itemEx.employer || ', My own company'}
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
                <div className={`internships-block block-block ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2 additional-color-1-text">Internships</div>
                  {
                    internship.map((itemIn, index) => (
                      <div className="block-info" key={index}>
                        <div className={`date-range additional-color-2-text ${!itemIn.dateFrom?.date && !itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''} ${!itemIn.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemIn.dateFrom?.date && (checkForSymbol([itemIn.dateTo?.date]) ? moment(itemIn.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemIn.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemIn.dateTo?.date ? 'empty-field' : ''} ${!itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemIn.dateTo?.date && (moment(itemIn.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        <div className={`cv-subheading ${!itemIn.jobTitle && !itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemIn.jobTitle ? 'empty-field' : ''} ${!itemIn.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemIn.employer, itemIn.city]) ? (itemIn.jobTitle || 'Product Designer') + ', ' : itemIn.jobTitle || 'Product Designer'}
                          </span>
                          <span className={`${!itemIn.employer ? 'empty-field' : ''} ${!itemIn.employer && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemIn.city]) ? (itemIn.employer || 'Company S.A.') + ', ' : itemIn.employer || ', Company S.A.'}
                          </span>
                          <span className={`${!itemIn.city ? 'empty-field' : ''} ${!itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                            {itemIn.city || ', Toronto'}
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
                <div className={`references-block block-block ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2 additional-color-1-text">References</div>
                  {
                    reference.map((itemRef, index) => (
                      <div className="block-info" key={index}>
                        <div className={`cv-subheading ${!itemRef.fullName && !itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemRef.fullName ? 'empty-field' : ''} ${!itemRef.fullName && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemRef.company]) ? (itemRef.fullName || 'Full name') + ', ' : itemRef.fullName || 'Full name'}
                          </span>
                          <span className={`${!itemRef.company ? 'empty-field' : ''} ${!itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                            {itemRef.company || ', Company'}
                          </span>
                        </div>
                        <p className={`${!itemRef.email ? 'empty-field' : ''} ${!itemRef.email && !beforeСontent ? 'hide' : ''}`}>
                          {itemRef.email || 'references@webservice.com'}
                        </p>
                        <p className={`${!itemRef.phone ? 'empty-field' : ''} ${!itemRef.phone && !beforeСontent ? 'hide' : ''}`}>
                          {itemRef.phone || '736-343-9384'}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="column-right">
                <div className={`education-block block-block ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2 additional-color-1-text">Education</div>
                  {
                    education.map((itemEd, index) => (
                      <div className="block-info" key={index}>
                        <div className={`date-range additional-color-2-text ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''} ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemEd.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''} ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        <p className={`cv-degree additional-color-2-text ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.degree ? itemEd.degree : 'Bachelor'}
                        </p>
                        <div className={`cv-subheading ${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.study ? itemEd.study : 'Marketing and Management'}
                        </div>
                        <p className={`cv-college ${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.facility ? itemEd.facility : 'Harcum College, Portland'}
                        </p>
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
                <div className={`courses-block block-block ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2 additional-color-1-text">Courses</div>
                  {
                    courses.map((itemCo, index) => (
                      <div className="block-info" key={index}>
                        <div className={`date-range additional-color-2-text ${!itemCo.dateFrom?.date && !itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''} ${!itemCo.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.dateFrom?.date && (checkForSymbol([itemCo.dateTo?.date]) ? moment(itemCo.dateFrom.date).format("MMMM yy") + ' - ' : moment(itemCo.dateFrom.date).format("MMMM yy")) || 'March 2022'}
                          </span>
                          <span className={`${!itemCo.dateTo?.date ? 'empty-field' : ''} ${!itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.dateTo?.date && (moment(itemCo.dateTo.date).format("MMMM yy")) || ' - December 2022'}
                          </span>
                        </div>
                        <div className={`cv-subheading ${!itemCo.title ? 'empty-field' : ''} ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.title ? itemCo.title : 'Super course 1'}
                        </div>
                        <p className={`${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.institution ? itemCo.institution : 'Benjamin Franklin Sidestep Collage, Portland'}
                        </p>
                      </div>
                    ))
                  }
                </div>
                <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2 additional-color-1-text">Certificates</div>
                  {
                    certificates.map((item, index) => (
                      <div key={index} className={`cv-subheading ${!item.name ? 'empty-field' : ''}`}>
                        {item.name ? item.name : 'Certificate name'}
                      </div>
                    ))
                  }
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
              </div>
            </div>
            <div className="cv-body-area area-3">
              <div className="bottom-block additional-color-3-background">
                <div className="column-left">
                  <div className={`skills-block ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                    <div className="cv-heading main-color-2-text font-size-2 additional-color-1-background">Skills</div>
                    <div className="skills-estimation-block">
                      {
                        skills.map((item, index) => (
                          <div className={`skill-item ${!item.name ? 'empty-field' : ''}`} key={index}>
                            <p className="skill-name">
                              {item.name ? item.name : 'Skill name'}
                            </p>
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
                </div>
                <div className="column-right">
                  <div className={`languages-block ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                    <div className="cv-heading main-color-2-text font-size-2 additional-color-1-background">Language</div>
                    <div className="skills-estimation-block">
                      {
                        languages.map((item, index) => (
                          <div className={`skill-item ${!item.language ? 'empty-field' : ''}`} key={index}>
                            <p className="skill-name">
                              {item.language ? item.language : 'Language'}
                            </p>
                            <Estimation
                              level={item.level}
                              startLeng={6}
                            />
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
      </div>
    </div>
  )
}

