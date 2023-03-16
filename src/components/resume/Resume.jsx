import { CCol } from '@coreui/react';
import React from "react";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux"

import ResumeHead from './resumeHead/ResumeHead'
import ResumeMain from './resumeMain/ResumeMain'
import ResumeFooter from './resumeFooter/ResumeFooter'

import {
   getResumeActive,
} from "../../controllers/resumeData";

const Resume = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const reportTemplateRef = React.useRef(null);
   const [pagesPag, setPagesPag] = React.useState(1);
   const [pagePagCurrent, setPagePagCurrent] = React.useState(1);
   const { idCv } = router.query;

   const {
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
   } = useSelector((state) => state);

   const onNext = () => {
      setPagePagCurrent(prev => prev + 1);
   }

   const onPrev = () => {
      setPagePagCurrent(prev => prev - 1);
   }

   React.useEffect(() => {
      setPagePagCurrent(1);
   }, [resumeData.resumeActive]);

   React.useEffect(() => {
      if (typeof window != "undefined") {
         if (!!reportTemplateRef.current) {
            let devPages = reportTemplateRef.current.querySelectorAll('.cv-body.cv-body-visible');
            setPagesPag(devPages.length);
         }
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

   React.useEffect(() => {
      if (typeof window != "undefined") {
         if (!!reportTemplateRef.current) {
            function star() {
               let devPages = reportTemplateRef.current.querySelectorAll('.cv-body.cv-body-visible');

               devPages.forEach(element => {
                  element.classList.add("none");
               });

               let currentPage = devPages[pagePagCurrent - 1];

               if (!!currentPage) {
                  currentPage.classList.remove("none");
                  currentPage.classList.add("active");
               }
            }

            star();

            setTimeout(() => {
               star();
            }, 100);
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

   // React.useEffect(() => {
   //    if (idCv != "new") {
   //       dispatch(getResumeActive({ idCv }));
   //    }
   // }, []);

   return (
      <CCol className='resume'>
         <ResumeHead
            currentPage={pagePagCurrent}
            lengthPages={pagesPag}
            onNext={onNext}
            onPrev={onPrev}
         />
         <ResumeMain
            reportTemplateRef={reportTemplateRef}
         />
         <ResumeFooter />
      </CCol>
   )
}
export default Resume;