import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router'

import { TemplatesSelect } from '../../templatesSelect';

import {
   getResumeActive,
} from "../../../controllers/resumeData";

const ResumeMain = ({
   reportTemplateRef,
   isCover,
}) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const { idCv, type, slug } = router.query;
   const isNewResume = (idCv == "new");

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
      resumeData: {
         resumeActive,
         resumeActiveNew
      }
   } = useSelector((state) => state);

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
   };

   React.useEffect(() => {
      if (idCv != "new") {
         dispatch(getResumeActive({ idCv }));
      }
   }, []);

   return (
      <div className={`resume-main`}>
         {
            !isCover && (
               <div className="scroll-style resume-main_scroll">
                  <div className="resume-main_scale">
                     <TemplatesSelect
                        isResume={true}
                        resumeActive={isNewResume ? !!resumeActiveNew.slug ? resumeActiveNew.slug : "001-CV" : resumeActive?.template_slug}
                        data={dataResumeTemplate}
                        resumeData={resumeData}
                        reportTemplateRef={reportTemplateRef}
                     />
                  </div>
               </div>
            )
         }
      </div>
   )
}

export default ResumeMain;