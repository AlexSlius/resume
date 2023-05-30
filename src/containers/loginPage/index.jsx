import {
    CForm,
    CCol,
    CRow,
    CButton
} from "@coreui/react"
import { useDispatch } from "react-redux"
import Link from "next/link"
import { useState, useEffect } from "react"

import { FormHead } from "../../components/formHead"
import { AuthorizationWrapper } from "../../wrappers/autorization"
import { Checked } from "../../components/uis/checked"
import { InputPassword } from "../../components/uis/inputPassword"
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"
import { InputEmail } from "../../components/uis/inputEmail"

import { loginFormCode } from "../../controllers/auth"
import { localStorageSet, localStorageGet } from "../../helpers/localStorage"
import { validEmail } from "../../helpers/validEmail";

import { routersPages } from "../../constants/next-routers"


export const LoginPage = () => {
    const dispatch = useDispatch();
    const [isSaveDataAuth, setIsSaveDataAuth] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [states, setStates] = useState({ load: false, text: "" });

    const onSubmit = (e) => {
        e.preventDefault();

        if (isSaveDataAuth)
            localStorageSet('authData', { email, password }, true);

        dispatch(loginFormCode({ data: { email, code: password }, setState: setStates }));
    }

    useEffect(() => {
        (async () => {
            let dataStorageAuth = localStorageGet('authData', true);

            if (dataStorageAuth) {
                setEmail(dataStorageAuth.email);
                setPassword(dataStorageAuth.password);
            }
        })();
    }, []);

    return (
        <AuthorizationWrapper >
            <>
                <FormHead title="Welcome back! ✌️" subTitle="Please enter your details." />
                <div className={`form_wrap form_wrap_mt`}>
                    <CForm
                        onSubmit={onSubmit}
                        className="r-gap-30"
                    >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <InputEmail
                                    label="E-mail"
                                    value={email}
                                    onChange={(val) => setEmail(val)}
                                />
                            </CCol>
                        </CRow >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <InputPassword
                                    label="Code"
                                    valid={!(password.length < 6)}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    textError={states.text}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="r-gap-24">
                            <CCol>
                                <div className="row-remove-aut">
                                    <div className="row-remove-aut__left">
                                        <Checked
                                            id="flexCheckDefault"
                                            onChange={() => setIsSaveDataAuth(prev => !prev)}
                                            label="Remember me"
                                            checkbox={isSaveDataAuth}
                                            defaultChecked={true}
                                        />
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <LoadChildrenBtn isLoad={states.load}>
                                    <CButton
                                        className={`btn_form`}
                                        type="submit"
                                        color="blue"
                                        disabled={!(!(password.length < 6) && !!validEmail(email))}
                                    >Sign in</CButton>
                                </LoadChildrenBtn>
                            </CCol>
                        </CRow>
                        <CRow className="r-gap-24">
                            <CCol>
                                <div className="auth-bot-text">
                                    Don’t have an account?{' '}
                                    <Link href={routersPages['register']} className="link-form-auth">Register</Link>
                                </div>
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
            </>
        </AuthorizationWrapper>
    )
}