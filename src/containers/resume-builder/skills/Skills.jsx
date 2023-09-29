import { useEffect } from "react";

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormSkill from './FormSkill.jsx'
import { Switch } from "../../../components/uis/switch";
import { fetchUpdateExperienceLevel, fetchGetExperienceLevel } from "../../../controllers/skills";

const Skills = ({ idCv, states, dispatch }) => {
   const {
      skills: {
         skillsObj: {
            hideExperienceLevel
         }
      },
   } = states;

   useEffect(() => {
      dispatch(fetchGetExperienceLevel({ idCv }));
   }, []);

   return (
      <>
         <HeadMainContent
            title={'Skills'}
            description={"Try to add 5-10 skills that are most relevant to your desired job."}
            switchOk={"Don't show experience level"}
            StubTextBtn={true}
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