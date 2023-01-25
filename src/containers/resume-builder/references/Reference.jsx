import { useSelector, useDispatch } from "react-redux";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormReference from "./FormReference";

import { localStorageGet } from "../../../helpers/localStorage";

const Reference = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = localStorageGet('idCv');

   return (
      <>
         <HeadMainContent
            title={'References'}
         >
         </HeadMainContent>
         <FormReference
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Reference;