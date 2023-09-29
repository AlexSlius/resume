import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import FormCarreer from "./CareerObjectiveForm";

const CareerObjective = ({ idCv, states, dispatch }) => {
    return (
        <>
            <HeadMainContent
                title={'Summary'}
                description={`This section will usually be one of the first things a hiring manager reads. It tells them,
            “Here’s who I am, and here’s what I can do for your company”.`}
            StubTextBtn={true}
            >
            </HeadMainContent>
            <FormCarreer
                dispatch={dispatch}
                states={states}
                idCv={idCv}
            />
        </>
    )
}

export default CareerObjective;