import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormSkill from './FormSkill.jsx'
import { Switch } from "../../../components/uis/switch";
import { fetchUpdateExperienceLevel, fetchGetExperienceLevel } from "../../../controllers/skills";

const Skills = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

   const {
      skills: {
         skillsObj: {
            hideExperienceLevel
         }
      },
   } = states;

   React.useEffect(() => {
      dispatch(fetchGetExperienceLevel({ idCv }));
   }, []);

   return (
      <>
         <HeadMainContent
            title={'Skills'}
            description={"Try to add 5-10 skills that are most relevant to your desired job."}
            switchOk={"Don't show experience level"}
         >
            <Switch
               label="Don't show experience level"
               isChecked={hideExperienceLevel}
               handleOnChange={(prev) => { dispatch(fetchUpdateExperienceLevel({ idCv, data: prev })) }}
            />
         </HeadMainContent>
         <FormSkill
            dispatch={dispatch}
            states={states}
            idCv={idCv}
         />
      </>
   )
}
export default Skills;