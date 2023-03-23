import { StepContent } from "../../../components/stepContent";
import { BtnsStatus } from "../component/btnsStatus";

export const StepTen = () => {
    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-9.svg"
                title="Do you have work experience?"
                label="(includes volunteer work, summer jobs, and unofficial jobs)"
            />
            <BtnsStatus />
        </div>
    )
}