import Link from "next/link";

export const ProfessionalStory = ({
    linkBtn = "",
    textBtn,
}) => {
    return (
        <section className="profe mt-180">
            <div className="containers">
                <div className="profe__row">
                    <div className="profe__left">
                        <p className="profe_t">SECURE YOUR DREAM JOB</p>
                        <h2 className="h2 font-600">Create your professional story in minutes</h2>
                        <p className="profe_des">Our cover letter maker allows you to write amazing professional pitches in minutes rather than hours. No more writer’s block, no more searching for the convincing phrases or agonizing over formatting. Be persuasive without effort!</p>
                        <div className="profe__wr-btn">
                            <Link href={linkBtn} className="tabs__top--btn button-p button-type-standart">{textBtn}</Link>
                        </div>
                    </div>
                    <div className="profe__right">
                        <div>
                            <img src="/images/page/colage-resum.png" alt="colage" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}