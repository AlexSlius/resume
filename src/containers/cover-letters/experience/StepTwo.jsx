import { CForm, CCol, CRow } from "@coreui/react";

import { DatePicker } from "../../../components/uis/datePicker";
import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { BtnsStatus } from "../component/btnsStatus";

export const StepTwo = ({
    handleUpdateField,
    handleClicQuery,
    StepsName,
    coverDataObj,
}) => {
    const handleClickBtn = async (value) => {
        await handleUpdateField({ name: "questionCurrentlyInCollegeUniversity", value, step: value == "Y" ? "nameCollege" : "workExperinence" });
    }

    return (
        <div className="step-wr">
            {
                (coverDataObj.questionGraduateFromCollege == "Y") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-2.svg"
                            title="What year did you graduate in?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={12} md={6}>
                                        <DatePicker
                                            formatInput="YYYY"
                                            formatData="Y"
                                            floatingLabel="Date"
                                            onlyAYear={true}
                                            selected={coverDataObj.graduateDate}
                                            onChange={(date) => handleUpdateField({ name: "graduateDate", value: date })}
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
                (coverDataObj.questionGraduateFromCollege == "N") && (
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