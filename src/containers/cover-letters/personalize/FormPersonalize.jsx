import { CForm, CCol, CRow } from "@coreui/react"

import React, { useRef, useState, useEffect } from "react";
import Router from "next/router";

import { StepContent } from "../../../components/stepContent";
import Input from "../../../components/uis/input";
import { InputEmail } from "../../../components/uis/inputEmail";
import { InputSelect } from "../../../components/uis/inputSelect";

import { routersPages } from "../../../constants/next-routers";
import { ROUTES } from "../../../constants/routes";
import { BtnContinue } from "../component/btnContinue";
import { ModalEmail } from "../../../components/modals/modalEmail";
import { ComponentHigherLoadBtn } from "../../../components/componentHigherLoadBtn";

import {
    updateItemField,
    updateFieldEmailForRegister,
    cleanFormPersonalize,
    cleanFormPersonalizeNew
} from "../../../slices/cover/coverDataForm";
import { cleanFieldDepend } from "../../../slices/dependencies";
import {
    fetchGetCountrys,
    fetchGetCities,
} from "../../../controllers/dependencies"
import {
    coverAddNew,
    coverSetNew,
    updateIsErrorEmail,
    updateCoverLetterById,
} from "../../../controllers/cover/personalize";

import { getIdOfNameCountrys } from "../../../helpers/countrys"
import { ForRegistr } from "../../../components/forRegistr";
import { BtnGreyTypeTwo } from "../../../components/uis/btnGreyTypeTwo";
import { isObjEmptyForm } from "../../../helpers/changeForm";
import { sendCodeResume } from "../../../utils/sendCode";
import { focusFieldInputClassName } from "../../../helpers/fiedlFocus";

import { fieldsFormPerson } from "../../../constants/formPerson";


