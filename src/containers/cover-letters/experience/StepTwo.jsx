import { CForm, CCol, CRow } from "@coreui/react"
import { DatePicker } from "../../../components/uis/datePicker"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { BtnsStatus } from "../component/btnsStatus";

export const StepTwo = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const handleClickBtn = (value) => {
        handleUpdateField({ name: "questionCurrentlyInCollegeUniversity", value });

        if (value == "yes") {
            handleClicQuery(StepsName["nameCollege"]);
        } else if (value == "no") {
            handleClicQuery(StepsName["professionalSkills"]);
        }
    }

    return (
        <div className="step-wr">
            {
                (experienceObj.questionGraduateFromCollege == "yes") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-2.svg"
                            title="What year did you graduate in?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={6}>
                                        <DatePicker
                                            selected={experienceObj.graduateDate}
                                            onChange={(date) => handleUpdateField({ name: "graduateDate", value: date })}
                                            placeholderText="Date"
                                            name="graduateDate"
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </div>
                        <BtnContinue
                            isButton={true}
                            onHanleBtn={() => { handleClicQuery(StepsName["nameCollege"]); }}
                        />
                    </div>
                )
            }

            {
                (experienceObj.questionGraduateFromCollege == "no") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-1.svg"
                            title="Are you currently in college/university? "
                        />

                        <BtnsStatus onHanlebtn={(value) => handleClickBtn(value)} />
                    </div>
                )
            }
        </div>
    )
}