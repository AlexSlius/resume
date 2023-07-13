import Link from "next/link";

export const SectionForFree = ({
    title,
    isMob,
    des,
    btnText,
    link,
    pageCover=false
}) => {
    let urlImg = pageCover ? isMob ? "/images/page/t-for-free-cover-mob.png" : "/images/page/t-for-cover-free.png" : isMob ? "/images/page/t-for-free-mob.png" : "/images/page/t-for-free.png";

    return (
        <section className="for-free mt-180">
            <div className="containers">
                <div className="for-free__main">
                    <div className="for-free__left">
                        <div>
                            <h2 className="h2 font-600">{title}</h2>
                            <p>{des}</p>
                        </div>
                        <div className="for-free__wr-btn">
                            <Link href={link} className="for-free__btn button-p button-p_white">{btnText}</Link>
                        </div>
                    </div>
                    <div className="for-free__right">
                        <div>
                            <img src={urlImg} alt="image for free" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}