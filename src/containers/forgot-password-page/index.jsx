import { useState, useEffect } from "react"
import {
    CForm,
    CCol,
    CRow,
    CButton
} from "@coreui/react"
import { useDispatch, useSelector } from "react-redux"

import { FormHead } from "../../components/formHead"
import { AuthorizationWrapper } from "../../wrappers/autorization"
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"
import { InputEmail } from "../../components/uis/inputEmail"

import { fetchAuthResetPassword } from "../../controllers/auth"
import { isLoader } from "../../helpers/loadings"
import { validEmail } from "../../helpers/validEmail"
import { localStorageGet } from "../../helpers/localStorage"


export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const { status } = useSelector(prev => prev.auth.resetPassword);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchAuthResetPassword({ email: email }));
    }

    useEffect(() => {
        (async () => {
            let dataStorageAuth = await localStorageGet('authData', true);

            if (dataStorageAuth) {
                await setEmail(dataStorageAuth.email);
            }
        })();
    }, []);

    return (
        <AuthorizationWrapper>
            <>
                <FormHead title="Forgot password? 🔒" subTitle="Receive a password reset code by email" />
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
                        </CRow >
                        <CRow>
                            <CCol>
                                <LoadChildrenBtn isLoad={isLoader(status)}>
                                    <CButton
                                        className={`btn_form`}
                                        type="submit"
                                        color="blue"
                                        disabled={!validEmail(email)}
                                    >Submit Code</CButton>
                                </LoadChildrenBtn>
                            </CCol>
                        </CRow >
                    </CForm>
                </div>
            </>
        </AuthorizationWrapper>
    )
}