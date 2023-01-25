import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormCourse from "./FormCourse";
import { useSelector, useDispatch } from "react-redux";

import { localStorageGet } from "../../../helpers/localStorage";

const Course = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = localStorageGet('idCv');

   return (
      <>
         <HeadMainContent
            title={'Courses'}
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