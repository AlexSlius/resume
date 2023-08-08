import Link from "next/link";
import { useState } from "react";
import Head from 'next/head'
import { useDispatch, useSelector } from "react-redux";

import { InputCheckboxPageBtn } from "../../components/uis/input-checkbox-page-btn";
import { InputEmail } from "../../components/uis/inputEmail";
import Input from "../../components/uis/input"
import Textarea from "../../components/uis/textarea/TextArea"
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"

import { validateEmail } from "../../utils/validates";
import { sendFormContactUs } from "../../controllers/pages/pageContact";

import { routersPages } from "../../constants/next-routers"
import types from "./data/types.json";


export const ContactUsPage = () => {
    const dispatch = useDispatch();

    const {
        theme: {
            currentResolution
        }
    } = useSelector(state => state);

    const isMob = ['sm', 'xs'].includes(currentResolution);

    const [stat, setStat] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const [formState, setFormState] = useState({
        email: '',
        name: "",
        description: "",
    });
    const [errorFields, setErrorFields] = useState({
        email: false,
        name: false,
        description: false,
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handkeCheck = (check) => {
        setStat(check);
    }

    const handleUpdateField = (name, value) => {
        setFormState(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCleanError = () => {
        setErrorFields({
            email: false,
            name: false,
            description: false,
        });
    }

    const handleClean = () => {
        setFormState({
            email: '',
            name: "",
            description: "",
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        handleCleanError();

        if (!validateEmail(formState.email)) {
            setErrorFields(prev => ({
                ...prev,
                email: true
            }))
        }

        if (formState.name.trim().length < 1) {
            setErrorFields(prev => ({
                ...prev,
                name: true
            }))
        }

        if (formState.description.trim().length < 1) {
            setErrorFields(prev => ({
                ...prev,
                description: true
            }))
        }

        if (!validateEmail(formState.email) || formState.name.trim().length < 1 || formState.description.trim().length < 1) {
            return;
        }

        let data = {
            type: types.find(el => (el.id == stat))?.name || types[0]?.name,
            ...formState,
        }

        let res = await dispatch(sendFormContactUs({ data, setIsLoad }));

        if (res.payload === true) {
            handleClean();
            setIsSuccess(true);
        }
    }

    return (
        <>
            <Head>
                <title>Contact Us | Get In Touch For Your Resume And Cover Letter Needs</title>
                <meta
                    name="description"
                    content="Have questions or need assistance with our online resume and cover letter builders? Reach out to us anytime, no registration required. We're here to support your career progression journey."
                />
            </Head>
            <section className="contact-page">
                <div className="containers text-center">
                    <div className="cont__row">
                        <div className="cont__left">
                            <div className="cont__left_top">
                                <h1 className="cont-title">Contact Us</h1>
                                <p className="bottom-text">
                                    Have comments, questions, or feedback to share? Our team would love to hear from you. Submit a message below.
                                </p>
                            </div>
                            {
                                !isMob && (
                                    <div className="cont__left_bot">
                                        <div className="contact-page__bottom">
                                            Check out the answers to popular questions.
                                            <Link href={`/${routersPages['faqs']}`}>Go to the FAQ page.</Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="cont_right">
                            <form action="page" className="form" onSubmit={handleSubmit}>
                                <div className="form__top">
                                    {
                                        types.map((item) => (
                                            <InputCheckboxPageBtn key={item.id} checked={stat == item.id} name="soc" label={item.name} onChange={() => handkeCheck(item.id)} />
                                        ))
                                    }
                                </div>
                                <div className="form__wrapper">
                                    <div className="form-input">
                                        <InputEmail
                                            label="Email*"
                                            value={formState.email}
                                            onChange={(val) => handleUpdateField('email', val)}
                                            textError={errorFields.email ? "The mail field is required" : ""}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <Input
                                            label="Name*"
                                            value={formState.name}
                                            valid={formState?.name?.trim()?.length > 0}
                                            onChange={(e) => handleUpdateField('name', e.target.value)}
                                            name="FNAM"
                                            readOnly={false}
                                            textError={errorFields.name ? "The main field is required" : ""}
                                        />
                                    </div>
                                    <div className="form-texrarea">
                                        <Textarea
                                            value={formState.description}
                                            onChange={(e) => handleUpdateField("description", e.target.value)}
                                            name="description"
                                            placeholder={'Question or remark'}
                                            textError={errorFields.description && (formState.description.trim().length == 0 ? "The main field is required" : "")}
                                        />
                                    </div>
                                </div>
                                <div className="form-btn_n">
                                    <LoadChildrenBtn isLoad={isLoad}>
                                        <button className="form-btn  button-type-standart button-p button-p_icon" type="submit">
                                            <i>
                                                <img loading="lazy" src="/images/page/send.svg" alt="img" />
                                            </i>
                                            <span>Send email</span>
                                        </button>
                                    </LoadChildrenBtn>
                                </div>
                                {
                                    isMob && (
                                        <div className="cont__left_bot">
                                            <div className="contact-page__bottom">
                                                Check out the answers to popular questions.
                                                <Link href={`/${routersPages['faqs']}`}>Go to the FAQ page.</Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </form>
                        </div>

                        {
                            isSuccess && (
                                <div className="contact-success">
                                    <div className="contact-success__cont">
                                        <div className="contact-success__icon"></div>
                                        <div className="contact-success__title">Success</div>
                                        <div className="contact-success__des">Your message has been sent successfully</div>
                                        <div className="contact-success__btn">
                                            <Link href={`/`} className=" button-p button-p_white">Go Home</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}