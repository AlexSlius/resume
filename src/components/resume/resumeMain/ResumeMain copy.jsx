import { CCol, CRow } from "@coreui/react"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import { isArray } from "lodash"

import { StartsComponent } from "../../starts"

import { formatDate } from "../../../utils"
import { isObjDatas } from '../../../helpers/datasPage';


const ResumeMain = ({
   objRef,
   // currentPage,
   // lengthPages,
   // objPages
}) => {
   const {
      contacts: {
         contactObj
      },
      employment,
      educations,
      skills,
      socials,
      hobies,
      interships,
      courses,
      activitys,
      languages,
      references,
      certificaties,
      careers
   } = useSelector((state) => state);

   let notEmptyContactDetails = contactObj?.address || contactObj?.city?.name || contactObj?.zipCode || contactObj?.country?.name || contactObj?.phone;
   let notEmptyContactDetailsAll = notEmptyContactDetails || contactObj?.email;

   // const newArr = objPages.map((el) => {
   //    if (el.page == currentPage) {
   //       return el.id;
   //    }
   // });

   return (
      <div className="resume-main" ref={objRef.refMain}>
         {/*  resume-main_scroll */}
         <div className="scroll-style">
            <CRow className="resume-main__row r_1" ref={objRef.refContact}>
               <CCol className="resume-main__col1">
                  {
                     contactObj?.picture && (
                        <div className="resume-main__avatar-img">
                           <img src={contactObj?.picture || '/images/other/avatar-big.png'} />
                        </div>
                     )
                  }
               </CCol>
               <CCol className="resume-main__col2">
                  {
                     !!notEmptyContactDetailsAll && (
                        <div className="resume-main__head-info">
                           {contactObj.address && (` ${contactObj.address},`)} {contactObj.city?.name && (`${contactObj.city.name},`)} {contactObj.zipCode && (` ${contactObj.zipCode},`)} {contactObj.country?.name && (contactObj.country?.name)}
                           {contactObj?.phone && (` ${contactObj.phone}`)} {contactObj.email && (` ${notEmptyContactDetails && `-`} ${contactObj.email}`)}
                        </div>
                     )
                  }
                  <div className="resume-main__title">
                     {`${contactObj?.firstName || ''} ${contactObj?.lastName}`}{contactObj.jobTitle && (`, ${contactObj.jobTitle}`)}
                  </div>
                  {
                     (careers?.data?.length > 0) && (
                        <div className="resume-main__text" dangerouslySetInnerHTML={{ __html: careers.data }}></div>
                     )
                  }
               </CCol>
            </CRow>

            {
               ((isArray(employment?.employmentObj) && employment?.employmentObj?.length > 0)) || isObjDatas(employment.objNew) ? (
                  <CRow className="resume-main__row r_2" ref={objRef.refEmployment}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Employment</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        {
                           (employment?.employmentObj?.length > 0) ? (
                              employment?.employmentObj.map(el => {
                                 return (
                                    <Fragment key={el?.id}>
                                       <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                          <div className="resume-main__title2">{el?.title}</div>
                                          <div className="resume-main__head-text">
                                             {el?.company} {(el?.periodFrom?.date || el?.periodTo?.date) && `(${formatDate(el?.periodFrom?.date)} - ${formatDate(el?.periodTo?.date)})`}
                                          </div>
                                       </div>
                                       <div className="resume-main__bottom">
                                          <div className="resume-main__info-text" dangerouslySetInnerHTML={{ __html: el?.assignment }}></div>
                                       </div>
                                    </Fragment>
                                 );
                              })
                           ) : (
                              <Fragment>
                                 <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                    <div className="resume-main__title2">{employment.objNew?.title}</div>
                                    <div className="resume-main__head-text">
                                       {employment.objNew?.company} {(employment.objNew?.period_from || employment.objNew?.period_to) && `(${formatDate(employment.objNew?.period_from)} - ${formatDate(employment.objNew?.period_to)})`}
                                    </div>
                                 </div>
                                 <div className="resume-main__bottom">
                                    <div className="resume-main__info-text" dangerouslySetInnerHTML={{ __html: employment.objNew?.assignment }}></div>
                                 </div>
                              </Fragment>
                           )
                        }
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               (isArray(educations?.educationObj) && educations?.educationObj?.length > 0) || isObjDatas(educations?.objNew) ? (
                  <CRow className="resume-main__row mb-4 r_3" ref={objRef.refEducation}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Education</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        {
                           isArray(educations?.educationObj) && (educations?.educationObj?.length > 0) ? (
                              educations?.educationObj.map(el => (
                                 <Fragment key={el?.id}>
                                    <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                       <div className="resume-main__title2">
                                          {el?.facility}
                                       </div>
                                       <div className="resume-main__head-text">
                                          {el?.study} {(el?.dateFrom || el?.dateFrom) && `(${formatDate(el?.dateFrom?.date)} - ${formatDate(el?.dateTo?.date)})`}
                                       </div>
                                    </div>
                                    <div className="resume-main__bottom">
                                       <p className="resume-main__info-text">{el?.description}</p>
                                    </div>
                                 </Fragment>
                              ))
                           ) : (
                              <Fragment >
                                 <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                    <div className="resume-main__title2">
                                       {educations?.objNew?.facility}
                                    </div>
                                    <div className="resume-main__head-text">
                                       {educations?.objNew?.study} {(educations?.objNew?.period_from || educations?.objNew?.period_from) && `(${formatDate(educations?.objNew?.period_from)} - ${formatDate(educations?.objNew?.period_to)})`}
                                    </div>
                                 </div>
                                 <div className="resume-main__bottom">
                                    <p className="resume-main__info-text">{educations?.objNew?.description}</p>
                                 </div>
                              </Fragment>
                           )
                        }
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               skills?.skillsObj?.skillsListAll.length ? (
                  <CRow className="resume-main__row r_4" ref={objRef.refSkills}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Skills</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        <div className="rows-items">
                           {
                              skills?.skillsObj.skillsListAll.map((el, ind, arr) => {
                                 return (
                                    <div key={el?.id} className="item-col">
                                       <div className="text-blk pr">
                                          {arr[ind]?.name}
                                       </div>
                                       {
                                          !skills?.skillsObj.hideExperienceLevel && (
                                             <div className="resunme_starrs">
                                                <StartsComponent
                                                   isEdit={false}
                                                   activeCol={arr[ind]?.level ? Number(arr[ind]?.level) : 0}
                                                />
                                             </div>
                                          )
                                       }
                                    </div>
                                 )
                              })
                           }
                        </div>
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               socials?.socialObj?.length ? (
                  <CRow className="resume-main__row r_5" ref={objRef.refSocial}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Social Links</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        <div className="rows-items">
                           {
                              socials?.socialObj.map(el => (
                                 <div className="item-col" key={el?.id}>
                                    <a href={el?.link} target="_blank" className="item-resum-soc" rel="noreferrer" title="el?.link">
                                       {
                                          el?.icon && (
                                             <i style={{ backgroundImage: `url(${el?.icon})` }}></i>
                                          )
                                       }
                                       <span>{el?.link}</span>
                                    </a>
                                 </div>
                              ))
                           }
                        </div>
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               (isArray(hobies?.hobiesObj) && hobies?.hobiesObj?.length) || isObjDatas(hobies?.hobieObjNew) ? (
                  <CRow className="resume-main__row mb-4 r_6" ref={objRef.refHobies}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Hobbies</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        <div className="rows-items">
                           {
                              hobies?.hobiesObj.map(el => (
                                 <div className="item-col" key={el?.id}>
                                    <div className="text-blk">
                                       <span >{el?.text}</span>
                                    </div>
                                 </div>
                              ))
                           }

                           {
                              isObjDatas(hobies?.hobieObjNew) && (
                                 <div className="item-col">
                                    <div className="text-blk">
                                       <span >{hobies?.hobieObjNew?.text}</span>
                                    </div>
                                 </div>
                              )
                           }
                        </div>
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               (isArray(activitys?.activityObj) && activitys?.activityObj?.length)
                  || isObjDatas(activitys?.objNew) ? (
                  <CRow className="resume-main__row mb-4 r_7" ref={objRef.refActivity}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Extra-curricular activities</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        {
                           (isArray(activitys?.activityObj) && activitys?.activityObj?.length) ? (
                              activitys?.activityObj.map(el => (
                                 <Fragment key={el?.id}>
                                    <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                       <div className="resume-main__title2">
                                          {el?.title}
                                       </div>
                                       <div className="resume-main__head-text">
                                          {el?.employer} {(el?.dateFrom || el?.dateTo) && `(${formatDate(el?.dateFrom?.date)} - ${formatDate(el?.dateTo?.date)})`}
                                       </div>
                                    </div>
                                    <div className="resume-main__bottom">
                                       <p className="resume-main__info-text">{el?.description}</p>
                                    </div>
                                 </Fragment>
                              ))
                           ) : (
                              <Fragment>
                                 <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                    <div className="resume-main__title2">
                                       {activitys?.objNew?.title}
                                    </div>
                                    <div className="resume-main__head-text">
                                       {activitys?.objNew?.employer} {(activitys?.objNew?.period_from || activitys?.objNew?.period_to) && `(${formatDate(activitys?.objNew?.period_from)} - ${formatDate(activitys?.objNew?.period_to)})`}
                                    </div>
                                 </div>
                                 <div className="resume-main__bottom">
                                    <p className="resume-main__info-text">{activitys?.objNew?.description}</p>
                                 </div>
                              </Fragment>
                           )
                        }
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               (isArray(courses?.courseObj) && courses?.courseObj?.length) || isObjDatas(courses?.objNew) ? (
                  <CRow className="resume-main__row mb-4 r_8" ref={objRef.refCourse}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Courses</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        {
                           (isArray(courses?.courseObj) && courses?.courseObj?.length) ? (
                              courses?.courseObj.map(el => (
                                 <Fragment key={el?.id}>
                                    <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                       <div className="resume-main__title2">
                                          {el?.title}
                                       </div>
                                       <div className="resume-main__head-text">
                                          {
                                             el?.institution} {(el?.dateFrom || el?.dateTo) && `(${formatDate(el?.dateFrom?.date)} - ${formatDate(el?.dateTo?.date)})`
                                          }
                                       </div>
                                    </div>
                                 </Fragment>
                              ))
                           ) : (
                              <Fragment>
                                 <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                    <div className="resume-main__title2">
                                       {courses?.objNew?.title}
                                    </div>
                                    <div className="resume-main__head-text">
                                       {
                                          courses?.objNew?.institution} {(courses?.objNew?.period_from || courses?.objNew?.period_to) && `(${formatDate(courses?.objNew?.period_from)} - ${formatDate(courses?.objNew?.period_to)})`
                                       }
                                    </div>
                                 </div>
                              </Fragment>
                           )
                        }
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               (isArray(interships?.interhipObj) && interships?.interhipObj?.length) || isObjDatas(interships?.objNew) ? (
                  <CRow className="resume-main__row mb-4 r_9" ref={objRef.refInterhip}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Intership</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        {
                           (isArray(interships?.interhipObj) && interships?.interhipObj?.length) ? (
                              interships?.interhipObj.map(el => (
                                 <Fragment key={el?.id}>
                                    <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                       <div className="resume-main__title2">
                                          {el?.jobTitle}
                                       </div>
                                       <div className="text-blk">
                                          {el?.employer} {(el?.dateFrom || el?.dateTo) && `(${formatDate(el?.dateFrom?.date)} - ${formatDate(el?.dateTo?.date)})`}
                                       </div>
                                    </div>
                                    <div className="resume-main__bottom">
                                       <p className="resume-main__info-text">{el?.description}</p>
                                    </div>
                                 </Fragment>
                              ))
                           ) : (
                              <Fragment>
                                 <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                    <div className="resume-main__title2">
                                       {interships?.objNew?.job_title}
                                    </div>
                                    <div className="text-blk">
                                       {interships?.objNew?.employer} {(interships?.objNew?.period_from || interships?.objNew?.period_to) && `(${formatDate(interships?.objNew?.period_from)} - ${formatDate(interships?.objNew?.period_to)})`}
                                    </div>
                                 </div>
                                 <div className="resume-main__bottom">
                                    <p className="resume-main__info-text">{interships?.objNew?.description}</p>
                                 </div>
                              </Fragment>
                           )
                        }
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               isArray(languages?.languageObj) && languages?.languageObj?.length ? (
                  <CRow className="resume-main__row mb-4 r_10" ref={objRef.refLanguage}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Languages</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        <div className="rows-items">
                           {
                              languages?.languageObj.map((el, index) => {
                                 return (
                                    <div className="item-col" key={index}>
                                       <div className="text-blk pr">
                                          {el.language}
                                       </div>
                                       <div className="resunme_starrs">
                                          <StartsComponent
                                             col={5}
                                             isEdit={false}
                                             activeCol={el.level ? Number(el.level) : 0}
                                          />
                                       </div>
                                    </div>
                                 )
                              })
                           }
                        </div>
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               (isArray(references?.referencesObj) && references?.referencesObj?.length) || isObjDatas(references?.objNew) ? (
                  <CRow className="resume-main__row mb-4 r_11" ref={objRef.refReferences}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           References</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        {
                           (isArray(references?.referencesObj) && references?.referencesObj?.length) ? (
                              references?.referencesObj.map(el => (
                                 <Fragment key={el?.id}>
                                    <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-start align-items-center">
                                       <div className="resume-main__title2">
                                          {el?.fullName}
                                       </div>
                                       <div className="resume-main__head-text">
                                          {el?.company}
                                       </div>
                                    </div>
                                    <div className="resume-main__bottom">
                                       <p className="resume-main__info-text">{el?.phone} - {el?.email}</p>
                                    </div>
                                 </Fragment>
                              ))
                           ) : (
                              <Fragment>
                                 <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-start align-items-center">
                                    <div className="resume-main__title2">
                                       {references?.objNew.full_name}
                                    </div>
                                    <div className="resume-main__head-text">
                                       {references?.objNew.company}
                                    </div>
                                 </div>
                                 <div className="resume-main__bottom">
                                    <p className="resume-main__info-text">{references?.objNew?.phone} - {references?.objNew?.email}</p>
                                 </div>
                              </Fragment>
                           )
                        }
                     </CCol>
                  </CRow>
               ) : null
            }

            {
               (isArray(certificaties?.certificatiesObj) && certificaties?.certificatiesObj?.length) || isObjDatas(certificaties?.ObjNew) ? (
                  <CRow className="resume-main__row mb-4 r_12" ref={objRef.refCertificaties}>
                     <CCol className="resume-main__col1">
                        <div className="resume-main__label">
                           Certificates</div>
                     </CCol>
                     <CCol className="resume-main__col2">
                        {
                           certificaties?.certificatiesObj.map(el => (
                              <Fragment key={el?.id}>
                                 {el?.name ? (<div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                    <div className="resume-main__title2">
                                       {el?.name}
                                    </div>
                                 </div>) : null}
                              </Fragment>
                           ))
                        }

                        {
                           isObjDatas(certificaties?.ObjNew) && (
                              <Fragment>
                                 {certificaties?.ObjNew?.name ? (<div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                    <div className="resume-main__title2">
                                       {certificaties?.ObjNew?.name}
                                    </div>
                                 </div>) : null}
                              </Fragment>
                           )
                        }
                     </CCol>
                  </CRow>
               ) : null
            }
         </div>
      </div>
   )
}

export default ResumeMain;