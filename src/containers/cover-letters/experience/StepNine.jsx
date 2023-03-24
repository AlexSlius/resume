import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepNine = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["workExperinence"]);
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
                    <CRow>
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Please Select"
                                // valueState={contObj.country || ''}
                                // data={coutrys.list}
                                name="country"
                                // isBackgraundLoad={isLoader(coutrys.status)}
                                // handleSaveSelect={handleSaveSelect}
                                isOutDataObj={false}
                                isIconArrow={true}
                                isFlag={true}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}