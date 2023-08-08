import { useEffect, useState } from "react";
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'


// Components
import { SectionPromo } from "../../components/sectionPromo";
import { SectionCustomers } from "../../components/customers";
import { SectionGetYou } from "../../components/sectionGetYou";
import { SectionFag } from "../../components/sectionFag";
import { SectionForFree } from "../../components/sectionForFree";
import { SectionReviews } from "../../components/sectionReviews";
import { SectionPrivacyOfYou } from "../../components/sectionPrivacyOfYou";
import { SectionSelectTemplates } from "../../components/sectionSelectTeplates";
import { ModalTemplate } from "../../components/modals/modaltemplate";
import { SectionOfferAdvantage } from "../../components/sectionAdvantage";
import { SectionResumeAndCover } from "../../components/sectionResumeAndCover";
import { SectionAutCreateCover } from "../../components/sectionAutomaticCreateCover";


// Libraries
import { updateActiveCoverNew } from "../../slices/cover/coverData";
import { getCoverTemplates } from "../../controllers/cover/coverData";
import { getAllPageCoverLetter } from "../../controllers/pages/pagesCoverLetters";

// Constants
import { routersPages } from "../../constants/next-routers";

// Data
import promoNumbersData from './data/promo-numbers.json';
import advantagesData from './data/advantages.json';
import faqData from './data/faq.json';
import reviewsObjData from "./data/data-reviews.json";
import dataCostomers from "../../dataPages/data-costomers.json";


export const CoverLatter = () => {
    const dispatch = useDispatch();
    const [modalTem, setModalTem] = useState({
        status: false,
        data: null
    });
    const promoNumbers = promoNumbersData.data;
    const advantages = advantagesData.data;
    const faq = faqData.data;

    const {
        pages: {
            coverLetter: {
                usersCreated,
            }
        },
        theme: {
            currentResolution
        },
        coverData,
    } = useSelector((state) => state);
    const isMob = ['sm', 'xs'].includes(currentResolution);

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
        localStorage.setItem('page', 'cover-letter');
        dispatch(getCoverTemplates({ page: 1, category: "" }));
        dispatch(getAllPageCoverLetter());
    }, []);

    return (
        <>
            <Head>
                <title>Online Cover Letter Builder | Powerful Letters No Sign-Up</title>
                <meta
                    name="description"
                    content="Discover how to make a mark with our free online cover letter builder. Design compelling motivational letters tailored to your career aspirations without registration. Begin your journey towards a successful application today."
                />
            </Head>
            <SectionPromo
                topTitle="STAND OUT FROM THE CROUD"
                mainTitle="Build Your Cover Letter Easily"
                textBtn="Create Cover Letter"
                linkBtn={`${routersPages['coverLetterNew']}`}
                desc="Don't spend precious time writing Cover Letters, we can do it for you exceptionally well"
                promoNumbers={promoNumbers}
                imgRight="/images/page/cover_3x.webp"
                users={usersCreated}
                isMob={isMob}
                coverPage={true}
                arrImg={['/images/page/item-resum-1.png', '/images/page/item-resum-2.png', '/images/page/item-resum-3.png', '/images/page/item-resum-4.png', '/images/page/item-resum-5.png', '/images/page/item-resum-6.png']}
            />
            <SectionAutCreateCover
                link={`${routersPages['coverLetterNew']}`}
            />
            <SectionResumeAndCover />
            <SectionOfferAdvantage
                advantages={advantages}
            />
            <SectionSelectTemplates
                title="Choose one of our professionally made templates"
                data={coverData?.list?.items || []}
                linkAll={`/${routersPages['pageCoverLeterTemplates']}`}
                linkTemplateNew={`/${routersPages['coverLetterNew']}`}
                handleLink={(itemResume) => dispatch(updateActiveCoverNew({ slug: itemResume.slug, id: itemResume.id }))}
                handlePreview={handlePreview}
            />
            <SectionPrivacyOfYou
                title="We protect your privacy"
                des="We employ stringent security measures like encryption and two-factor authentication to protect your data. Compliant with GDPR, our transparent privacy policy clarifies our data handling. We don't sell your personal information or share it. You can manage and delete your data at any time. At Resulon, your trust and privacy are our topmost commitment"
            />
            <SectionReviews
                title="Reviews"
                data={reviewsObjData}
                isMob={isMob}
            />
            <SectionGetYou
                linkBtn={`${routersPages['coverLetterNew']}`}
                title="Free trial for everyone"
                des="Not quite ready to fully commit? Feel free to take advantage of our 7-day trial. During this period, you can explore how our resume and cover letter builder collaborate seamlessly to craft the most optimal job application."
                textBtn="Create Cover Letter"
                isMob={isMob}
                pageCover={true}
            />
            <SectionCustomers
                title="Our customers <br/> get hired by top companies"
                data={dataCostomers}
            />
            <SectionFag
                dataArrAccordion={faq}
                title="Frequently<br/> Asked Questions"
            />
            <SectionForFree
                isMob={isMob}
                title="Start for free"
                des="Don’t pay to try, just use it for whole 7 days for zero dollars."
                link={`/${routersPages['coverLetterNew']}`}
                btnText="Create Cover Letter"
                pageCover={true}
            />
            <ModalTemplate
                visible={modalTem.status}
                item={modalTem.data}
                onClose={handleCloseModalTemplate}
                hrefLink={routersPages['coverLetterNew']}
                handleLink={(val) => dispatch(updateActiveCoverNew(val))}
            />
        </>
    )
}