import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepNine = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
    dispatch,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["workExperinence"]);
    }

    const handleUpdateFiled = ({ name, value }) => {
        handleUpdateField({ name, value });
    }

    const handleRequest = () => {

    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-8.svg"
                title="How would others describe you?"
                label="Choose a word others would use to describe you."
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow className="mobile-rows">
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Please Select"
                                valueState={experienceObj.othersDescribe || ''}
                                // data={coutrys.list}
                                name="othersDescribe"
                                handleSaveSelect={handleUpdateFiled}
                                handleServerRequest={handleRequest}
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