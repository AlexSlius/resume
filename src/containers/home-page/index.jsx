import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'

// components
import { AccordionComponent } from "../../components/accordion"
import { SectionPromo } from "../../components/sectionPromo";
import { SectionCtepsCeating } from "../../components/sectionCtepsCeating";
import { SectionAdvantages } from "../../components/sectionAdvantages";
import { PerfectTemplate } from "../../components/perfectTemplate";
import { SectionLetAi } from "../../components/sectionLetAi";
import { ProfessionalStory } from "../../components/professionalStory";
import { SectionReviews } from "../../components/sectionReviews";
import { SectionRelevant } from "../../components/relevant";
import { SectionSelectTemplates } from "../../components/sectionSelectTeplates";
import { SectionPrivacyOfYou } from "../../components/sectionPrivacyOfYou";
import { SectionCustomers } from "../../components/customers";

import { updateActiveResumeNew } from "../../slices/resumeData";
import { routersPages } from "../../constants/next-routers";

// data page
import promoNumbersData from './data/promo-numbers.json';
import reviewsObjData from "./data/data-reviews.json";
import arrAccordion from "./data/data-accordion.json";


export const HomePage = () => {
    const dispatch = useDispatch();

    const {
        pages: {
            home: {
                usersCreated,
            }
        },
        theme: {
            currentResolution
        },
        resumeData,
    } = useSelector((state) => state);
    const isMob = ['sm', 'xs'].includes(currentResolution);

    const promoNumbers = promoNumbersData.data;

    const handlePerfectTemplate = () => {
        dispatch(updateActiveResumeNew({ slug: "041-CV", id: 41 }));
    }

    useEffect(() => {
        localStorage.setItem('page', 'home-page');
    }, []);

    return (
        <>
            <Head>
                <title>Premium Online Resume Builder | Create Impressive Resumes Now</title>
                <meta
                    name="description"
                    content="Take a step towards your dream job with our free-to-use online resume builder. Craft impressive, professional resumes without the need for registration. Start your job-winning resume journey today."
                />
            </Head>
            <SectionPromo
                topTitle="YOUR DREAM JOB IS NEAR"
                mainTitle="Premium Online Resume Builder"
                textBtn="Create My Resume"
                linkBtn={`${routersPages['resumeBuilderNew']}`}
                desc=" Our professional Resume Builder has helped thousands of job seekers land more interviews and get hired faster."
                promoNumbers={promoNumbers}
                imgRight="/images/page/resumes_3x.webp"
                users={usersCreated}
                isMob={isMob}
                arrImg={['/images/page/item-resum-one.png', '/images/page/item-resum-one.png', '/images/page/item-resum-one.png', '/images/page/item-resum-one.png']}
            />
            <SectionCtepsCeating
                linkBtn={`${routersPages['resumeBuilderNew']}`}
                textBtn='Create My Resume'
                title="Create perfect resumes for the modern job market"
                desc="In three simple steps, create the perfect document to impress hiring managers and employers. Minimum time, maximum professional quality."
                isMob={isMob}
            />
            <SectionAdvantages />
            <PerfectTemplate
                link={`/${routersPages['resumeBuilderNew']}`}
                nandlePrev={handlePerfectTemplate}
            />
            <SectionLetAi
                btnText="Create My Resume"
                link={`/${routersPages['resumeBuilderNew']}`}
            />
            <ProfessionalStory
                textBtn="Create Cover Letter"
                linkBtn={`/${routersPages['coverLetterNew']}`}
            />
            <SectionReviews
                title="Reviews"
                data={reviewsObjData}
                isMob={isMob}
            />
            <SectionRelevant />
            <SectionSelectTemplates
                title="Select from our<br/> top resume templates"
                data={resumeData?.list?.items || []}
                linkAll={`/${routersPages['jobWinningResumeTemplates']}`}
                linkTemplateNew={`/${routersPages['resumeBuilderNew']}`}
                handleLink={(itemResume) => dispatch(updateActiveResumeNew({ slug: itemResume.slug, id: itemResume.id }))}
            />
            <SectionPrivacyOfYou
                title="Privacy of your information"
                des="Protecting your privacy is our top priority.
            This Privacy Policy outlines the types of personal information we collect, how we use and protect that information, and your rights and choices regarding your personal data."
            />
            <SectionCustomers />

            {/* <section className="faq mt-130">
                <div className="containers">
                    <div className="faq-flex">
                        <div className="faq__left">
                            <h2 className="h2">
                                FAQ: <br />
                                Resume Builders
                            </h2>
                            <p className="bottom-text">
                                Have questions? We’re here to help.
                            </p>
                            {
                                !['sm', 'xs'].includes(currentResolution) && (
                                    <div className="faq__left--bottom">
                                        Didn't find what you're looking for?
                                        <Link href={`/${routersPages['contactUs']}`}>You can always contact us.</Link>
                                    </div>
                                )
                            }
                        </div>
                        <div className="faq__right">
                            <AccordionComponent arr={arrAccordion} defaultStart="0" />
                        </div>

                        {
                            ['sm', 'xs'].includes(currentResolution) && (
                                <div className="faq__left--bottom">
                                    Didn't find what you're looking for?
                                    <Link href={`/${routersPages['contactUs']}`}>You can always contact us.</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section> */}
            {/* <section className="partners mt-130">
                <div className="containers">
                    <h2 className="h2">
                        Our customers get hired by top companies
                    </h2>
                    <Partners />
                </div>
            </section> */}
        </>
    )
}