import { useSelector, useDispatch } from "react-redux";

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormActivity from "./FormActivity";

import { localStorageGet } from "../../../helpers/localStorage";


const Activity = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = localStorageGet('idCv');

   return (
      <>
         <HeadMainContent
            title={'Extra-curricular activities'}
         >
         </HeadMainContent>
         <FormActivity
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Activity;