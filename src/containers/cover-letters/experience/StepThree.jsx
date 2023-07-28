import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { InputSelect } from "../../../components/uis/inputSelect";
import { BtnContinue } from "../component/btnContinue";
import { DatePicker } from "../../../components/uis/datePicker"
import { getUniversityByName } from "../../../controllers/dependencies";

export const StepThree = ({
    handleUpdateField,
    handleClicQuery,
    StepsName,
    coverDataObj,
    university,
    dispatch,
}) => {
    const handleClickBtn = async () => {
        await handleClicQuery(StepsName["pointAverage"]);
    }

    const handleRequest = (value) => {
        dispatch(getUniversityByName(value));
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
                                <CRow className="mobile-rows">
                                    <CCol xs={6}>
                                        <InputSelect
                                            label="Name university"
                                            valueState={coverDataObj.nameCollegeOrUniversity || ''}
                                            data={university.list}
                                            handleSaveSelect={(obj, data) => handleUpdateField({ ...obj, name: "nameCollegeOrUniversity" }, data)}
                                            handleServerRequest={handleRequest}
                                            isOutDataObj={false}
                                            isValidIn={true}
                                            validIn={coverDataObj.nameCollegeOrUniversity?.trim()?.length > 4}
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
                                    <CCol xs={12} md={6}>
                                        <DatePicker
                                            formatInput="YYYY"
                                            formatData="Y"
                                            onlyAYear={true}
                                            floatingLabel="Date"
                                            selected={coverDataObj.expectedYearOfGraduation}
                                            onChange={(date) => handleUpdateField({ name: 'expectedYearOfGraduation', value: date })}
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