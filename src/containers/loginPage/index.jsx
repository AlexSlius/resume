import {
    CForm,
    CCol,
    CRow,
    CButton
} from "@coreui/react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { FormHead } from "../../components/formHead"
import { AuthorizationWrapper } from "../../wrappers/autorization"
import { Checked } from "../../components/uis/checked"
import { InputPassword } from "../../components/uis/inputPassword"
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"
import { InputEmail } from "../../components/uis/inputEmail"

import { fetchAuthLogin } from "../../controllers/auth"
import { localStorageSet, localStorageGet } from "../../helpers/localStorage"
import { isLoader } from "../../helpers/loadings"
import { validEmail } from "../../helpers/validEmail";

import { routersPages } from "../../constants/next-routers"


export const LoginPage = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(prev => prev.auth.login)
    const [isSaveDataAuth, setIsSaveDataAuth] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (isSaveDataAuth)
            localStorageSet('authData', { email, password }, true);

        dispatch(fetchAuthLogin({ username: email, password: password }));
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
                                    label="Password"
                                    valid={password.length > 3}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    <div className="row-remove-aut__link">
                                        <Link href={routersPages['forgot']} className="link-form-auth">Forgot password?</Link>
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <LoadChildrenBtn isLoad={isLoader(status)}>
                                    <CButton
                                        className={`btn_form`}
                                        type="submit"
                                        color="blue"
                                        disabled={!(password.length && !!validEmail(email))}
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