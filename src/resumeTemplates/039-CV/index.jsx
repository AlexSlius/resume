import {useEffect} from "react";
import { isArray } from "lodash";
import moment from 'moment';

import { isObjDatasKeys } from "../../helpers/datasPage";
import { checkForSymbol } from "../../utils/checkForSymbol";
import { levelLanguage } from "../../helpers/levelLanguage";

const drawing = () => {
  if (typeof window != 'undefined') {
    let current_page_number = 1;

    function rebuildingPages() {
      $('.cv-body.cv-body-visible').remove();
    
      let cvBlocksLeft = [
        'profile-block',
        'contacts-information-block',
        'profile-info-block',
        'employment-history-block',
        'education-block',
        'courses-block',
        'extra-curricular-activities-block',
        'internships-block'
      ];
      let cvBlocksRight = [
        'photo-block',
        'personal-info-block',
        'languages-block',
        'skills-block',
        'hobbies-block',
        'references-block',
        'certificates-block',
        'links-block'
      ];
      let cvDataLeft = [];
      let cvDataRight = [];
    
      cvBlocksLeft.forEach(function(el, ind){
        cvDataLeft.push($('#cv-body-hidden-container .cv-body-content .' + el).clone());
      });
      cvBlocksRight.forEach(function(el, ind){
        cvDataRight.push($('#cv-body-hidden-container .cv-body-content .' + el).clone());
      });
    
      current_page_number = 1;
    
      cvDataRight.forEach(function(el, ind) {
        getContentContainer2().append(el);
        if(checkHeight()) {
          el.remove();
          current_page_number++;
          getContentContainer2().append(el);
        }
      });
    
      current_page_number = 1;
    
      cvDataLeft.forEach(function(el, ind) {
        getContentContainer1().append(el);
        if(checkHeight()) {
          el.remove();
          current_page_number++;
          getContentContainer1().append(el);
        }
      });
    }

    function checkHeight() {
      return getPageContainer().height() > $('.cv-body.cv-body-visible.page-' + current_page_number).height();
    }
    
    function getContentContainer1() {
      return getPageContainer().find('.column-left');
    }
    
    function getContentContainer2() {
      return getPageContainer().find('.column-right');
    }
    
    function getPageContainer() {
      var page = $('#cv-chapter-section-cv').find('.cv-body.page-' + current_page_number);
      if(page.length > 0) {
        return page.find('.cv-body-content');
      } else {
        return createNewPage(current_page_number);
      }
    }

    function createNewPage(page_number) {
      var page_element = $('#cv-body-hidden-container').clone();
      page_element.attr('id', '');
      page_element.attr('class', 'cv-body additional-color-1-background cv-body-visible cv-body-1 page-' + current_page_number);
      page_element.children().remove();
    
      var page_element_container = $('#cv-body-hidden-container .cv-body-content').clone();
      page_element_container.children().remove();
      page_element.append(page_element_container);
    
      var column_left = $('#cv-body-hidden-container .cv-body-content .column-left').clone();
      column_left.children().remove();
      page_element_container.append(column_left);
    
      var column_right = $('#cv-body-hidden-container .cv-body-content .column-right').clone();
      column_right.children().remove();
      page_element_container.append(column_right);
    
      if($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }
    
      return page_element_container;
    }

    rebuildingPages();
  }
}

