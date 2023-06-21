import { StepContent } from "../../../components/stepContent";
import { BtnsStatus } from "../component/btnsStatus";

export const StepOne = ({
    handleUpdateField = () => { },
}) => {
    const handleClickBtn = async (value) => {
        await handleUpdateField({ name: "questionGraduateFromCollege", value, step: "graduated" });
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-1.svg"
                title="Did you graduate from college?"
            />
            <BtnsStatus
                onHanlebtn={(value) => handleClickBtn(value)}
            />
        </div>
    )
}