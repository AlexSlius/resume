import Link from "next/link";
import React from "react";

import { InputCheckboxPageBtn } from "../../components/uis/input-checkbox-page-btn";
import { InputPage } from "../../components/uis/input-page";
import { TextAreaPage } from "../../components/uis/textarea-page";

export const ContactUsPage = () => {
    const [stat, setStat] = React.useState(0);

    const handkeCheck = (check) => {
        setStat(check);
    }

    return (
        <section className="contact-page">
            <div className="container text-center">
                <h1 className="h1">
                    Contact U<span className="icon-right-top">s</span>
                </h1>
                <p className="bottom-text">
                    Have comments, questions, or feedback to share? Our team would love to hear from you.
                    Give us a call or submit a message below.
                </p>
                <form action="page" className="form">
                    <div className="form__top">
                        <InputCheckboxPageBtn checked={stat == 0} name="soc" label="Feedback" onChange={() => handkeCheck(0)} />
                        <InputCheckboxPageBtn checked={stat == 1} name="soc" label="Billing" onChange={() => handkeCheck(1)} />
                        <InputCheckboxPageBtn checked={stat == 2} name="soc" label="Pricing" onChange={() => handkeCheck(2)} />
                        <InputCheckboxPageBtn checked={stat == 3} name="soc" label="Page Errors" onChange={() => handkeCheck(3)} />
                        <InputCheckboxPageBtn checked={stat == 4} name="soc" label="Cancel Subscription" onChange={() => handkeCheck(4)} />
                        <InputCheckboxPageBtn checked={stat == 5} name="soc" label="Email Subscription" onChange={() => handkeCheck(5)} />
                        <InputCheckboxPageBtn checked={stat == 6} name="soc" label="Other Questions" onChange={() => handkeCheck(6)} />
                    </div>
                    <div className="form__wrapper">
                        <div className="form-input">
                            <InputPage placeholder="Email" />
                        </div>
                        <div className="form-input">
                            <InputPage placeholder="Name" />
                        </div>
                        <TextAreaPage placeholder="Question or remark" />
                    </div>
                    <div className="form-btn-center mt-30">
                        <button className="form-btn btns btn--blue btn--search" type="button">
                            <img loading="lazy" src="/images/page/send.svg" alt="img" />
                            <span>Send email</span>
                        </button>
                    </div>
                </form>
                <div className="contact-page__bottom">
                    Check out the answers to popular questions.
                    <Link href="#">Go to the FAQ page.</Link>
                </div>
            </div>
        </section>
    )
}