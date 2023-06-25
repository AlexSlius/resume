import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormCertificaties from "./FormCertificaties";

const Certificaties = ({ idCv, states, dispatch }) => {
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