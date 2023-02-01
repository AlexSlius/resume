import { CCol } from '@coreui/react';
import React from "react";
// import { useSelector } from "react-redux"

import ResumeHead from './resumeHead/ResumeHead'
import ResumeMain from './resumeMain/ResumeMain'
import ResumeFooter from './resumeFooter/ResumeFooter'

// const colPages = (arr) => {
//    let curPage = "1";
//    let numb = 1;

//    for (let i = 0; i < arr.length; i++) {
//       if (arr[i].page != curPage) {
//          curPage += 1;
//          numb += 1;
//       }
//    }

//    return numb;
// }

const Resume = () => {
   // const {
   //    contacts: {
   //       contactObj
   //    },
   //    employment: {
   //       employmentObj
   //    },
   //    educations: {
   //       educationObj
   //    },
   //    skills: {
   //       skillsObj
   //    },
   //    socials: {
   //       socialObj,
   //    },
   //    hobies: {
   //       hobiesObj,
   //    },
   //    interships: {
   //       interhipObj,
   //    },
   //    courses: {
   //       courseObj,
   //    },
   //    activitys: {
   //       activityObj,
   //    },
   //    languages: {
   //       languageObj,
   //    },
   //    references: {
   //       referencesObj,
   //    },
   //    certificaties: {
   //       certificatiesObj,
   //    },
   // } = useSelector((state) => state);

   // const [currentPage, setCurrentPage] = React.useState(1);
   // const [objPages, setObjpages] = React.useState([{}]);

   const refMain = React.useRef(undefined);
   const refContact = React.useRef(undefined);
   const refEmployment = React.useRef(undefined);
   const refEducation = React.useRef(undefined);
   const refSkills = React.useRef(undefined);
   const refSocial = React.useRef(undefined);
   const refHobies = React.useRef(undefined);
   const refActivity = React.useRef(undefined);
   const refCourse = React.useRef(undefined);
   const refInterhip = React.useRef(undefined);
   const refLanguage = React.useRef(undefined);
   const refReferences = React.useRef(undefined);
   const refCertificaties = React.useRef(undefined);

   // const onNext = () => {
   //    setCurrentPage(prev => prev + 1);
   // }

   // const onPrev = () => {
   //    setCurrentPage(prev => prev - 1);
   // }

   // React.useEffect(() => {
   //    let mainHeight = refMain.current ? refMain.current.clientHeight : 50;
   //    let oneHePage = 0;
   //    let arrNew = [];
   //    let page = 1;

   //    let objRefs = [
   //       refContact,
   //       refEmployment,
   //       refEducation,
   //       refSkills,
   //       refSocial,
   //       refHobies,
   //       refActivity,
   //       refCourse,
   //       refInterhip,
   //       refLanguage,
   //       refReferences,
   //       refCertificaties
   //    ];

   //    for (let i = 0; i < objRefs.length; i++) {
   //       if (objRefs[i].current) {
   //          let h = objRefs[i].current.offsetHeight;
   //          oneHePage += h;

   //          if (oneHePage < mainHeight) {
   //             arrNew.push({
   //                page,
   //                id: `r_${i + 1}`,
   //             })
   //          } else {
   //             page += 1;
   //             oneHePage = 0;
   //             arrNew.push({
   //                page,
   //                id: `r_${i + 1}`,
   //             })
   //          }
   //       }
   //    }

   //    setObjpages(arrNew);
   // }, [contactObj, employmentObj, educationObj, skillsObj, socialObj, hobiesObj, interhipObj, courseObj, activityObj, languageObj, referencesObj, certificatiesObj]);

   // console.log("objPages: ", objPages);
   // console.log("colPages(objPages): ", colPages(objPages));

   return (
      <CCol className='resume'>
         <ResumeHead
            currentPage={1}
            lengthPages={1}
         // currentPage={currentPage}
         // lengthPages={colPages(objPages)}
         // onNext={onNext}
         // onPrev={onPrev}
         />
         <ResumeMain
            objRef={{
               refMain,
               refContact,
               refEmployment,
               refEducation,
               refSkills,
               refSocial,
               refHobies,
               refActivity,
               refCourse,
               refInterhip,
               refLanguage,
               refReferences,
               refCertificaties
            }}
         // currentPage={currentPage}
         // lengthPages={colPages(objPages)}
         // objPages={objPages}
         />
         <ResumeFooter />
      </CCol>
   )
}
export default Resume;