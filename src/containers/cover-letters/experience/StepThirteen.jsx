import { StepContent } from "../../../components/stepContent";
import { BtnsStatus } from "../component/btnsStatus";

export const StepThirteen = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
}) => {
    const handleClickBtn = async (value) => {
        await handleUpdateField({ name: "questionCurrentlyWorking", value, step: "graduatedTwo" });
        // await handleClicQuery(StepsName["graduatedTwo"]);
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-1.svg"
                title="Are you currently working?"
            />
            <BtnsStatus onHanlebtn={(value) => handleClickBtn(value)} />
        </div>
    )
}