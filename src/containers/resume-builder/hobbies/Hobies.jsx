
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormHobies from "./FormHobies";

const Hobies = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

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