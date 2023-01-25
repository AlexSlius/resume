import FormEmployment from "./FormEmployment";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { useDispatch, useSelector } from "react-redux";

import { localStorageGet } from "../../../helpers/localStorage";

const Employment = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = localStorageGet('idCv');

   return (
      <>
         <HeadMainContent
            title={'Employment History'}
         />
         <FormEmployment
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Employment;