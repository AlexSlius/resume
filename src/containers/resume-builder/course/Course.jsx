import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

import HeadMainContent from "../../../components/headMainContent/HeadMainContent";
import FormCourse from "./FormCourse";

const Course = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

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