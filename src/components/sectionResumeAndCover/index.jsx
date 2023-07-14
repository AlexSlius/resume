export const SectionResumeAndCover = () => {
    return (
        <section className="randc mt-180">
            <div className="containers">
                <div className="randc__h">
                    <h2 className="randc_h2 h2 font-600">Resume and cover letter
                        design is similar</h2>
                    <p className="randc_des">In three simple steps, create the perfect document to impress hiring managers and employers. Minimum time, maximum professional quality.</p>
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