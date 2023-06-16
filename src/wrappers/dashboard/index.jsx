import {
    CContainer,
    CRow,
    CCol
} from "@coreui/react"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import SideBar from "../../components/sideBar/SideBar"
import HeadUser from "../../components/headUser/HeadUser"
import Icon from "../../components/Icon"
import { ButtonBack } from "../../components/uis/buttonBack"

import { routersPages } from "../../constants/next-routers";

import style from "./Style.module.scss"
import iconUpdateNow from "/public/images/icons/upgrade_now.svg?sprite";
import iconXNow from "/public/images/icons/x_now.svg?sprite"

const AdminPage = ({
    children,
    isResume = false,
    isMaxH
}) => {
    const router = useRouter();
    const {
        theme: {
            currentResolution
        },
        users: {
            isSubscribe
        }
    } = useSelector((state) => state);

    return (
        <CContainer fluid className={`${style.container_admin}`}>
            <CRow className="row-main">
                {
                    !['md', 'sm', 'xs', 'lg'].includes(currentResolution) && (
                        <SideBar isMaxH={isMaxH} />
                    )
                }

                <CCol className={`${style.main_content} main-content`}>
                    {
                        !['md', 'sm', 'xs'].includes(currentResolution) && (
                            <div className={`${style.header}`}>
                                {
                                    isResume ? (
                                        <button className="btn-close-black" onClick={() => router.back()}>
                                            <Icon svg={iconXNow} />
                                        </button>
                                    ) : (
                                        <>
                                            {
                                                ['md', 'sm', 'xs'].includes(currentResolution) && (
                                                    <div className={`${style.header_l}`}>
                                                        <div className={`${style.header_back}`}>
                                                            <ButtonBack text="" />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className={style.wr_updat_now}>
                                                <Link href={`/${routersPages['resumeNow']}`} className={style.link_now}>
                                                    <Icon svg={iconUpdateNow} />
                                                    <span>Upgrade now</span>
                                                </Link>
                                            </div>
                                            <HeadUser />
                                        </>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className={`${style.container_main_cons}`}>
                        {children}
                    </div>
                </CCol>
            </CRow >
        </CContainer >
    )
}
export default AdminPage;