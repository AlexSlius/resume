import HeadMainContent from "../../../components/headMainContent/HeadMainContent";
import FormCourse from "./FormCourse";

const Course = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Courses'}
            StubTextBtn={true}
         >
         </HeadMainContent>
         <FormCourse
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Course;