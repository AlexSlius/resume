import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router'

import { TemplatesSelect } from '../../templatesSelect';
import { TemplatesSelectCover } from "../../templateSelectCover";

import {
   getResumeActive,
} from "../../../controllers/resumeData";

import {
   getCoverDataActive,
} from "../../../controllers/cover/coverData";

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
      coverDataForm,
      coverData,
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
   };

   let dataCoverLetterTemplate = {
      ...coverDataForm.coverDataObj,
      coverGenerateDate: coverDataForm.coverGenerateDate,
   }

   let dataCoverLetterTemplateNew = {
      firstName: coverDataForm.coverDataObjNew.firstName,
      lastName: coverDataForm.coverDataObjNew.lastName,
      email: coverDataForm.coverDataObjNew.email,
      phone: coverDataForm.coverDataObjNew.phone,
      country: coverDataForm.coverDataObjNew.country,
      city: coverDataForm.coverDataObjNew.city,
      zipCode: coverDataForm.coverDataObjNew.zipCode,
      state: coverDataForm.coverDataObjNew.state,
      coverGenerateDate: null,
   };

   React.useEffect(() => {
      if (idCv != "new") {
         if (!isCover) {
            dispatch(getResumeActive({ idCv }));
         } else {
            dispatch(getCoverDataActive({ idCv }));
         }
      }
   }, []);

   return (
      <div className={`resume-main`}>
         <div className="scroll-style resume-main_scroll">
            {
               !isCover && (
                  <div className="resume-main_scale">
                     <TemplatesSelect
                        isResume={true}
                        resumeActive={isNewResume ? !!dataOther?.resumeActiveNew.slug ? dataOther?.resumeActiveNew.slug : "001-CV" : dataOther?.resumeActive?.template_slug}
                        data={dataResumeTemplate}
                        resumeData={dataOther}
                        reportTemplateRef={reportTemplateRef}
                     />
                  </div>
               )
            }

            {
               isCover && (
                  <div className="resume-main_scale_cover">
                     <TemplatesSelectCover
                        isResume={true}
                        resumeActive={isNewResume ? !!dataOther?.resumeActiveNew.slug ? dataOther?.resumeActiveNew.slug : "001-CV" : dataOther?.resumeActive?.template_slug}
                        data={isNewResume ? dataCoverLetterTemplateNew : dataCoverLetterTemplate}
                        resumeData={dataOther}
                        reportTemplateRef={reportTemplateRef}
                     />
                  </div>
               )
            }
         </div>
      </div>
   )
}

export default ResumeMain;