import FormInterShip from "./FormInterShip"
import HeadMainContent from "../../../components/headMainContent/HeadMainContent"

const InterShip = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Internship'}
         >
         </HeadMainContent>
         <FormInterShip
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default InterShip;