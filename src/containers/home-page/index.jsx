import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useSelector, useDispatch } from 'react-redux'
import { isArray } from "lodash";

import { routersPages } from "../../constants/next-routers";
import { AccordionComponent } from "../../components/accordion"
import { Partners } from "../../components/partners";

import { updateActiveResumeNew } from "../../slices/resumeData";
import { getResumesTemplates } from "../../controllers/resumeData"

const arr = [
    {
        title: "What is a resume builder?",
        text: "<p>A resume builder is an online tool that allows users to quickly and easily upload their resume or build a brand new one from scratch using templates that offer a variety of options to fit the job requirements. With ResumeHelp’s resume builder you get access to a wide variety of template options with the ability to customize each template to your specific industry.</p>"
    },
    {
        title: "What should a resume include?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "Are there different types of resumes?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
    {
        title: "Should I include a cover letter with my resume?",
        text: "<p>Yes, you can upgrade, downgrade or cancel your plan at any time.</p> <p>Do it yourself in your account or contact us, we are here to help.</p>"
    },
];

export const HomePage = () => {
    const dispatch = useDispatch();
    const refIdInterval = useRef(undefined);
    const isStart = useRef(true);
    const [stateCurrentTab, setStateCurrentTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(2);
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
            <section className="promo">
                <div className="containers">
                    <div className="promo__wrapper">
                        <div className="promo-offer">
                            <p className="top-text">ONLINE RESUME BUILDER</p>
                            <h1 className="h1">
                                The Best <span className="icon-right-top">Online</span><br />
                                Resume <span className="cursor"><span className="border"></span>Builder</span>
                            </h1>
                            <p className="bottom-text left-arrow">
                                Our professional Resume Builder has helped thousands
                                of job seekers land more interviews and get hired faster.
                            </p>
                            <div className="promo-offer__bottom">
                                <Link href={`${routersPages['resumeBuilderNew']}`} className="promo-offer__btn btns btn--blue">
                                    Create My Resume
                                </Link>
                                <div className="user-icons">
                                    {
                                        isArray(usersCreated?.users) && (
                                            <div>
                                                {
                                                    usersCreated.users.map((itemUser, index) => (
                                                        <div key={index} >
                                                            <img src={itemUser} alt={`users ${index}`} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                    <p>
                                        {`${usersCreated?.count || "243"} users created
                                        resumes today`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="promo-img">
                            <img src="/images/page/promo-img.svg" alt="img" />
                        </div>
                    </div>
                    <div className="promo-num">
                        <div className="promo-num-item">
                            <h2>4,9</h2>
                            <img src="/images/page/stars.svg" alt="img" />
                            <p>3,656 ratings</p>
                        </div>
                        <div className="promo-num-item">
                            <h2>75 <span>%</span></h2>
                            <p>higher chance <br />
                                of getting hired</p>
                        </div>
                        <div className="promo-num-item">
                            <h2>24</h2>
                            <p>days is needed on <br />
                                average to get a job</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="offer-sec mt-130">
                <div className="containers">
                    <div className="offer-sec_flex">
                        <div className="promo-offer">
                            <p className="top-text">SECURE YOUR DREAM JOB</p>
                            <h2 className="h2">
                                Create your professional story
                                in minutes. Take advantage
                                of our
                                cover letter creator.
                            </h2>
                            <p className="bottom-text">
                                Our cover letter maker allows you to write amazing professional pitches in minutes rather
                                than
                                hours. No more
                                writer’s block, no more searching for the convincing phrases or agonizing over formatting.
                                Be
                                persuasive without
                                effort!
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
                                        <h3 className="h3">Your First Steps</h3>
                                        <p className="bottom-text">
                                            In three simple steps, create the perfect document to impress hiring managers
                                            and employers. Minimum time, maximum professional quality.
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
                                            Choose one of our beautiful, professionally designed resume or cover letter formats.
                                            Add
                                            your personal info and
                                            choose and edit the necessary sections. Customize the layout and visuals as much (or
                                            as
                                            little) as you want. We
                                            provide a ton of ready content!
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
                                            Export in one of the available formats. PDF will
                                            provide you with the best and most consistent visual formatting. Word files allow
                                            you to
                                            edit the document
                                            further or submit the resume to an online application system. You can also share
                                            your
                                            career updates online.
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
                            <p>1. Sign Up</p>
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
                                <h4>Easy online resume builder</h4>
                                <p>Create a resume, cover letter or online profile without leaving your browser.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img2.png" alt="img" />
                            <div>
                                <h4>Automatic spell-checker</h4>
                                <p>Built-in spell checker corrects grammar. Create a resume without errors.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img3.png" alt="img" />
                            <div>
                                <h4>Your data is safe</h4>
                                <p>Your data is kept private and protected by strong 256-bit encryption.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img4.png" alt="img" />
                            <div>
                                <h4>Interview school</h4>
                                <p>Get feedback, tips, and improve your interviewing skills with our tools</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img5.png" alt="img" />
                            <div>
                                <h4>Cover letters</h4>
                                <p>Our cover letter builder works with the same ease as the resume builder.</p>
                            </div>
                        </div>
                        <div className="advantages-item">
                            <img loading="lazy" src="/images/page/features-img6.png" alt="img" />
                            <div>
                                <h4>Multi-format resume options</h4>
                                <p>Save your resume in any format, including Microsoft Word and PDF.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="document mt-130">
                <img className="sec-bg" loading="lazy" src="/images/page/document-bg.png" alt="img" />
                <div className="containers">
                    <h2 className="text-center h2">
                        Reference professional resume examples in your industry
                    </h2>
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
            </section >

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