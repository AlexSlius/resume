import { CForm, CCol, CRow, CButton } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link"
import { useEffect, useState } from "react";

import { FormHead } from "../../components/formHead";
import { AuthorizationWrapper } from "../../wrappers/autorization";
import { LoadChildrenBtn } from "../../components/loadChildrenBtn";
import { InputEmail } from "../../components/uis/inputEmail";

import { autoRegisterForm } from "../../controllers/auth"
import { cleanError } from "../../slices/auth";
import { validEmail } from "../../helpers/validEmail";

import { routersPages } from "../../constants/next-routers";


export const RegisterPage = () => {
    const dispatch = useDispatch();
    const { textError } = useSelector(prev => prev.auth.register);
    const [email, setEmail] = useState('');
    const [state, setState] = useState({ load: false, text: '' });

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(autoRegisterForm({ data: { email }, setState }));
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
                                    textError={(state.text.length > 0) ? state.text : ""}
                                />
                            </CCol>
                        </CRow >
                        <CRow>
                            <CCol>
                                <LoadChildrenBtn isLoad={state.load}>
                                    <CButton
                                        className={`btn_form`}
                                        type="submit"
                                        color="blue"
                                        disabled={!validEmail(email)}
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