import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepSixteen = () => {
    return (
        <div className="step-wr">
            <div>
                <StepContent
                    icon="/images/cover/icon-cover-1.svg"
                    title="What position are you applying for?"
                />
                <div className="wr-form-cover">
                    <CForm className="wr-gab-30">
                        <CRow>
                            <CCol xs={6}>
                                <InputSelect
                                    placeholder="Company Name"
                                    // valueState={contObj.country || ''}
                                    // data={coutrys.list}
                                    name="country"
                                    // isBackgraundLoad={isLoader(coutrys.status)}
                                    // handleSaveSelect={handleSaveSelect}
                                    isOutDataObj={false}
                                />
                            </CCol>
                            <CCol xs={6}>
                                <InputSelect
                                    placeholder="Job title"
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
                            <CCol xs={2}>
                                <InputSelect
                                    placeholder="Title"
                                    // valueState={contObj.country || ''}
                                    // data={coutrys.list}
                                    name="country"
                                    // isBackgraundLoad={isLoader(coutrys.status)}
                                    // handleSaveSelect={handleSaveSelect}
                                    isOutDataObj={false}
                                    isIconArrow={true}
                                />
                            </CCol>
                            <CCol xs={4}>
                                <InputSelect
                                    placeholder="Name of Company Contact"
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
                <BtnContinue label="Finish" isButton={true} />
            </div>
        </div>
    )
}