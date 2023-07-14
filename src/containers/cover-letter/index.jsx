import Link from "next/link";
import { useEffect } from "react";
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'


// Components
import { MainTitle } from "../../components/mainTitle";
import { AccordionComponent } from "../../components/accordion";
import { ImageSprite } from "../../components/imageSprite";
import { PromoNumbers } from '../../components/promoNumbers';

import { SureItem } from '../../components/sureItem';
import { SectionPromo } from "../../components/sectionPromo";
import { UsersCreated } from "../../components/usersCreated";
import { SectionCustomers } from "../../components/customers";
import { SectionGetYou } from "../../components/sectionGetYou";
import { SectionFag } from "../../components/sectionFag";
import { SectionForFree } from "../../components/sectionForFree";
import { SectionReviews } from "../../components/sectionReviews";
import { SectionPrivacyOfYou } from "../../components/sectionPrivacyOfYou";
import { SectionSelectTemplates } from "../../components/sectionSelectTeplates";

// Libraries
import { updateActiveCoverNew } from "../../slices/cover/coverData";

// Constants
import { routersPages } from "../../constants/next-routers";

// Data
import promoNumbersData from './data/promo-numbers.json';
import advantagesData from './data/advantages.json';
import sureData from './data/sure.json';
import faqData from './data/faq.json';
import reviewsObjData from "./data/data-reviews.json";
import { SectionOfferAdvantage } from "../../components/sectionAdvantage";
import { SectionResumeAndCover } from "../../components/sectionResumeAndCover";
import { SectionAutCreateCover } from "../../components/sectionAutomaticCreateCover";


export const CoverLatter = () => {
    const dispatch = useDispatch();
    const promoNumbers = promoNumbersData.data;
    const advantages = advantagesData.data;
    const sureItems = sureData.data;
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

    useEffect(() => {
        localStorage.setItem('page', 'cover-letter');
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
            />
            <SectionPrivacyOfYou
                title="Privacy of your information"
                des="Protecting your privacy is our top priority.
            This Privacy Policy outlines the types of personal information we collect, how we use and protect that information, and your rights and choices regarding your personal data."
            />
            <SectionReviews
                title="Reviews"
                data={reviewsObjData}
                isMob={isMob}
            />
            <SectionGetYou
                linkBtn={`${routersPages['coverLetterNew']}`}
                title="Get your 7-day trial"
                des="Don’t want to commit just yet?
                Take us for a test drive for 7 days and explore how the resume and cover letter builder work together to create the best application for a job."
                textBtn="Create Cover Letter"
                isMob={isMob}
                pageCover={true}
            />
            <SectionCustomers />
            <SectionFag
                dataArrAccordion={faq}
                title="Frequently<br/> Asked Questions"
            />
            <SectionForFree
                isMob={isMob}
                title="Get started for free"
                des="We provide a credit card-free 7-day trial period "
                link={`/${routersPages['coverLetterNew']}`}
                btnText="Create Cover Letter"
                pageCover={true}
            />
        </>
    )
}