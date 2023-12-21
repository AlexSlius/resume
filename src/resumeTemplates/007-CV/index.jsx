import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";
import { socialHelper } from "../../utils/socialHelper";

const drawing = () => {
  if (typeof window != "undefined") {
    var current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();

      let cvBlocksLeft = [
        'photo-wrapper',
        'profile-main-block',
        'profile-additional-block',
        'skills-languages-block',
        'certificates-block',
        'references-block',
        'hobbies-block'
      ];
      let cvBlocksRightTop = [
        'main-info-block'
      ];
      let cvBlocksRightMiddle = [
        'employment-history-block',
        'extra-curricular-activities-block',
        'internships-block'
      ];
      let cvBlocksRightBottom = [
        'education-block',
        'courses-block'
      ];

      let cvDataLeft = [];
      let cvDataRightTop = [];
      let cvDataRightMiddle = [];
      let cvDataRightBottom = [];

      cvBlocksLeft.forEach(function (el) {
        cvDataLeft.push($('.' + el).clone());
      });
      cvBlocksRightTop.forEach(function (el) {
        cvDataRightTop.push($('.' + el).clone());
      });
      cvBlocksRightMiddle.forEach(function (el) {
        cvDataRightMiddle.push($('.' + el).clone());
      });
      cvBlocksRightBottom.forEach(function (el) {
        cvDataRightBottom.push($('.' + el).clone());
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
      cvDataRightTop.forEach(function (el) {
        getPageAreaRightTop().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageAreaRightTop().append(el);
        }
      });
      current_page_number = 1;
      cvDataRightMiddle.forEach(function (el) {
        getPageAreaRightMiddle().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageAreaRightMiddle().append(el);
        }
      });
      current_page_number = 1;
      cvDataRightBottom.forEach(function (el) {
        getPageAreaRightBottom().append(el);
        if (checkHeight()) {
          el.remove();
          current_page_number++;
          getPageAreaRightBottom().append(el);
        }
      });
      checkEmpty();
    }
    function getPageColumnLeft() {
      return getPageContainer().find('.column-left');
    }
    function getPageAreaRightTop() {
      return getPageContainer().find('.information-area-0');
    }
    function getPageAreaRightMiddle() {
      return getPageContainer().find('.information-area-1');
    }
    function getPageAreaRightBottom() {
      return getPageContainer().find('.information-area-2');
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

      var area_left = $('#cv-body-hidden-container .cv-body-content .column-left').clone();
      area_left.children().remove();
      page_element_container.append(area_left);

      var area_right = $('#cv-body-hidden-container .cv-body-content .column-right').clone();
      area_right.children().remove();
      page_element_container.append(area_right);

      var area_right_top = $('#cv-body-hidden-container .cv-body-content .information-area-0').clone();
      area_right_top.children().remove();
      area_right.append(area_right_top);

      var area_right_middle = $('#cv-body-hidden-container .cv-body-content .information-area-1').clone();
      area_right_middle.children().remove();
      area_right.append(area_right_middle);

      var area_right_bottom = $('#cv-body-hidden-container .cv-body-content .information-area-2').clone();
      area_right_bottom.children().remove();
      area_right.append(area_right_bottom);

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
    function secondaryInfoHelper() {
      $('.cv-body-visible .js-profile-secondary-info .item-block').each(function () {
        $('.js-profile-secondary-info').removeClass('m-transfer');
        if ($(this).height() > 20) {
          $('.js-profile-secondary-info').addClass('m-transfer');
          return;
        } else {
          $('.js-profile-secondary-info').removeClass('m-transfer');
        }
      });
    }

    function emptyBlockHelper() {
      $('.cv-body-visible .information-area').each(function () {
        if ($(this).is(':empty')) {
          $(this).remove();
        }
      });
    }
    rebuildingPages();
    secondaryInfoHelper();
    emptyBlockHelper();
  }
}

