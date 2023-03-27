import { StepContent } from "../../../components/stepContent";
import { BtnsStatus } from "../component/btnsStatus";

export const StepTen = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const handleClickBtn = (value) => {
        handleUpdateField({ name: "questionHaveWorkExperience", value });

        if (value == "yes") {
            handleClicQuery(StepsName["previousJob"]);
        } else if (value == "no") {
            handleClicQuery(StepsName["graduatedFinish"]);
        }
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-9.svg"
                title="Do you have work experience?"
                label="(includes volunteer work, summer jobs, and unofficial jobs)"
            />
            <BtnsStatus onHanlebtn={(value) => handleClickBtn(value)} />
        </div>
    )
}