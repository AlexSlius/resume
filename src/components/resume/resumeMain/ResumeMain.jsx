import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router'

import { TemplatesSelect } from '../../templatesSelect';

import {
   getResumeActive,
} from "../../../controllers/resumeData";

const ResumeMain = ({
   objRef,
   // currentPage,
   // lengthPages,
   // objPages
}) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const { idCv, type, slug } = router.query;
   const isNewResume = (idCv == "new");

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
      careers,
      resumeData: {
         resumeActive
      }
   } = useSelector((state) => state);

   let dataResumeTemplate = {
      contact: [contactObj],
      employment: employment.employmentObj,
      education: educations.educationObj,
      skills: skills.skillsObj,
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
      <div className="resume-main" ref={objRef.refMain}>
         <div className="scroll-style resume-main_scroll">
            <TemplatesSelect
               isResume={true}
               resumeActive={isNewResume ? !!slug ? slug : "001-CV" : resumeActive?.template_slug}
               data={dataResumeTemplate}
            />
         </div>
      </div>
   )
}

export default ResumeMain;