import Link from "next/link";

import { PromoNumbers } from '../promoNumbers';
import { UsersCreated } from '../usersCreated';

export const SectionPromo = ({
    topTitle,
    mainTitle,
    textBtn,
    linkBtn,
    desc,
    promoNumbers,
    imgRight,
    users,
    isMob,
    arrImg,
    coverPage = false,
}) => {
    return (
        <section className={`promo ${coverPage ? "cover" : ""}`}>
            <div className="containers">
                <div className="promo__wrapper">
                    <div className="promo-offer">
                        <p className="top-text">{topTitle}</p>
                        <h1 className="h1 promo__title">{mainTitle}</h1>
                        <div className="promo-offer__bottom">
                            <Link href={linkBtn} className={`promo-offer__btn button-p  ${coverPage ? "" :"button-p_black"}`}>{textBtn}</Link>
                            <div className="promo-offer__desc">
                                <p className="bottom-text left-arrow">{desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="promo-img">
                        {
                            !isMob && <img src={imgRight} alt="img" />
                        }
                        <UsersCreated data={users} />
                        {
                            (isMob && coverPage) && (
                                <div className="promo-offer__imgs">
                                    <img src={imgRight} alt="img" />
                                </div>
                            )
                        }
                        {
                            isMob && !coverPage && (
                                <div className="promo-scroll">
                                    {
                                        arrImg.map((item, index) => (
                                            <div className="promo-scroll__item" key={index}>
                                                <img src={item} alt="item resume" />
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="promo-num">
                    {
                        promoNumbers && (
                            promoNumbers.map(({ count, firstText, secondText, image, percent }, index) => (
                                <PromoNumbers key={`promoNumber-${index}`} count={count} firstText={firstText} secondText={secondText} image={image} percent={percent} />
                            ))
                        )
                    }
                </div>
            </div>
        </section>
    )
}