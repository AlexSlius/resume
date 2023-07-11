import Link from "next/link"

export const PerfectTemplate = ({
    link = "",
    nandlePrev = () => { }
}) => {
    return (
        <section className="perfect-t mt-180">
            <div className="containers">
                <div className="perfect-t_row">
                    <div className="perfect-t__template">
                        <div>
                            <img src="/images/page/perfecto041.png" alt="perfect template" />
                        </div>
                    </div>
                    <div className="perfect-t__info">
                        <p className="text-top-t star-icon"><span>Chicago</span></p>
                        <h2 className="h2 font-600"> Create perfect resumes for the modern job market </h2>
                        <div className="perfect-t__users">500,000+ users</div>
                        <p className="text-bot-def">We've made sure that signing up for our resume writing tools is convenient and secure.</p>
                        <div className="perfect-t__wr-btn">
                            <Link href={link} className="perfect-t__btn button-p button-type-standart" onClick={nandlePrev}>Use This Template</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}