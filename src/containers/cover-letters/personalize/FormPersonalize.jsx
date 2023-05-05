import { CForm, CCol, CRow } from "@coreui/react"
import React from "react";
import Router from "next/router";

import { StepContent } from "../../../components/stepContent";
import Input from "../../../components/uis/input";
import { InputSelect } from "../../../components/uis/inputSelect";

import { routersPages } from "../../../constants/next-routers";
import { ROUTES } from "../../../constants/routes";
import { BtnContinue } from "../component/btnContinue";

import {
    updateItemField
} from "../../../slices/cover/coverDataForm";

import {
    fetchGetCountrys,
    fetchGetCities,
} from "../../../controllers/dependencies"
import {
    coverAddNew,
    coverSetNew,
    updateCoverLetterById,
} from "../../../controllers/cover/personalize";

import { getIdOfNameCountrys } from "../../../helpers/countrys"

const FormPersonalize = ({
    dispatch,
    storeDate,
    idCv,
}) => {
    const refIdTimeout = React.useRef(undefined);
    const [idCountry, setIdCountry] = React.useState(undefined);
    const {
        coverDataForm: {
            coverDataObj,
            status
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
    const isNew = (idCv == "new");

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

        if (!isNew) {
            handleUpdateServer();
        }
    }

    const handleServerRequestCity = async () => {
        if (!!!idCountry)
            return false;

        await dispatch(fetchGetCities({ id: idCountry, params: coverDataObj.city }));
    }

    const newBasicNoAutorizstion = async () => {
        await dispatch(coverSetNew({ isNewCover: true }));
    }

    const addNewCoverAutorization = async () => {
        if (isNew) {
            await dispatch(coverAddNew());
        } else {
            Router.push(`/${routersPages['coverLetter']}/${idCv}/${ROUTES['experience']}`);
        }
    }

    const handleUpdateServer = async (index) => {
        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            await dispatch((updateCoverLetterById({ idCv })));
            clearTimeout(refIdTimeout.current);
        }, 300);
    }

    React.useEffect(() => {
        setIdCountry(getIdOfNameCountrys({ objArr: coutrys.list, nameCountry: coverDataObj.country }));
    }, [coutrys.list, coverDataObj?.country]);

    React.useEffect(() => {
        dispatch(fetchGetCountrys());
    }, []);

    return (
        <div className="personalize-form">
            <StepContent
                icon="/images/cover/seo.svg"
                title="Your cover letter is almost ready"
                label="Personalize your cover letter"
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30 form-margins">
                    <CRow>
                        <CCol xs={12} md={6}>
                            <Input
                                label="First Name"
                                value={coverDataObj?.firstName}
                                valid={coverDataObj?.firstName?.length > 0}
                                onChange={(e) => handleUpdateItemField({ name: "firstName", value: e.target.value })}
                            />
                        </CCol>
                        <CCol xs={12} md={6}>
                            <Input
                                label="Last Name"
                                value={coverDataObj.lastName}
                                valid={coverDataObj?.lastName?.length > 0}
                                onChange={(e) => handleUpdateItemField({ name: "lastName", value: e.target.value })}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={12} md={6}>
                            <InputSelect
                                label="Country"
                                valueState={coverDataObj.country || ''}
                                data={coutrys.list}
                                handleSaveSelect={(obj, data) => handleUpdateItemField({ ...obj, name: "country" }, data)}
                                isOutDataObj={false}
                                isIconArrow={true}
                                isFlag={true}
                                isValidIn={true}
                                validIn={coverDataObj.country?.length > 2}
                            />
                        </CCol>
                        <CCol xs={12} md={6}>
                            <InputSelect
                                label="City"
                                valueState={coverDataObj.city || ''}
                                data={cities.list}
                                handleSaveSelect={(obj, data) => handleUpdateItemField({ ...obj, name: "city" }, data)}
                                handleServerRequest={handleServerRequestCity}
                                isOutDataObj={false}
                                isRequire={true}
                                isValidIn={true}
                                validIn={coverDataObj.city?.length > 2}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={12} md={6}>
                            <Input
                                label="State"
                                value={coverDataObj.state}
                                valid={coverDataObj?.state?.length > 3}
                                onChange={(e) => handleUpdateItemField({ name: "state", value: e.target.value })}
                            />
                        </CCol>
                        <CCol xs={12} md={6}>
                            <Input
                                label="Zip Code"
                                value={coverDataObj.zipCode}
                                valid={coverDataObj?.zipCode?.length > 2}
                                onChange={(e) => handleUpdateItemField({ name: "zipCode", value: e.target.value })}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={12} md={6}>
                            <Input
                                label="E-mail"
                                value={coverDataObj.email}
                                invalid={(coverDataObj.email.length > 0) && !(/\S+@\S+\.\S+/.test(coverDataObj.email))}
                                valid={/\S+@\S+\.\S+/.test(coverDataObj.email)}
                                onChange={(e) => handleUpdateItemField({ name: "email", value: e.target.value })}
                            />
                        </CCol>
                        <CCol xs={12} md={6}>
                            <Input
                                label="Phone"
                                isNumber={true}
                                isPhone={true}
                                value={coverDataObj.phone}
                                valid={coverDataObj?.phone?.length > 6}
                                onChange={(e) => handleUpdateItemField({ name: "phone", value: e.target.value })}
                            />
                        </CCol>
                    </CRow>
                </CForm>
                <BtnContinue
                    onHanleBtn={() => { isAthorized ? addNewCoverAutorization() : newBasicNoAutorizstion() }}
                    isButton={true}
                />
            </div>
        </div>
    )
}

export default FormPersonalize;