export const ResumeCv039 = ({
  data,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
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
  let conta = contact?.[0];
  let classPhoto = (isArray(contact) && conta?.picture) ? "has-photo" : "";

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
    <div className="sv_039" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0 ${classPhoto}`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body cv-body-1">
          <div className="cv-body-content main-color-1-text font-size-1">
            <div className="column-left">
              <div className="profile-block block-block">
                {
                  isArray(contact) && (contact?.[0]?.firstName || contact?.[0]?.lastName) && (
                    <h1 className="cv-name font-size-5 additional-color-1-text">
                      {!!contact?.[0]?.firstName && (contact?.[0]?.firstName)}<br/>{!!contact?.[0]?.lastName && (contact?.[0]?.lastName)}
                    </h1>
                  )
                }
                {
                  isArray(contact) && contact?.[0]?.jobTitle && (
                    <h2 className="cv-prophecy font-size-4">{contact?.[0]?.jobTitle}</h2>
                  )
                }
              </div>
              <div className="contacts-information-block block-block">
                {
                  (conta?.email || conta?.phone || conta?.address || conta?.city || conta?.zipCode || conta?.country) && (
                    <>
                      <div className="contacts-block">
                        {
                          conta?.phone && (
                            <div className="block-item">
                              <svg className="additional-color-1-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M9.70502 6.5C9.59503 6.5 9.48002 6.465 9.37002 6.44C9.14744 6.39023 8.92858 6.32507 8.71502 6.245C8.48307 6.16061 8.2281 6.165 7.99918 6.2573C7.77026 6.34961 7.58357 6.52332 7.47502 6.745L7.36502 6.975C6.87944 6.6996 6.43084 6.36357 6.03003 5.975C5.64145 5.57419 5.30542 5.12559 5.03003 4.64L5.26003 4.535C5.48171 4.42646 5.65542 4.23977 5.74772 4.01085C5.84003 3.78193 5.84441 3.52696 5.76003 3.295C5.68062 3.07952 5.61548 2.85904 5.56502 2.635C5.54002 2.525 5.52002 2.41 5.50502 2.3C5.44431 1.94781 5.25984 1.62887 4.98484 1.40062C4.70983 1.17237 4.36237 1.0498 4.00503 1.055H2.50002C2.28865 1.05472 2.0796 1.09912 1.88658 1.18529C1.69357 1.27146 1.52094 1.39745 1.38002 1.555C1.23618 1.71683 1.12908 1.90788 1.06608 2.11502C1.00307 2.32216 0.985655 2.54049 1.01502 2.755C1.28682 4.83607 2.23763 6.76933 3.72003 8.255C5.2057 9.7374 7.13896 10.6882 9.22003 10.96C9.28493 10.965 9.35012 10.965 9.41502 10.96C9.78373 10.9605 10.1397 10.8253 10.415 10.58C10.5726 10.4391 10.6986 10.2665 10.7847 10.0734C10.8709 9.88043 10.9153 9.67138 10.915 9.46V7.96C10.9123 7.61452 10.7905 7.28056 10.57 7.01455C10.3495 6.74854 10.044 6.56678 9.70502 6.5ZM9.95002 9.5C9.94986 9.56977 9.93509 9.63874 9.90668 9.70246C9.87826 9.76618 9.83682 9.82325 9.78502 9.87C9.73022 9.91993 9.66501 9.95704 9.5941 9.97866C9.52319 10.0003 9.44836 10.0059 9.37502 9.995C7.50916 9.75131 5.77515 8.901 4.44003 7.575C3.10376 6.23873 2.24604 4.49868 2.00002 2.625C1.98916 2.55167 1.99474 2.47684 2.01636 2.40593C2.03798 2.33502 2.0751 2.2698 2.12502 2.215C2.17234 2.16258 2.23021 2.12077 2.29485 2.09233C2.35948 2.06389 2.42941 2.04946 2.50002 2.05H4.00003C4.11561 2.04718 4.22859 2.08449 4.31976 2.1556C4.41092 2.22671 4.47462 2.32721 4.50003 2.44C4.50003 2.575 4.54502 2.715 4.57502 2.85C4.63281 3.11193 4.70968 3.36929 4.80502 3.62L4.10503 3.95C3.98471 4.00523 3.89121 4.10593 3.84503 4.23C3.79502 4.35173 3.79502 4.48827 3.84503 4.61C4.56463 6.15138 5.80365 7.3904 7.34502 8.11C7.46676 8.16001 7.60329 8.16001 7.72502 8.11C7.8491 8.06382 7.94979 7.97032 8.00502 7.85L8.32002 7.15C8.57798 7.24406 8.84189 7.3209 9.11002 7.38C9.24002 7.41 9.38002 7.435 9.51503 7.455C9.62782 7.4804 9.72832 7.5441 9.79943 7.63527C9.87053 7.72643 9.90785 7.83942 9.90502 7.955L9.95002 9.5ZM7.00002 1C6.88503 1 6.76502 1 6.65002 1C6.51742 1.01127 6.39472 1.07476 6.30892 1.1765C6.22312 1.27824 6.18125 1.40989 6.19252 1.5425C6.2038 1.67511 6.26728 1.79781 6.36902 1.88361C6.47076 1.9694 6.60242 2.01127 6.73502 2H7.00002C7.79567 2 8.55874 2.31607 9.12135 2.87868C9.68395 3.44129 10 4.20435 10 5C10 5.09 10 5.175 10 5.265C9.98894 5.3969 10.0306 5.52782 10.1159 5.62905C10.2012 5.73028 10.3232 5.79355 10.455 5.805H10.495C10.6202 5.80551 10.741 5.75905 10.8336 5.67481C10.9261 5.59056 10.9838 5.47466 10.995 5.35C10.995 5.235 10.995 5.115 10.995 5C10.995 3.94 10.5743 2.92334 9.82522 2.17334C9.07616 1.42334 8.06002 1.00133 7.00002 1ZM8.00002 5C8.00002 5.13261 8.0527 5.25979 8.14647 5.35355C8.24024 5.44732 8.36742 5.5 8.50002 5.5C8.63263 5.5 8.75981 5.44732 8.85358 5.35355C8.94735 5.25979 9.00002 5.13261 9.00002 5C9.00002 4.46957 8.78931 3.96086 8.41424 3.58579C8.03917 3.21071 7.53046 3 7.00002 3C6.86742 3 6.74024 3.05268 6.64647 3.14645C6.5527 3.24021 6.50002 3.36739 6.50002 3.5C6.50002 3.63261 6.5527 3.75979 6.64647 3.85355C6.74024 3.94732 6.86742 4 7.00002 4C7.26524 4 7.5196 4.10536 7.70713 4.29289C7.89467 4.48043 8.00002 4.73478 8.00002 5Z" fill="#1C1C1C"/>
                              </svg>
                              <div className="block-item-name">{conta?.phone}</div>
                            </div>
                          )
                        }
                        <div className="block-item">
                          <svg className="additional-color-1-svg" xmlns="http://www.w3.org/2000/svg" width="9" height="12" viewBox="0 0 9 12" fill="none">
                            <g clip-path="url(#clip0_2517_712)">
                              <path d="M7.56813 2.23873C6.7544 1.44309 5.65074 0.996094 4.49995 0.996094C3.34916 0.996094 2.2455 1.44309 1.43177 2.23873C0.618039 3.03438 0.160889 4.11352 0.160889 5.23873C0.160889 6.36395 0.618039 7.44308 1.43177 8.23873L4.12666 10.8787C4.1742 10.9256 4.23075 10.9628 4.29307 10.9882C4.35538 11.0136 4.42222 11.0266 4.48973 11.0266C4.55723 11.0266 4.62407 11.0136 4.68638 10.9882C4.7487 10.9628 4.80526 10.9256 4.85279 10.8787L7.56813 8.21373C8.37847 7.4214 8.83371 6.34676 8.83371 5.22623C8.83371 4.10571 8.37847 3.03107 7.56813 2.23873ZM6.83688 7.49873L4.49995 9.79373L2.16302 7.49873C1.70133 7.04689 1.38701 6.47136 1.2598 5.84488C1.13258 5.2184 1.19817 4.56911 1.44829 3.97907C1.69841 3.38904 2.12181 2.88476 2.66499 2.52997C3.20817 2.17519 3.84673 1.98583 4.49995 1.98583C5.15318 1.98583 5.79174 2.17519 6.33491 2.52997C6.87809 2.88476 7.3015 3.38904 7.55161 3.97907C7.80173 4.56911 7.86733 5.2184 7.74011 5.84488C7.61289 6.47136 7.29857 7.04689 6.83688 7.49873ZM2.96586 3.70373C2.55305 4.10862 2.32123 4.65702 2.32123 5.22873C2.32123 5.80045 2.55305 6.34885 2.96586 6.75373C3.27256 7.05413 3.66315 7.25927 4.08864 7.34344C4.51412 7.4276 4.95555 7.38703 5.35755 7.22681C5.75954 7.0666 6.10419 6.79387 6.34827 6.44286C6.59234 6.09184 6.72496 5.67817 6.7295 5.25373C6.7318 4.97034 6.67597 4.68936 6.5653 4.42743C6.45463 4.16549 6.29137 3.92791 6.08518 3.72873C5.88251 3.52602 5.64085 3.3645 5.37409 3.25347C5.10733 3.14243 4.82075 3.08407 4.53084 3.08175C4.24093 3.07943 3.95341 3.13318 3.68482 3.23993C3.41624 3.34667 3.1719 3.5043 2.96586 3.70373ZM5.36416 6.04373C5.17037 6.23611 4.91427 6.35669 4.63962 6.38486C4.36498 6.41304 4.08885 6.34705 3.85845 6.1982C3.62805 6.04934 3.45769 5.82686 3.37649 5.56878C3.29529 5.3107 3.3083 5.03305 3.41328 4.78331C3.51827 4.53357 3.70872 4.32724 3.95207 4.1996C4.19542 4.07196 4.47656 4.03094 4.74742 4.08354C5.01828 4.13615 5.26204 4.27911 5.43703 4.488C5.61202 4.69689 5.70737 4.95872 5.70677 5.22873C5.69933 5.53737 5.56691 5.8305 5.33859 6.04373H5.36416Z" fill="#1C1C1C"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_2517_712">
                                <rect width="9" height="12" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                        <div className="block-item-name">{`${conta?.address + ', '} ${conta?.city + ', '} ${conta?.zipCode + ', '} ${conta?.country}`}</div>
                          
                        </div>
                        {
                          conta?.email && (
                            <div className="block-item">
                              <svg className="additional-color-1-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M9.5 2H2.5C2.10218 2 1.72064 2.15804 1.43934 2.43934C1.15804 2.72064 1 3.10218 1 3.5V8.5C1 8.89782 1.15804 9.27936 1.43934 9.56066C1.72064 9.84196 2.10218 10 2.5 10H9.5C9.89782 10 10.2794 9.84196 10.5607 9.56066C10.842 9.27936 11 8.89782 11 8.5V3.5C11 3.10218 10.842 2.72064 10.5607 2.43934C10.2794 2.15804 9.89782 2 9.5 2ZM2.5 3H9.5C9.63261 3 9.75979 3.05268 9.85355 3.14645C9.94732 3.24021 10 3.36739 10 3.5L6 5.94L2 3.5C2 3.36739 2.05268 3.24021 2.14645 3.14645C2.24021 3.05268 2.36739 3 2.5 3ZM10 8.5C10 8.63261 9.94732 8.75979 9.85355 8.85355C9.75979 8.94732 9.63261 9 9.5 9H2.5C2.36739 9 2.24021 8.94732 2.14645 8.85355C2.05268 8.75979 2 8.63261 2 8.5V4.64L5.74 6.925C5.81601 6.96888 5.90223 6.99199 5.99 6.99199C6.07777 6.99199 6.16399 6.96888 6.24 6.925L10 4.64V8.5Z" fill="#1C1C1C"/>
                              </svg>
                              <a className="block-item-name" href={`mailto:${conta?.email}`}>{conta?.email}</a>
                            </div>
                          )
                        }
                      </div>
                    </>
                  )
                }
              </div>
              <div className="profile-info-block block-block additional-color-1-border">
                <h3 className="block-heading font-size-4 additional-color-1-text">Profile</h3>
                  {
                      career_objective?.[0]?.data && (
                        <p dangerouslySetInnerHTML={{ __html: career_objective?.[0]?.data }}></p>
                      )
                  }
              </div>
              {
                (isArray(employment) && (employment.length > 1 || isObjDatasKeys(employment?.[0]))) && (
                  <div className="employment-history-block block-block additional-color-1-border">
                    <h3 className="block-heading font-size-4 additional-color-1-text">Employment History</h3>
                    {
                      employment.map((itemEm, index) => (
                        <div className="block-info" key={index}>
                          <p className="block-subheading font-size-2">
                            {!!itemEm?.title && (checkForSymbol([itemEm?.company, itemEm?.city])) ? itemEm?.title + ', ' : itemEm?.title}
                            {!!itemEm?.company && (checkForSymbol([itemEm?.city])) ? itemEm?.company + ', ' : itemEm?.company}
                            {!!itemEm?.city && (itemEm?.city)}
                          </p>
                          {
                            (!!itemEm?.periodFrom?.date || !!itemEm?.periodTo?.date) && (
                              <p className="date-range">
                                {!!itemEm?.periodFrom?.date && (checkForSymbol([itemEm?.periodTo?.date]) ? moment(itemEm?.periodFrom?.date).format("MMMM yy") + ' - ' : moment(itemEm?.periodFrom?.date).format("MMMM yy"))}
                                {!!itemEm?.periodTo?.date && (moment(itemEm?.periodTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                          <div className="text-block-wrapper">
                            <div className="text-block" dangerouslySetInnerHTML={{ __html: itemEm.assignment }}></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                (isArray(education) && (education.length > 1 || isObjDatasKeys(education?.[0]))) && (
                  <div className="education-block block-block additional-color-1-border">
                    <h3 className="block-heading font-size-4 additional-color-1-text">Education</h3>
                    {
                      education.map((itemEd, index) => (
                        <div className="block-info" key={index}>
                          <p className="block-subheading font-size-2">
                            {!!itemEd?.facility && (checkForSymbol([itemEd?.study])) ? itemEd?.facility + ', ' : itemEd?.facility}
                            {!!itemEd?.study && (itemEd?.study)}
                          </p>
                          <p className="degree-block">
                            {!!itemEd?.degree && (`${itemEd?.degree}`)}
                          </p>
                          {
                            (!!itemEd?.dateFrom?.date || !!itemEd?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemEd?.dateFrom?.date && (checkForSymbol([itemEd?.dateTo?.date]) ? moment(itemEd?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEd?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemEd?.dateTo?.date && (moment(itemEd?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEd.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                 (isArray(courses) && (courses.length > 1 || isObjDatasKeys(courses?.[0]))) && (
                  <div className="courses-block block-block additional-color-1-border">
                    <h3 className="block-heading font-size-4 additional-color-1-text">Courses</h3>
                    {
                      courses.map((itemCo, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemCo?.title || !!itemCo?.institution) && (
                              <p className="block-subheading font-size-2">
                                {!!itemCo?.title && (checkForSymbol([itemCo?.institution])) ? itemCo?.title + ', ' : itemCo?.title}
                                {!!itemCo?.institution && (itemCo?.institution)}
                              </p>
                            )
                          }
                          {
                            (!!itemCo?.dateFrom?.date || !!itemCo?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemCo?.dateFrom?.date && (checkForSymbol([itemCo?.dateTo?.date]) ? moment(itemCo?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemCo?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemCo?.dateTo?.date && (moment(itemCo?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                (isArray(extra_curricular) && (extra_curricular.length > 1 || isObjDatasKeys(extra_curricular?.[0]))) && (
                  <div className="extra-curricular-activities-block block-block additional-color-1-border">
                    <h3 className="block-heading font-size-4 additional-color-1-text">Extra-curricular activities</h3>
                    {
                      extra_curricular.map((itemEx, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemEx?.title || itemEx?.employer) && (
                              <p className="block-subheading font-size-2">
                                {!!itemEx?.title && (checkForSymbol([itemEx?.employer])) ? itemEx?.title + ', ' : itemEx?.title}
                                {!!itemEx?.employer && (itemEx?.employer)}
                              </p>
                            )
                          }
                          {
                            (!!itemEx?.dateFrom?.date || !!itemEx?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemEx?.dateFrom?.date && (checkForSymbol([itemEx?.dateTo?.date]) ? moment(itemEx?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemEx?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemEx?.dateTo?.date && (moment(itemEx?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemEx.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
              (isArray(internship) && (internship.length > 1 || isObjDatasKeys(internship?.[0]))) && (
                  <div className="internships-block block-block additional-color-1-border">
                    <h3 className="block-heading font-size-4 additional-color-1-text">Internships</h3>
                    {
                      internship.map((itemIn, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemIn?.jobTitle || itemIn?.employer || !!itemIn?.city) && (
                              <p className="block-subheading font-size-2">
                                {!!itemIn?.jobTitle && (checkForSymbol([itemIn?.employer, itemIn?.city])) ? itemIn?.jobTitle + ', ' : itemIn?.jobTitle}
                                {!!itemIn?.employer && (checkForSymbol([itemIn?.city])) ? itemIn?.employer + ', ' : itemIn?.employer}
                                {!!itemIn?.city && (itemIn?.city)}
                              </p>
                            )
                          }
                          {
                            (!!itemIn?.dateFrom?.date || !!itemIn?.dateTo?.date) && (
                              <p className="date-range">
                                {!!itemIn?.dateFrom?.date && (checkForSymbol([itemIn?.dateTo?.date]) ? moment(itemIn?.dateFrom?.date).format("MMMM yy") + ' - ' : moment(itemIn?.dateFrom?.date).format("MMMM yy"))}
                                {!!itemIn?.dateTo?.date && (moment(itemIn?.dateTo?.date).format("MMMM yy"))}
                              </p>
                            )
                          }
                          <p dangerouslySetInnerHTML={{ __html: itemIn.description }}></p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
            <div className="column-right additional-color-1-background">
              {
                !!conta?.picture && (
                  <div className="photo-block">
                    <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                  </div>
                )
              }
              <div className="personal-info-block block-block">
                <h3 className="block-heading font-size-3">Skills</h3>
                <div className="personal-info">
                  {
                    conta?.nationality && (
                      <div className="info-item">
                        <p className="info-item-name">Nationality</p>
                        <p className="info-item-value">{conta?.nationality}</p>
                      </div>
                    )
                  }
                  {
                    conta?.driverLicense && (
                      <div className="info-item">
                        <p className="info-item-name">Driving license</p>
                        <p className="info-item-value">{conta?.driverLicense}</p>
                      </div>
                    )
                  }
                  {
                    conta?.dateOfBirth && (
                      <div className="info-item">
                        <p className="info-item-name">Date / Place of birth</p>
                        <p className="info-item-value">{moment(conta?.dateOfBirth).format("DD-MM-yy")} / {conta?.placeOfBirth}</p>
                      </div>
                    )
                  }
                </div>
              </div>
              {
                isArray(languages) && !!languages.length && (
                  <div className="languages-block block-block">
                    <h3 className="block-heading font-size-3">Languages</h3>
                    <div className="skills-list estimated-items-list">
                      {
                        languages.map((item, index) => (
                          <div className="list-item" key={index}>
                            <p className="item-name">{`${item.language} - ${levelLanguage(item.level)}`}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              <div className="skills-block block-block">
                {
                  !!(isArray(skills) && skills.length) && (
                    <>
                      <h3 className="block-heading font-size-3">Skills</h3>
                      <div className="skills-list estimated-items-list">
                        {
                          skills.map((item, index) => (
                             <div className="list-item" key={index}>
                              <p className="item-name">{item?.name}</p>
                              <div className="estimated-item-value-wrapper">
                                  <div className="estimated-item-value" style={{ width: `${(item.level * 100) / 6}%` }}></div>
                                </div>
                            </div>
                          ))
                        }
                      </div>
                    </>
                  )
                }
              </div>
              {
                isArray(hobbies) && !!hobbies.length && (
                  <div className="hobbies-block block-block">
                    <h3 className="block-heading font-size-3">Hobbies</h3>
                    <p>
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
               (isArray(reference) && (reference.length > 1 || isObjDatasKeys(reference?.[0]))) && (
                  <div className="references-block block-block">
                    <h3 className="block-heading font-size-3">References</h3>
                    {
                      reference.map((itemRef, index) => (
                        <div className="block-info" key={index}>
                          {
                            (!!itemRef?.fullName || !!itemRef?.company) && (
                              <p>
                                {!!itemRef?.fullName && (checkForSymbol([itemRef?.company])) ? itemRef?.fullName + ', ' : itemRef?.fullName}
                                {!!itemRef?.company && (itemRef?.company)}
                              </p>
                            )
                          }
                          {
                            !!itemRef?.email && (
                              <p>{itemRef.email}</p>
                            )
                          }
                          {
                            !!itemRef.phone && (
                              <p>{itemRef.phone}</p>
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
                    <h3 className="block-heading font-size-3">Certificates</h3>
                    <div className="block-info font-size-2">
                      <p className="certificates-list">
                        {
                          certificates.map((item, index) => (
                            <span key={index}>
                              {`${item.name}`}
                            </span>
                          ))
                        }
                      </p>
                    </div>
                  </div>
                )
              }
              {
                isArray(social_links) && !!social_links.length && (
                  <div className="links-block block-block">
                    <h3 className="block-heading font-size-3">Links</h3>
                    <div className="links-block-content">
                      {
                        social_links.map((item, index) => (
                          <a key={index}>{item.name}</a>
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

