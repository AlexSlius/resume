import FormInterShip from "./FormInterShip"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { useSelector } from "react-redux";
import uuid from "react-uuid";

const initialState = {
   job_title: "",
   period_from: null,
   period_to: null,
   city: "",
   employer: "",
   description: "",
   id: uuid()
 };

const InterShip = () => {
   const interships = useSelector((state) => state.intership.interships);
   const loading = useSelector((state) => state.app.loading);
   const country = useSelector((state) => state.country.countrys);

   // if(loading) {
   //    return null;
   // }

   return (
      <>
         <HeadMainContent
            title={'Internship'}
         >
         </HeadMainContent>
         <FormInterShip
            valuesFromStore={interships} 
            className={`row`} 
            initialState={initialState}
            addText="Add one more internship"
            updateText="Add one more internship"
            skipButton={true}
            countries={country}
            buttonClassName="gap-4 d-flex mt-4"
         ></FormInterShip>
      </>
   )
}

export default InterShip;