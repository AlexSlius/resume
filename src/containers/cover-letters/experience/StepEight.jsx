import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepEight = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
    dispatch,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["othersDescribe"]);
    }

    const handleUpdateFiled = ({ name, value }) => {
        handleUpdateField({ name, value });
    }

    const handleRequest = () => {

    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-7.svg"
                title="What word would you use to describe yourself?"
                label="Choose the word that describes you best"
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow className="mobile-rows">
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Please Select"
                                valueState={experienceObj.wordDescribes || ''}
                                // data={coutrys.list}
                                name="wordDescribes"
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