import FormEmployment from "./FormEmployment";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const Employment = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Employment History'}
         />
         <FormEmployment
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Employment;