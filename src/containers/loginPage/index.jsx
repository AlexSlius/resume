import { CForm, CCol, CRow, CButton } from "@coreui/react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Head from "next/head";

import { FormHead } from "../../components/formHead";
import { AuthorizationWrapper } from "../../wrappers/autorization";
import { LoadChildrenBtn } from "../../components/loadChildrenBtn";
import { InputEmail } from "../../components/uis/inputEmail";
import { InputPassword } from "../../components/uis/inputPassword"

import { localStorageSet, localStorageGet } from "../../helpers/localStorage"
import { autoRegisterForm, loginFormCode } from "../../controllers/auth"
import { validEmail } from "../../helpers/validEmail";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [isPassword, setIsPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [state, setState] = useState({ load: false, text: '' });

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isPassword) {
            dispatch(autoRegisterForm({ data: { email }, setState, setIsPassword }));
            return;
        }

        if (isPassword) {
            localStorageSet('authData', { email }, true);
            dispatch(loginFormCode({ data: { email, code: password }, setState }));
        }
    }

    useEffect(() => {
        (async () => {
            let dataStorageAuth = localStorageGet('authData', true);

            if (dataStorageAuth) {
                setEmail(dataStorageAuth.email);
            }
        })();
    }, []);

    return (
        <AuthorizationWrapper>
            <>
                <Head>
                    <title>Account</title>
                </Head>
                <FormHead title="Account ✍️" subTitle="Please enter your details." />
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
                                />
                            </CCol>
                        </CRow>
                        {
                            isPassword && (
                                <CRow className="g-30 r-gap-30">
                                    <CCol>
                                        <InputPassword
                                            label="Code"
                                            valid={!(password.length < 6)}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value.trim())}
                                            textError={(state.text.length > 0) ? state.text : ""}
                                        />
                                    </CCol>
                                </CRow>
                            )
                        }
                        <CRow>
                            <CCol>
                                <LoadChildrenBtn isLoad={state.load}>
                                    <CButton
                                        className={`button-p`}
                                        type="submit"
                                        color="blue"
                                        style={{ width: '100%', maxWidth: '100%' }}
                                        disabled={!validEmail(email)}
                                    ><span>Next</span></CButton>
                                </LoadChildrenBtn>
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
            </>
        </AuthorizationWrapper>
    )
}