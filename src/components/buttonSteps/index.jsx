import { CButton } from "@coreui/react"
import Router from "next/router";
import { useSelector } from "react-redux";

import { LoadChildrenBtn } from "../loadChildrenBtn"
import { isLoader } from "../../helpers/loadings"

import { isAllActive, nextofLink, prevOfLink } from "../../helpers/routers";

import style from "./Style.module.scss";

export const ButtonSteps = ({
    loadBtnNext = false,
    loadBtnPrev = false,
    isFirstStep = false,
    isLastStep = false,
    isFinish = false,
    textBtnNext = "Continue",
    textBtnPrev = "Skip",
    isAthorized = false,
    isNew = false,
    disabledNext = false,
    onHandleBtnNext = () => { },
    onHandleBtnPrev = () => { },
    onHandleNew = () => { },
    clickFinish = () => { },
}) => {
    const {
        menuAsideResume: {
            list
        }
    } = useSelector(state => state);

    const isAll = isAllActive(list);
    const clickNext = () => {
        if (isNew) {
            onHandleNew();
        } else {
            let pathName = Router.pathname;

            if (isAthorized) {
                let linkNext = nextofLink(list, pathName);

                if (!!linkNext)
                    Router.push(linkNext);
            } else {
                onHandleBtnNext();
            }
        }
    }

    const clickPrev = () => {
        let pathName = Router.pathname;
        let linkPrev = prevOfLink(list, pathName);

        if (!!linkPrev)
            Router.push(linkPrev);

        onHandleBtnPrev();
    }

    return (
        <div className={`${style.wr}`}>
            <div className={`${style.row}`}>

                {
                    isFinish ? (
                        <div>
                            <LoadChildrenBtn isLoad={isLoader(loadBtnNext)}>
                                <CButton type="button" className={`${style.btn} ${style.btn_next}`} onClick={clickFinish}>Finish</CButton>
                            </LoadChildrenBtn>
                        </div>
                    ) : (
                        <>
                            {
                                !isFirstStep && (
                                    <div>
                                        <LoadChildrenBtn isLoad={isLoader(loadBtnPrev)}>
                                            <CButton type="button" className={`${style.btn} ${style.btn_prev}`} onClick={clickPrev}>{textBtnPrev}</CButton>
                                        </LoadChildrenBtn>
                                    </div>
                                )
                            }
                            {
                                !(isAll && isLastStep) ? (
                                    <div>
                                        <LoadChildrenBtn isLoad={isLoader(loadBtnNext)}>
                                            <CButton
                                                type="button"
                                                className={`${style.btn} ${style.btn_next}`}
                                                onClick={clickNext}
                                                disabled={disabledNext}
                                            >{textBtnNext}</CButton>
                                        </LoadChildrenBtn>
                                    </div>
                                ) : (
                                    <LoadChildrenBtn isLoad={isLoader(loadBtnNext)}>
                                        <CButton type="button" className={`${style.btn} ${style.btn_next}`} onClick={clickFinish}>Finish</CButton>
                                    </LoadChildrenBtn>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div >
    )
}