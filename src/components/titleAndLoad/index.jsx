import { TitlePage } from "../titlePage";
import { LoadBlock } from "../loadBlock";

import style from "./style.module.scss";

export const TitleAndLoad = ({
    title = "",
    isLoad = false,
}) => {
    return (
        <div className={style.wr_title}>
            <TitlePage titleText={title} />
            {
                isLoad && (
                    <LoadBlock isMin={true} />
                )
            }
        </div>
    )
}