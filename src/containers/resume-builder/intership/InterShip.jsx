import FormInterShip from "./FormInterShip"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

const InterShip = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

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