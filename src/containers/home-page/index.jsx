import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'

// components
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
import { SectionGetYou } from "../../components/sectionGetYou";
import { SectionFag } from "../../components/sectionFag";
import { SectionForFree } from "../../components/sectionForFree";
import { ModalTemplate } from "../../components/modals/modaltemplate";

import { getResumesTemplates } from "../../controllers/resumeData";
import { updateActiveResumeNew } from "../../slices/resumeData";
import { routersPages } from "../../constants/next-routers";

// data page
import promoNumbersData from './data/promo-numbers.json';
import reviewsObjData from "./data/data-reviews.json";
import arrAccordion from "./data/data-accordion.json";
import dataCostomers from "./data/data-costomers.json";
import { getAllPageHome } from "../../controllers/pages/pagesHome";


export const HomePage = () => {
    const dispatch = useDispatch();
    const [modalTem, setModalTem] = useState({
        status: false,
        data: null
    });

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

    const handleCloseModalTemplate = () => {
        setModalTem({
            status: false,
            data: null
        });
    }

    const handlePreview = (data) => {
        setModalTem({
            status: true,
            data
        });
    }

    useEffect(() => {
        localStorage.setItem('page', 'home-page');
        dispatch(getResumesTemplates({ page: 1, category: "" }));
        dispatch(getAllPageHome());
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
                arrImg={['/images/page/item-resum-1.png', '/images/page/item-resum-2.png', '/images/page/item-resum-3.png', '/images/page/item-resum-4.png', '/images/page/item-resum-5.png', '/images/page/item-resum-6.png']}
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
                handlePreview={handlePreview}
            />
            <SectionPrivacyOfYou
                title="We protect your privacy"
                des="We employ stringent security measures like encryption and two-factor authentication to protect your data. Compliant with GDPR, our transparent privacy policy clarifies our data handling. We don't sell your personal information or share it. You can manage and delete your data at any time. At Resulon, your trust and privacy are our topmost commitment"
            />
            <SectionCustomers
                title="Our customers <br/> get hired by top companies"
                data={dataCostomers}
            />
            <SectionGetYou
                title="Get your 7-day trial"
                des="Don’t want to commit just yet?
                Take us for a test drive for 7 days and explore how the resume and cover letter builder work together to create the best application for a job."
                linkBtn={`${routersPages['resumeBuilderNew']}`}
                textBtn="Create My Resume"
                isMob={isMob}
            />
            <SectionFag
                dataArrAccordion={arrAccordion}
                title="Frequently<br /> Asked Questions"
            />
            <SectionForFree
                isMob={isMob}
                title="Get started for free"
                des="Let us help you build an excellent resume for any job. Our team of highly experienced HR professionals verified every template to improve your chances, don’t miss them."
                link={`/${routersPages['resumeBuilderNew']}`}
                btnText="Create My Resume"
            />
            <ModalTemplate
                visible={modalTem.status}
                item={modalTem.data}
                onClose={handleCloseModalTemplate}
                hrefLink={routersPages['resumeBuilderNew']}
                handleLink={(val) => dispatch(updateActiveResumeNew(val))}
            />
        </>
    )
}