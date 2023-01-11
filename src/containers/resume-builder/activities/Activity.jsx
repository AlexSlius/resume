import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormActivity from "./FormActivity";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

const initialState = {
   title: "",
   employer: "",
   period_from: null,
   period_to: null,
   city: "",
   description: "",
   id: uuid()
 };

const Activity = () => {
   const activitys = useSelector((state) => state.activity.activitys);
   const loading = useSelector((state) => state.app.loading);

   // if(loading) {
   //    return null
   // }
   
   return (
      <>
         <HeadMainContent
            title={'Extra-curricular activities'}
         >
         </HeadMainContent>
         <FormActivity
            valuesFromStore={activitys} 
            className={`row`} 
            initialState={initialState}
            addText="Add one more activity"
            updateText="Add one more activity"
            skipButton={true}
            buttonClassName="gap-4 d-flex mt-4"
         >
         </FormActivity>
      </>
   )
}

export default Activity;