import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormActivity from "./FormActivity";


const Activity = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const idCv = router.query.idCv;

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