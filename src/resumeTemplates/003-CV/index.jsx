import { useEffect } from "react";
import { isArray } from "lodash";
import moment from 'moment';
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
        'top-block',
        'profile-info-block',
        'details-block'
      ];
      let cvBlocksLeft = [
        'employment-history-block',
        'education-block',
        'courses-block',
        'extra-curricular-activities-block',
        'internships-block'
      ];
      let cvBlocksRight = [
        'languages-block',
        'skills-block',
        'certificates-block',
        'references-block',
        'hobbies-block'
      ];

      let cvDataTop = [];
      let cvDataLeft = [];
      let cvDataRight = [];

      cvBlocksTop.forEach(function(el){
        cvDataTop.push($('.' + el).clone());
      });
      cvBlocksLeft.forEach(function(el){
        cvDataLeft.push($('.' + el).clone());
      });
      cvBlocksRight.forEach(function(el){
        cvDataRight.push($('.' + el).clone());
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
      checkEmpty();
      columnRightHelper();
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
      page_element_container.append(area_1);

      var area_2 = $('#cv-body-hidden-container .cv-body-content .area-2').clone();
      area_2.children().remove();
      page_element_container.append(area_2);

      var area_2_left = $('#cv-body-hidden-container .cv-body-content .area-2 .column-left').clone();
      area_2_left.children().remove();
      area_2.append(area_2_left);

      var area_2_right = $('#cv-body-hidden-container .cv-body-content .area-2 .column-right').clone();
      area_2_right.children().remove();
      area_2.append(area_2_right);
    
      if($('#cv-chapter-section-cv').find(page_element)) {
        $('#cv-chapter-section-cv').append(page_element);
      }
    
      return page_element_container;
    }
    function checkEmpty() {
      $('.cv-body-area').each(function(index, el){
        if($(this).height() === 0) {
          $(this).remove();
        }
      });
    }
    function columnRightHelper() {
      $('.cv-body-visible .js-column-right').each(function(){
        if ($(this).width() === 0) {
          $(this).addClass('m-empty');
        } else {
          $(this).removeClass('m-empty');
        }
      });
    }
    function secondaryInfoHelper() {
      $('.cv-body-visible .js-profile-secondary-info .item-block').each(function(){
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

export const ResumeCv003 = ({
  data,
  dataNew,
  stateClasses,
  reportTemplateRef,
  isDrawing = false,
  isTemplate = false,
  handleFalseDrafind = () => { },
  objActiveBlock,
  beforeСontent
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

  useEffect(() => {
    if (isTemplate) {
      setTimeout(() => {
        drawing();
      }, 100);
    }
  }, []);

  return (
    <div className="sv_003" ref={reportTemplateRef}>
      <div id="cv-chapter-section-cv" className={`${stateClasses} cv-chapter-section`} data-chapter="cv">
        <div id="cv-body-hidden-container" className="cv-body">
          <div className="cv-body-content main-color-1-text font-size-1">
            <div className="cv-body-area area-1">
              <div className="top-block additional-color-2-background">
                <div className={`personal-info-block ${!contact?.[0]?.picture && !contact[0].jobTitle && !contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                  {
                    contact?.[0]?.picture && (
                      <div id="photo-block" className="photo-block active">
                        <div className="photo" style={{ backgroundImage: `url(${contact?.[0]?.picture})` }}></div>
                      </div>
                    )
                  }
                  <div className={`cv-heading-wrap ${!contact[0].firstName && !contact[0].lastName && !contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                    <div className={`cv-name font-size-4 ${!contact[0].firstName && !contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                      <span className={`name-line-1 ${!contact[0].firstName ? 'empty-field' : ''} ${!contact[0].firstName && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0].firstName || 'Matthew'}
                      </span><br />
                      <span className={`name-line-2 ${!contact[0].lastName ? 'empty-field' : ''} ${!contact[0].lastName && !beforeСontent ? 'hide' : ''}`}>
                        {contact[0].lastName || 'Mcconaughey'}
                      </span>
                    </div>
                    <div className={`cv-profession font-size-2 ${!contact[0].jobTitle ? 'empty-field' : ''} ${!contact[0].jobTitle && !beforeСontent ? 'hide' : ''}`}>
                      {contact[0].jobTitle || 'Web-designer'}
                    </div>
                  </div>
                </div>
                <div className={`profile-secondary-info ${!contact[0]?.driverLicense && !contact[0]?.nationality && !contact[0]?.placeOfBirth && !contact[0]?.dateOfBirth && !beforeСontent ? 'hide' : ''}`}>
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
              <div className={`profile-info-block ${!career_objective[0].data && !beforeСontent ? 'hide' : ''}`}>
                <div className="profile">
                  <div className="cv-heading font-size-2">Profile
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
              <div className={`details-block ${!contact[0]?.country && !contact[0]?.email && !contact[0]?.phone && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                <div className={`block-item phone-item ${!contact[0]?.phone && !beforeСontent ? 'hide' : ''}`}>
                  <svg className="additional-color-1-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.94 8.66671C12.7933 8.66671 12.64 8.62004 12.4933 8.58671C12.1966 8.52035 11.9047 8.43347 11.62 8.32671C11.3107 8.21419 10.9708 8.22004 10.6655 8.34311C10.3603 8.46619 10.1114 8.6978 9.96666 8.99337L9.81999 9.30004C9.17254 8.93284 8.57441 8.48481 8.03999 7.96671C7.52189 7.43229 7.07386 6.83416 6.70666 6.18671L7.01333 6.04671C7.3089 5.90199 7.54051 5.65306 7.66359 5.34784C7.78666 5.04261 7.79251 4.70265 7.67999 4.39337C7.57412 4.10606 7.48726 3.81209 7.41999 3.51337C7.38666 3.36671 7.35999 3.21337 7.33999 3.06671C7.25904 2.59712 7.01308 2.17187 6.64641 1.86753C6.27974 1.5632 5.81646 1.39978 5.33999 1.40671H3.33333C3.05149 1.40634 2.77276 1.46554 2.5154 1.58043C2.25805 1.69532 2.02788 1.86331 1.83999 2.07337C1.64821 2.28914 1.5054 2.54387 1.42139 2.82006C1.33739 3.09626 1.31417 3.38736 1.35333 3.67337C1.71572 6.44813 2.98347 9.02581 4.95999 11.0067C6.94089 12.9832 9.51857 14.251 12.2933 14.6134C12.3799 14.62 12.4668 14.62 12.5533 14.6134C13.0449 14.6141 13.5196 14.4337 13.8867 14.1067C14.0967 13.9188 14.2647 13.6887 14.3796 13.4313C14.4945 13.1739 14.5537 12.8952 14.5533 12.6134V10.6134C14.5497 10.1527 14.3872 9.70745 14.0933 9.35277C13.7993 8.99809 13.392 8.75575 12.94 8.66671ZM13.2667 12.6667C13.2664 12.7597 13.2468 12.8517 13.2089 12.9367C13.171 13.0216 13.1157 13.0977 13.0467 13.16C12.9736 13.2266 12.8866 13.2761 12.7921 13.3049C12.6975 13.3337 12.5978 13.3412 12.5 13.3267C10.0122 13.0018 7.70016 11.868 5.91999 10.1C4.13831 8.31835 2.99468 5.99829 2.66666 3.50004C2.65218 3.40226 2.65962 3.30249 2.68844 3.20794C2.71727 3.11339 2.76676 3.02644 2.83333 2.95337C2.89641 2.88348 2.97358 2.82773 3.05976 2.78981C3.14594 2.75189 3.23917 2.73266 3.33333 2.73337H5.33333C5.48743 2.72961 5.63808 2.77936 5.75964 2.87417C5.88119 2.96898 5.96613 3.10299 5.99999 3.25337C5.99999 3.43337 6.05999 3.62004 6.09999 3.80004C6.17704 4.14928 6.27954 4.49242 6.40666 4.82671L5.47333 5.26671C5.3129 5.34035 5.18823 5.47461 5.12666 5.64004C5.05998 5.80235 5.05998 5.9844 5.12666 6.14671C6.08613 8.20188 7.73816 9.85391 9.79333 10.8134C9.95563 10.8801 10.1377 10.8801 10.3 10.8134C10.4654 10.7518 10.5997 10.6271 10.6733 10.4667L11.0933 9.53337C11.4373 9.65879 11.7891 9.76124 12.1467 9.84004C12.32 9.88004 12.5067 9.91337 12.6867 9.94004C12.837 9.97391 12.9711 10.0588 13.0659 10.1804C13.1607 10.3019 13.2104 10.4526 13.2067 10.6067L13.2667 12.6667ZM9.33333 1.33337C9.17999 1.33337 9.01999 1.33337 8.86666 1.33337C8.68985 1.3484 8.52625 1.43305 8.41185 1.56871C8.29745 1.70436 8.24163 1.8799 8.25666 2.05671C8.27169 2.23352 8.35634 2.39712 8.49199 2.51151C8.62764 2.62591 8.80318 2.68174 8.97999 2.66671H9.33333C10.3942 2.66671 11.4116 3.08813 12.1618 3.83828C12.9119 4.58843 13.3333 5.60584 13.3333 6.66671C13.3333 6.78671 13.3333 6.90004 13.3333 7.02004C13.3185 7.19591 13.3741 7.37047 13.4878 7.50544C13.6016 7.64041 13.7642 7.72478 13.94 7.74004H13.9933C14.1602 7.74072 14.3213 7.67877 14.4447 7.56645C14.5682 7.45412 14.645 7.29959 14.66 7.13337C14.66 6.98004 14.66 6.82004 14.66 6.66671C14.66 5.25337 14.099 3.89783 13.1003 2.89783C12.1015 1.89782 10.7467 1.33514 9.33333 1.33337ZM10.6667 6.66671C10.6667 6.84352 10.7369 7.01309 10.8619 7.13811C10.9869 7.26314 11.1565 7.33337 11.3333 7.33337C11.5101 7.33337 11.6797 7.26314 11.8047 7.13811C11.9298 7.01309 12 6.84352 12 6.66671C12 5.95946 11.719 5.28119 11.2189 4.78109C10.7188 4.28099 10.0406 4.00004 9.33333 4.00004C9.15652 4.00004 8.98695 4.07028 8.86192 4.1953C8.7369 4.32033 8.66666 4.4899 8.66666 4.66671C8.66666 4.84352 8.7369 5.01309 8.86192 5.13811C8.98695 5.26314 9.15652 5.33337 9.33333 5.33337C9.68695 5.33337 10.0261 5.47385 10.2761 5.7239C10.5262 5.97395 10.6667 6.31309 10.6667 6.66671Z" fill="#A0A0A0" />
                  </svg>
                  <div className={`${!contact[0].phone ? 'empty-field' : ''}`}>
                    {contact[0].phone || '736-343-9384'}
                  </div>
                </div>
                <div className={`block-item email-item ${!contact[0]?.email && !beforeСontent ? 'hide' : ''}`}>
                  <svg className="additional-color-1-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 2.66663H3.33337C2.80294 2.66663 2.29423 2.87734 1.91916 3.25241C1.54409 3.62749 1.33337 4.13619 1.33337 4.66663V11.3333C1.33337 11.8637 1.54409 12.3724 1.91916 12.7475C2.29423 13.1226 2.80294 13.3333 3.33337 13.3333H12.6667C13.1971 13.3333 13.7058 13.1226 14.0809 12.7475C14.456 12.3724 14.6667 11.8637 14.6667 11.3333V4.66663C14.6667 4.13619 14.456 3.62749 14.0809 3.25241C13.7058 2.87734 13.1971 2.66663 12.6667 2.66663ZM3.33337 3.99996H12.6667C12.8435 3.99996 13.0131 4.0702 13.1381 4.19522C13.2631 4.32025 13.3334 4.48981 13.3334 4.66663L8.00004 7.91996L2.66671 4.66663C2.66671 4.48981 2.73695 4.32025 2.86197 4.19522C2.98699 4.0702 3.15656 3.99996 3.33337 3.99996ZM13.3334 11.3333C13.3334 11.5101 13.2631 11.6797 13.1381 11.8047C13.0131 11.9297 12.8435 12 12.6667 12H3.33337C3.15656 12 2.98699 11.9297 2.86197 11.8047C2.73695 11.6797 2.66671 11.5101 2.66671 11.3333V6.18663L7.65337 9.23329C7.75472 9.29181 7.86968 9.32261 7.98671 9.32261C8.10373 9.32261 8.21869 9.29181 8.32004 9.23329L13.3334 6.18663V11.3333Z" fill="#A0A0A0" />
                  </svg>
                  <div className={`${!contact[0].email ? 'empty-field' : ''}`}>
                    {contact[0].email || 'designer@webservice.com'}
                  </div>
                </div>
                <div className={`block-item ${!contact[0]?.country && !contact[0]?.address && !contact[0]?.city && !contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                  <svg className="additional-color-1-svg" width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.24996 2.98669C8.25539 1.92582 6.90648 1.32983 5.49996 1.32983C4.09343 1.32983 2.74452 1.92582 1.74996 2.98669C0.755394 4.04755 0.196655 5.4864 0.196655 6.98669C0.196655 8.48698 0.755394 9.92582 1.74996 10.9867L5.04371 14.5067C5.10181 14.5692 5.17093 14.6188 5.2471 14.6526C5.32326 14.6865 5.40495 14.7039 5.48746 14.7039C5.56996 14.7039 5.65165 14.6865 5.72782 14.6526C5.80398 14.6188 5.8731 14.5692 5.93121 14.5067L9.24996 10.9534C10.2404 9.8969 10.7968 8.46406 10.7968 6.97002C10.7968 5.47599 10.2404 4.04314 9.24996 2.98669ZM8.35621 10L5.49996 13.06L2.64371 10C2.07942 9.39757 1.69525 8.63019 1.53977 7.79488C1.38428 6.95958 1.46445 6.09385 1.77015 5.30714C2.07584 4.52043 2.59334 3.84805 3.25723 3.37501C3.92111 2.90196 4.70157 2.64948 5.49996 2.64948C6.29834 2.64948 7.0788 2.90196 7.74269 3.37501C8.40657 3.84805 8.92407 4.52043 9.22976 5.30714C9.53546 6.09385 9.61563 6.95958 9.46015 7.79488C9.30466 8.63019 8.92049 9.39757 8.35621 10ZM3.62496 4.94002C3.1204 5.47987 2.83708 6.21107 2.83708 6.97336C2.83708 7.73564 3.1204 8.46684 3.62496 9.00669C3.99981 9.40721 4.4772 9.68074 4.99724 9.79296C5.51728 9.90517 6.0568 9.85108 6.54813 9.63746C7.03945 9.42384 7.46069 9.06021 7.75901 8.59219C8.05732 8.12417 8.21941 7.5726 8.22496 7.00669C8.22777 6.62882 8.15953 6.25419 8.02427 5.90495C7.88901 5.5557 7.68947 5.23893 7.43746 4.97336C7.18975 4.70307 6.89438 4.48771 6.56835 4.33967C6.24231 4.19162 5.89204 4.11381 5.53771 4.11071C5.18337 4.10761 4.83196 4.17929 4.50369 4.32161C4.17542 4.46394 3.87678 4.67411 3.62496 4.94002ZM6.55621 8.06002C6.31936 8.31652 6.00634 8.47729 5.67066 8.51486C5.33498 8.55242 4.9975 8.46445 4.7159 8.26597C4.4343 8.0675 4.22608 7.77085 4.12684 7.42674C4.02759 7.08264 4.04349 6.71245 4.1718 6.37946C4.30012 6.04647 4.53289 5.77137 4.83032 5.60118C5.12775 5.43099 5.47136 5.37629 5.80242 5.44643C6.13347 5.51657 6.4314 5.70719 6.64527 5.98571C6.85915 6.26422 6.97568 6.61334 6.97496 6.97336C6.96586 7.38487 6.80401 7.77571 6.52496 8.06002H6.55621Z" fill="#A0A0A0" />
                  </svg>
                  <div>
                    <span className={`${!contact[0].country ? 'empty-field' : ''} ${!contact[0]?.country && !beforeСontent ? 'hide' : ''}`}>
                      {`${checkForSymbol([contact[0].address, contact[0].city, contact[0].zipCode]) ? contact[0].country + ', ' : contact[0].country || 'United States, '}`}
                    </span>
                    <span className={`${!contact[0].address ? 'empty-field' : ''} ${!contact[0]?.address && !beforeСontent ? 'hide' : ''}`}>
                      {`${checkForSymbol([contact[0].city, contact[0].zipCode]) ? contact[0].address + ', ' : contact[0].address || '5th Avenue Street, '}`}
                    </span>
                    <span className={`${!contact[0].city ? 'empty-field' : ''} ${!contact[0]?.city && !beforeСontent ? 'hide' : ''}`}>
                      {`${checkForSymbol([ contact[0].zipCode]) ? contact[0].city + ', ' : contact[0].city || 'New York City, '}`}
                    </span>
                    <span className={`${!contact[0].zipCode ? 'empty-field' : ''} ${!contact[0]?.zipCode && !beforeСontent ? 'hide' : ''}`}>
                      {`${contact[0].zipCode || '384846'}`}
                    </span>
                  </div>
                </div>
                <div className={`block-item ${!social_links.length && !beforeСontent ? 'hide' : ''}`}>
                  <svg className="additional-color-1-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.56877 9.61881L5.14377 12.0438C4.85017 12.3272 4.45806 12.4855 4.05002 12.4855C3.64198 12.4855 3.24987 12.3272 2.95627 12.0438C2.81227 11.9004 2.69802 11.7299 2.62005 11.5422C2.54209 11.3545 2.50196 11.1533 2.50196 10.9501C2.50196 10.7468 2.54209 10.5456 2.62005 10.3579C2.69802 10.1702 2.81227 9.99974 2.95627 9.85631L5.38127 7.43131C5.49896 7.31362 5.56508 7.154 5.56508 6.98756C5.56508 6.82112 5.49896 6.6615 5.38127 6.54381C5.26358 6.42612 5.10396 6.36 4.93752 6.36C4.77108 6.36 4.61146 6.42612 4.49377 6.54381L2.06877 8.97506C1.58024 9.50681 1.31603 10.2067 1.33132 10.9287C1.3466 11.6506 1.6402 12.3387 2.15079 12.8493C2.66138 13.3599 3.3495 13.6535 4.07142 13.6688C4.79335 13.684 5.49327 13.4198 6.02502 12.9313L8.45627 10.5063C8.57396 10.3886 8.64008 10.229 8.64008 10.0626C8.64008 9.89612 8.57396 9.7365 8.45627 9.61881C8.33858 9.50112 8.17896 9.435 8.01252 9.435C7.84608 9.435 7.68646 9.50112 7.56877 9.61881ZM12.9313 2.06881C12.4055 1.54631 11.6944 1.25305 10.9531 1.25305C10.2119 1.25305 9.50078 1.54631 8.97502 2.06881L6.54377 4.49381C6.4855 4.55208 6.43927 4.62126 6.40773 4.6974C6.37619 4.77354 6.35996 4.85515 6.35996 4.93756C6.35996 5.01997 6.37619 5.10158 6.40773 5.17771C6.43927 5.25385 6.4855 5.32303 6.54377 5.38131C6.60204 5.43958 6.67123 5.48581 6.74736 5.51735C6.8235 5.54888 6.90511 5.56512 6.98752 5.56512C7.06993 5.56512 7.15154 5.54888 7.22768 5.51735C7.30381 5.48581 7.373 5.43958 7.43127 5.38131L9.85627 2.95631C10.1499 2.67295 10.542 2.51459 10.95 2.51459C11.3581 2.51459 11.7502 2.67295 12.0438 2.95631C12.1878 3.09974 12.302 3.27019 12.38 3.45788C12.4579 3.64558 12.4981 3.84682 12.4981 4.05006C12.4981 4.2533 12.4579 4.45454 12.38 4.64224C12.302 4.82993 12.1878 5.00038 12.0438 5.14381L9.61877 7.56881C9.56019 7.62691 9.51369 7.69604 9.48196 7.7722C9.45023 7.84836 9.4339 7.93005 9.4339 8.01256C9.4339 8.09507 9.45023 8.17676 9.48196 8.25292C9.51369 8.32908 9.56019 8.39821 9.61877 8.45631C9.67687 8.51489 9.746 8.56139 9.82216 8.59312C9.89832 8.62485 9.98001 8.64118 10.0625 8.64118C10.145 8.64118 10.2267 8.62485 10.3029 8.59312C10.379 8.56139 10.4482 8.51489 10.5063 8.45631L12.9313 6.02506C13.4538 5.4993 13.747 4.78817 13.747 4.04693C13.747 3.3057 13.4538 2.59457 12.9313 2.06881ZM5.51877 9.48131C5.57717 9.53924 5.64643 9.58506 5.72258 9.61617C5.79873 9.64727 5.88027 9.66303 5.96252 9.66256C6.04477 9.66303 6.12631 9.64727 6.20246 9.61617C6.27861 9.58506 6.34787 9.53924 6.40627 9.48131L9.48127 6.40631C9.59896 6.28862 9.66508 6.129 9.66508 5.96256C9.66508 5.79612 9.59896 5.6365 9.48127 5.51881C9.36358 5.40112 9.20396 5.335 9.03752 5.335C8.87108 5.335 8.71146 5.40112 8.59377 5.51881L5.51877 8.59381C5.46019 8.65191 5.41369 8.72104 5.38196 8.7972C5.35023 8.87336 5.3339 8.95505 5.3339 9.03756C5.3339 9.12007 5.35023 9.20176 5.38196 9.27792C5.41369 9.35408 5.46019 9.42321 5.51877 9.48131Z" fill="#A0A0A0" />
                  </svg>
                  <div className="links-wrapper">
                    {
                      isArray(social_links) && social_links.length && (
                        social_links.map((itemSocial, index) => (
                          <a className="links-item" key={index}>
                            {itemSocial.name}
                          </a>
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
            <div className="cv-body-area area-2">
              <div className="column-left">
                <div className={`employment-history-block block-block ${!employment[0].assignment && !employment[0].city && !employment[0].company && !employment[0].title && !employment[0].periodFrom?.date && !employment[0].periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">Employment history
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    employment.map((itemEm, index) => (
                      <div className="block-info" key={index}>
                        <div className="horizontal-wrap">
                          <div className="cv-heading">
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
                          <div className="date-range ${!itemEm.periodTo?.date && !itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}">
                            <span className={`${!itemEm.periodFrom?.date ? 'empty-field' : ''} ${!itemEm.periodFrom?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEm.periodFrom?.date && (checkForSymbol([itemEm.periodTo?.date]) ? moment(itemEm.periodFrom.date).format("MMMM yy") + ' - ' : moment(itemEm.periodFrom.date).format("MMMM yy")) || 'March 2022'}
                            </span>
                            <span className={`${!itemEm.periodTo?.date ? 'empty-field' : ''} ${!itemEm.periodTo?.date && !beforeСontent ? 'hide' : ''}`}>
                              {itemEm.periodTo?.date && (moment(itemEm.periodTo.date).format("MMMM yy")) || ' - December 2022'}
                            </span>
                        </div>
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
                <div className={`education-block block-block ${!Object.keys(education[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">Education
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    education.map((itemEd, index) => (
                      <div className="block-info" key={index}>
                        <div className="horizontal-wrap">
                          <div className="cv-heading">
                            <span className={`${!itemEd.study ? 'empty-field' : ''} ${!itemEd.study && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.study && (checkForSymbol([itemEd.facility])) ? itemEd.study + ', ' : itemEd.study || 'Marketing and Management'}
                            </span>
                            <span className={`${!itemEd.facility ? 'empty-field' : ''} ${!itemEd.facility && !beforeСontent ? 'hide' : ''}`}>
                              {itemEd.facility ? itemEd.facility : ', Harcum College, PortlandM'}
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
                        </div>
                        <div className={`cv-degree ${!itemEd.degree ? 'empty-field' : ''} ${!itemEd.degree && !beforeСontent ? 'hide' : ''}`}>
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
                    ))
                  }
                </div>
                <div className={`courses-block block-block ${!Object.keys(courses[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">Courses
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    courses.map((itemCo, index) => (
                      <div className="block-info" key={index}>
                        <div className="horizontal-wrap">
                          <div className={`cv-subheading ${!itemCo.title ? 'empty-field' : ''} ${!itemCo.title && !beforeСontent ? 'hide' : ''}`}>
                            {itemCo.title ? itemCo.title : 'Super course 1'}
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
                        <div className={`${!itemCo.institution ? 'empty-field' : ''} ${!itemCo.institution && !beforeСontent ? 'hide' : ''}`}>
                          {itemCo.institution ? itemCo.institution : 'Benjamin Franklin Sidestep Collage, Portland'}
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className={`extra-curricular-activities-block block-block ${!Object.keys(extra_curricular[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">Extra-curricular activities
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    extra_curricular.map((itemEx, index) => (
                      <div className="block-info" key={index}>
                        <div className="horizontal-wrap">
                          <div className="cv-heading block-subheading">
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
                  <div className="cv-heading font-size-2">Internships
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    internship.map((itemIn, index) => (
                      <div className="block-info" key={index}>
                        <div className="horizontal-wrap">
                          <div className="cv-heading block-subheading">
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
              <div className="column-right js-column-right">
                <div className={`languages-block block-block ${!Object.keys(languages[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">Languages
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
                <div className={`skills-block block-block horiz-line ${!Object.keys(skills[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">Skills
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
                              <div className="skill-estimation">
                                {
                                  [...new Array(5)].map((_, index) => (
                                    <svg key={index} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                                      className="additional-color-1-svg-path">
                                      <path
                                        d="M5 0L6.29313 3.22016L9.75528 3.45492L7.09232 5.67984L7.93893 9.04508L5 7.2L2.06107 9.04508L2.90768 5.67984L0.244718 3.45492L3.70687 3.22016L5 0Z"
                                        fill="#A0A0A0" className={(index + 1) <= item.level ? "additional-color-1-svg" : ""} />
                                    </svg>
                                  ))
                                }
                              </div>
                            )
                          }

                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={`certificates-block block-block horiz-line ${!Object.keys(certificates[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">Certificates
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    certificates.map((item, index) => (
                      <div className="block-info" key={index}>
                        <div className={`${!item.name ? 'empty-field' : ''}`}>
                          {item.name ? item.name : 'Certificate name'}
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className={`references-block block-block horiz-line ${!Object.keys(reference[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">References
                    <span className="line-after-block-heading additional-color-1-border"></span>
                  </div>
                  {
                    reference.map((itemRef, index) => (
                      <div className="block-info" key={index}>
                        <div className="cv-heading">
                          <span className={`${!itemRef.fullName ? 'empty-field' : ''} ${!itemRef.fullName && !beforeСontent ? 'hide' : ''}`}>
                            {checkForSymbol([itemRef.company]) ? itemRef.fullName + ', ' : itemRef.fullName || 'Full name'}
                          </span>
                          <span className={`${!itemRef.company ? 'empty-field' : ''} ${!itemRef.company && !beforeСontent ? 'hide' : ''}`}>
                            {itemRef.company || ', Company'}
                          </span>
                        </div>
                        <div className={`references-item ${!itemRef.email ? 'empty-field' : ''} ${!itemRef.email && !beforeСontent ? 'hide' : ''}`}>
                          {itemRef.email || 'references@webservice.com'}
                        </div>
                        <div className={`references-item ${!itemRef.phone ? 'empty-field' : ''} ${!itemRef.phone && !beforeСontent ? 'hide' : ''}`}>
                          {itemRef.phone || '736-343-9384'}
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className={`hobbies-block block-block horiz-line ${!Object.keys(hobbies[0]).length && !beforeСontent ? 'hide' : ''}`}>
                  <div className="cv-heading font-size-2">Hobbies
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
          </div>
        </div>
      </div>
    </div>
  )
}

