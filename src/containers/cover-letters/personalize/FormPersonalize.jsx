import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import Input from "../../../components/uis/input";
import { InputSelect } from "../../../components/uis/inputSelect";

import { routersPages } from "../../../constants/next-routers";
import { ROUTES } from "../../../constants/routes";
import { BtnContinue } from "../component/btnContinue";

const FormPersonalize = ({
    dispatch,
    storeDate,
    idCv,
}) => {
    return (
        <div>
            <StepContent
                icon="/images/cover/seo.svg"
                title="Your cover letter is almost ready"
                label="Personalize your cover letter"
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow>
                        <CCol xs={6}>
                            <Input
                                label="First Name"
                                placeholder="First Name"
                                // value={contObj.firstName}
                                autoComplete="on"
                            />
                        </CCol>
                        <CCol xs={6}>
                            <Input
                                label="Last Name"
                                placeholder="Last Name"
                                autoComplete="on"
                            // value={contObj.lastName}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Country"
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
                        <CCol xs={6}>
                            <InputSelect
                                label="City"
                                placeholder="City"
                                // valueState={contObj.city || ''}
                                name="city"
                                // data={cities.list}
                                // isBackgraundLoad={isLoader(cities?.status)}
                                // handleSaveSelect={handleSaveSelect}
                                // handleServerRequest={handleServerRequestCity}
                                isOutDataObj={false}
                                isRequire={true}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="State"
                                // valueState={contObj.country || ''}
                                // data={coutrys.list}
                                name="state"
                                // isBackgraundLoad={isLoader(coutrys.status)}
                                // handleSaveSelect={handleSaveSelect}
                                isOutDataObj={false}
                            />
                        </CCol>
                        <CCol xs={6}>
                            <Input
                                label="Zip Code"
                                placeholder="Zip Code"
                                // value={contObj.zipCode}
                                autoComplete="on"
                                type="number"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <Input
                                label="E-mail"
                                placeholder="E-mail"
                                // value={contObj.email}
                                // invalid={errors?.email}
                                autoComplete="on"
                            />
                        </CCol>
                        <CCol xs={6}>
                            <Input
                                label="Phone"
                                placeholder="Phone"
                                autoComplete="on"
                                // value={contObj.phone}
                                type="number"
                                name="phone"
                            // onChange={(e) => handleSaveSelect({ name: "phone", value: e.target.value })}
                            />
                        </CCol>
                    </CRow>
                </CForm>
                <BtnContinue href={`/${routersPages['coverLetter']}/${idCv}/${ROUTES['experience']}`} />
            </div>
        </div>
    )
}

export default FormPersonalize;