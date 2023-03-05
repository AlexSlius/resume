import {
    CForm,
    CCol,
    CRow,
    CButton
} from "@coreui/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { FormHead } from "../../components/formHead"
import { AutorizationWrapper } from "../../wrappers/autorization"
import { Checked } from "../../components/uis/checked"
import { InputPassword } from "../../components/uis/inputPassword"
import Input from "../../components/uis/input"
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"

import { routersPages } from "../../constants/next-routers"
import { localStorageGet } from "../../helpers/localStorage"
import { isLoader } from "../../helpers/loadings"

export const ContactPage = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(prev => prev.auth.login)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
        watch,
    } = useForm({
        mode: "onBlur",
        // defaultValues: {
        //     email: '',
        //     password: '',
        // }
    });

    const onSubmit = (data) => {
    }

    return (
        <AutorizationWrapper >
            <>
                <FormHead title="Payment Details 🏦" subTitle="Please enter your details." />
                <div className={`form_wrap form_wrap_mt`}>
                    <CForm
                        onSubmit={handleSubmit(onSubmit)}
                        className="r-gap-30"
                    >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <Input
                                    label="Full Name"
                                    placeholder="Full Name"
                                    obj={
                                        register("fullName", {
                                            required: true,
                                        })
                                    }
                                />
                            </CCol>
                        </CRow >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <Input
                                    label="Card number"
                                    placeholder="Card number"
                                    obj={
                                        register("cardNumber", {
                                            required: true,
                                            minLength: {
                                                value: 1
                                            }
                                        })
                                    }
                                />
                            </CCol>
                        </CRow>
                        <CRow className="r-gap-24">
                            <CCol xl={6}>
                                <Input
                                    label="Expiration Date"
                                    placeholder="Expiration Date"
                                    obj={
                                        register("expirationDate", {
                                            required: true,
                                        })
                                    }
                                />
                            </CCol>
                            <CCol xl={6}>
                                <InputPassword
                                    label="CVV"
                                    placeholder="CVV"
                                    obj={
                                        register("cvv", {
                                            required: true,
                                            minLength: {
                                                value: 3
                                            }
                                        })
                                    }
                                />
                            </CCol>
                        </CRow>
                        <CRow className="r-gap-24">
                            <CCol>
                                <Input
                                    label="Zip code"
                                    placeholder="Zip code"
                                    obj={
                                        register("zipCode", {
                                            required: true,
                                        })
                                    }
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <LoadChildrenBtn isLoad={isLoader(status)}>
                                    <CButton
                                        className={`btn_form`}
                                        type="submit"
                                        color="blue"
                                    >Pay $44.95</CButton>
                                </LoadChildrenBtn>
                            </CCol>
                        </CRow>
                    </CForm>
                    <div className="payload_mt">
                        <div className="items-payload">
                            <img src="/images/icons/icon_visa.svg" />
                            <img src="/images/icons/icon_ma.svg" />
                            <img src="/images/icons/icon_am.svg" />
                            <img src="/images/icons/icon_pa.svg" />
                        </div>
                    </div>
                </div>
            </>
        </AutorizationWrapper>
    )
}