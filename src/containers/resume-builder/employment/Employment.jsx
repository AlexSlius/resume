import FormEmployment from "./FormEmployment";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const Employment = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Employment History'}
            StubTextBtn={true}
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