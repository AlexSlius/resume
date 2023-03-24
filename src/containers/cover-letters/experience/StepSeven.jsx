import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { Checked } from "../../../components/uis/checked"

export const StepSeven = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["describes"]);
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-6.svg"
                title="What are your greatest skills?"
                label="Choose two or three skills you have demonstrated in the past"
            />
            <div className="wr-form-cover">
                <div className="cover-checks">
                    <Checked
                        id="check1"
                        label="Analytical"
                        isBold={true}
                    />
                    <Checked
                        id="check2"
                        label="Communication"
                        isBold={true}
                    />
                    <Checked
                        id="check3"
                        label="Creative thinking"
                        isBold={true}
                    />

                    <Checked
                        id="check4"
                        label="Critical thinking"
                        isBold={true}
                    />
                    <Checked
                        id="check5"
                        label="Interpersonal"
                        isBold={true}
                    />
                    <Checked
                        id="check6"
                        label="Language"
                        isBold={true}
                    />

                    <Checked
                        id="check7"
                        label="Leadership"
                        isBold={true}
                    />
                    <Checked
                        id="check8"
                        label="Management"
                        isBold={true}
                    />
                    <Checked
                        id="check9"
                        label="Multitasking"
                        isBold={true}
                    />

                    <Checked
                        id="check10"
                        label="Organizational"
                        isBold={true}
                    />
                    <Checked
                        id="check11"
                        label="Persuasion"
                        isBold={true}
                    />
                    <Checked
                        id="check12"
                        label="Planning"
                        isBold={true}
                    />

                    <Checked
                        id="check13"
                        label="Problem-solving"
                        isBold={true}
                    />
                    <Checked
                        id="check14"
                        label="Research"
                        isBold={true}
                    />
                    <Checked
                        id="check15"
                        label="Service"
                        isBold={true}
                    />

                    <Checked
                        id="check16"
                        label="Teamwork"
                        isBold={true}
                    />
                    <Checked
                        id="check17"
                        label="Technical"
                        isBold={true}
                    />
                    <Checked
                        id="check18"
                        label="Writing"
                        isBold={true}
                    />
                </div>
            </div>

            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}