import { useSelector } from "react-redux";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormSocials from "./FormSocials";
import uuid from 'react-uuid';

const initialState = [{
   name: '',
   link: '',
   id: uuid()
 }];

const Socials = () => {
   let socials = useSelector((state) => state.socials.socialss);
   socials = socials.filter(el => el?.name);
   const loading = useSelector((state) => state.app.loading);

   // if(loading) {
   //    return null;
   // }
   
   return (
      <>
         <HeadMainContent
            title={'Social Links'}
            description={`You can add links to websites you want hiring managers to see!  
            \nPerhaps It will be a link to your portfolio, LinkedIn profile, or personal website`}
         >
         </HeadMainContent>
         <FormSocials
               className={`row r-gap-30`}
               skipButton={true}
               valuesFromStore={socials}
               initialState={initialState}
               buttonClassName="gap-4 d-flex"
         />
      </>
   )
}

export default Socials;