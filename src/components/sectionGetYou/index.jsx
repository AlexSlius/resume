import Link from "next/link";

export const SectionGetYou = ({
    linkBtn = "",
    textBtn,
    title = "",
    des,
    isMob,
    pageCover = false,
}) => {
    let urlImg = pageCover ? isMob ? "/images/page/get-you-cover-mob.png" : "/images/page/get-cover-you.png" : isMob ? "/images/page/get-you-mob.png" : "/images/page/get-you.png";

    return (
        <section className="get-you mt-180">
            <div className="containers">
                <div className="get-you__row">
                    <div className="get-you__left">
                        <h2 className="h2 font-600">{title}</h2>
                        <p>{des}</p>
                        <div className="get-you__wr-btn">
                            <Link href={linkBtn} className="get-you--btn button-p button-type-standart">{textBtn}</Link>
                        </div>
                    </div>
                    <div className="get-you__right">
                        <div>
                            <img src={urlImg} alt="image get you" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}