import { CCol } from '@coreui/react';
import React from "react";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux"

import ResumeHead from './resumeHead/ResumeHead'
import ResumeMain from './resumeMain/ResumeMain'
import ResumeFooter from './resumeFooter/ResumeFooter'
import Icon from "../Icon";

import backIcon from "/public/images/icons/back.svg?sprite"

import {
   getResumeActive,
} from "../../controllers/resumeData";

const Resume = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const reportTemplateRef = React.useRef(null);
   const [pagesPag, setPagesPag] = React.useState(1);
   const [openMenu, setOpenMenu] = React.useState(false);
   const [pagePagCurrent, setPagePagCurrent] = React.useState(0);
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

            setTimeout(() => {
               star();
            }, 1000);
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

   React.useEffect(() => {
      setPagePagCurrent(1);
   }, []);

   // React.useEffect(() => {
   //    if (idCv != "new") {
   //       dispatch(getResumeActive({ idCv }));
   //    }
   // }, []);

   return (
      <>
         <button className='resume-btn resume-btn_fix' onClick={() => setOpenMenu(true)}>
            <Icon svg={backIcon} />
         </button>
         <div className={`mob-opas-menu ${openMenu ? "open" : ""}`} onClick={() => setOpenMenu(false)}></div>
         <CCol className={`resume ${openMenu ? "open" : ""}`}>
            <button className='resume-btn' onClick={() => setOpenMenu(false)}>
               <Icon svg={backIcon} />
            </button>
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
      </>
   )
}
export default Resume;