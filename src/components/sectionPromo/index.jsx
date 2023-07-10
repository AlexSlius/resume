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
}) => {
    return (
        <section className="promo">
            <div className="containers">
                <div className="promo__wrapper">
                    <div className="promo-offer">
                        <p className="top-text">{topTitle}</p>
                        <h1 className="h1 promo__title">{mainTitle}</h1>
                        <div className="promo-offer__bottom">
                            <Link href={linkBtn} className="promo-offer__btn button-p button-type-standart">{textBtn}</Link>
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
                            isMob && (
                                <div>
                                    swiper
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