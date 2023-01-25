import { useDispatch, useSelector } from "react-redux";

import FormEducation from "./FormEducation";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

import { localStorageGet } from "../../../helpers/localStorage";

const Education = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = localStorageGet('idCv');

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