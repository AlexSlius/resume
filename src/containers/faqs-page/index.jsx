import Link from "next/link";
import { useSelector } from 'react-redux'

import { AccordionComponent } from "../../components/accordion"
import { InputPage } from "../../components/uis/input-page";

import { routersPages } from "../../constants/next-routers"

const arr = [
    {
        title: "Can I change my plan?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "Do I get full access with the trial?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "What about money back?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "What is a resume builder?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "What should a resume include?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "Should I include a cover letter with my resume?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
];

export const FaqsPage = () => {
    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    return (
        <section className="faq-page">
            <div className="containers">
                <div className="max-830px">
                    <div className="text-center">
                        <h1 className="h1">
                            FAQ<span className="icon-right-top">s</span>
                        </h1>
                        <p className="bottom-text">
                            Do you have any questions? Please have a look at our frequently asked questions.
                            If you cannot find the answer you need, please contact us.
                        </p>
                        <form action="page" className="form">
                            <InputPage placeholder="Search by keyword..." />
                            <button className="form-btn btns btn--blue btn--search btn-search-fag" type="button">
                                <img loading="lazy" src="/images/page/search-icon.svg" alt="img" />
                                {
                                    currentResolution !== "xs" && (
                                        "Find a question"
                                    )
                                }
                            </button>
                        </form>
                        <div className="faq-page__wrapper">
                            <AccordionComponent arr={arr} />
                        </div>
                        <div className="faq-page__bottom">
                            Didn't find what you're looking for?
                            <Link href={`/${routersPages['contactUs']}`}>You can always contact us.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}