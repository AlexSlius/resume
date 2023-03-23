import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import Input from "../../../components/uis/input";
import { BtnContinue } from "../component/btnContinue";


export const StepFour = () => {
    return (
        <div className="step-wr">
            <div>
                <StepContent
                    icon="/images/cover/icon-cover-3.svg"
                    title="What's your grade point average?"
                    label="Only write your GPA if it's above 3.0."
                />
                <div className="wr-form-cover">
                    <CForm className="wr-gab-30">
                        <CRow>
                            <CCol xs={6}>
                                <Input
                                    label="Point Average"
                                    placeholder="Point Average"
                                // value={contObj.firstName}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
                <BtnContinue isButton={true} />
            </div>

            <div>
                <StepContent
                    icon="/images/cover/icon-cover-1.svg"
                    title="What's the name of your college or university?"
                />
                <div className="wr-form-cover">
                    <CForm className="wr-gab-30">
                        <CRow>
                            <CCol xs={6}>
                                <Input
                                    label="Name university"
                                    placeholder="Name university"
                                // value={contObj.firstName}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
                <BtnContinue isButton={true} />
            </div>
        </div>
    )
}