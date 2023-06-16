import Link from "next/link";
import { useState } from "react";
import Head from 'next/head'
import { useDispatch } from "react-redux";

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

        if (formState.name?.length < 1) {
            setErrorFields(prev => ({
                ...prev,
                name: true
            }))
        }

        if (formState.description?.length < 50) {
            setErrorFields(prev => ({
                ...prev,
                description: true
            }))
        }

        if (!validateEmail(formState.email) || formState.name?.length < 1 || formState.description?.length < 50) {
            return;
        }

        let data = {
            type: types.find(el => (el.id == stat))?.name || types[0]?.name,
            ...formState,
        }

        let res = await dispatch(sendFormContactUs({ data, setIsLoad }));

        if (res.payload === true) {
            handleClean();
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
                <div className="container text-center">
                    <h1 className="h1">
                        Contact U<span className="icon-right-top">s</span>
                    </h1>
                    <p className="bottom-text">
                        Have comments, questions, or feedback to share? Our team would love to hear from you. Submit a message below.
                    </p>
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
                                    label="E-mail*"
                                    value={formState.email}
                                    onChange={(val) => handleUpdateField('email', val)}
                                    textError={errorFields.email ? "The mail field is required" : ""}
                                />
                            </div>
                            <div className="form-input">
                                <Input
                                    label="Name*"
                                    value={formState.name}
                                    valid={formState?.name?.length > 0}
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
                                    textError={errorFields.description && (formState.description?.length == 0 ? "The main field is required" : formState.description?.length < 50 ? "A small description. Increase the description to 50 characters" : "")}
                                />
                            </div>
                        </div>
                        <div className="form-btn-center mt-30">
                            <LoadChildrenBtn isLoad={isLoad}>
                                <button className="form-btn btns btn--blue " type="submit">
                                    <img loading="lazy" src="/images/page/send.svg" alt="img" />
                                    <span>Send email</span>
                                </button>
                            </LoadChildrenBtn>
                        </div>
                    </form>
                    <div className="contact-page__bottom">
                        Check out the answers to popular questions.
                        <Link href={`/${routersPages['faqs']}`}>Go to the FAQ page.</Link>
                    </div>
                </div>
            </section>
        </>
    )
}