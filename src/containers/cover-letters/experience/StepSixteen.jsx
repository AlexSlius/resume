import { CForm, CCol, CRow } from "@coreui/react"
import Router, { useRouter } from "next/router";

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
import { focusFieldInputClassName } from "../../../helpers/fiedlFocus";

import { routersPages } from "../../../constants/next-routers";

import dataTitle from "./data/selects.json";

export const StepSixteen = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    dispatch,
    jopsTitleList,
    companysList,
    idCv
}) => {
    const routers = useRouter();
    const handleUpdateFiled = ({ name, value }, data, classnextFocus) => {
        handleUpdateField({ name, value });

        if (!!data)
            focusFieldInputClassName(classnextFocus);
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

    const handleFinish = () => {
        Router.push(`/${routersPages['coverLetter']}/${idCv}/${routersPages['templates']}${routers?.query?.shareKey ? `?shareKey=${routers?.query?.shareKey}` : ""}`);
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-1.svg"
                title="What position are you applying for?"
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30 mobile-gap">
                    <CRow className="mobile-rows two-items">
                        <CCol xs={12} md={6}>
                            <InputSelect
                                label="Company Name"
                                valueState={coverDataObj.applyingCompanyName || ''}
                                data={companysList || []}
                                isAddDiv={true}
                                name="applyingCompanyName"
                                handleSaveSelect={(obj, data) => handleUpdateFiled(obj, data, "job_title")}
                                handleServerRequest={handleRequestNameCompany}
                                handleAddNew={(value) => handleAddNewCompany(value, true)}
                                isOutDataObj={false}
                                isRequire={true}
                                isCap={true}
                                isValidIn={true}
                                validIn={coverDataObj.applyingCompanyName?.trim()?.length > 4}
                            />
                        </CCol>
                        <CCol xs={12} md={6} className="job_title">
                            <InputSelect
                                label="Job Title"
                                valueState={coverDataObj.applyingCompanyJobTitle || ''}
                                data={jopsTitleList || []}
                                isAddDiv={true}
                                name="applyingCompanyJobTitle"
                                handleSaveSelect={(obj, data) => handleUpdateFiled(obj, data, "title_company")}
                                handleServerRequest={handleRequestJobTitle}
                                handleAddNew={handleAddNewJobTitle}
                                isOutDataObj={false}
                                isRequire={true}
                                isCap={true}
                                isValidIn={true}
                                validIn={coverDataObj.applyingCompanyJobTitle?.trim()?.length > 4}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mobile-rows two-items title_company">
                        <CCol xs={2}>
                            <InputSelect
                                label={"Title"}
                                valueState={coverDataObj.applyingCompanyTitle || ''}
                                data={dataTitle}
                                name="applyingCompanyTitle"
                                handleSaveSelect={(obj, data) => handleUpdateFiled(obj, data, "name_comp")}
                                isOutDataObj={false}
                                isIconArrow={true}
                                isValidIn={true}
                                validIn={coverDataObj.applyingCompanyTitle?.trim()?.length > 2}
                                isSearch={false}
                                isStaticData={true}
                                isKyrentName={true}
                            />
                        </CCol>
                        <CCol xs={4} className="name_comp">
                            <Input
                                label="Name of Company Contact"
                                value={coverDataObj.applyingCompanyContact}
                                onChange={(e) => handleUpdateField({ name: "applyingCompanyContact", value: e.target.value })}
                                valid={coverDataObj.applyingCompanyContact?.trim()?.length > 2}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue label="Finish" isButton={true} onHanleBtn={handleFinish} />
        </div>
    )
}