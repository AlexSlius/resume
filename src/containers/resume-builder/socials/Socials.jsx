import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormSocials from "./FormSocials";

const Socials = ({ idCv, states, dispatch }) => {
   return (
      <>
         <HeadMainContent
            title={'Social Links'}
            description={`You can add links to websites you want hiring managers to see!  
            \nPerhaps It will be a link to your portfolio, LinkedIn profile, or personal website`}
            StubTextBtn={true}
         >
         </HeadMainContent>
         <FormSocials
            dispatch={dispatch}
            states={states}
            idCv={idCv}
         />
      </>
   )
}

export default Socials;