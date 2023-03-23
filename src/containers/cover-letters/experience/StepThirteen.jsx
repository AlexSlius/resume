import { StepContent } from "../../../components/stepContent";
import { BtnsStatus } from "../component/btnsStatus";

export const StepThirteen = () => {
    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-1.svg"
                title="Are you currently working?"
            />
            <BtnsStatus />
        </div>
    )
}