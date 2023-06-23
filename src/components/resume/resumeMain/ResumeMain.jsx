import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router'

import { TemplatesSelect } from '../../templatesSelect';
import { TemplatesSelectCover } from "../../templateSelectCover";

import { getResumeActive } from "../../../controllers/resumeData";
import { getCoverDataActive } from "../../../controllers/cover/coverData";
import { useScaleResumeMain } from "../../../hooks/custom-hooks";


const ResumeMain = ({
   reportTemplateRef,
   isCover,
}) => {
   const refDivResumeMain = useRef();
   const dispatch = useDispatch();
   const router = useRouter();
   const { idCv } = router.query;
   const isNewResume = (idCv == "new");
   const [stateFontSize, setStateFontSize] = useState(50);
   const [stateLineSpacing, setStateLIneSpacig] = useState(50);

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

   useEffect(() => {
      const activeResume = dataOther?.resumeActive;
      setStateLIneSpacig(activeResume?.template_line_spacing ? +activeResume?.template_line_spacing : 50);
      setStateFontSize(activeResume?.template_text_size ? +activeResume?.template_text_size : 50);
   }, [dataOther]);

   useEffect(() => {
      if (idCv != "new") {
         if (!isCover) {
            dispatch(getResumeActive({ idCv }));
         } else {
            dispatch(getCoverDataActive({ idCv }));
         }
      }
   }, []);

   return (
      <div className={`resume-main`} ref={refDivResumeMain}>
         <div className="scroll-style" >
            {
               !isCover && (
                  <div className="resume-main_scale" style={{ transform: `scale(${useScaleResumeMain({ refDivResumeMain, currentResolution })})` }}>
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
                     />
                  </div>
               )
            }
            {
               isCover && (
                  <div className="resume-main_scale resume-main_scale_cover" style={{ transform: `scale(${useScaleResumeMain({ refDivResumeMain, currentResolution })})` }}>
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
                     />
                  </div>
               )
            }
         </div>
      </div>
   )
}

export default ResumeMain;