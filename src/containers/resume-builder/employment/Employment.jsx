import FormEmployment from "./FormEmployment";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { useDispatch, useSelector } from "react-redux";

const Employment = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);

   return (
      <>
         <HeadMainContent
            title={'Employment History'}
         />
         <FormEmployment
            dispatch={dispatch}
            storeDate={states}
         />
      </>
   )
}

export default Employment;