import { CCol } from '@coreui/react';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router'

import ResumeHead from './resumeHead/ResumeHead'
import ResumeMain from './resumeMain/ResumeMain'
import ResumeFooter from './resumeFooter/ResumeFooter'
import { isHelperLoad } from '../../helpers/isHelperAllLoad';

import { handleCVUpdateDrawingTrue } from "../../slices/resumeData";
import { handleUpdateDrawingTrue } from "../../slices/cover/coverDataForm";

const Resume = ({
   isCover = false,
   currentResolution
}) => {
   const dispatch = useDispatch();
   const reportTemplateRef = useRef(null);
   const router = useRouter();
   const { idCv } = router.query;
   const isNewResume = (idCv == "new");
   const [pagesPag, setPagesPag] = useState(1);
   const [pagePagCurrent, setPagePagCurrent] = useState(0);
   const [loadContetnMob, setLoadContetnMob] = useState(false);

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
         isOpenPreviesMobTemplate,
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
      }
   }, [
      pagePagCurrent,
      // cover
      coverDataForm.drawing,
      coverData.resumeActive,
      coverData.resumeActiveNew,
      // resume
      resumeData.resumeActive,
      resumeData.resumeActiveNew,
      resumeData.drawing,
      resumeData.stubText,
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
      isOpenPreviesMobTemplate,
      contacts.contactObj.isDummyTextHidden
   ]);

   useEffect(() => {
      if (['sm', 'xs', 'md'].includes(currentResolution)) {
         setLoadContetnMob(true);

         setTimeout(() => {
            setLoadContetnMob(false);
         }, 500);
      }
   }, [contacts.contactObj.isDummyTextHidden]);

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

            if (['sm', 'xs', 'md'].includes(currentResolution)) {
               setTimeout(() => {
                  star();
               }, 200);
            }

            if (isNewResume) {
               setTimeout(() => {
                  star();
               }, 500);
            }
         }
      }
   }, [
      pagePagCurrent,
      // cover
      coverDataForm.drawing,
      coverData.resumeActive,
      coverData.resumeActiveNew,
      // resume
      resumeData.resumeActive,
      resumeData.resumeActiveNew,
      resumeData.drawing,
      resumeData.stubText,
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
      isOpenPreviesMobTemplate,
      contacts.contactObj.isDummyTextHidden,
      loadContetnMob
   ]);

   useEffect(() => {
      if (pagesPag == 1)
         setPagePagCurrent(1);
   }, [resumeData.stubText, pagesPag]);

   useEffect(() => {
      setPagePagCurrent(1);
      dispatch(handleCVUpdateDrawingTrue());
      dispatch(handleUpdateDrawingTrue());
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
               loadContetnMob={loadContetnMob}
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