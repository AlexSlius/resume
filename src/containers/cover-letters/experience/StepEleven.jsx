import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";
import Input from "../../../components/uis/input";

export const StepEleven = () => {
    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-10.svg"
                title="In which industry do you hold experience?"
                label="(includes volunteer work, summer jobs, and unofficial jobs)"
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow>
                        <CCol xs={6}>
                            <Input
                                label="Work experience"
                                placeholder="Work experience"
                            // value={contObj.firstName}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Name Company"
                                // valueState={contObj.country || ''}
                                // data={coutrys.list}
                                name="country"
                                // isBackgraundLoad={isLoader(coutrys.status)}
                                // handleSaveSelect={handleSaveSelect}
                                isOutDataObj={false}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} />
        </div>
    )
}