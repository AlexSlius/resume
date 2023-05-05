import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateActiveCoverNew } from "../../slices/cover/coverData";

// Libraries
import { isArray } from "lodash";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Components
import { MainTitle } from "../../components/mainTitle";
import { Partners } from "../../components/partners";
import { AccordionComponent } from "../../components/accordion";
import { ImageSprite } from "../../components/imageSprite";
import { PromoNumbers } from '../../components/promoNumbers';
import { AdvantagesItem } from '../../components/advantagesItem';
import { SureItem } from '../../components/sureItem';
import { UsersCreated } from "../../components/usersCreated";

// Constants
import { routersPages } from "../../constants/next-routers";

// Data
import { getCoverTemplates } from "../../controllers/cover/coverData";
import promoNumbersData from './data/promo-numbers.json';
import advantagesData from './data/advantages.json';
import sureData from './data/sure.json';
import faqData from './data/faq.json';


export const CoverLatter = () => {
    const dispatch = useDispatch();
    const refIdInterval = React.useRef(undefined);
    const isStart = React.useRef(true);
    const [stateCurrentTab, setStateCurrentTab] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [fetching, setFetching] = React.useState();
    const [cuNext, setCuNext] = React.useState(0);

    const promoNumbers = promoNumbersData.data;
    const advantages = advantagesData.data;
    const sureItems = sureData.data;
    const faq = faqData.data;

    const {
        auth: {
            autorizate: {
                isAthorized,
            }
        },
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

    React.useEffect(() => {
        async function start() {
            if (fetching && coverData?.list?.count_pages > currentPage) {
                let res = await dispatch(getCoverTemplates({ page: currentPage + 1 }));

                if (res?.payload?.items) {
                    setCurrentPage(prev => prev + 1);
                    setFetching(false);
                    setCuNext(prev => prev + 9);
                }
            }
        }

        start();
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
        localStorage.setItem('page', 'cover-letter');
    }, [stateCurrentTab]);

    return (
        <section className="cover-letter">
            <section className="promo">
                <div className="containers">
                    <div className="promo__wrapper">
                        <div className="promo-offer">
                            <p className="top-text">ONLINE COVER LETTER BUILDER</p>
                            <MainTitle firstText={'Build Your'} secondText={'Cover'} thirdText={'Letter'} fourthText={'Online'} />
                            <p className="bottom-text left-arrow">
                                Our professional Cover Letter Builder has helped thousands
                                of job seekers land more interviews and get hired faster.
                            </p>
                            <div className="promo-offer__bottom">
                                <Link href={`${routersPages['coverLetterNew']}`} className="promo-offer__btn btns btn--blue">
                                    Create Cover Letter
                                </Link>
                                <UsersCreated data={usersCreated} />
                            </div>
                        </div>
                        <div className="promo-img">
                            <img src="/images/page/promo-cover-img.svg" alt="img" />
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

            <Partners />

            <section className="offer-sec">
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

                            <ul className="advantage-list">
                                {
                                    advantages.map(({ image, width, height, title, text }, index) => (
                                        <AdvantagesItem key={`advantage-${index}`} image={image} width={width} height={height} title={title} text={text} />
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="tabs mt-130">
                <div className="containers">
                    <div className="background">
                        <ImageSprite iconName={'documents-background'} width={'1920px'} height={'797px'} />
                    </div>
                    <div className="tabs__top">
                        <h2 className="text-center h2">
                            Three easy steps to a professional cover letter
                        </h2>
                        <p className="bottom-text text-center">
                            In three simple steps, create the perfect document to impress hiring managers
                            and  employers. Minimum time, maximum professional quality.
                        </p>
                        <Link href={`${routersPages['coverLetterNew']}`} className="tabs__top--btn btns btn--blue">
                            Create Cover Letter
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

            <section className="sure-block">
                <div className="containers">
                    <h2 className="text-center h2">
                        Still not sure? See how others feel
                        about our cover letter builder:
                    </h2>

                    <ul className="sure-list">
                        {
                            sureItems.map(({ image, name, text }, index) => (
                                <SureItem key={`sire-item-${index}`} photo={image} name={name} text={text} />
                            ))
                        }
                    </ul>
                </div>
            </section>

            <section className="document">
                <div className="background">
                    <ImageSprite iconName={'documents-background'} width={'1920px'} height={'797px'} />
                </div>
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
                                isArray(coverData?.list?.items) && coverData.list.items.map((itemResume, index) => (
                                    <SwiperSlide key={index} onClick={() => dispatch(updateActiveCoverNew({ slug: itemResume.slug, id: itemResume.id }))}>
                                        <Link href={`/${routersPages['coverLetterNew']}`} className="document__link_before"></Link>
                                        <div className="doc-img">
                                            <img loading="lazy" src={itemResume.image} alt={itemResume.name} />
                                        </div>
                                        <div className="doc-btn" >
                                            <Link href={`/${routersPages['coverLetterNew']}`} className="document__btn btns btn--blue">Use this template</Link>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </section>

            <section className="faq">
                <div className="containers">
                    <div className="faq-flex-c">
                        <h2 className="h2">
                            FAQ: Cover letters
                        </h2>
                        <AccordionComponent arr={faq} defaultStart="0" />
                        <div className="faq-bottom-text">
                            Didn't find what you're looking for?
                            {
                                ['xs'].includes(currentResolution) ?
                                    (
                                        <Link href={`/${routersPages['contactUs']}`}>Use our FAQ</Link>
                                    ) :
                                    (
                                        <Link href={`/${routersPages['contactUs']}`}>You can always contact us.</Link>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}