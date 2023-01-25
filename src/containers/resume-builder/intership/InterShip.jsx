import FormInterShip from "./FormInterShip"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { useSelector, useDispatch } from "react-redux";

import { localStorageGet } from "../../../helpers/localStorage";

const InterShip = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = localStorageGet('idCv');

   return (
      <>
         <HeadMainContent
            title={'Internship'}
         >
         </HeadMainContent>
         <FormInterShip
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default InterShip;