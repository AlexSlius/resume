import { useSelector } from "react-redux"
import uuid from "react-uuid"

import FormEducation from "./FormEducation";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const initialState = {
   facility: "",
   period_from: null,
   period_to: null,
   degree: "",
   study: "",
   awards: "",
   description: "",
   id: uuid()
 };

const Education = () => {

   const educations = useSelector((state) => state.education.educations);
   const loading = useSelector((state) => state.app.loading);

   // if(loading) {
   //    return null
   // }

   return (
      <>
         <HeadMainContent
            title={'Education'}
            description={"If you've graduated from, or are currently enrolled in a college or university, you should NOT include your high school."}
         >
         </HeadMainContent>
         <FormEducation 
            valuesFromStore={educations} 
            className={`row`} 
            initialState={initialState}
            addText="Add one more education"
            updateText="Add one more education"
            buttonClassName="mt-4"
         />
      </>
   )
}

export default Education;