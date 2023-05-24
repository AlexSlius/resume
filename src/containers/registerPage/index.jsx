import {
    CForm,
    CCol,
    CRow,
    CButton
} from "@coreui/react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { useEffect, useState } from "react";

import { FormHead } from "../../components/formHead"
import { AuthorizationWrapper } from "../../wrappers/autorization"
import { InputPassword } from "../../components/uis/inputPassword"
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"
import { InputEmail } from "../../components/uis/inputEmail";

import { fetchAuthRegister } from "../../controllers/auth"
import { cleanError } from "../../slices/auth";

import { isLoader } from "../../helpers/loadings"
import { validEmail } from "../../helpers/validEmail";
import { localStorageGet, sessionStorageGet } from "../../helpers/localStorage"

import { routersPages } from "../../constants/next-routers"


export const RegisterPage = () => {
    const dispatch = useDispatch();
    const { status, textError } = useSelector(prev => prev.auth.register);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        let session_empty = localStorageGet('session_id');
        let typeResume = sessionStorageGet('typeResume');

        dispatch(fetchAuthRegister({
            data: {
                email: email,
                password: password,
                session_id: session_empty,
            },
            typeResume
        }));
    }

    useEffect(() => {
        if (textError) {
            dispatch(cleanError('register'))
        }
    }, []);

    return (
        <AuthorizationWrapper>
            <>
                <FormHead title="Register ✍️" subTitle="Please enter your details." />
                <div className={`form_wrap form_wrap_mt`}>
                    <CForm
                        className="r-gap-30"
                        onSubmit={onSubmit}
                    >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <InputEmail
                                    label="E-mail"
                                    value={email}
                                    onChange={(val) => setEmail(val)}
                                    textError={textError == "user_exist" ? "A user with this email is already registered" : ""}
                                />
                            </CCol>
                        </CRow >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <InputPassword
                                    label="Password"
                                    value={password}
                                    valid={password.length > 3}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </CCol>
                        </CRow >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <InputPassword
                                    label="Repeat password"
                                    invalid={(repeatPassword.length > 3) && (password != repeatPassword)}
                                    value={repeatPassword}
                                    valid={(repeatPassword.length > 3) && (password == repeatPassword)}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
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
                                        disabled={!(validEmail(email) && (repeatPassword.length > 3) && (password == repeatPassword))}
                                    >Register</CButton>
                                </LoadChildrenBtn>
                            </CCol>
                        </CRow>
                        <CRow className="r-gap-24">
                            <CCol>
                                <div className="auth-bot-text">
                                    Do you have an account?{' '}
                                    <Link href={routersPages['login']} className="link-form-auth">Log in</Link>
                                </div>
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
            </>
        </AuthorizationWrapper>
    )
}