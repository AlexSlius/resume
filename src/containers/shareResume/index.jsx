import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Templates from "../templates";

const ShareResume = ({
    isCover = true,
    ctx
}) => {
    let isPdf = (ctx?.router.state?.query?.download == 'pdf');

    console.log("ctxpage: ", ctx);

    console.log("ctx?.router: ", ctx?.router.state?.query);
    console.log("ctx?.router.state?.query?.download: ", ctx?.router.state?.query?.download);

    console.log("isPdf: ", isPdf);

    console.log("${isPdf ?: ", `${isPdf ? "pdf" : ""}`);

    return (
        <div className={`page-share ${isPdf ? "pdf" : ""}`}>
            <div className="page-share__container">
                <Templates isCover={isCover} isPageView={true} />
            </div>
        </div>
    )
}

export default ShareResume;