
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormHobies from "./FormHobies";

const Hobies = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Hobbies'}
            description={'What do you like?'}
         >
         </HeadMainContent>
         <FormHobies
            dispatch={dispatch}
            states={states}
            idCv={idCv}
         />
      </>
   )
}

export default Hobies;