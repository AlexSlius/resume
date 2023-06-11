import { useState } from "react";
import Link from "next/link";
import { useSelector } from 'react-redux'
import Head from 'next/head'

import { AccordionComponent } from "../../components/accordion"
import { InputPage } from "../../components/uis/input-page";

import { routersPages } from "../../constants/next-routers"

// data
import dataListFags from "./data/list-fags.json";
import { searchFag } from "../../helpers/searchFag";


export const FaqsPage = () => {
    const [textSearch, setTextSearch] = useState("");
    const [arrList, setArrList] = useState(dataListFags.slice(1, 6));

    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    const handleKeyUpa = (e) => {
        e.preventDefault();

        if (e.code == "Enter") {
            updateListByText();
        }
    }

    const handleChange = (e) => {
        let value = e.target.value;
        setTextSearch(value);

        if (value.length == 0) {
            updateListByText();
        }
    }

    const handleSubmit = () => {
        updateListByText();
    }

    const updateListByText = () => {
        setArrList(searchFag(textSearch, dataListFags));
    }

    return (
        <>
            <Head>
                <title>Frequently Asked Questions | Free Online Resume and Cover Letter Builder</title>
                <meta
                    name="description"
                    content="Browse through our comprehensive FAQ page to find answers to your queries about our free-to-use, no-registration-needed online resume and cover letter builder. Start crafting your professional narrative today.
                    "
                />
            </Head>
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
                            <div className="form">
                                <InputPage
                                    placeholder="Search by keyword..."
                                    value={textSearch}
                                    onChange={handleChange}
                                    handleKeyUpa={handleKeyUpa}
                                />
                                <button className="form-btn btns btn--blue btn--search btn-search-fag" type="button" onClick={handleSubmit}>
                                    <img loading="lazy" src="/images/page/search-icon.svg" alt="img" />
                                    {
                                        currentResolution !== "xs" && (
                                            "Find a question"
                                        )
                                    }
                                </button>
                            </div>
                            <div className="faq-page__wrapper">
                                <AccordionComponent arr={arrList} />
                            </div>
                            <div className="faq-page__bottom">
                                Didn't find what you're looking for?
                                <Link href={`/${routersPages['contactUs']}`}>You can always contact us.</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}