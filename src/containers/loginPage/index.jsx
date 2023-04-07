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
import { AuthorizationWrapper } from "../../wrappers/autorization"
import { Checked } from "../../components/uis/checked"
import { InputPassword } from "../../components/uis/inputPassword"
import Input from "../../components/uis/input"
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"

import { routersPages } from "../../constants/next-routers"
import { localStorageSet, localStorageGet } from "../../helpers/localStorage"
import { fetchAuthLogin } from "../../controllers/auth"
import { isLoader } from "../../helpers/loadings"

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(prev => prev.auth.login)
    const [isSaveDataAuth, setIsSaveDataAuth] = React.useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
        watch,
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data) => {
        if (isSaveDataAuth)
            localStorageSet('authData', data, true);

        dispatch(fetchAuthLogin({ username: data.email, password: data.password }));
    }

    React.useEffect(() => {
        (async () => {
            let dataStorageAuth = localStorageGet('authData', true);

            if (dataStorageAuth) {
                setValue('email', dataStorageAuth.email);
                setValue('password', dataStorageAuth.password);
            }
        })();
    }, []);

    return (
        <AuthorizationWrapper >
            <>
                <FormHead title="Welcome back! ✌️" subTitle="Please enter your details." />
                <div className={`form_wrap form_wrap_mt`}>
                    <CForm
                        onSubmit={handleSubmit(onSubmit)}
                        className="r-gap-30"
                    >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <Input
                                    label="E-mail"
                                    invalid={errors?.email}
                                    value={watch("email")}
                                    valid={!errors?.email && /\S+@\S+\.\S+/.test(watch("email"))}
                                    obj={
                                        register("email", {
                                            required: true,
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                            },
                                        })
                                    }
                                />
                            </CCol>
                        </CRow >
                        <CRow className="g-30 r-gap-30">
                            <CCol>
                                <InputPassword
                                    label="Password"
                                    invalid={errors?.password}
                                    valid={!errors?.password && watch("password").length > 0}
                                    value={watch("password")}
                                    obj={
                                        register("password", {
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
                                        disabled={!(!!watch("password").length && !!watch("email").length)}
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