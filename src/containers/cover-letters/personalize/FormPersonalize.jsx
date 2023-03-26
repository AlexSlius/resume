import { CForm, CCol, CRow } from "@coreui/react"
import React from "react";

import { StepContent } from "../../../components/stepContent";
import Input from "../../../components/uis/input";
import { InputSelect } from "../../../components/uis/inputSelect";

import { routersPages } from "../../../constants/next-routers";
import { ROUTES } from "../../../constants/routes";
import { BtnContinue } from "../component/btnContinue";

import {
    updateItemField
} from "../../../slices/cover/coverPerson";

import {
    fetchGetCountrys,
    fetchGetCities,
} from "../../../controllers/dependencies"
import {
    coverAddNew,
    coverSetNew,
} from "../../../controllers/cover/personalize";

import { getIdOfNameCountrys } from "../../../helpers/countrys"

const FormPersonalize = ({
    dispatch,
    storeDate,
    idCv,
}) => {
    const [idCountry, setIdCountry] = React.useState(undefined);
    const {
        coverPerson: {
            personObj,
            status,
        },
        dependencies: {
            coutrys,
            cities,
        },
        auth: {
            autorizate: {
                isAthorized
            }
        },
    } = storeDate;

    const handleUpdateItemField = ({ name, value }, data = null) => {
        if (!!data) {
            if (name == "country") {
                if (data?.id) {
                    setIdCountry(data.id);
                    dispatch(updateItemField({ name: "city", value: "" }));
                }
            }

            dispatch(updateItemField({ name, value }));
        } else {
            dispatch(updateItemField({ name, value }));
        }
    }

    const handleServerRequestCity = async () => {
        if (!!!idCountry)
            return false;

        await dispatch(fetchGetCities({ id: idCountry, params: personObj.city }));
    }

    const newBasicNoAutorizstion = async () => {
        await dispatch(coverSetNew({ isNewCover: true }));
    }

    const addNewCoverAutorization = async () => {
        await dispatch(coverAddNew());
    }

    React.useEffect(() => {
        setIdCountry(getIdOfNameCountrys({ objArr: coutrys.list, nameCountry: personObj.country }));
    }, [coutrys.list, personObj.country]);

    React.useEffect(() => {
        dispatch(fetchGetCountrys());
    }, []);

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
                                value={personObj.firstName}
                                name="firstName"
                                autoComplete="on"
                                onChange={(e) => handleUpdateItemField({ name: "firstName", value: e.target.value })}
                            />
                        </CCol>
                        <CCol xs={6}>
                            <Input
                                label="Last Name"
                                placeholder="Last Name"
                                name="lastName"
                                autoComplete="on"
                                value={personObj.lastName}
                                onChange={(e) => handleUpdateItemField({ name: "lastName", value: e.target.value })}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Country"
                                valueState={personObj.country || ''}
                                data={coutrys.list}
                                name="country"
                                handleSaveSelect={handleUpdateItemField}
                                isOutDataObj={false}
                                isIconArrow={true}
                                isFlag={true}
                            />
                        </CCol>
                        <CCol xs={6}>
                            <InputSelect
                                label="City"
                                placeholder="City"
                                valueState={personObj.city || ''}
                                name="city"
                                data={cities.list}
                                handleSaveSelect={handleUpdateItemField}
                                handleServerRequest={handleServerRequestCity}
                                isOutDataObj={false}
                                isRequire={true}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <Input
                                label="State"
                                placeholder="State"
                                value={personObj.state}
                                name="state"
                                onChange={(e) => handleUpdateItemField({ name: "state", value: e.target.value })}
                            />
                        </CCol>
                        <CCol xs={6}>
                            <Input
                                label="Zip Code"
                                placeholder="Zip Code"
                                value={personObj.zipCode}
                                name="zipCode"
                                onChange={(e) => handleUpdateItemField({ name: "zipCode", value: e.target.value })}
                                type="number"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={6}>
                            <Input
                                label="E-mail"
                                placeholder="E-mail"
                                value={personObj.email}
                                name="email"
                                invalid={(personObj.email.length > 0) && !(/\S+@\S+\.\S+/.test(personObj.email))}
                                valid={/\S+@\S+\.\S+/.test(personObj.email)}
                                onChange={(e) => handleUpdateItemField({ name: "email", value: e.target.value })}
                            />
                        </CCol>
                        <CCol xs={6}>
                            <Input
                                label="Phone"
                                placeholder="Phone"
                                autoComplete="on"
                                value={personObj.phone}
                                type="number"
                                name="phone"
                                onChange={(e) => handleUpdateItemField({ name: "phone", value: e.target.value })}
                            />
                        </CCol>
                    </CRow>
                </CForm>
                <BtnContinue
                    onHanleBtn={() => { isAthorized ? addNewCoverAutorization() : newBasicNoAutorizstion() }}
                    isButton={true}
                // href={`/${routersPages['coverLetter']}/${idCv}/${ROUTES['experience']}`}
                />
            </div>
        </div>
    )
}

export default FormPersonalize;