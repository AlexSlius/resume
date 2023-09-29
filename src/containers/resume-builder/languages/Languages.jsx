import FormLanguages from "./FormLanguages";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const Languages = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Languages'}
            StubTextBtn={true}
         >
         </HeadMainContent>
         <FormLanguages
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Languages;