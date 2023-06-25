import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormReference from "./FormReference";

const Reference = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'References'}
         >
         </HeadMainContent>
         <FormReference
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Reference;