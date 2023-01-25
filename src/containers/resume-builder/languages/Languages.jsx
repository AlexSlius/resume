import { useSelector, useDispatch } from "react-redux";
import FormLanguages from "./FormLanguages";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

import { localStorageGet } from "../../../helpers/localStorage";

const Languages = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = localStorageGet('idCv');

   return (
      <>
         <HeadMainContent
            title={'Languages'}
         >
         </HeadMainContent>
         <FormLanguages
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Languages;