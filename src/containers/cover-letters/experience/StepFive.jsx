import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepFive = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["professionalSkills"]);
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-4.svg"
                title="What's your field of study or degree?"
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
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}