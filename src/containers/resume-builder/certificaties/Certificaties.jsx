import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormCertificaties from "./FormCertificaties";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

const Certificaties = () => {
   const dispatch = useDispatch();
   const states = useSelector((state) => state);
   const router = useRouter();
   const idCv = router.query.idCv;

   return (
      <>
         <HeadMainContent
            title={'Certificates'}
            description={'Enter your licenses or certifications one at a time.'}
         >
         </HeadMainContent>
         <FormCertificaties
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Certificaties;