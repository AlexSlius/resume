import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";

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
          <span key={index} className={`estimation-point main-color-2-border ${(index + 1) <= pros ? "main-color-2-background" : ""}`}></span>
        ))
      }
    </div>
  )
}

const drawing = () => {
  if (typeof window != "undefined") {
    var current_page_number = 1;

    function rebuildingPages() {
      $(`.cv-body.cv-body-visible`).each(function(){
        $(this).remove();
    });

      let cvBlocksTop = [
        'profile-info-block.no-photo'
      ];
      let cvBlocksLeft = [
        'photo-block',
        'skills-block',
        'languages-block',
        'hobbies-block'
      ];
      let cvBlocksRight = [
        'profile-info-block.is-photo',
        'details-block',
        'education-block',
        'work-experience-block',
        'certificates-block',
        'references-block',
      ];

      let cvDataTop = [];
      let cvDataLeft = [];
      let cvDataRight = [];

      cvBlocksTop.forEach(function (el) {
        cvDataTop.push($('.' + el).clone());
      });
      cvBlocksLeft.forEach(function (el) {
        cvDataLeft.push($('.' + el).clone());
      });
      cvBlocksRight.forEach(function (el) {
        cvDataRight.push($('.' + el).clone());
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
      cvDataLeft.forEach(function (el) {
        getPageColumnLeft().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageColumnLeft().append(el);
        }
      });

      current_page_number = 1;
      cvDataRight.forEach(function (el, index) {
        getPageColumnRight().append(el);
        if (cvBlocksRight[index] === 'work-experience-block') {
          el.find('.work-experience-subblock').each(function () {
            el.append($(this));
            if (checkHeight()) {
              $(this).remove();
              current_page_number++;
              var area_work = $('#cv-body-hidden-container .cv-body-content .work-experience-block').clone();
              area_work.children().remove();
              getPageColumnRight().append(area_work);
              area_work.append($(this));
            }
          });
          workHelper();

        } else {
          if (checkHeight()) {
            el.remove();
            current_page_number++;
            getPageColumnRight().append(el);
          }
        }
      });
      checkEmpty();
    }
    function getPageColumnTop() {
      return getPageContainer().find('.area-top');
    }
    function getPageColumnLeft() {
      return getPageContainer().find('.area-1');
    }
    function getPageColumnRight() {
      return getPageContainer().find('.area-2');
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

      var area_top = $('#cv-body-hidden-container .cv-body-content .area-top').clone();
      area_top.children().remove();
      page_element_container.append(area_top);

      var area_middle = $('#cv-body-hidden-container .cv-body-content .main-columns-wrapper').clone();
      area_middle.children().remove();
      page_element_container.append(area_middle);

      var area_1 = $('#cv-body-hidden-container .cv-body-content .area-1').clone();
      area_1.children().remove();
      area_middle.append(area_1);

      var area_2 = $('#cv-body-hidden-container .cv-body-content .area-2').clone();
      area_2.children().remove();
      area_middle.append(area_2);

      if ($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }

      return page_element_container;
    }
    function checkEmpty() {
      $('.cv-body-area').each(function (index, el) {
        if ($(this).height() === 0) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    }
    function workHelper() {
      let count = 0;
      $('.cv-body-visible').each(function () {
        if ($(this).find('.work-experience-block').length) {
          count++;
        }
      });
      if (count > 1) {
        $('.cv-body-1.page-1').find('.work-experience-block').addClass('m-transfer');
        if ($('.cv-body-1.page-1').find('.work-experience-block .work-experience-subblock').length === 0 && $('.cv-body-1.page-1').find('.work-experience-block .block-title').length > 0) {
          let blockTitle = $('.cv-body-1.page-1').find('.work-experience-block .block-title').clone();
          $('.cv-body-1.page-1').find('.work-experience-block').remove();
          $('.cv-body-1.page-2').find('.work-experience-block').prepend(blockTitle);
        }
      }

    }
    rebuildingPages();
  }
}

export const ResumeCv004 = ({
  data,
  dataNew,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  stateClasses,
  reportTemplateRef,
  beforeСontent,
  objActiveBlock,
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
    hide_experience_level,
    setPagePagCurrent = () => { },
  setPages = false
  } = dataNew;

  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";

  useEffect(() => {
    if (isPdf) return;

    if (!!isDrawing) {
      drawing();
      handleFalseDrafind();
    }
  }, [isDrawing, stateClasses, beforeСontent]);

  if (objActiveBlock) {
    if (typeof window != 'undefined')
      hideEmpty();
  }
  function hideEmpty() {
    employment.forEach(function (el, i) {
      if (i < (employment.length - 1)) {
        $('.employment-history-block').find('.block-info').eq(i).find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.employment === false && 
        (el.assignment || el.city || el.company || el.country || el.title || el.periodFrom || el.periodTo) &&
        (el.assignment !== "" || el.city !== "" || el.company !== "" || el.country !== "" || el.title !== "" || el.periodFrom !== null || el.periodTo !== null)) {
        $('.employment-history-block').find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.employment && employment.length === 1) {
        $('.employment-history-block').find('.empty-field').removeClass('help-hide');
      }
      if (objActiveBlock.employment) {
        $('div, span, p').not('.empty-field').removeClass('help-hide');
      }
    });
    education.forEach(function (el, i) {
      if (i < (education.length - 1)) {
        $('.education-block').find('.block-info').eq(i).find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.education === false && 
        (el.awards || el.study || el.facility || el.description || el.degree || el.dateFrom || el.dateTo) &&
        (el.awards !== "" || el.study !== "" || el.facility !== "" || el.description !== "" || el.degree !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.education-block').find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.education && education.length === 1) {
        $('.education-block').find('.empty-field').removeClass('help-hide');
      }
      if (objActiveBlock.education) {
        $('div, span, p').not('.empty-field').removeClass('help-hide');
      }
    });
    courses.forEach(function (el, i) {
      if (i < (courses.length - 1)) {
        $('.courses-block').find('.block-info').eq(i).find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.courses === false && 
        (el.title || el.institution || el.dateFrom || el.dateTo) &&
        (el.title !== "" || el.institution !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.courses-block').find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.courses && courses.length === 1) {
        $('.courses-block').find('.empty-field').removeClass('help-hide');
      }
      if (objActiveBlock.courses) {
        $('div, span, p').not('.empty-field').removeClass('help-hide');
      }
    });
    extra_curricular.forEach(function (el, i) {
      if (i < (extra_curricular.length - 1)) {
        $('.extra-curricular-activities-block').find('.block-info').eq(i).find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.extra_curricular === false && 
        (el.city || el.country || el.description || el.employer || el.title || el.dateFrom || el.dateTo) &&
        (el.city !== "" || el.country !== "" || el.description !== "" || el.employer !== "" || el.title !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.extra-curricular-activities-block').find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.extra_curricular && extra_curricular.length === 1) {
        $('.extra-curricular-activities-block').find('.empty-field').removeClass('help-hide');
      }
      if (objActiveBlock.extra_curricular) {
        $('div, span, p').not('.empty-field').removeClass('help-hide');
      }
    });
    internship.forEach(function (el, i) {
      if (i < (internship.length - 1)) {
        $('.internships-block').find('.block-info').eq(i).find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.internship === false && 
        (el.city || el.country || el.description || el.employer || el.jobTitle || el.dateFrom || el.dateTo) &&
        (el.city !== "" || el.country !== "" || el.description !== "" || el.employer !== "" || el.jobTitle !== "" || el.dateFrom !== null || el.dateTo !== null)) {
        $('.internships-block').find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.internship && internship.length === 1) {
        $('.internships-block').find('.empty-field').removeClass('help-hide');
      }
      if (objActiveBlock.internship) {
        $('div, span, p').not('.empty-field').removeClass('help-hide');
      }
    });
    reference.forEach(function (el, i) {
      if (i < (reference.length - 1)) {
        $('.references-block').find('.block-info').eq(i).find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.reference === false && 
        (el.company || el.email || el.fullName || el.phone) &&
        (el.company !== "" || el.email !== "" || el.fullName !== "" || el.phone !== "")) {
        $('.references-block').find('.empty-field').addClass('help-hide');
      }
      if (objActiveBlock.reference && reference.length === 1) {
        $('.references-block').find('.empty-field').removeClass('help-hide');
      }
      if (objActiveBlock.reference) {
        $('div, span, p').not('.empty-field').removeClass('help-hide');
      }
    });
  }

  return (
    <div className="sv_004" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text">
            <div className="area-top">
              <div className={`profile-info-block no-photo ${!contact[0].jobTitle && !contact[0].firstName && !contact[0].lastName && !career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                <div className={`cv-profession font-size-2 ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                  {contact[0].jobTitle || 'Web-designer'}
                </div>
                <div className={`cv-name additional-color-1-text font-size-4 ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                  <span className={`${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].firstName || 'Matthew'}{` `}
                  </span>
                  <span className={`${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].lastName || 'Mcconaughey'}
                  </span>
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
            <div className="main-columns-wrapper">
              <div className="area-1 column-left additional-color-1-background">
                {
                  contact?.[0]?.picture && (
                    <div className="photo-block block-block">
                      <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                    </div>
                  )
                }
                <div className={`skills-block block-block main-color-2-text ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="block-title font-size-3">SKILLS</div>
                  <div className="skills-list">
                    {
                      skills.map((item, index) => (
                        <div key={index} className={`skill-item ${!item.name ? 'empty-field' : ''}`}>
                          {item.name ? item.name : 'Skill name'}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`languages-block block-block main-color-2-text ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="block-title font-size-3">LANGUAGES</div>
                  {
                    languages.map((item, index) => (
                      <div key={index} className={`language-item ${!item.language ? 'empty-field' : ''}`}>
                        <div className="language-name">
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
                <div className={`hobbies-block block-block main-color-2-text ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="block-title font-size-3">HOBBIES</div>
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
              <div className="area-2 column-right">
                <div className={`profile-info-block is-photo block-block ${!contact[0].jobTitle && !contact[0].firstName && !contact[0].lastName && !career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`cv-profession font-size-2 ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].jobTitle || 'Web-designer'}
                  </div>
                  <div className={`cv-name additional-color-1-text font-size-4 ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].firstName || 'Matthew'}{` `}
                    </span>
                    <span className={`${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].lastName || 'Mcconaughey'}
                    </span>
                  </div>
                  <div className={`${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                    {
                      career_objective[0].data && (
                        <div dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                      ) || (
                        <div className="empty-field">
                          Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className={`details-block block-block additional-color-1-border ${!contact[0]?.country && !social_links.length && !contact[0]?.email && !contact[0]?.phone && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                  <div className="details-content-wrapper">
                    <div className={`profile-secondary-info left-side additional-color-1-border ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                      <div className="items-block">
                        <div className={`item-block ${!contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          <span className="name">Birth Date</span>
                          {
                            contact[0]?.dateOfBirth && (
                              <span className="value">{moment(contact[0].dateOfBirth).format("DD-MM-yy")}</span>
                            ) || (
                              <span className="value empty-field">14-08-1991</span>
                            )
                          }
                        </div>
                        <div className={`item-block ${!contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                          <span className="name">Place of Birth</span>
                          {
                            contact[0]?.placeOfBirth && (
                              <span className="value">{contact[0].placeOfBirth}</span>
                            ) || (
                              <span className="value empty-field">Berlin</span>
                            )
                          }
                        </div>
                        <div className={`item-block ${!contact[0]?.nationality && !beforeСontent ? 'hide' : ''}`}>
                          <span className="name">Nationality</span>
                          {
                            contact[0]?.nationality && (
                              <span className="value">{contact[0].nationality}</span>
                            ) || (
                              <span className="value empty-field">German</span>
                            )
                          }
                        </div>
                        <div className={`item-block ${!contact[0]?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                          <span className="name">Driving Licence</span>
                          {
                            contact[0]?.driverLicense && (
                              <span className="value">{contact[0].driverLicense}</span>
                            ) || (
                              <span className="value empty-field">Class 1</span>
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div className={`contacts-information ${!contact[0]?.country && !social_links.length && !contact[0]?.email && !contact[0]?.phone && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                      <div className={`item-block ${!contact[0]?.phone && !beforeСontent ? 'hide' : ''}`}>
                        <svg className="additional-color-2-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.1313 8.125C11.9938 8.125 11.85 8.08125 11.7125 8.05C11.4343 7.98779 11.1607 7.90634 10.8938 7.80625C10.6039 7.70077 10.2851 7.70625 9.99899 7.82163C9.71284 7.93701 9.47947 8.15415 9.3438 8.43125L9.2063 8.71875C8.59931 8.3745 8.03856 7.95447 7.53755 7.46875C7.05183 6.96773 6.63179 6.40699 6.28755 5.8L6.57505 5.66875C6.85215 5.53307 7.06928 5.29971 7.18467 5.01356C7.30005 4.72741 7.30553 4.4087 7.20005 4.11875C7.10079 3.84939 7.01936 3.5738 6.9563 3.29375C6.92505 3.15625 6.90005 3.0125 6.8813 2.875C6.8054 2.43476 6.57481 2.03609 6.23106 1.75077C5.88731 1.46546 5.45298 1.31226 5.0063 1.31875H3.12505C2.86083 1.3184 2.59952 1.3739 2.35825 1.48161C2.11697 1.58932 1.90119 1.74681 1.72505 1.94375C1.54525 2.14603 1.41137 2.38484 1.33261 2.64377C1.25385 2.9027 1.23208 3.17561 1.2688 3.44375C1.60854 6.04509 2.79705 8.46166 4.65005 10.3188C6.50714 12.1717 8.92371 13.3603 11.525 13.7C11.6062 13.7062 11.6877 13.7062 11.7688 13.7C12.2297 13.7007 12.6747 13.5316 13.0188 13.225C13.2157 13.0489 13.3732 12.8331 13.4809 12.5918C13.5886 12.3505 13.6441 12.0892 13.6438 11.825V9.95C13.6404 9.51815 13.4881 9.1007 13.2125 8.76818C12.9369 8.43567 12.555 8.20848 12.1313 8.125ZM12.4375 11.875C12.4373 11.9622 12.4189 12.0484 12.3834 12.1281C12.3478 12.2077 12.296 12.2791 12.2313 12.3375C12.1628 12.3999 12.0813 12.4463 11.9926 12.4733C11.904 12.5004 11.8105 12.5073 11.7188 12.4937C9.38647 12.1891 7.21895 11.1262 5.55005 9.46875C3.87972 7.79842 2.80757 5.62335 2.50005 3.28125C2.48647 3.18958 2.49344 3.09605 2.52047 3.00741C2.54749 2.91877 2.59389 2.83725 2.6563 2.76875C2.71543 2.70322 2.78778 2.65096 2.86858 2.61541C2.94937 2.57986 3.03678 2.56183 3.12505 2.5625H5.00005C5.14452 2.55897 5.28576 2.60562 5.39971 2.6945C5.51367 2.78338 5.5933 2.90901 5.62505 3.05C5.62505 3.21875 5.6813 3.39375 5.7188 3.5625C5.79103 3.88991 5.88712 4.21161 6.0063 4.525L5.1313 4.9375C4.9809 5.00654 4.86402 5.13241 4.8063 5.2875C4.74379 5.43966 4.74379 5.61034 4.8063 5.7625C5.7058 7.68922 7.25457 9.238 9.1813 10.1375C9.33346 10.2 9.50413 10.2 9.6563 10.1375C9.81139 10.0798 9.93726 9.9629 10.0063 9.8125L10.4 8.9375C10.7225 9.05508 11.0524 9.15112 11.3875 9.225C11.55 9.2625 11.725 9.29375 11.8938 9.31875C12.0348 9.3505 12.1604 9.43013 12.2493 9.54408C12.3382 9.65804 12.3848 9.79927 12.3813 9.94375L12.4375 11.875ZM8.75005 1.25C8.6063 1.25 8.4563 1.25 8.31255 1.25C8.14679 1.26409 7.99341 1.34345 7.88616 1.47062C7.77892 1.5978 7.72658 1.76236 7.74067 1.92813C7.75476 2.09389 7.83412 2.24726 7.96129 2.35451C8.08847 2.46175 8.25304 2.51409 8.4188 2.5H8.75005C9.74461 2.5 10.6984 2.89509 11.4017 3.59835C12.105 4.30161 12.5 5.25544 12.5 6.25C12.5 6.3625 12.5 6.46875 12.5 6.58125C12.4862 6.74613 12.5383 6.90978 12.6449 7.03631C12.7515 7.16285 12.904 7.24194 13.0688 7.25625H13.1188C13.2753 7.25688 13.4263 7.19881 13.542 7.09351C13.6577 6.9882 13.7297 6.84333 13.7438 6.6875C13.7438 6.54375 13.7438 6.39375 13.7438 6.25C13.7438 4.925 13.2179 3.65418 12.2815 2.71667C11.3452 1.77917 10.075 1.25166 8.75005 1.25V1.25ZM10 6.25C10 6.41576 10.0659 6.57473 10.1831 6.69194C10.3003 6.80915 10.4593 6.875 10.625 6.875C10.7908 6.875 10.9498 6.80915 11.067 6.69194C11.1842 6.57473 11.25 6.41576 11.25 6.25C11.25 5.58696 10.9867 4.95107 10.5178 4.48223C10.049 4.01339 9.41309 3.75 8.75005 3.75C8.58429 3.75 8.42531 3.81585 8.3081 3.93306C8.19089 4.05027 8.12505 4.20924 8.12505 4.375C8.12505 4.54076 8.19089 4.69973 8.3081 4.81694C8.42531 4.93415 8.58429 5 8.75005 5C9.08157 5 9.39951 5.1317 9.63393 5.36612C9.86835 5.60054 10 5.91848 10 6.25Z" fill="#030303" />
                        </svg>
                        <div className={`${!contact[0].phone ? 'empty-field' : ''}`}>
                          {contact[0].phone || '736-343-9384'}
                        </div>
                      </div>
                      <div className={`item-block ${!contact[0]?.email && !beforeСontent ? 'hide' : ''}`}>
                        <svg className="additional-color-2-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="Communication / message">
                            <path id="Vector" d="M11.875 2.5H3.125C2.62772 2.5 2.15081 2.69754 1.79917 3.04917C1.44754 3.40081 1.25 3.87772 1.25 4.375V10.625C1.25 11.1223 1.44754 11.5992 1.79917 11.9508C2.15081 12.3025 2.62772 12.5 3.125 12.5H11.875C12.3723 12.5 12.8492 12.3025 13.2008 11.9508C13.5525 11.5992 13.75 11.1223 13.75 10.625V4.375C13.75 3.87772 13.5525 3.40081 13.2008 3.04917C12.8492 2.69754 12.3723 2.5 11.875 2.5ZM3.125 3.75H11.875C12.0408 3.75 12.1997 3.81585 12.3169 3.93306C12.4342 4.05027 12.5 4.20924 12.5 4.375L7.5 7.425L2.5 4.375C2.5 4.20924 2.56585 4.05027 2.68306 3.93306C2.80027 3.81585 2.95924 3.75 3.125 3.75ZM12.5 10.625C12.5 10.7908 12.4342 10.9497 12.3169 11.0669C12.1997 11.1842 12.0408 11.25 11.875 11.25H3.125C2.95924 11.25 2.80027 11.1842 2.68306 11.0669C2.56585 10.9497 2.5 10.7908 2.5 10.625V5.8L7.175 8.65625C7.27001 8.71111 7.37779 8.73998 7.4875 8.73998C7.59721 8.73998 7.70499 8.71111 7.8 8.65625L12.5 5.8V10.625Z" fill="#030303" />
                          </g>
                        </svg>
                        <div className={`value ${!contact[0].email ? 'empty-field' : ''}`}>
                          {contact[0].email || 'designer@webservice.com'}
                        </div>
                      </div>
                      <div className={`item-block ${!contact[0].country && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                        <svg className="additional-color-2-svg" width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="Location and Map / location pin">
                            <path id="Vector" d="M8.40911 2.79988C7.50496 1.80532 6.27867 1.24658 5.00002 1.24658C3.72136 1.24658 2.49507 1.80532 1.59092 2.79988C0.686777 3.79444 0.178833 5.14336 0.178833 6.54988C0.178833 7.95641 0.686777 9.30532 1.59092 10.2999L4.58524 13.5999C4.63806 13.6585 4.7009 13.705 4.77014 13.7367C4.83938 13.7684 4.91364 13.7848 4.98865 13.7848C5.06366 13.7848 5.13792 13.7684 5.20716 13.7367C5.2764 13.705 5.33924 13.6585 5.39206 13.5999L8.40911 10.2686C9.30948 9.27821 9.8153 7.93492 9.8153 6.53426C9.8153 5.1336 9.30948 3.79031 8.40911 2.79988ZM7.59661 9.37488L5.00002 12.2436L2.40342 9.37488C1.89044 8.81008 1.5412 8.09066 1.39984 7.30756C1.25849 6.52447 1.33137 5.71285 1.60928 4.97531C1.88719 4.23777 2.35764 3.60741 2.96117 3.16393C3.5647 2.72045 4.27421 2.48375 5.00002 2.48375C5.72582 2.48375 6.43533 2.72045 7.03886 3.16393C7.64239 3.60741 8.11284 4.23777 8.39075 4.97531C8.66866 5.71285 8.74154 6.52447 8.60019 7.30756C8.45884 8.09066 8.10959 8.81008 7.59661 9.37488ZM3.29547 4.63113C2.83679 5.13724 2.57922 5.82274 2.57922 6.53738C2.57922 7.25203 2.83679 7.93753 3.29547 8.44363C3.63624 8.81913 4.07024 9.07556 4.543 9.18076C5.01576 9.28596 5.50624 9.23525 5.9529 9.03498C6.39956 8.83471 6.78251 8.49381 7.0537 8.05504C7.32489 7.61627 7.47225 7.09918 7.47729 6.56863C7.47985 6.21439 7.41781 5.86317 7.29485 5.53575C7.17188 5.20833 6.99048 4.91136 6.76138 4.66238C6.53619 4.40899 6.26767 4.20709 5.97128 4.0683C5.67488 3.9295 5.35646 3.85656 5.03433 3.85365C4.71221 3.85075 4.39274 3.91794 4.09432 4.05138C3.79589 4.18481 3.5244 4.38184 3.29547 4.63113ZM5.96024 7.55613C5.74493 7.7966 5.46036 7.94732 5.1552 7.98254C4.85004 8.01776 4.54323 7.93528 4.28724 7.74921C4.03124 7.56314 3.84195 7.28503 3.75172 6.96243C3.6615 6.63984 3.67595 6.29278 3.79261 5.9806C3.90926 5.66843 4.12087 5.41052 4.39126 5.25097C4.66165 5.09142 4.97402 5.04014 5.27498 5.10589C5.57594 5.17165 5.84678 5.35036 6.04121 5.61146C6.23565 5.87257 6.34159 6.19986 6.34092 6.53738C6.33266 6.92318 6.18552 7.28959 5.93183 7.55613H5.96024Z" fill="#030303" />
                          </g>
                        </svg>
                        <div>
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
                        </div>
                      </div>
                      <div className={`item-block ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                        <svg className="additional-color-2-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="User Interface / Link">
                            <path id="Vector" d="M7.56877 9.61869L5.14377 12.0437C4.85017 12.327 4.45806 12.4854 4.05002 12.4854C3.64198 12.4854 3.24987 12.327 2.95627 12.0437C2.81227 11.9003 2.69802 11.7298 2.62005 11.5421C2.54209 11.3544 2.50196 11.1532 2.50196 10.9499C2.50196 10.7467 2.54209 10.5455 2.62005 10.3578C2.69802 10.1701 2.81227 9.99962 2.95627 9.85619L5.38127 7.43119C5.49896 7.3135 5.56508 7.15388 5.56508 6.98744C5.56508 6.821 5.49896 6.66138 5.38127 6.54369C5.26358 6.426 5.10396 6.35988 4.93752 6.35988C4.77108 6.35988 4.61146 6.426 4.49377 6.54369L2.06877 8.97494C1.58024 9.50668 1.31603 10.2066 1.33132 10.9285C1.3466 11.6505 1.6402 12.3386 2.15079 12.8492C2.66138 13.3598 3.3495 13.6534 4.07142 13.6686C4.79335 13.6839 5.49327 13.4197 6.02502 12.9312L8.45627 10.5062C8.57396 10.3885 8.64008 10.2289 8.64008 10.0624C8.64008 9.896 8.57396 9.73638 8.45627 9.61869C8.33858 9.501 8.17896 9.43488 8.01252 9.43488C7.84608 9.43488 7.68646 9.501 7.56877 9.61869ZM12.9313 2.06869C12.4055 1.54619 11.6944 1.25293 10.9531 1.25293C10.2119 1.25293 9.50078 1.54619 8.97502 2.06869L6.54377 4.49369C6.4855 4.55196 6.43927 4.62114 6.40773 4.69728C6.37619 4.77342 6.35996 4.85503 6.35996 4.93744C6.35996 5.01985 6.37619 5.10145 6.40773 5.17759C6.43927 5.25373 6.4855 5.32291 6.54377 5.38119C6.60204 5.43946 6.67123 5.48569 6.74736 5.51722C6.8235 5.54876 6.90511 5.56499 6.98752 5.56499C7.06993 5.56499 7.15154 5.54876 7.22768 5.51722C7.30381 5.48569 7.373 5.43946 7.43127 5.38119L9.85627 2.95619C10.1499 2.67283 10.542 2.51447 10.95 2.51447C11.3581 2.51447 11.7502 2.67283 12.0438 2.95619C12.1878 3.09962 12.302 3.27007 12.38 3.45776C12.4579 3.64545 12.4981 3.8467 12.4981 4.04994C12.4981 4.25318 12.4579 4.45442 12.38 4.64211C12.302 4.82981 12.1878 5.00026 12.0438 5.14369L9.61877 7.56869C9.56019 7.62679 9.51369 7.69591 9.48196 7.77208C9.45023 7.84824 9.4339 7.92993 9.4339 8.01244C9.4339 8.09494 9.45023 8.17664 9.48196 8.2528C9.51369 8.32896 9.56019 8.39809 9.61877 8.45619C9.67687 8.51477 9.746 8.56126 9.82216 8.59299C9.89832 8.62472 9.98001 8.64106 10.0625 8.64106C10.145 8.64106 10.2267 8.62472 10.3029 8.59299C10.379 8.56126 10.4482 8.51477 10.5063 8.45619L12.9313 6.02494C13.4538 5.49918 13.747 4.78805 13.747 4.04681C13.747 3.30558 13.4538 2.59445 12.9313 2.06869ZM5.51877 9.48119C5.57717 9.53911 5.64643 9.58494 5.72258 9.61604C5.79873 9.64715 5.88027 9.66291 5.96252 9.66244C6.04477 9.66291 6.12631 9.64715 6.20246 9.61604C6.27861 9.58494 6.34787 9.53911 6.40627 9.48119L9.48127 6.40619C9.59896 6.2885 9.66508 6.12888 9.66508 5.96244C9.66508 5.796 9.59896 5.63638 9.48127 5.51869C9.36358 5.401 9.20396 5.33488 9.03752 5.33488C8.87108 5.33488 8.71146 5.401 8.59377 5.51869L5.51877 8.59369C5.46019 8.65179 5.41369 8.72091 5.38196 8.79708C5.35023 8.87324 5.3339 8.95493 5.3339 9.03744C5.3339 9.11994 5.35023 9.20164 5.38196 9.2778C5.41369 9.35396 5.46019 9.42309 5.51877 9.48119Z" fill="#030303" />
                          </g>
                        </svg>
                        <div className="social-wrapper">
                          {
                            isArray(social_links) && social_links.length && (
                              social_links.map((item, index) => (
                                <a key={index}>{item.name}</a>
                              ))

                            ) || (
                              <>
                                <a className="links-item empty-field">Linkedin</a>
                                <a className="links-item empty-field">Facebook</a>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`education-block block-block additional-color-1-border ${!education[0].study && !education[0].facility && !education[0].degree && !education[0].description && !education[0].dateFrom?.date && !education[0].dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                  <div className="left-side">
                    <div className="block-title additional-color-1-text font-size-3">EDUCATION</div>
                  </div>
                  <div className="right-side">
                    {
                      education.map((itemEd, index) => (
                        <div className="block-info" key={index}>
                          <div className={`cv-heading cv-study ${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.study ? itemEd.study : 'Marketing and Management'}
                          </div>
                          <div className={`cv-heading cv-degree ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.degree ? itemEd.degree : 'Bachelor'}
                          </div>
                          <div className={`cv-subheading cv-college ${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.facility ? itemEd.facility : 'Harcum College, Portland'}
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
                <div className={`work-experience-block block-block additional-color-1-border ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                  <div className="block-title additional-color-1-text font-size-3">WORK EXPERIENCE</div>
                  {
                    employment.map((itemEm, index) => (
                      <div className="work-experience-subblock" key={index}>
                        <div className="left-side">
                          <span className="pointer-circle additional-color-1-background"></span>
                          <div className={`cv-heading additional-color-1-text ${!itemEm.title ? 'empty-field' : ''} ${!itemEm.title && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.title || 'Web Designer'}
                          </div>
                          <div className={`cv-subheading ${!itemEm.company && !itemEm.city && itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                            <span className={`${!itemEm.company ? 'empty-field' : ''} ${!itemEm.company && !beforeСontent ? 'hide' : ''}`}>
                              {checkForSymbol([itemEm.city]) ? (itemEm.company || 'Apple INC.') + ', ' : itemEm.company || 'Apple INC.'}
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
                        </div>
                        <div className="right-side">
                          {
                            itemEm.assignment && (
                              <div className="text-block" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                            ) || (
                              <div className={`text-block empty-field ${!itemEm.assignment && !beforeСontent ? 'hide' : ''}`}>
                                <ul>
                                  <li>Helped to achieve a consistent look and visual theme across the website by promoting uniform fonts, formatting, images, and layout.</li>
                                  <li>Followed policies and procedures related to application methods and quality standards at all times.</li>
                                  <li>Managed front-end and back-end development in the company's Portfolio Analyst, Employee Track, and Account Management systems.</li>
                                </ul>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className={`certificates-block block-block additional-color-1-border ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="left-side">
                    <div className="block-title additional-color-1-text font-size-3">CERTIFICATES</div>
                  </div>
                  <div className="right-side">
                    {
                      certificates.map((item, index) => (
                        <div className="block-info" key={index}>
                          <div key={index} className={`certificate-name ${!item.name ? 'empty-field' : ''}`}>
                            {item.name ? item.name : 'Certificate name'}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`references-block block-block additional-color-1-border ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="left-side">
                    <div className="block-title additional-color-1-text font-size-3">REFERENCES</div>
                  </div>
                  <div className="right-side">
                    {
                      reference.map((itemRef, index) => (
                        <div className="block-info" key={index}>
                          <div className="cv-heading">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

