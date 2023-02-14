import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormReference from "./FormReference";

const Reference = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

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