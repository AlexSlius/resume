import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormActivity from "./FormActivity";


const Activity = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Extra-curricular activities'}
            StubTextBtn={true}
         >
         </HeadMainContent>
         <FormActivity
            dispatch={dispatch}
            storeDate={states}
            idCv={idCv}
         />
      </>
   )
}

export default Activity;