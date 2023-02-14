import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import FormEducation from "./FormEducation";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const Education = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

   return (
      <>
         <HeadMainContent
            title={'Education'}
            description={"If you've graduated from, or are currently enrolled in a college or university, you should NOT include your high school."}
         >
         </HeadMainContent>
         <FormEducation
              dispatch={dispatch}
              storeDate={states}
              idCv={idCv}
         />
      </>
   )
}

export default Education;