const FormPersonalize = ({
    dispatch,
    storeDate,
    idCv,
    shareKey,
}) => {
    const refIdTimeout = useRef(undefined);
    const [idCountry, setIdCountry] = useState(undefined);
    const [showModalEmail, setShowModalEmail] = useState(false);
    const [emailForRegister, setEmailForRegister] = useState('');
    const {
        coverDataForm: {
            coverDataObj,
            coverDataObj: {
                lastPosition
            },
            coverDataObjNew,
            emailRegister,
            isErrorEmail,
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
        users: {
            objFormSettings,
        },
        menuAsideResume
    } = storeDate;
    const isNew = (idCv == "new");

    let contObj = (isNew ? coverDataObjNew : coverDataObj);
    let isForEmail = (emailRegister?.length > 0);
    let isEmptyForm = isObjEmptyForm(contObj, fieldsFormPerson);

    const handleUpdateItemField = ({ name, value }, data = null, classnextFocus) => {
        if (!!data) {
            if (name == "country") {
                if (data?.id) {
                    setIdCountry(data.id);
                    dispatch(updateItemField({ name: "city", value: "" }));
                }
            }
            focusFieldInputClassName(classnextFocus);

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

        await dispatch(fetchGetCities({ id: idCountry, params: contObj.city }));
    }

    const newBasicNoAutorizstion = async (link = undefined) => {
        sendCodeResume({
            dispatch,
            link,
            isResume: false,
        });
        // это для старой версии авторизации если не зареган
        // await dispatch(contactSetNew({ pictureFile, isNewResume }));
        // await dispatch(coverSetNew({ isNewCover: true }));
    }

    const addNewCoverAutorization = async () => {
        if (isNew) {
            await dispatch(coverAddNew({}));
        } else {
            Router.push(`/${routersPages['coverLetter']}/${idCv}/${ROUTES['experience']}?step=${lastPosition || undefined}${(shareKey?.length > 0) ? `&shareKey=${shareKey}` : ""}`);
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

    const handleCloseModalEmail = () => {
        setShowModalEmail(false);
    }

    const onHanleBtnSaveEmail = async () => {
        await dispatch(updateFieldEmailForRegister(emailForRegister));
        await dispatch(updateIsErrorEmail());
        handleCloseModalEmail();
    }

    const onClean = async () => {
        dispatch(cleanFieldDepend());
        if (isNew) {
            await dispatch(cleanFormPersonalizeNew());
            return;
        }

        await dispatch(cleanFormPersonalize());
        await dispatch((updateCoverLetterById({ idCv, isClean: true })));
    }

    useEffect(() => {
        if (!!showModalEmail) {
            setEmailForRegister(emailRegister);
        }
    }, [showModalEmail]);

    useEffect(() => {
        setIdCountry(getIdOfNameCountrys({ objArr: coutrys?.list, nameCountry: contObj?.country }));
    }, [coutrys.list, contObj?.country]);

    useEffect(() => {
        dispatch(fetchGetCountrys());

        if (isNew && isAthorized) {
            let { firstName, lastName, email } = objFormSettings;
            handleUpdateItemField({ name: "firstName", value: firstName });
            handleUpdateItemField({ name: "lastName", value: lastName });
            handleUpdateItemField({ name: "email", value: email });
        }
    }, []);

    return (
        <>
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
                                    value={contObj?.firstName}
                                    valid={contObj?.firstName?.length > 0}
                                    onChange={(e) => handleUpdateItemField({ name: "firstName", value: e.target.value })}
                                    readOnly={false}
                                />
                            </CCol>
                            <CCol xs={12} md={6}>
                                <Input
                                    label="Last Name"
                                    value={contObj.lastName}
                                    valid={contObj?.lastName?.length > 0}
                                    onChange={(e) => handleUpdateItemField({ name: "lastName", value: e.target.value })}
                                    readOnly={false}
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs={12} md={6}>
                                <InputSelect
                                    label="Country"
                                    valueState={contObj.country || ''}
                                    data={coutrys.list}
                                    handleSaveSelect={(obj, data) => handleUpdateItemField({ ...obj, name: "country" }, data, 'city_field')}
                                    isOutDataObj={false}
                                    isIconArrow={true}
                                    isFlag={true}
                                    isValidIn={true}
                                    validIn={contObj.country?.length > 2}
                                />
                            </CCol>
                            <CCol xs={12} md={6} className="city_field">
                                <InputSelect
                                    label="City"
                                    valueState={contObj.city || ''}
                                    data={cities.list}
                                    handleSaveSelect={(obj, data) => handleUpdateItemField({ ...obj, name: "city" }, data, "address_field")}
                                    handleServerRequest={handleServerRequestCity}
                                    isOutDataObj={false}
                                    isRequire={true}
                                    isValidIn={true}
                                    validIn={contObj.city?.length > 2}
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs={12} md={6} className="address_field">
                                <Input
                                    label="Address"
                                    value={contObj.state}
                                    valid={contObj?.state?.length > 3}
                                    onChange={(e) => handleUpdateItemField({ name: "state", value: e.target.value })}
                                />
                            </CCol>
                            <CCol xs={12} md={6}>
                                <Input
                                    label="Zip Code"
                                    value={contObj.zipCode}
                                    valid={contObj?.zipCode?.length > 2}
                                    onChange={(e) => handleUpdateItemField({ name: "zipCode", value: e.target.value })}
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs={12} md={6}>
                                <div className="rel">
                                    <InputEmail
                                        label="E-mail"
                                        value={contObj.email}
                                        onChange={(val) => handleUpdateItemField({ name: "email", value: val })}
                                    />
                                    {
                                        isNew && !isAthorized && (
                                            <ForRegistr
                                                isError={isErrorEmail}
                                                isForEmail={isForEmail}
                                                emailForRegister={emailForRegister}
                                                setShowModalEmail={() => setShowModalEmail(true)}
                                                updateFieldEmailForRegister={() => dispatch(updateFieldEmailForRegister(''))}
                                            />
                                        )
                                    }
                                </div>
                            </CCol>
                            <CCol xs={12} md={6}>
                                <Input
                                    label="Phone"
                                    isNumber={true}
                                    isPhone={true}
                                    value={contObj.phone}
                                    valid={contObj?.phone?.length > 6}
                                    onChange={(value) => handleUpdateItemField({ name: "phone", value })}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                    <div className="bts-flex">
                        <BtnGreyTypeTwo
                            label="Delete All"
                            disabled={!isEmptyForm}
                            onClick={onClean}
                        />
                        <ComponentHigherLoadBtn>
                            <BtnContinue
                                onHanleBtn={() => { isAthorized ? addNewCoverAutorization() : newBasicNoAutorizstion(menuAsideResume.coverLetters.list[1].link) }}
                                isButton={true}
                            />
                        </ComponentHigherLoadBtn>
                    </div>
                </div>
            </div>
            <ModalEmail
                visible={showModalEmail}
                onClose={handleCloseModalEmail}
                data={emailForRegister}
                setState={setEmailForRegister}
                onHanleBtn={onHanleBtnSaveEmail}
            />
        </>
    )
}

export default FormPersonalize;