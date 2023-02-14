import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormSocials from "./FormSocials";

const Socials = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

   return (
      <>
         <HeadMainContent
            title={'Social Links'}
            description={`You can add links to websites you want hiring managers to see!  
            \nPerhaps It will be a link to your portfolio, LinkedIn profile, or personal website`}
         >
         </HeadMainContent>
         <FormSocials
            dispatch={dispatch}
            states={states}
            idCv={idCv}
         />
      </>
   )
}

export default Socials;