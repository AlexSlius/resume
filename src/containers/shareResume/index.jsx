import Templates from "../templates";

const ShareResume = ({
    isCover = true,
    ctx
}) => {
    let isPdf = (ctx?.router.state?.query?.download == 'pdf') || (ctx?.router?.query?.download == 'pdf');

    return (
        <div className={`page-share ${isPdf ? "pdf" : ""}`}>
            <div className="page-share__container">
                <Templates isCover={isCover} isPageView={true} />
            </div>
        </div>
    )
}

export default ShareResume;