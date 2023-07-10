import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useSelector, useDispatch } from 'react-redux'
import { isArray } from "lodash";
import Head from 'next/head'

// components
import { AccordionComponent } from "../../components/accordion"
import { Partners } from "../../components/partners";
import { SectionPromo } from "../../components/sectionPromo";

import { updateActiveResumeNew } from "../../slices/resumeData";
import { getResumesTemplates } from "../../controllers/resumeData"
import { routersPages } from "../../constants/next-routers";

// data page
import promoNumbersData from './data/promo-numbers.json';
import arrAccordion from "./data/data-accordion.json";


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
    const isMob = ['md', 'sm', 'xs'].includes(currentResolution);

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
            />

            <section className="offer-sec mt-130">
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
            </section>
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
                        <div className={`tabs-content tab-1  ${(stateCurrentTab == 1) ? "" : "hide"}`}>
                            <img loading="lazy" src="/images/page/section-img2.svg" alt="img" />
                            <div>
                                <h3 className="h3">Your First Step</h3>
                                <p className="bottom-text">
                                    Discover the Premium Difference with Our Resume Builder. We invite you to experience the superior quality of our services without registration or payment. Step into the future of resume creation, empowering your career journey with confidence and trust.
                                </p>
                            </div>
                        </div>
                        <div className={`tabs-content  tab-2 ${(stateCurrentTab == 2) ? "" : "hide"}`}>
                            <img loading="lazy" src="/images/page/section-img3.svg" alt="img" />
                            <div>
                                <h3 className="h3">Achieve Beauty With Ease</h3>
                                <p className="bottom-text">
                                    Opt for our eye-catching, professionally crafted resume or cover letter templates. Simply fill in your details, select and refine the relevant sections, and tweak the design and visuals to your liking. With our pre-written tasks, skills, and career objectives at your disposal, creating a standout resume is just a matter of minutes.
                                </p>
                            </div>
                        </div>
                        <div className={`tabs-content  tab-3 ${(stateCurrentTab == 3) ? "" : "hide"}`}>
                            <img loading="lazy" src="/images/page/section-img4.svg" alt="img" />
                            <div>
                                <h3 className="h3">Now It’s Yours!</h3>
                                <p className="bottom-text">
                                    Take advantage of our flexible export options. Choose PDF for optimal and consistent visual formatting, or obtain a unique URL to your resume for easy updates. Our goal is to make your resume sharing and updating process as streamlined as possible.
                                </p>
                            </div>
                        </div>
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