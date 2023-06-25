
import FormContact from "./FormContact"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const Contact = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Contact Section'}
         />
         <FormContact
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Contact;