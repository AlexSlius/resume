import { useState, useEffect, useRef } from "react";
import Link from "next/link";


export const SectionCtepsCeating = ({
    linkBtn,
    textBtn,
    title,
    desc,
    isMob
}) => {
    const refIdInterval = useRef(undefined);
    const isStart = useRef(true);
    const [stateCurrentTab, setStateCurrentTab] = useState(0);

    const handleClickTab = (tabIndex) => {
        setStateCurrentTab(tabIndex);
    }

    useEffect(() => {
        if (isStart.current) {
            setStateCurrentTab(1);
            isStart.current = false;
        }

        if (refIdInterval.current)
            clearTimeout(refIdInterval.current);

        refIdInterval.current = setTimeout(() => {
            setStateCurrentTab(prev => {
                if (prev < 3) {
                    return prev + 1;
                }
                return 1;
            });
        }, 14900);
    }, [stateCurrentTab]);

    return (
        <section className="tabs mt-130">
            <div className="containers">
                <div className="tabs__top">
                    <h2 className="text-center h2 font-600">{title}</h2>
                    <p className="bottom-text text-center">{desc}</p>
                </div>

                <div className="tab-content-wrapper">
                    <div className="tab-left">
                        <div>
                            <div className={`tab-stab ${(stateCurrentTab == 1) ? "" : "hide"}`}>
                                <h3 className="h3 h3_new tab-stab__title">Your First Step</h3>
                                <div className="tab-stab__des">
                                    <p className="bottom-text">
                                        Discover the Premium Difference with Our Resume Builder. We invite you to experience the superior quality of our services without registration or payment. Step into the future of resume creation, empowering your career journey with confidence and trust.
                                    </p>
                                </div>
                            </div>
                            <div className={`tab-stab ${(stateCurrentTab == 2) ? "" : "hide"}`}>
                                <h3 className="h3 h3_new tab-stab__title">Achieve Beauty With Ease</h3>
                                <div className="tab-stab__des">
                                    <p className="bottom-text">
                                        Opt for our eye-catching, professionally crafted resume or cover letter templates. Simply fill in your details, select and refine the relevant sections, and tweak the design and visuals to your liking. With our pre-written tasks, skills, and career objectives at your disposal, creating a standout resume is just a matter of minutes.
                                    </p>
                                </div>
                            </div>
                            <div className={`tab-stab ${(stateCurrentTab == 3) ? "" : "hide"}`}>
                                <h3 className="h3 h3_new tab-stab__title">Now It’s Yours!</h3>
                                <div className="tab-stab__des">
                                    <p className="bottom-text">
                                        Take advantage of our flexible export options. Choose PDF for optimal and consistent visual formatting, or obtain a unique URL to your resume for easy updates. Our goal is to make your resume sharing and updating process as streamlined as possible.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-stab_bottom stabb">
                            <div className="stabb__staps">
                                <div className="item-stabb">
                                    <button className={`item-stabb__btn ${stateCurrentTab == 1 ? "active" : ''}`} onClick={() => handleClickTab(1)}>1. Easy Start</button>
                                    <div className="item-stabb__next"></div>
                                </div>
                                <div className="item-stabb">
                                    <button className={`item-stabb__btn ${stateCurrentTab == 2 ? "active" : ''}`} onClick={() => handleClickTab(2)}>2. Create</button>
                                    <div className="item-stabb__next"></div>
                                </div>
                                <div className="item-stabb">
                                    <button className={`item-stabb__btn ${stateCurrentTab == 3 ? "active" : ''}`} onClick={() => handleClickTab(3)}>3. Download</button>
                                </div>
                            </div>
                            <div className="stabb__progress">
                                {stateCurrentTab == 1 && <div></div>}
                                {stateCurrentTab == 2 && <div></div>}
                                {stateCurrentTab == 3 && <div></div>}
                            </div>
                        </div>
                    </div>
                    <div className="tab-right">
                        <div className={`t-r-im ${(stateCurrentTab == 1) ? "" : "hide"}`}>
                            <img src="/images/page/tab-new-1.png" alt="img tab one" />
                        </div>
                        <div className={`t-r-im ${(stateCurrentTab == 2) ? "" : "hide"}`}>
                            <img src="/images/page/tab-new-1.png" alt="img tab one" />
                        </div>
                        <div className={`t-r-im ${(stateCurrentTab == 3) ? "" : "hide"}`}>
                            <img src="/images/page/tab-new-1.png" alt="img tab one" />
                        </div>
                    </div>
                </div>

                {
                    isMob && (
                        <div className="mob-bnt-tabse">
                            <Link href={linkBtn} className="tabs__top--btn button-p button-type-standart">{textBtn}</Link>
                        </div>
                    )
                }
            </div>
        </section>
    )
}