import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { useState, useEffect } from 'react';

import { CardReviews } from '../cardReviews';

export const SectionReviews = ({
    title,
    data,
    isMob,
}) => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    return (
        <section className="revs mt-180">
            <div className="containers">
                <div className="revs__h">
                    <h2 className="h2 font-600 max-t-570">{title}</h2>
                    <div className="ratgs">
                        <div className="ratgs__n">4,9</div>
                        <div className="ratgs_r">
                            <img src="/images/page/stars.svg" alt="icon stars" />
                            <div>Based on reviews: 3,656</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="revs__main">
                {
                    !isMob && (
                        <>
                            <div className="revs-slider revs-slider-left">
                                {
                                    domLoaded && (
                                        <Swiper
                                            modules={[Autoplay]}
                                            spaceBetween={30}
                                            slidesPerView={4}
                                            loop={true}
                                            autoplay={{
                                                delay: 0,
                                                disableOnInteraction: false
                                            }}
                                            speed={16000}
                                            allowTouchMove={false}
                                            breakpoints={{
                                                200: {
                                                    slidesPerView: 1
                                                },
                                                700: {
                                                    slidesPerView: 2
                                                },
                                                1100: {
                                                    slidesPerView: 3
                                                },
                                                1560: {
                                                    slidesPerView: 4
                                                }
                                            }}
                                        >
                                            {
                                                data?.one && data.one.map((item, index) => (
                                                    <SwiperSlide key={index}>
                                                        <CardReviews {...item} />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                    )
                                }
                            </div>
                            <div className="revs-slider revs-slider-rught">
                                {
                                    domLoaded && (
                                        <Swiper
                                            className='rtl'
                                            dir="rtl"
                                            modules={[Autoplay]}
                                            spaceBetween={30}
                                            slidesPerView={4}
                                            loop={true}
                                            autoplay={{
                                                delay: 0,
                                                disableOnInteraction: false,
                                                // reverseDirection: true
                                            }}
                                            speed={16000}
                                            allowTouchMove={false}
                                            breakpoints={{
                                                200: {
                                                    slidesPerView: 1
                                                },
                                                700: {
                                                    slidesPerView: 2
                                                },
                                                1100: {
                                                    slidesPerView: 3
                                                },
                                                1560: {
                                                    slidesPerView: 4
                                                }
                                            }}
                                        >
                                            {
                                                data?.two && data.two.map((item, index) => (
                                                    <SwiperSlide key={index}>
                                                        <CardReviews {...item} />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                    )
                                }

                            </div>
                        </>
                    )
                }
                {
                    isMob && (
                        <div className='revs-mob-slider'>
                            {
                                domLoaded && (
                                    <Swiper
                                        modules={[Autoplay]}
                                        spaceBetween={20}
                                        slidesPerView={2}
                                        loop={true}
                                        autoplay={{
                                            delay: 0,
                                            disableOnInteraction: false
                                        }}
                                        speed={10000}
                                        breakpoints={{
                                            200: {
                                                slidesPerView: 1
                                            },
                                            570: {
                                                slidesPerView: 1.3
                                            },
                                            780: {
                                                slidesPerView: 2
                                            }
                                        }}
                                    >
                                        {
                                            (data?.one && data?.two) && [...data.one, data.two].map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <CardReviews {...item} />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </section>
    )
}