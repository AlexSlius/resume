
import { useDispatch, useSelector } from "react-redux"

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormHobies from "./FormHobies";

import { localStorageGet } from "../../../helpers/localStorage";

const Hobies = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = localStorageGet('idCv');

   return (
      <>
         <HeadMainContent
            title={'Hobbies'}
            description={'What do you like?'}
         >
         </HeadMainContent>
         <FormHobies
            dispatch={dispatch}
            states={states}
            idCv={idCv}
         />
      </>
   )
}

export default Hobies;