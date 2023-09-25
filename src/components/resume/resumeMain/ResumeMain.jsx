import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router'

import { TemplatesSelect } from '../../templatesSelect';
import { TemplatesSelectCover } from "../../templateSelectCover";

import { getResumeActive } from "../../../controllers/resumeData";
import { getCoverDataActive } from "../../../controllers/cover/coverData";
import { useScaleResumeMain } from "../../../hooks/custom-hooks";
import { activeTemplateBlock } from "../../../helpers/activeBlockTemplate";

const ResumeMain = ({
   reportTemplateRef,
   isCover,
}) => {
   const refDivResumeMain = useRef();
   const dispatch = useDispatch();
   const router = useRouter();
   const { idCv, tab } = router.query;
   const isNewResume = (idCv == "new");
   const [stateFontSize, setStateFontSize] = useState(50);
   const [stateLineSpacing, setStateLIneSpacig] = useState(50);
   const [loadContent, setLoadContent] = useState(true);

   const {
      contacts: {
         contactObj,
         contactObjNew
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
      careers,
      resumeData,
      coverDataForm,
      coverData,
      theme: {
         currentResolution
      },
      menuAsideResume: {
         list
      }
   } = useSelector((state) => state);

   const dataOther = isCover ? coverData : resumeData;

   let dataResumeTemplate = {
      contact: isNewResume ? [contactObjNew] : [contactObj],
      employment: employment.employmentObj,
      education: educations.educationObj,
      skills: skills?.skillsObj?.skillsListAll || [],
      social_links: socials.socialObj,
      hobbies: hobies.hobiesObj,
      internship: interships.interhipObj,
      courses: courses.courseObj,
      extra_curricular: activitys.activityObj,
      career_objective: [{ data: careers.data }],
      languages: languages.languageObj,
      reference: references.referencesObj,
      certificates: certificaties.certificatiesObj,
      hide_experience_level: skills?.skillsObj?.hideExperienceLevel
   };

   let dataCoverLetterTemplate = {
      firstName: coverDataForm.coverDataObj.firstName,
      lastName: coverDataForm.coverDataObj.lastName,
      coverGenerateDate: coverDataForm.coverGenerateDate,
      from: coverDataForm.from,
      to: coverDataForm.to,
   }

   let dataCoverLetterTemplateNew = {
      firstName: coverDataForm.coverDataObjNew.firstName,
      lastName: coverDataForm.coverDataObjNew.lastName,
      coverGenerateDate: coverDataForm.coverGenerateDate,
      from: coverDataForm.from,
      to: coverDataForm.to,
   };

   let objActiveBlock = activeTemplateBlock(list, tab);

   let { scaleSize, origin, originTop } = useScaleResumeMain({ refDivResumeMain, currentResolution, drawing: { res: resumeData.drawing, cover: coverDataForm.drawing }, loadContent });

   useEffect(() => {
      setStateLIneSpacig(isNewResume ? dataOther?.resumeActiveNew?.template_line_spacing : dataOther?.resumeActive?.template_line_spacing);
      setStateFontSize(isNewResume ? dataOther?.resumeActiveNew?.template_text_size : dataOther?.resumeActive?.template_text_size);
   }, [dataOther]);

   useEffect(() => {
      if (!isNewResume) {
         if (!isCover) {
            dispatch(getResumeActive({ idCv }));
         } else {
            dispatch(getCoverDataActive({ idCv }));
         }
      }

      if (isNewResume) {
         setTimeout(() => {
            handleReload();
         }, 300);
      }
   }, []);

   const handleReload = () => {
      if (loadContent) {
         setLoadContent(false);
      }
   }

   return (
      <div className={`resume-main ${loadContent ? "load" : ""}`} ref={refDivResumeMain}>
         {
            !isCover && (
               <div className={`resume-main_scale`} style={{ msZoom: `${scaleSize}`, MozTransform: `scale(${scaleSize})`, zoom: `${scaleSize}`, marginLeft: origin > 0 ? `${origin}px` : 0, marginTop: originTop > 0 ? `${originTop}px` : 0 }}>
                  <TemplatesSelect
                     isNewResume={isNewResume}
                     data={dataResumeTemplate}
                     resumeData={dataOther}
                     stateLineSpacing={stateLineSpacing}
                     stateFontSize={stateFontSize}
                     status={dataOther?.status}
                     statusResumeActive={dataOther?.statusResumeActive}
                     reportTemplateRef={reportTemplateRef}
                     resumeActive={isNewResume ? !!dataOther?.resumeActiveNew.slug ? dataOther?.resumeActiveNew.slug : "001-CV" : dataOther?.resumeActive?.template_slug}
                     drawing={resumeData.drawing}
                     handleReload={handleReload}
                     objActiveBlock={objActiveBlock}
                     beforeСontent={resumeData.stubText}
                  />
               </div>
            )
         }
         {
            isCover && (
               <div className="resume-main_scale resume-main_scale_cover" style={{ transform: `scale(${scaleSize})`, marginLeft: origin > 0 ? `${origin}px` : 0, marginTop: originTop > 0 ? `${originTop}px` : 0 }}>
                  <TemplatesSelectCover
                     isNewResume={isNewResume}
                     resumeActive={isNewResume ? !!dataOther?.resumeActiveNew.slug ? dataOther?.resumeActiveNew.slug : "001-CV" : dataOther?.resumeActive?.template_slug}
                     data={isNewResume ? dataCoverLetterTemplateNew : dataCoverLetterTemplate}
                     stateLineSpacing={stateLineSpacing}
                     stateFontSize={stateFontSize}
                     resumeData={dataOther}
                     reportTemplateRef={reportTemplateRef}
                     status={dataOther?.status}
                     statusResumeActive={dataOther?.statusResumeActive}
                     drawing={coverDataForm.drawing}
                     handleReload={handleReload}
                      // beforeСontent={false}
                  />
               </div>
            )
         }
      </div >
   )
}

export default ResumeMain;