import { useSelector } from "react-redux";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormReference from "./FormReference";
import uuid from 'react-uuid';

 const initialState = [{
   full_name: "",
   company: "",
   phone: "",
   email: "",
   id: uuid()
 }];

const Reference = () => {

   let reference = useSelector((state) => state.reference.references);
   const loading = useSelector((state) => state.app.loading);

   // if(loading) {
   //    return null;
   // }

   return (
      <>
         <HeadMainContent
            title={'References'}
         >
         </HeadMainContent>
         <FormReference
            className={`row r-gap-30 mt-4`}
            skipButton={true}
            initialState={initialState}
            valuesFromStore={reference}
            buttonClassName="gap-4 d-flex"
         ></FormReference>
      </>
   )
}

export default Reference;