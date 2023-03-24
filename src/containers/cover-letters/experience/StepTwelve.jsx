import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepTwelve = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["graduatedStep"]);
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
                            <InputSelect
                                placeholder="Work experience"
                                // valueState={contObj.country || ''}
                                // data={coutrys.list}
                                name="country"
                                // isBackgraundLoad={isLoader(coutrys.status)}
                                // handleSaveSelect={handleSaveSelect}
                                isOutDataObj={false}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Year(s)"
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