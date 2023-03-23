import { CForm, CCol, CRow } from "@coreui/react"
import { DatePicker } from "../../../components/uis/datePicker"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { BtnsStatus } from "../component/btnsStatus";

export const StepTwo = () => {
    return (
        <div className="step-wr">
            <div>
                <StepContent
                    icon="/images/cover/icon-cover-2.svg"
                    title="What year did you graduate in?"
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

            <div>
                <StepContent
                    icon="/images/cover/icon-cover-1.svg"
                    title="Are you currently in college/university? "
                />

                <BtnsStatus />
            </div>
        </div>
    )
}