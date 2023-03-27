import { CForm, CCol, CRow } from "@coreui/react"
import { StepContent } from "../../../components/stepContent";
import Input from "../../../components/uis/input";
import { BtnContinue } from "../component/btnContinue";
import { DatePicker } from "../../../components/uis/datePicker"

export const StepThree = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["pointAverage"]);
    }

    return (
        <div className="step-wr">
            {
                (experienceObj.questionCurrentlyInCollegeUniversity == "") && (
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
                                            value={experienceObj.nameCollegeOrUniversity}
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
                (experienceObj.questionCurrentlyInCollegeUniversity == "yes") && (
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
                                            selected={experienceObj.expectedYearOfGraduation}
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