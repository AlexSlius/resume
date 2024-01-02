import { CForm, CCol, CRow } from "@coreui/react"
import { useState } from "react";

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";
import Input from "../../../components/uis/input";

export const StepTwelve = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    dispatch,
}) => {
    const [dataSelect, setDataSelect] = useState([{ name: "Year" }, { name: "Month" }]);

    const handleClickBtn = async () => {
        // graduatedStep
        handleClicQuery(StepsName["professionalSkills"]);
    }

    const handleUpdateFiled = ({ name, value }) => {
        handleUpdateField({ name, value });
    }

    const handleWorkNumber = (e) => {
        let value = e.target.value.trim();

        if (+value > 1) {
            setDataSelect([{ name: "Year(s)" }, { name: "Month(s)" }]);

            if (coverDataObj.workExperienceYears.includes('Year')) {
                handleUpdateFiled({ name: "workExperienceYears", value: `Year(s)` });
            }

            if (coverDataObj.workExperienceYears.includes('Mont')) {
                handleUpdateFiled({ name: "workExperienceYears", value: `Month(s)` });
            }
        }

        if (+value <= 1) {
            setDataSelect([{ name: "Year" }, { name: "Month" }]);

            if (coverDataObj.workExperienceYears.includes('Year')) {
                handleUpdateFiled({ name: "workExperienceYears", value: `Year` });
            }

            if (coverDataObj.workExperienceYears.includes('Mont')) {
                handleUpdateFiled({ name: "workExperienceYears", value: `Month` });
            }
        }

        handleUpdateField({ name: "workExperience", value });
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-9.svg"
                title="How much work experience do you have?"
                label="You can round your experience up or down."
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30 mobile-gap">
                    <CRow className="mobile-rows">
                        <CCol xs={6}>
                            <Input
                                label="Work experience"
                                placeholder="Work experience"
                                type="number"
                                valid={+coverDataObj.workExperience > 0}
                                value={coverDataObj.workExperience}
                                onChange={handleWorkNumber}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mobile-rows">
                        <CCol xs={6}>
                            <InputSelect
                                label="Year(s)"
                                valueState={coverDataObj.workExperienceYears || ''}
                                data={dataSelect}
                                name="workExperienceYears"
                                handleSaveSelect={handleUpdateFiled}
                                isOutDataObj={false}
                                isIconArrow={true}
                                isSearch={false}
                                isStaticData={true}
                                isKyrentName={true}
                                isCap={true}
                                isValidIn={true}
                                validIn={coverDataObj.workExperienceYears?.trim()?.length > 4}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}