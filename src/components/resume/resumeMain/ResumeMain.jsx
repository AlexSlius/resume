import { CCol, CRow } from "@coreui/react"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import { formatDate } from "../../../utils"
import ReactStars from "react-rating-stars-component"

const ResumeMain = () => {
   const {
      contacts: {
         contactObj
      },
      employment: {
         employmentObj
      },
      educations: {
         educationObj
      },
   } = useSelector((state) => state);

   let notEmptyContactDetails = contactObj.address || contactObj.city?.name || contactObj.zipCode || contactObj.country?.name || contactObj.phone;
   let notEmptyContactDetailsAll = notEmptyContactDetails || contactObj.email;

   return (
      <div className="resume-main p-4">
         <CRow className="resume-main__row">
            <CCol className="resume-main__col1">
               <div className="resume-main__avatar-img">
                  <img src={contactObj?.picture || '/images/other/avatar-big.png'} />
               </div>
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
                  {`${contactObj?.firstName || ''} ${contactObj?.lastName}`} - Here will be your profession.
               </div>
               <div className="resume-main__text">
                  <p>Here will be your description.</p>
               </div>
            </CCol>
         </CRow>

         {
            employmentObj?.length && !!employmentObj[0].title || employmentObj[0].company ? (
               <CRow className="resume-main__row">
                  <CCol className="resume-main__col1">
                     <div className="resume-main__label">
                        Employment</div>
                  </CCol>
                  <CCol className="resume-main__col2">
                     {employmentObj.map(el => {
                        return (
                           <Fragment key={el?.id}>
                              <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                 <div className="resume-main__title2">{el?.title}</div>
                                 <div className="resume-main__head-text">
                                    {el?.company} {(el?.period_from || el?.period_to) && `(${formatDate(el?.period_from)} - ${formatDate(el?.period_to)})`}
                                 </div>
                              </div>
                              <div className="resume-main__bottom">
                                 <div className="resume-main__info-text" dangerouslySetInnerHTML={{ __html: el?.assignment }}></div>
                              </div>
                           </Fragment>
                        );
                     })}
                  </CCol>
               </CRow>
            ) : null
         }

         {
            educationObj?.length && !!educationObj[0].facility || !!educationObj[0].degree ? (
               <CRow className="resume-main__row mb-4">
                  <CCol className="resume-main__col1">
                     <div className="resume-main__label">
                        Education</div>
                  </CCol>
                  <CCol className="resume-main__col2">
                     {educationObj.map(el => (
                        <Fragment key={el?.id}>
                           <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                              <div className="resume-main__title2">
                                 {el?.facility}
                              </div>
                              <div className="resume-main__head-text">
                                 {el?.study} {(el?.period_from || el?.period_to) && `(${formatDate(el?.period_from)} - ${formatDate(el?.period_to)})`}
                              </div>
                           </div>
                           <div className="resume-main__bottom">
                              <p className="resume-main__info-text">{el?.description}</p>
                           </div>
                        </Fragment>
                     ))}
                  </CCol>
               </CRow>
            ) : null
         }

         {/* {skills?.length ? (<CRow className="resume-main__row mb-4">
            <CCol className="resume-main__col1">
               <div className="resume-main__label">
                  Skills</div>
            </CCol>
            <CCol className="resume-main__col2">
               {skills.map((el, ind, arr) => {
                  if (!(ind % 2)) {
                     return (
                        <Fragment key={el?.id}>
                           <div className="d-flex flex-wrap justify-content-between align-items-center">
                              <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-start align-items-center me-4">
                                 <div className="resume-main__head-text" style={{ fontWeight: 350 }}>
                                    {arr[ind]?.name}
                                 </div>
                                 <div className="resume-main__head-text">
                                    <ReactStars
                                       key={arr[ind]?.name + '-' + arr[ind]?.level}
                                       edit={false}
                                       count={5}
                                       value={arr[ind]?.level ? Number(arr[ind]?.level) : 0}
                                       size={12}
                                       activeColor={'#6DC26C'} />
                                 </div>
                              </div>
                              <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-start align-items-center">
                                 <div className="resume-main__head-text" style={{ fontWeight: 350 }}>
                                    {arr[ind + 1]?.name}
                                 </div>
                                 <div className="resume-main__head-text">
                                    <ReactStars
                                       key={arr[ind + 1]?.name + '-' + arr[ind + 1]?.level}
                                       edit={false}
                                       count={5}
                                       value={arr[ind + 1]?.level ? Number(arr[ind + 1]?.level) : 0}
                                       size={12}
                                       activeColor={'#6DC26C'} />
                                 </div>
                              </div>
                           </div>
                        </Fragment>
                     );
                  }
               })}
            </CCol>
         </CRow>) : null} */}

         {/* {socials?.length ? (<CRow className="resume-main__row mb-4">
            <CCol className="resume-main__col1">
               <div className="resume-main__label">
                  Social Links</div>
            </CCol>
            <CCol className="resume-main__col2">
               {socials.map(el => (
                  <Fragment key={el?.id}>
                     <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-start align-items-center">
                        <div className="resume-main__title2">
                           {el?.name}
                        </div>
                        <div className="resume-main__head-text">
                           <a href={el?.link} target="_blank" rel="noreferrer"> {el?.link}</a>
                        </div>
                     </div>
                     <div className="resume-main__bottom">
                        <p className="resume-main__info-text">{el?.description}</p>
                     </div>
                  </Fragment>
               ))}
            </CCol>
         </CRow>) : null} */}

         {/* {hobies?.length ? (<CRow className="resume-main__row mb-4">
            <CCol className="resume-main__col1">
               <div className="resume-main__label">
                  Hobbies</div>
            </CCol>
            <CCol className="resume-main__col2">
               {hobies.map(el => (
                  <Fragment key={el?.id}>
                     <div className="resume-main__bottom">
                        <p className="resume-main__info-text">{el?.text}</p>
                     </div>
                  </Fragment>
               ))}
            </CCol>
         </CRow>) : null} */}

         {/* {activity?.length ? (<CRow className="resume-main__row mb-4">
            <CCol className="resume-main__col1">
               <div className="resume-main__label">
                  Extra-curricular activities</div>
            </CCol>
            <CCol className="resume-main__col2">
               {activity.map(el => (
                  <Fragment key={el?.id}>
                     <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                        <div className="resume-main__title2">
                           {el?.title}
                        </div>
                        <div className="resume-main__head-text">
                           {el?.employer} {(el?.period_from || el?.period_to) && `(${formatDate(el?.period_from)} - ${formatDate(el?.period_to)})`}
                        </div>
                     </div>
                     <div className="resume-main__bottom">
                        <p className="resume-main__info-text">{el?.description}</p>
                     </div>
                  </Fragment>
               ))}
            </CCol>
         </CRow>) : null} */}

         {/* {course?.length ? (<CRow className="resume-main__row mb-4">
            <CCol className="resume-main__col1">
               <div className="resume-main__label">
                  Courses</div>
            </CCol>
            <CCol className="resume-main__col2">
               {course.map(el => (
                  <Fragment key={el?.id}>
                     <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                        <div className="resume-main__title2">
                           {el?.title}
                        </div>
                        <div className="resume-main__head-text">
                           {el?.institution} {(el?.period_from || el?.period_to) && `(${formatDate(el?.period_from)} - ${formatDate(el?.period_to)})`}
                        </div>
                     </div>
                  </Fragment>
               ))}
            </CCol>
         </CRow>) : null} */}

         {/* {intership?.length ? (<CRow className="resume-main__row mb-4">
            <CCol className="resume-main__col1">
               <div className="resume-main__label">
                  Intership</div>
            </CCol>
            <CCol className="resume-main__col2">
               {intership.map(el => (
                  <Fragment key={el?.id}>
                     <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                        <div className="resume-main__title2">
                           {el?.job_title}
                        </div>
                        <div className="resume-main__head-text">
                           {el?.employer} {(el?.period_from || el?.period_to) && `(${formatDate(el?.period_from)} - ${formatDate(el?.period_to)})`}
                        </div>
                     </div>
                     <div className="resume-main__bottom">
                        <p className="resume-main__info-text">{el?.description}</p>
                     </div>
                  </Fragment>
               ))}
            </CCol>
         </CRow>) : null} */}

         {/* {languages?.length ? (<CRow className="resume-main__row mb-4">
            <CCol className="resume-main__col1">
               <div className="resume-main__label">
                  Languages</div>
            </CCol>
            <CCol className="resume-main__col2">
               {languages.map((el, ind, arr) => {
                  console.log(arr[ind]);
                  if (!(ind % 2)) {
                     return (
                        <Fragment key={el?.id}>
                           <div className="d-flex flex-wrap justify-content-start align-items-center">
                              {arr[ind]?.language ? (<div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-start align-items-center me-4">
                                 <div className="resume-main__head-text" style={{ fontWeight: 350 }}>
                                    {arr[ind]?.language}
                                 </div>
                                 <div className="resume-main__head-text">
                                    <ReactStars
                                       key={arr[ind]?.language + '-' + arr[ind]?.level}
                                       count={5}
                                       value={arr[ind]?.level ? Number(arr[ind]?.level) : 0}
                                       size={12}
                                       edit={false}
                                       activeColor={'#6DC26C'} />
                                 </div>
                              </div>) : null}

                              {arr[ind + 1]?.language ? (<div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-start align-items-center">
                                 <div className="resume-main__head-text" style={{ fontWeight: 350 }}>
                                    {arr[ind + 1]?.language}
                                 </div>
                                 <div className="resume-main__head-text">
                                    <ReactStars
                                       key={arr[ind + 1]?.language + '-' + arr[ind + 1]?.level}
                                       count={5}
                                       value={arr[ind + 1]?.level ? Number(arr[ind + 1]?.level) : 0}
                                       size={12}
                                       edit={false}
                                       activeColor={'#6DC26C'} />
                                 </div>
                              </div>) : null}

                           </div>
                        </Fragment>
                     );
                  }
               })}
            </CCol>
         </CRow>) : null} */}

         {/* {reference?.length ? (
            <CRow className="resume-main__row mb-4">
               <CCol className="resume-main__col1">
                  <div className="resume-main__label">
                     References</div>
               </CCol>
               <CCol className="resume-main__col2">
                  {reference.map(el => (
                     <Fragment key={el?.id}>
                        <div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-start align-items-center">
                           <div className="resume-main__title2">
                              {el?.full_name}
                           </div>
                           <div className="resume-main__head-text">
                              {el?.company}
                           </div>
                        </div>
                        <div className="resume-main__bottom">
                           <p className="resume-main__info-text">{el?.phone} - {el?.email}</p>
                        </div>
                     </Fragment>
                  ))}
               </CCol>
            </CRow>
         ) : null} */}

         {/* {certificaties?.length ? (<CRow className="resume-main__row mb-4">
            <CCol className="resume-main__col1">
               <div className="resume-main__label">
                  Certificates</div>
            </CCol>
            <CCol className="resume-main__col2">
               {certificaties.map(el => (
                  <Fragment key={el?.id}>
                     {el?.name ? (<div className="resume-main__head-info2 mb-2 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                        <div className="resume-main__title2">
                           {el?.name}
                        </div>
                     </div>) : null}
                  </Fragment>
               ))}
            </CCol>
         </CRow>) : null} */}
      </div>
   )
}
export default ResumeMain;