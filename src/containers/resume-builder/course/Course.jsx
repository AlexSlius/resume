import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormCourse from "./FormCourse";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

const initialState = {
   title: "",
   institution: "",
   period_from: null,
   period_to: null,
   id: uuid()
 };


const Course = () => {
   const courses = useSelector((state) => state.course.courses);
   const loading = useSelector((state) => state.app.loading);

   // if(loading) {
   //    return null
   // }

   return (
      <>
         <HeadMainContent
            title={'Courses'}
         >
         </HeadMainContent>
         <FormCourse
            valuesFromStore={courses} 
            className={`row`} 
            initialState={initialState}
            addText="Add one more course"
            updateText="Add one more course"
            skipButton={true}
            buttonClassName="gap-4 d-flex mt-4"
         ></FormCourse>
      </>
   )
}

export default Course;