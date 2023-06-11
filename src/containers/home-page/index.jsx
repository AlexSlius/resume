import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useSelector, useDispatch } from 'react-redux'
import { isArray } from "lodash";
import Head from 'next/head'

import { AccordionComponent } from "../../components/accordion"
import { Partners } from "../../components/partners";
import { MainTitle } from "../../components/mainTitle";
import { UsersCreated } from "../../components/usersCreated";
import { PromoNumbers } from '../../components/promoNumbers';

import { updateActiveResumeNew } from "../../slices/resumeData";
import { getResumesTemplates } from "../../controllers/resumeData"
import { routersPages } from "../../constants/next-routers";

import promoNumbersData from './data/promo-numbers.json';

const arr = [
    {
        title: "Why do I need an online resume builder?",
        text: "<p>An online resume builder is an essential tool for creating professional and compelling resumes. It eliminates the need to start from scratch, thus saving you time and effort. Such a tool guides you in selecting the right format, using suitable language, and avoiding common mistakes. This way, you can focus on tailoring your resume content to match the job requirements. An online resume builder also ensures your skills, experiences, and achievements are presented in the most attractive and readable manner.</p>"
    },
    {
        title: "What are the standout features of this resume builder?",
        text: `
        <p>There are several distinctive features that make this service stand out:</p>
        <p>Task Recommendations: It provides personalized task recommendations based on your past experiences and the role you're targeting. This feature ensures your resume is tailored and relevant.</p>
        <p>Skill Suggestions: This service suggests the most suitable skills for your field. This can help you present yourself as an ideal candidate for the role.</p>
        <p>Career Objectives: It assists you in formulating precise and engaging career objectives that align with your desired role. This can set the tone of your resume.</p>
        <p>Customizable Templates: A variety of professional templates are available for you to choose from. You can select the one that best matches your taste and the job requirements.</p>
        <p>Customizability: You can adjust fonts, colors, and the spacing between lines. This allows you to create a unique resume that remains professional yet showcases your personal style.</p>
        `
    },
    {
        title: "Can I use it for free?",
        text: "<p>Yes, you can use this service for free for a limited period. During this trial period, you can access all the features and benefits offered. After the trial period ends, a subscription will be necessary to continue using the services.</p>"
    },
    {
        title: "Can I customize templates to fit my preferences?",
        text: "<p>Absolutely! The available templates can be fully customized. You can adjust the colors, font sizes, and line spacing to match your personal preferences. This means you can create a resume that is professional and still reflects your individual style.</p>"
    },
];

