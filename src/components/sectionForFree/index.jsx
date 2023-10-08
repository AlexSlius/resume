import Link from "next/link";

export const SectionForFree = ({
    title,
    isMob,
    des,
    btnText,
    link,
    pageCover = false
}) => {
    let urlImg = pageCover ?
        ['/images/page/t-for-cover-free-1.png', '/images/page/t-for-cover-free-2.png', '/images/page/t-for-cover-free-3.png'] :
        ['/images/page/t-for-free-1.png', '/images/page/t-for-free-2.png', '/images/page/t-for-free-3.png']

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
                        {
                            urlImg.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt="image for free" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}