
import FormContact from "./FormContact"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const Contact = ({
   idCv,
   states,
   dispatch,
   setStatePictureFile,
   statePictureFile
}) => {
   return (
      <>
         <HeadMainContent
            title={'Contact Section'}
            StubTextBtn={true}
         />
         <FormContact
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
            setStatePictureFile={setStatePictureFile}
            statePictureFile={statePictureFile}
         />
      </>
   )
}

export default Contact;