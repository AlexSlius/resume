import React from "react"
import { useSelector, useDispatch } from 'react-redux'

import { AuthorizationBigPicture } from "../../components/autorizationBigPicture"

import style from "./Authorization-wraper.module.scss"
import { AuthorizationHeader } from "../../components/autorizationHeader"
import { Buttonhelp } from "../../components/uis/buttonHelp"

import { cleanSliseNew } from "../../slices/contact";

import { routersPages } from "../../constants/next-routers";

export const AuthorizationWrapper = (props) => {
    const dispatch = useDispatch();

    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    // React.useEffect(() => {
    //     dispatch(cleanSliseNew());
    // }, []);

    return (
        <div className={`${style.main_wrapper_autorization}`}>
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
                            <div className={`${style.authorization__left} ${style.authorization__col}`}>
                                <AuthorizationBigPicture />
                            </div>
                        )
                    }
                    <div className={`${style.authorization__right_center}`}>
                        {props.children}
                    </div>
                    {
                        !['md', 'sm', 'xs'].includes(currentResolution) && (
                            <div className={`${style.authorization__right_bottom}`}>
                                <Buttonhelp href={`/${routersPages['contactUs']}`} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}