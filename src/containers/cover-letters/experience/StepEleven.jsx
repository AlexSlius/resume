import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepEleven = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
    dispatch,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["howMachWork"]);
    }

    const handleClickBtnPage = () => {
        handleClicQuery(StepsName["graduatedFinish"]);
    }

    const handleUpdateFiled = ({ name, value }) => {
        handleUpdateField({ name, value });
    }

    const handleRequestJobTitle = () => {

    }

    const handleRequestNameCompany = () => {

    }

    return (
        <div className="step-wr">
            {
                (experienceObj.questionHaveWorkExperience == "yes") && (
                    <>
                        <StepContent
                            icon="/images/cover/icon-cover-10.svg"
                            title="In which industry do you hold experience?"
                            label="(includes volunteer work, summer jobs, and unofficial jobs)"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={6}>
                                        <InputSelect
                                            placeholder="Job Title"
                                            valueState={experienceObj.industryHoldExperienceJobTitle || ''}
                                            // data={coutrys.list}
                                            name="industryHoldExperienceJobTitle"
                                            handleSaveSelect={handleUpdateFiled}
                                            handleServerRequest={handleRequestJobTitle}
                                            isOutDataObj={false}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={6}>
                                        <InputSelect
                                            placeholder="Name Company"
                                            valueState={experienceObj.industryHoldExperienceCompanyName || ''}
                                            // data={coutrys.list}
                                            name="industryHoldExperienceCompanyName"
                                            handleSaveSelect={handleUpdateFiled}
                                            handleServerRequest={handleRequestNameCompany}
                                            isOutDataObj={false}
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </div>
                        <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
                    </>
                )
            }

            {
                (experienceObj.questionHaveWorkExperience == "no") && (
                    <div className="cover-card-no">
                        <div>Page:</div>
                        <button onClick={handleClickBtnPage} className="btn-text-cover">What position are you applying for?</button>
                    </div>
                )
            }
        </div>
    )
}
