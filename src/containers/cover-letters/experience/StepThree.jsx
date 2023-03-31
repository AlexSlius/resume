import { CForm, CCol, CRow } from "@coreui/react"
import { StepContent } from "../../../components/stepContent";
import Input from "../../../components/uis/input";
import { BtnContinue } from "../component/btnContinue";
import { DatePicker } from "../../../components/uis/datePicker"

export const StepThree = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
}) => {
    const handleClickBtn = async  () => {
        await handleClicQuery(StepsName["pointAverage"]);
    }

    return (
        <div className="step-wr">
            {
                (coverDataObj.questionCurrentlyInCollegeUniversity == "N") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-1.svg"
                            title="What's the name of your college or university?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={6}>
                                        <Input
                                            label="Name university"
                                            placeholder="Name university"
                                            value={coverDataObj.nameCollegeOrUniversity}
                                            autoComplete="on"
                                            onChange={(e) => handleUpdateField({ name: "nameCollegeOrUniversity", value: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </div>
                        <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
                    </div>
                )
            }

            {
                (coverDataObj.questionCurrentlyInCollegeUniversity == "Y") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-2.svg"
                            title="What is your expected year of graduation?"
                            label="If applicable/optional"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={6}>
                                        <DatePicker
                                            selected={coverDataObj.expectedYearOfGraduation}
                                            onChange={(date) => handleUpdateField({ name: 'expectedYearOfGraduation', value: date })}
                                            placeholderText="Date"
                                            name="expectedYearOfGraduation"
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </div>
                        <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
                    </div>
                )
            }
        </div>
    )
}