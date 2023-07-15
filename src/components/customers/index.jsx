import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useRef, useState } from 'react';

import Icon from "../Icon";

import iconArrLb from "/public/images/icons/iconArrLb.svg?sprite";
import iconArrRb from "/public/images/icons/iconArrRb.svg?sprite";

const datas = [
    {
        id: 0,
        img: "/images/icons/icon-customers-1.svg",
        avatar: "/images/icons/avar-custor.png",
        name: "Alex 1",
        des: "1 It eliminates the grunt work, transforming the way we prospect. It's a relief to know that we have a reliable, quick source for potential leads."
    },
    {
        id: 2,
        img: "/images/icons/icon-customers-2.svg",
        avatar: "/images/icons/avar-custor.png",
        name: "Alex 2",
        des: "2 It eliminates the grunt work, transforming the way we prospect. It's a relief to know that we have a reliable, quick source for potential leads."
    },
    {
        id: 3,
        img: "/images/icons/icon-customers-3.svg",
        avatar: "/images/icons/avar-custor.png",
        name: "Alex 3",
        des: "3 It eliminates the grunt work, transforming the way we prospect. It's a relief to know that we have a reliable, quick source for potential leads."
    },
    {
        id: 4,
        img: "/images/icons/icon-customers-4.svg",
        avatar: "/images/icons/avar-custor.png",
        name: "Alex 4",
        des: "4 It eliminates the grunt work, transforming the way we prospect. It's a relief to know that we have a reliable, quick source for potential leads."
    },
    {
        id: 5,
        img: "/images/icons/icon-customers-5.svg",
        avatar: "/images/icons/avar-custor.png",
        name: "Alex 5",
        des: "5 It eliminates the grunt work, transforming the way we prospect. It's a relief to know that we have a reliable, quick source for potential leads."
    },
    {
        id: 6,
        img: "/images/icons/icon-customers-6.svg",
        avatar: "/images/icons/avar-custor.png",
        name: "Alex 6",
        des: "6 It eliminates the grunt work, transforming the way we prospect. It's a relief to know that we have a reliable, quick source for potential leads."
    },
]

export const SectionCustomers = () => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const refSwip = useRef(null);
    const [stateid, setStateid] = useState(0);

    const handleSlider = (e) => {
        if (refSwip.current) {
            let divA = refSwip.current.querySelector('.swiper-slide-active .item-card-custom').getAttribute('data-id-active');
            setStateid(divA);
        }
    }

    return (
        <section className="customers mt-180">
            <div className="containers">
                <h2 className="h2 font-600 max-t-570">Our customers<br /> get hired by top companies</h2>
            </div>
            <div className="customers__main">
                <div className="customers-swiper" ref={refSwip}>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        centeredSlides={true}
                        roundLengths={true}
                        loopAdditionalSlides={30}
                        allowTouchMove={false}
                        loop={true}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                        }}
                        onSlideChange={handleSlider}
                        breakpoints={{
                            200: {
                                slidesPerView: 1.6,
                                spaceBetween: 20
                            },
                            480: {
                                slidesPerView: 2.6,
                                spaceBetween: 20
                            },
                            576: {
                                slidesPerView: 3.3,
                                spaceBetween: 20
                            },
                            700: {
                                slidesPerView: 4.3,
                                spaceBetween: 20
                            },
                            1100: {
                                slidesPerView: 5.5
                            },
                            1560: {
                                slidesPerView: 7.5
                            }
                        }}
                    >
                        {
                            datas.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="item-card-custom" data-id-active={item.id}>
                                        <img src={item.img} alt="icon customers" />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
            <div className="containers">
                <div className="cusf">
                    <div className="cusf__btn-left">
                        <button className='bbtn-slid bbtn-slid-prev' ref={navigationPrevRef}>
                            <span><Icon svg={iconArrLb} /></span>
                        </button>
                    </div>
                    <div className="cusf__center cusc">
                        {
                            datas.map((item) => (
                                (stateid == item.id) && (
                                    <div className='cusc_m' key={item.id}>
                                        <div className="cusc__ava" style={{ backgroundImage: `url(${item.avatar})` }}></div>
                                        <div className="cusc__des">{item.des}</div>
                                        <div className="cusc__name">{item.name}</div>
                                    </div>
                                )
                            ))
                        }

                    </div>
                    <div className="cusf__btn-right">
                        <button className='bbtn-slid bbtn-slid-next' ref={navigationNextRef}>
                            <span><Icon svg={iconArrRb} /></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}