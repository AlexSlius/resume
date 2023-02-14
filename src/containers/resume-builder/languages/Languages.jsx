import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

import FormLanguages from "./FormLanguages";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const Languages = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

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