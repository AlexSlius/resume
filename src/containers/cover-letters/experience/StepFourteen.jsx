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

export const StepFourteen = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    dispatch,
    jopsTitleList,
    companysList,
}) => {
    const handleClickBtn = async  () => {
        await handleClicQuery(StepsName["workGaps"]);
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
                (coverDataObj.questionCurrentlyWorking == "Y") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-1.svg"
                            title="What is your current role?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow className="mobile-rows two-items">
                                    <CCol xs={12} md={6}>
                                        <InputSelect
                                            label="Company Name"
                                            placeholder="Company Name"
                                            valueState={coverDataObj.currentRoleCompanyName || ''}
                                            data={companysList || []}
                                            isAddDiv={true}
                                            name="currentRoleCompanyName"
                                            handleSaveSelect={handleUpdateFiled}
                                            handleServerRequest={handleRequestNameCompany}
                                            handleAddNew={(value) => handleAddNewCompany(value, true)}
                                            isOutDataObj={false}
                                            isRequire={true}
                                            isCap={true}
                                        />
                                    </CCol>
                                    <CCol xs={12} md={6}>
                                        <InputSelect
                                            label="Job Title"
                                            placeholder="Job Title"
                                            valueState={coverDataObj.currentRoleJobTitle || ''}
                                            data={jopsTitleList || []}
                                            isAddDiv={true}
                                            name="currentRoleJobTitle"
                                            handleSaveSelect={handleUpdateFiled}
                                            handleServerRequest={handleRequestJobTitle}
                                            handleAddNew={handleAddNewJobTitle}
                                            isOutDataObj={false}
                                            isRequire={true}
                                            isCap={true}
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
                (coverDataObj.questionCurrentlyWorking == "N") && (
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
                                            label="Company Name"
                                            placeholder="Company Name"
                                            valueState={coverDataObj.recentRoleCompanyName || ''}
                                            data={companysList || []}
                                            isAddDiv={true}
                                            name="recentRoleCompanyName"
                                            handleSaveSelect={handleUpdateFiled}
                                            handleServerRequest={handleRequestNameCompany}
                                            handleAddNew={(value) => handleAddNewCompany(value, true)}
                                            isOutDataObj={false}
                                            isRequire={true}
                                            isCap={true}
                                        />
                                    </CCol>
                                    <CCol xs={6}>
                                        <InputSelect
                                            label="Job Title"
                                            placeholder="Job Title"
                                            valueState={coverDataObj.recentRoleJobTitle || ''}
                                            data={jopsTitleList || []}
                                            isAddDiv={true}
                                            name="recentRoleJobTitle"
                                            handleSaveSelect={handleUpdateFiled}
                                            handleServerRequest={handleRequestJobTitle}
                                            handleAddNew={handleAddNewJobTitle}
                                            isOutDataObj={false}
                                            isRequire={true}
                                            isCap={true}
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