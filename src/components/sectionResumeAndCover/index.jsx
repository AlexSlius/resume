export const SectionResumeAndCover = () => {
    return (
        <section className="randc mt-180">
            <div className="containers">
                <div className="randc__h">
                    <h2 className="randc_h2 h2 font-600">Matching designs</h2>
                    <p className="randc_des">Make your chances even higher with matching resume and cover letter designs.</p>
                </div>
                <div className="randc__main">
                    <div className="randc__item ran-item">
                        <div className="ran-item__h"> Cover letter </div>
                        <div className="ran-item__img">
                            <img src="/images/page/cover-t.png" alt="template cover" />
                        </div>
                    </div>
                    <div className="randc__item ran-item">
                        <div className="ran-item__h">Resume</div>
                        <div className="ran-item__img">
                            <img src="/images/page/resume-t.png" alt="template resume" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}