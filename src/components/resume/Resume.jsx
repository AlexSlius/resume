import { CCol } from '@coreui/react';
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux"

import ResumeHead from './resumeHead/ResumeHead'
import ResumeMain from './resumeMain/ResumeMain'
import ResumeFooter from './resumeFooter/ResumeFooter'
import { isHelperLoad } from '../../helpers/isHelperAllLoad';

const Resume = ({
   isCover = false,
   currentResolution
}) => {
   const reportTemplateRef = useRef(null);
   const [pagesPag, setPagesPag] = useState(1);
   const [pagePagCurrent, setPagePagCurrent] = useState(0);

   const {
      coverDataForm,
      coverData,
      resumeData,
      contacts,
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
      careers,
      theme: {
         isOpenPreviesMobTemplate
      }
   } = useSelector((state) => state);

   const isLoadAll = isHelperLoad({
      arr: [resumeData,
         coverDataForm,
         coverData,
         contacts,
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
         careers,
      ]
   });

   const onNext = () => {
      setPagePagCurrent(prev => prev + 1);
   }

   const onPrev = () => {
      setPagePagCurrent(prev => prev - 1);
   }

   useEffect(() => {
      if (typeof window != "undefined") {
         function start() {
            if (!!reportTemplateRef.current) {
               let devPages = reportTemplateRef.current.querySelectorAll('.cv-body.cv-body-visible');

               setPagesPag(!!devPages?.length ? devPages.length : 1);
            } else {
               setPagesPag(1);
            }
         }

         start();

         setTimeout(() => {
            start();
         }, 1000);
      }
   }, [resumeData?.data, resumeData.resumeActive, contacts,
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
      careers]);

   useEffect(() => {
      if (typeof window != "undefined") {
         if (!!reportTemplateRef.current) {
            function star() {
               let devPages = reportTemplateRef.current?.querySelectorAll('.cv-body.cv-body-visible');

               if (devPages) {
                  devPages.forEach(element => {
                     element.classList.add("none");
                  });

                  let currentPage = devPages[pagePagCurrent - 1];

                  if (!!currentPage) {
                     currentPage.classList.remove("none");
                     currentPage.classList.add("active");
                  }
               }
            }

            star();
         }
      }
   }, [pagePagCurrent, resumeData.data, resumeData.resumeActive, resumeData.resumeActive, contacts,
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
      careers]);

   useEffect(() => {
      setPagePagCurrent(1);
   }, []);

   return (
      <>
         <CCol className={`resume mob_resume ${isOpenPreviesMobTemplate ? "open" : ""}`}>
            <ResumeHead
               currentPage={pagePagCurrent}
               lengthPages={pagesPag}
               onNext={onNext}
               onPrev={onPrev}
               isLoad={isLoadAll}
               currentResolution={currentResolution}
            />
            <ResumeMain
               reportTemplateRef={reportTemplateRef}
               isCover={isCover}
               currentResolution={currentResolution}
            />
            <ResumeFooter
               isCover={isCover}
               currentResolution={currentResolution}
            />
         </CCol>
      </>
   )
}
export default Resume;