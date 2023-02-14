import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import FormEmployment from "./FormEmployment";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"


const Employment = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

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