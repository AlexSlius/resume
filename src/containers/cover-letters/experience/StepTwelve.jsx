import { CForm, CCol, CRow } from "@coreui/react"

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
    const handleClickBtn = async () => {
        await handleClicQuery(StepsName["graduatedStep"]);
    }

    const handleUpdateFiled = ({ name, value }) => {
        handleUpdateField({ name, value });
    }

    const handleRequestInceYears = () => {

    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-9.svg"
                title="How much work experience do you have?"
                label="You can round your experience up or down."
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow>
                        <CCol xs={6}>
                            <Input
                                label="Work experience"
                                placeholder="Work experience"
                                type="number"
                                value={coverDataObj.workExperience}
                                onChange={(e) => handleUpdateField({ name: "workExperience", value: e.target.value })}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Year(s)"
                                valueState={coverDataObj.workExperienceYears || ''}
                                // data={coutrys.list}
                                name="workExperienceYears"
                                handleSaveSelect={handleUpdateFiled}
                                handleServerRequest={handleRequestInceYears}
                                isOutDataObj={false}
                                isIconArrow={true}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}