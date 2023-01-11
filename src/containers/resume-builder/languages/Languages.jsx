import { useSelector } from "react-redux";
import FormLanguages from "./FormLanguages";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import uuid from 'react-uuid';

 const initialState = [{
   language: "",
   level: "",
   id: uuid()
 }];


const Languages = () => {
   let languages = useSelector(state => state.languages.languagess);
   languages = languages.filter(el => el?.language);
   const loading = useSelector((state) => state.app.loading);

   // if(loading) {
   //    return null; 
   // }

   return (
      <>
         <HeadMainContent
            title={'Languages'}
         >
         </HeadMainContent>
         <FormLanguages
            className={`row r-gap-30 mt-4`}
            skipButton={true}
            initialState={initialState}
            valuesFromStore={languages}
            buttonClassName="gap-4 d-flex"
         ></FormLanguages>
      </>
   )
}

export default Languages;