import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";
import Input from "../../../components/uis/input";

import {
    getJopsTitle,
    addJopsTitle,
    getCompanyList,
    addCompany
} from "../../../controllers/dependencies"

export const StepSixteen = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    dispatch,
    jopsTitleList,
    companysList,
}) => {
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
            <div>
                <StepContent
                    icon="/images/cover/icon-cover-1.svg"
                    title="What position are you applying for?"
                />
                <div className="wr-form-cover">
                    <CForm className="wr-gab-30">
                        <CRow>
                            <CCol xs={6}>
                                <InputSelect
                                    label="Company Name"
                                    placeholder="Company Name"
                                    valueState={coverDataObj.applyingCompanyName || ''}
                                    data={companysList || []}
                                    isAddDiv={true}
                                    name="applyingCompanyName"
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
                                    valueState={coverDataObj.applyingCompanyJobTitle || ''}
                                    data={jopsTitleList || []}
                                    isAddDiv={true}
                                    name="applyingCompanyJobTitle"
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
                            <CCol xs={2}>
                                <InputSelect
                                    placeholder="Title"
                                    valueState={coverDataObj.applyingCompanyTitle || ''}
                                    // data={coutrys.list}
                                    name="applyingCompanyTitle"
                                    handleSaveSelect={handleUpdateFiled}
                                    isOutDataObj={false}
                                    isIconArrow={true}
                                />
                            </CCol>
                            <CCol xs={4}>
                                <Input
                                    label="Name of Company Contact"
                                    placeholder="Name of Company Contact"
                                    value={coverDataObj.applyingCompanyContact}
                                    onChange={(e) => handleUpdateField({ name: "applyingCompanyContact", value: e.target.value })}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
                <BtnContinue label="Finish" isButton={true} />
            </div>
        </div>
    )
}