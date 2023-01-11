
import { useSelector } from "react-redux";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormHobies from "./FormHobies";
import uuid from 'react-uuid';

const initialState = [{
   text: "",
   id: uuid()
 }];


const Hobies = () => {

   const hobies = useSelector((state) => state.hobies.hobiess);
   const loading = useSelector((state) => state.app.loading);

   // if(loading) {
   //    return null
   // }

   return (
      <>
         <HeadMainContent
            title={'Hobbies'}
            description={'What do you like?'}
         >
         </HeadMainContent>
         <FormHobies
            valuesFromStore={hobies} 
            className={`row r-gap-30`}
            skipButton={true}
            initialState={initialState}
            buttonClassName="gap-4 d-flex"
         />
      </>
   )
}

export default Hobies;