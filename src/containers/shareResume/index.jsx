import { downloadPagePdf } from "../../utils/isdownPdf";
import Templates from "../templates";

import style from "./style.module.scss";

const ShareResume = ({
    isCover = true,
    ctx
}) => {
    let isPdf = downloadPagePdf(ctx);

    return (
        <div className={isPdf ? style.wr_div : ""}>
            <div className={`page-share ${isPdf ? "pdf" : ""}`}>
                <div className="page-share__container">
                    <Templates isCover={isCover} isPageView={true} />
                </div>
            </div>
        </div>
    )
}

export default ShareResume;