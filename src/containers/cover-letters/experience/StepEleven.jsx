import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

import {
    getJopsTitle,
    addJopsTitle,
    getCompanyList,
    addCompany
} from "../../../controllers/dependencies"

export const StepEleven = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
    dispatch,
    jopsTitleList,
    companysList,
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

    const handleRequestJobTitle = async (text) => {
        await dispatch(getJopsTitle(text));
    }

    const handleAddNewJobTitle = async (text) => {
        let re = await dispatch(addJopsTitle(text));
        return re?.payload?.id;
    }

    const handleRequestNameCompany = async (text) => {
        await dispatch(getCompanyList(text));
    }

    const handleAddNewCompany = async (text) => {
        let re = await dispatch(addCompany(text));
        return re?.payload?.id;
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
                                            label="Job Title"
                                            placeholder="Job Title"
                                            valueState={experienceObj.industryHoldExperienceJobTitle || ''}
                                            data={jopsTitleList || []}
                                            isAddDiv={true}
                                            name="industryHoldExperienceJobTitle"
                                            handleSaveSelect={handleUpdateFiled}
                                            handleServerRequest={handleRequestJobTitle}
                                            handleAddNew={handleAddNewJobTitle}
                                            isOutDataObj={false}
                                            isRequire={true}
                                            isCap={true}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={6}>
                                        <InputSelect
                                            label="Name Company"
                                            placeholder="Name Company"
                                            valueState={experienceObj.industryHoldExperienceCompanyName || ''}
                                            data={companysList || []}
                                            isAddDiv={true}
                                            name="industryHoldExperienceCompanyName"
                                            handleSaveSelect={handleUpdateFiled}
                                            handleServerRequest={handleRequestNameCompany}
                                            handleAddNew={(value) => handleAddNewCompany(value, true)}
                                            isOutDataObj={false}
                                            isRequire={true}
                                            isCap={true}
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