export const HomePage = () => {
    const dispatch = useDispatch();
    const refIdInterval = useRef(undefined);
    const isStart = useRef(true);
    const [stateCurrentTab, setStateCurrentTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState();
    const [cuNext, setCuNext] = useState(0);

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

    const promoNumbers = promoNumbersData.data;

    const handleClickTab = (tabIndex) => {
        setStateCurrentTab(tabIndex);
    }

    const handleSlider = (e) => {
        let col = e.imagesLoaded;
        let current = e.activeIndex;

        if ((current + 4) > (col + cuNext)) {
            setFetching(true);
        }
    }

    useEffect(() => {
        async function start() {
            if (fetching && resumeData?.list?.count_pages > currentPage) {
                let res = await dispatch(getResumesTemplates({ page: currentPage + 1 }));

                if (res?.payload?.items) {
                    setCurrentPage(prev => prev + 1);
                    setFetching(false);
                    setCuNext(prev => prev + 9);
                }
            }
        }

        start();
        localStorage.setItem('page', 'home-page');
    }, [fetching]);

    useEffect(() => {
        if (isStart.current) {
            setStateCurrentTab(1);
            isStart.current = false;
        }

        if (refIdInterval.current)
            clearTimeout(refIdInterval.current)

        refIdInterval.current = setTimeout(() => {
            setStateCurrentTab(prev => {
                if (prev < 3) {
                    return prev + 1;
                }
                return 1;
            });
        }, 5900);
    }, [stateCurrentTab]);

    return (
        <>
            <Head>
                <title>Premium Online Resume Builder | Create Impressive Resumes Now</title>
                <meta
                    name="description"
                    content="Take a step towards your dream job with our free-to-use online resume builder. Craft impressive, professional resumes without the need for registration. Start your job-winning resume journey today."
                />
            </Head>
            <section className="promo">
                <div className="containers">
                    <div className="promo__wrapper">
                        <div className="promo-offer">
                            <p className="top-text">YOUR DREAM JOB IS NEAR</p>
                            <MainTitle firstText={'Premium'} secondText={'Online'} thirdText={'Resume'} fourthText={'Builder'} />
                            <p className="bottom-text left-arrow">
                                Our professional Resume Builder has helped thousands of job seekers land more interviews and get hired faster.
                            </p>
                            <div className="promo-offer__bottom">
                                <Link href={`${routersPages['resumeBuilderNew']}`} className="promo-offer__btn btns btn--blue">
                                    Create My Resume
                                </Link>
                                <UsersCreated data={usersCreated} />
                            </div>
                        </div>
                        <div className="promo-img">
                            <img src="/images/page/promo-img.svg" alt="img" />
                        </div>
                    </div>
                    <div className="promo-num">
                        {
                            promoNumbers ?
                                (
                                    promoNumbers.map(({ count, firstText, secondText, image, percent }, index) => (
                                        <PromoNumbers key={`promoNumber-${index}`} count={count} firstText={firstText} secondText={secondText} image={image} percent={percent} />
                                    ))
                                ) :
                                null
                        }
                    </div>
                </div>
            </section>
            <div className="offer-sec mt-130">
                <div className="containers">
                    <div className="offer-sec_flex">
                        <div className="promo-offer">
                            <p className="top-text">SECURE YOUR DREAM JOB</p>
                            <h2 className="h2">
                                Create your professional story in minutes. Take advantage of our cover letter creator.
                            </h2>
                            <p className="bottom-text">
                                Unlock Your Potential with Our Automated Cover Letter Creator: Designed to craft tailored cover letters within minutes, our cutting-edge tool helps you stand out in any job market. Leverage our unique, game-changing features for your career advancement.
                            </p>
                            <Link href={`${routersPages['coverLetterNew']}`} className="offer-sec__btn btns btn--grey">
                                <img src="images/page/edit.svg" alt="img" />
                                Create Cover Letter
                            </Link>
                        </div>
                        <div className="offer-sec__img">
                            <img loading="lazy" src="images/page/section-img1.svg" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
            <section className="tabs mt-130">
                <img className="sec-bg" loading="lazy" src="/images/page/tabs-bg.png" alt="img" />
                <div className="containers">
                    <div className="tabs__top">
                        <h2 className="text-center h2">
                            Create perfect resumes for the modern job market
                        </h2>
                        <p className="bottom-text text-center">
                            In three simple steps, create the perfect document to impress hiring managers
                            and employers. Minimum time, maximum professional quality.
                        </p>
                        <Link href={`${routersPages['resumeBuilderNew']}`} className="tabs__top--btn btns btn--blue">
                            Create My Resume
                        </Link>
                    </div>
                    <div className="tabs-wrapper tab-content-wrapper">
                        {
                            stateCurrentTab == 1 && (
                                <div className="tabs-content tab-1">
                                    <img loading="lazy" src="/images/page/section-img2.svg" alt="img" />
                                    <div>
                                        <h3 className="h3">Your First Step</h3>
                                        <p className="bottom-text">
                                            Discover the Premium Difference with Our Resume Builder. We invite you to experience the superior quality of our services without registration or payment. Step into the future of resume creation, empowering your career journey with confidence and trust.
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                        {
                            stateCurrentTab == 2 && (
                                <div className="tabs-content  tab-2">
                                    <img loading="lazy" src="/images/page/section-img3.svg" alt="img" />
                                    <div>
                                        <h3 className="h3">Achieve Beauty With Ease</h3>
                                        <p className="bottom-text">
                                            Opt for our eye-catching, professionally crafted resume or cover letter templates. Simply fill in your details, select and refine the relevant sections, and tweak the design and visuals to your liking. With our pre-written tasks, skills, and career objectives at your disposal, creating a standout resume is just a matter of minutes.
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                        {
                            stateCurrentTab == 3 && (
                                <div className="tabs-content  tab-3">
                                    <img loading="lazy" src="/images/page/section-img4.svg" alt="img" />
                                    <div>
                                        <h3 className="h3">Now It’s Yours!</h3>
                                        <p className="bottom-text">
                                            Take advantage of our flexible export options. Choose PDF for optimal and consistent visual formatting, or obtain a unique URL to your resume for easy updates. Our goal is to make your resume sharing and updating process as streamlined as possible.
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="tabs-wrapper tab-link-wrapper">
                        <div
                            className={`tab ${stateCurrentTab == 1 ? "tab-active" : ''}`}
                            onClick={() => handleClickTab(1)}
                        >
                            <p>1. Easy Start</p>
                            <img loading="lazy" src="/images/page/section-img2.svg" alt="img" />
                            <div className="progress">
                                <span></span>
                            </div>
                        </div>
                        <div
                            className={`tab ${stateCurrentTab == 2 ? "tab-active" : ''}`}
                            onClick={() => handleClickTab(2)}
                        >
                            <p>2. Create</p>
                            <img loading="lazy" src="/images/page/section-img3.svg" alt="img" />
                            <div className="progress">
                                <span></span>
                            </div>
                        </div>
                        <div
                            className={`tab ${stateCurrentTab == 3 ? "tab-active" : ''}`}
                            onClick={() => handleClickTab(3)}
                        >
                            <p>3. Download</p>
                            <img loading="lazy" src="/images/page/section-img4.svg" alt="img" />
                            <div className="progress">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="advantages mt-130">
                <div className="containers">
                    <h2 className="h2">
                        Features designed to help you win your <span><span className="border"></span>dream job</span>
                    </h2>
                    <div className="advantages__wrapper">
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img.png" alt="img" />
                            <div>
                                <h4>Easy, free, premium</h4>
                                <p>Kickstart your journey with us at no cost, with absolutely no registration required.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img2.png" alt="img" />
                            <div>
                                <h4>Spelling matter</h4>
                                <p>We safeguard your resume against text errors, enhancing your professional image.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img3.png" alt="img" />
                            <div>
                                <h4>Your data is safe</h4>
                                <p>Your data is sacred; we assure it remains unshared.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img4.png" alt="img" />
                            <div>
                                <h4>Premium recommendations</h4>
                                <p>Choose our role-specific premium recommendations, no writing required.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img5.png" alt="img" />
                            <div>
                                <h4>Cover letters</h4>
                                <p>Explore our free, perfectly matching resume and cover letter templates.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img6.png" alt="img" />
                            <div>
                                <h4>Convenient format options</h4>
                                <p>Choose PDF or share a direct URL for maximum convenience.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="document mt-130">
                <img className="sec-bg" loading="lazy" src="/images/page/document-bg.png" alt="img" />
                <div className="containers">
                    <h2 className="text-center h2">Select from our top resume templates</h2>
                    <div className="document__wrapper">
                        <Swiper
                            className="document-swiper"
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={3}
                            loopedSlides={4}
                            speed={1000}
                            pagination={{
                                clickable: true
                            }}
                            navigation
                            breakpoints={{
                                200: {
                                    slidesPerView: 1
                                },
                                560: {
                                    slidesPerView: 2
                                },
                                820: {
                                    slidesPerView: 3
                                }
                            }}
                            onSlideChange={(e) => handleSlider(e)}
                        >
                            {
                                isArray(resumeData?.list?.items) && resumeData.list.items.map((itemResume, index) => (
                                    <SwiperSlide key={index} onClick={() => dispatch(updateActiveResumeNew({ slug: itemResume.slug, id: itemResume.id }))}>
                                        <Link href={`/${routersPages['resumeBuilderNew']}`} className="document__link_before"></Link>
                                        <div className="doc-img">
                                            <img loading="lazy" src={itemResume.image} alt={itemResume.name} />
                                        </div>
                                        <div className="doc-btn"  >
                                            <Link href={`/${routersPages['resumeBuilderNew']}`} className="document__btn btns btn--blue">Use this template</Link>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </section>

            <section className="faq mt-130">
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
                            <AccordionComponent arr={arr} defaultStart="0" />
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
            </section>

            <section className="partners mt-130">
                <div className="containers">
                    <h2 className="h2">
                        Our customers get hired by top companies
                    </h2>
                    <Partners />
                </div>
            </section>
        </>
    )
}