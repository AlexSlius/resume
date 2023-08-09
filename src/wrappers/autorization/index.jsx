import React from "react"
import { useSelector, useDispatch } from 'react-redux'

import { AuthorizationBigPicture } from "../../components/autorizationBigPicture"

import style from "./Authorization-wraper.module.scss"
import { AuthorizationHeader } from "../../components/autorizationHeader"
import { Buttonhelp } from "../../components/uis/buttonHelp"

import { routersPages } from "../../constants/next-routers";

export const AuthorizationWrapper = (props) => {
    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    return (
        <div className={`renewal ${style.main_wrapper_autorization}`}>
            <div className={`${style.authorization__row}`}>
                {
                    !['sm', 'xs'].includes(currentResolution) && (
                        <div className={`${style.authorization__left} ${style.authorization__col}`}>
                            <AuthorizationBigPicture />
                        </div>
                    )
                }
                <div className={`${style.authorization__right} ${style.authorization__col}`}>
                    <AuthorizationHeader currentResolution={currentResolution} isHidenBtnBack={props.isHidenBtnBack} />
                    {
                        ['sm', 'xs'].includes(currentResolution) && (
                            <div></div>
                        )
                    }
                    <div className={`${style.authorization__right_center}`}>
                        {props.children}
                    </div>
                    <div className={`${style.authorization__right_bottom}`}>
                        <Buttonhelp href={`/${routersPages['contactUs']}`} isBlack={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}