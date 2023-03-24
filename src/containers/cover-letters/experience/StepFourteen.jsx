import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepFourteen = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["workGaps"]);
    }

    return (
        <div className="step-wr">
            {
                (experienceObj.questionCurrentlyWorking == "yes") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-1.svg"
                            title="What is your current role?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={6}>
                                        <InputSelect
                                            placeholder="Company Name"
                                            // valueState={contObj.country || ''}
                                            // data={coutrys.list}
                                            name="country"
                                            // isBackgraundLoad={isLoader(coutrys.status)}
                                            // handleSaveSelect={handleSaveSelect}
                                            isOutDataObj={false}
                                        />
                                    </CCol>
                                    <CCol xs={6}>
                                        <InputSelect
                                            placeholder="Job title"
                                            // valueState={contObj.country || ''}
                                            // data={coutrys.list}
                                            name="country"
                                            // isBackgraundLoad={isLoader(coutrys.status)}
                                            // handleSaveSelect={handleSaveSelect}
                                            isOutDataObj={false}
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
                (experienceObj.questionCurrentlyWorking == "no") && (
                    < div >
                        <StepContent
                            icon="/images/cover/icon-cover-1.svg"
                            title="What is your most recent role?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={6}>
                                        <InputSelect
                                            placeholder="Company Name"
                                            // valueState={contObj.country || ''}
                                            // data={coutrys.list}
                                            name="country"
                                            // isBackgraundLoad={isLoader(coutrys.status)}
                                            // handleSaveSelect={handleSaveSelect}
                                            isOutDataObj={false}
                                        />
                                    </CCol>
                                    <CCol xs={6}>
                                        <InputSelect
                                            placeholder="Job title"
                                            // valueState={contObj.country || ''}
                                            // data={coutrys.list}
                                            name="country"
                                            // isBackgraundLoad={isLoader(coutrys.status)}
                                            // handleSaveSelect={handleSaveSelect}
                                            isOutDataObj={false}
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