import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useRef, useState } from 'react';

import Icon from "../Icon";

import iconArrLb from "/public/images/icons/iconArrLb.svg?sprite";
import iconArrRb from "/public/images/icons/iconArrRb.svg?sprite";


export const SectionCustomers = ({
    data,
    title,
    mtm = false
}) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const refSwip = useRef(null);
    const [stateid, setStateid] = useState(0);

    const handleSlider = (e) => {
        setTimeout(() => {
            if (refSwip.current) {
                let divA = refSwip.current.querySelector('.swiper-slide-active .item-card-custom').getAttribute('data-id-active');
                setStateid(divA);
            }
        }, 200);
    }

    return (
        <section className={`customers mt-180 ${mtm ? "mt-120" : ""}`}>
            <div className="containers">
                <h2 className="h2 font-600 max-t-570" dangerouslySetInnerHTML={{ __html: title }}></h2>
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
                            data.map((item, index) => (
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
                            data.map((item) => (
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