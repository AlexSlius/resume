import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import Input from "../../../components/uis/input";
import { BtnContinue } from "../component/btnContinue";
import { DatePicker } from "../../../components/uis/datePicker"

export const StepThree = () => {
    return (
        <div className="step-wr">
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
                                    autoComplete="on"
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
                <BtnContinue isButton={true} />
            </div>

            <div>
                <StepContent
                    icon="/images/cover/icon-cover-2.svg"
                    title="What is your expected year of graduation?"
                    label="If applicable/optional"
                />
                <div className="wr-form-cover">
                    <CForm className="wr-gab-30">
                        <CRow>
                            <CCol xs={6}>
                                <DatePicker
                                    // selected={contObj.dateOfBirth}
                                    // onChange={(date) => handlerSetDateState('dateOfBirth', date)}
                                    placeholderText="Date"
                                    name="date_of_birth"
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