export const ResumeCv007 = ({
  data,
  dataNew,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  stateClasses,
  reportTemplateRef,
  beforeСontent,
  objActiveBlock,
  isPdf = false,
  setPagePagCurrent = () => { },
  setPages = false
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

  let classPhoto = (isArray(contact) && contact?.[0]?.picture) ? "has-photo" : "";

  useEffect(() => {
    if (isPdf) return;

    if (!!isDrawing) {
      drawing();
      handleFalseDrafind();
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
    <div className="sv_007" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content font-size-1 main-color-1-text">
            <div className="column-left cv-body-area">
              {
                isArray(contact) && contact[0]?.picture && (
                  <div className="photo-wrapper">
                    <svg className="additional-color-2-svg-path" width="130" height="129" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M128.5 64.5C128.5 51.9409 124.776 39.6638 117.798 29.2213C110.821 18.7788 100.904 10.6398 89.3004 5.83365C77.6973 1.02749 64.9296 -0.230027 52.6118 2.22013C40.294 4.6703 28.9794 10.7181 20.0987 19.5987C11.2181 28.4794 5.1703 39.794 2.72013 52.1118C0.269973 64.4296 1.52748 77.1973 6.33365 88.8004C11.1398 100.404 19.2788 110.321 29.7213 117.298C40.1638 124.276 52.4409 128 65 128" stroke="#DFCECE" strokeWidth="2" />
                    </svg>
                    <div className="photo" style={{ backgroundImage: `url(${contact[0].picture})` }}></div>
                  </div>
                )
              }
              <div className={`profile-main-block additional-color-1-background ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                <div className="profile-main-info">
                  <div className="cv-heading font-size-3">PROFILE</div>
                  {
                    career_objective[0]?.data && (
                      <div className="profile-main-text" dangerouslySetInnerHTML={{ __html: career_objective[0].data }}></div>
                    ) || (
                      <div className="profile-main-text empty-field">
                        Innovative Web Designer with over seven years of experience creating powerful designs in the fashion industry. Adept in collaborating with designers and other team professionals to achieve high goals and deadlines. Dedicated to remaining up to date with the latest fashion trends, while offering ideas and visuals to spark new trends. Bringing forth a true love of fashion and design.
                      </div>
                    )
                  }
                </div>
              </div>
              <div className={`profile-additional-block ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !contact[0]?.country && !contact[0]?.email && !contact[0]?.phone && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !social_links.length && !beforeСontent ? 'hide' : ''}`}>
                <div className={`info-1 js-profile-secondary-info ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`item-block ${!contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <span className="name additional-color-3-text">Birth Date</span>
                    {
                      contact[0]?.dateOfBirth && (
                        <span className="value">{moment(contact[0].dateOfBirth).format("DD-MM-yy")}</span>
                      ) || (
                        <span className="value empty-field">14-08-1991</span>
                      )
                    }
                  </div>
                  <div className={`item-block ${!contact[0]?.placeOfBirth && !beforeСontent ? 'hide' : ''}`}>
                    <span className="name additional-color-3-text">Place of Birth</span>
                    {
                      contact[0]?.placeOfBirth && (
                        <span className="value">{contact[0].placeOfBirth}</span>
                      ) || (
                        <span className="value empty-field">Berlin</span>
                      )
                    }
                  </div>
                  <div className={`item-block ${!contact[0]?.nationality && !beforeСontent ? 'hide' : ''}`}>
                    <span className="name additional-color-3-text">Nationality</span>
                    {
                      contact[0]?.nationality && (
                        <span className="value">{contact[0].nationality}</span>
                      ) || (
                        <span className="value empty-field">German</span>
                      )
                    }
                  </div>
                  <div className={`item-block ${!contact[0]?.driverLicense && !beforeСontent ? 'hide' : ''}`}>
                    <span className="name additional-color-3-text">Driving Licence</span>
                    {
                      contact[0]?.driverLicense && (
                        <span className="value">{contact[0].driverLicense}</span>
                      ) || (
                        <span className="value empty-field">Class 1</span>
                      )
                    }
                  </div>
                </div>
                <div className={`info-2 ${!contact[0].country && !contact[0].email && !contact[0].phone && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`item-block ${!contact[0].country && !contact[0].address && !contact[0].city && !contact[0].zipCode && !beforeСontent ? 'hide' : ''}`}>
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
                  <div className={`item-block ${!contact[0]?.phone && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`${!contact[0].phone ? 'empty-field' : ''}`}>
                      {contact[0].phone || '736-343-9384'}
                    </span>
                  </div>
                  <div className={`item-block ${!contact[0]?.email && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`${!contact[0].email ? 'empty-field' : ''}`}>
                      {contact[0].email || 'designer@webservice.com'}
                    </span>
                  </div>
                </div>
                <div className={`profile-links ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="profile-links-title">Links</div>
                  {
                    isArray(social_links) && social_links.length && (
                      social_links.map((itemSocial, index) => (
                        <a href={itemSocial.link} className="links-item additional-color-1-svg" key={index}>
                          {socialHelper(itemSocial.name)}
                        </a>
                      ))
                    ) || (
                      <>
                        <a className="links-item empty-field">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.6466 1.33335H2.35329C2.22634 1.33158 2.10029 1.35484 1.98233 1.4018C1.86438 1.44876 1.75683 1.51849 1.66582 1.60702C1.57482 1.69555 1.50215 1.80113 1.45195 1.91775C1.40176 2.03437 1.37503 2.15973 1.37329 2.28668V13.7133C1.37503 13.8403 1.40176 13.9657 1.45195 14.0823C1.50215 14.1989 1.57482 14.3045 1.66582 14.393C1.75683 14.4815 1.86438 14.5513 1.98233 14.5982C2.10029 14.6452 2.22634 14.6684 2.35329 14.6667H13.6466C13.7736 14.6684 13.8996 14.6452 14.0176 14.5982C14.1355 14.5513 14.2431 14.4815 14.3341 14.393C14.4251 14.3045 14.4978 14.1989 14.548 14.0823C14.5982 13.9657 14.6249 13.8403 14.6266 13.7133V2.28668C14.6249 2.15973 14.5982 2.03437 14.548 1.91775C14.4978 1.80113 14.4251 1.69555 14.3341 1.60702C14.2431 1.51849 14.1355 1.44876 14.0176 1.4018C13.8996 1.35484 13.7736 1.33158 13.6466 1.33335ZM5.39329 12.4933H3.39329V6.49334H5.39329V12.4933ZM4.39329 5.65334C4.11747 5.65334 3.85294 5.54377 3.6579 5.34874C3.46286 5.1537 3.35329 4.88917 3.35329 4.61334C3.35329 4.33752 3.46286 4.07299 3.6579 3.87795C3.85294 3.68292 4.11747 3.57334 4.39329 3.57334C4.53975 3.55673 4.68808 3.57125 4.82854 3.61593C4.96901 3.66062 5.09845 3.73447 5.2084 3.83265C5.31834 3.93083 5.40631 4.05113 5.46654 4.18567C5.52677 4.3202 5.5579 4.46594 5.5579 4.61334C5.5579 4.76075 5.52677 4.90649 5.46654 5.04102C5.40631 5.17556 5.31834 5.29586 5.2084 5.39404C5.09845 5.49222 4.96901 5.56607 4.82854 5.61076C4.68808 5.65544 4.53975 5.66995 4.39329 5.65334ZM12.6066 12.4933H10.6066V9.27334C10.6066 8.46668 10.32 7.94001 9.59329 7.94001C9.3684 7.94166 9.14942 8.0122 8.96585 8.14213C8.78228 8.27205 8.64295 8.45513 8.56663 8.66668C8.51445 8.82337 8.49185 8.98839 8.49996 9.15334V12.4867H6.49996C6.49996 12.4867 6.49996 7.03334 6.49996 6.48668H8.49996V7.33334C8.68164 7.01808 8.9459 6.75836 9.26425 6.58215C9.58261 6.40593 9.943 6.31991 10.3066 6.33334C11.64 6.33334 12.6066 7.19335 12.6066 9.04001V12.4933Z" fill="#605C64" />
                          </svg>
                        </a>
                        <a className="links-item empty-field">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.9333 1.33334H2.06659C1.87209 1.33334 1.68557 1.41061 1.54804 1.54813C1.41051 1.68566 1.33325 1.87218 1.33325 2.06668V13.9333C1.33325 14.0296 1.35222 14.125 1.38907 14.214C1.42593 14.3029 1.47994 14.3838 1.54804 14.4519C1.61614 14.52 1.69698 14.574 1.78595 14.6109C1.87492 14.6477 1.97028 14.6667 2.06659 14.6667H8.45325V9.50001H6.71992V7.50001H8.45325V6.00001C8.41735 5.64785 8.45892 5.29209 8.57506 4.9577C8.6912 4.62331 8.8791 4.31837 9.12556 4.06428C9.37203 3.81019 9.6711 3.6131 10.0018 3.48684C10.3325 3.36057 10.6868 3.30818 11.0399 3.33334C11.5588 3.33015 12.0774 3.35686 12.5933 3.41334V5.21334H11.5333C10.6933 5.21334 10.5333 5.61334 10.5333 6.19334V7.48001H12.5333L12.2733 9.48001H10.5333V14.6667H13.9333C14.0296 14.6667 14.1249 14.6477 14.2139 14.6109C14.3029 14.574 14.3837 14.52 14.4518 14.4519C14.5199 14.3838 14.5739 14.3029 14.6108 14.214C14.6476 14.125 14.6666 14.0296 14.6666 13.9333V2.06668C14.6666 1.97037 14.6476 1.87501 14.6108 1.78604C14.5739 1.69707 14.5199 1.61623 14.4518 1.54813C14.3837 1.48004 14.3029 1.42602 14.2139 1.38917C14.1249 1.35231 14.0296 1.33334 13.9333 1.33334Z" fill="#605C64" />
                          </svg>
                        </a>
                      </>
                    )
                  }
                </div>
              </div>
              <div className={`skills-languages-block block-block ${!Object.keys(skills[0]).length && !Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3">Skills / Languages</div>
                <div className="skills-list">
                  {
                    skills.map((item, index) => (
                      <div className={`list-item ${!item.name ? 'empty-field' : ''} ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`} key={index}>
                        <div className="list-item-name font-size-1">
                          {item.name ? item.name : 'Skill name'}
                        </div>
                        {
                          !hide_experience_level && (
                            <div className="list-item-value-wrapper">
                              <span className="list-item-value" style={{ width: `${item.level ? (+item.level * 100) / 5 : '33.33'}%` }}></span>
                            </div>
                          )
                        }
                      </div>
                    ))
                  }

                  {
                    languages.map((item, index) => (
                      <div className={`list-item ${!item.language ? 'empty-field' : ''} ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`} key={index}>
                        <div className="list-item-name">
                          {item.language ? item.language : 'Language'}
                        </div>
                        <div className="list-item-value-wrapper">
                          <span className="list-item-value" style={{ width: `${item.level ? (+item.level * 100) / 6 : '66.66'}%` }}></span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={`certificates-block block-block ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3">Certificates</div>
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
              <div className={`references-block block-block ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3">References</div>
                {
                  reference.map((itemRef, index) => (
                    <div className="block-info" key={index}>
                      <div className={`${!itemRef.fullName && !itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                        <span className={`${!itemRef.fullName ? 'empty-field' : ''} ${!itemRef.fullName && !beforeСontent ? 'hide' : ''}`}>
                          {checkForSymbol([itemRef.company]) ? (itemRef.fullName || 'Full name') + ', ' : itemRef.fullName || 'Full name'}
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
              <div className={`hobbies-block block-block ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                <div className="cv-heading font-size-3">Hobbies</div>
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
            <div className="column-right">
              <div className="information-area information-area-0 cv-body-area">
                <div className={`main-info-block block-block ${!contact[0].firstName && !contact[0].lastName && !contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                  <div className={`cv-profession main-color-2-text font-size-4 ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                    {contact[0].jobTitle || 'Web-designer'}
                  </div>
                  <div className={`cv-name font-size-5 ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                    <span className={`text-line-1 ${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].firstName || 'Matthew'}{` `}
                    </span>
                    <span className={`text-line-2 ${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].lastName || 'Mcconaughey'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="information-area information-area-1 additional-color-2-background cv-body-area">
                <span className="top-line main-color-1-background"></span>
                {
                  employment.map((itemEm, index) => (
                    <div className={`employment-history-block block-block ${(index > 0) ? "block-net" : ""} ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`} key={index}>
                      <div className="left-side">
                        <span className="dotted-line"></span>
                        <div className={`date-range ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''} ${!itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MM/yy") + ' - ' : moment(itemEm.periodFrom.date).format("MM/yy")) || '03/2022'}
                          </span>
                          <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''} ${!itemEm.periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MM/yy")) || ' - 12/2022'}
                          </span>
                        </div>
                      </div>
                      <div className="right-side">
                        {
                          (index == 0) && (
                            <div className="cv-heading font-size-2">Employment History</div>
                          )
                        }
                        <div className={`cv-subheading ${!itemEm.title && !itemEm.company && !itemEm.city && !beforeСontent ? 'hide' : ''}`}>
                          <span className="circle-point"></span>
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
                    </div>
                  ))
                }
                {
                  extra_curricular.map((itemEx, index) => (
                    <div key={index} className={`extra-curricular-activities-block block-block ${(index > 0) ? "block-net" : ""} ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                      <div className="left-side">
                        <span className="dotted-line"></span>
                        <div className={`date-range ${!itemEx.dateFrom?.date && !itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEx.dateFrom?.date ? 'empty-field' : ''} ${!itemEx.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEx.dateFrom?.date && (checkForSymbol([itemEx.dateTo?.date]) ? moment(itemEx.dateFrom.date).format("MM/yy") + ' - ' : moment(itemEx.dateFrom.date).format("MM/yy")) || '03/2022'}
                          </span>
                          <span className={`${!itemEx.dateTo?.date ? 'empty-field' : ''} ${!itemEx.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEx.dateTo?.date && (moment(itemEx.dateTo.date).format("MM/yy")) || ' - 12/2022'}
                          </span>
                        </div>
                      </div>
                      <div className="right-side">
                        <span className="block-circle"></span>
                        {
                          (index == 0) && (
                            <div className="cv-heading font-size-2">Extra-curricular activities</div>
                          )
                        }
                        <div className={`cv-subheading ${!itemEx.title && !itemEx.employer && !beforeСontent ? 'hide' : ''}`}>
                          <span className="circle-point"></span>
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
                    </div>
                  ))
                }
                {
                  internship.map((itemIn, index) => (
                    <div key={index} className={`internships-block block-block  ${(index > 0) ? "block-net" : ""} ${!Object.keys(internship[0]).length && !beforeСontent ? 'hide' : ''}`}>
                      <div className="left-side">
                        <span className="dotted-line"></span>
                        <div className={`date-range ${!itemIn.dateFrom?.date && !itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemIn.dateFrom?.date ? 'empty-field' : ''} ${!itemIn.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemIn.dateFrom?.date && (checkForSymbol([itemIn.dateTo?.date]) ? moment(itemIn.dateFrom.date).format("MM/yy") + ' - ' : moment(itemIn.dateFrom.date).format("MM/yy")) || '03/2022'}
                          </span>
                          <span className={`${!itemIn.dateTo?.date ? 'empty-field' : ''} ${!itemIn.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemIn.dateTo?.date && (moment(itemIn.dateTo.date).format("MM/yy")) || ' - 12/2022'}
                          </span>
                        </div>
                      </div>
                      <div className="right-side">
                        {
                          (index == 0) && (
                            <div className="cv-heading font-size-2">Internships</div>
                          )
                        }
                        <div className={`cv-subheading ${!itemIn.jobTitle && !itemIn.employer && !itemIn.city && !beforeСontent ? 'hide' : ''}`}>
                          <span className="circle-point"></span>
                          <span className={`${!itemIn.jobTitle ? 'empty-field' : ''} ${!itemIn.jobTitle && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemIn.employer, itemIn?.city]) ? (itemIn.jobTitle || 'Product Designer') + ', ' : itemIn.jobTitle || 'Product Designer'}
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
                    </div>
                  ))
                }
              </div>
              <div className="information-area information-area-2 additional-color-1-background cv-body-area">
                {
                  education.map((itemEd, index) => (
                    <div className={`education-block block-block ${(index > 0) ? "block-net" : ""} ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`} key={index}>
                      <div className="left-side">
                        <span className="dotted-line"></span>
                        <div className={`date-range ${!itemEd.dateFrom?.date && !itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemEd.dateFrom?.date ? 'empty-field' : ''} ${!itemEd.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.dateFrom?.date && (checkForSymbol([itemEd.dateTo?.date]) ? moment(itemEd.dateFrom.date).format("MM/yy") + ' - ' : moment(itemEd.dateFrom.date).format("MM/yy")) || '03/2022'}
                          </span>
                          <span className={`${!itemEd.dateTo?.date ? 'empty-field' : ''} ${!itemEd.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.dateTo?.date && (moment(itemEd.dateTo.date).format("MM/yy")) || ' - 12/2022'}
                          </span>
                        </div>
                      </div>
                      <div className="right-side">
                        {
                          (index == 0) && (
                            <div className="cv-heading font-size-2">Education</div>
                          )
                        }
                        <div className={`cv-subheading ${!itemEd.study && !itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                          <span className="circle-point"></span>
                          <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemEd.facility]) ? (itemEd.study || 'Marketing and Management') + ', ' : itemEd.study || 'Marketing and Management'}
                          </span>
                          <span className={`${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                            {itemEd.facility ? itemEd.facility : ', Harcum College, Portland'}
                          </span>
                        </div>
                        <div className={`cv-subheading ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
                          {itemEd.degree ? itemEd.degree : 'Bachelor'}
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
                    </div>
                  ))
                }
                {
                  courses.map((itemCo, index) => (
                    <div className={`courses-block block-block ${(index > 0) ? "block-net" : ""} ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`} key={index}>
                      <div className="left-side">
                        <span className="dotted-line"></span>
                        <div className={`date-range ${!itemCo.dateFrom?.date && !itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                          <span className={`${!itemCo.dateFrom?.date ? 'empty-field' : ''} ${!itemCo.dateFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.dateFrom?.date && (checkForSymbol([itemCo.dateTo?.date]) ? moment(itemCo.dateFrom.date).format("MM/yy") + ' - ' : moment(itemCo.dateFrom.date).format("MM/yy")) || '03/2022'}
                          </span>
                          <span className={`${!itemCo.dateTo?.date ? 'empty-field' : ''} ${!itemCo.dateTo?.date && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.dateTo?.date && (moment(itemCo.dateTo.date).format("MM/yy")) || ' - 12/2022'}
                          </span>
                        </div>
                      </div>
                      <div className="right-side">
                        {
                          (index == 0) && (
                            <div className="cv-heading font-size-2">Courses</div>
                          )
                        }
                        <div className={`cv-subheading ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                          <span className="circle-point"></span>
                          <span className={`${!itemCo.title ? 'empty-field' : ''}`}>{itemCo.title ? itemCo.title : 'Super course 1'}</span>
                        </div>
                        <div className={`${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.institution ? itemCo.institution : 'Benjamin Franklin Sidestep Collage, Portland'}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

