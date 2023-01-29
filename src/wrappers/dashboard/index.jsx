import {
    CContainer,
    CRow,
    CCol
} from "@coreui/react"
import SideBar from "../../components/sideBar/SideBar"

import HeadUser from "../../components/headUser/HeadUser"
import Link from "next/link"
import Icon from "../../components/Icon"

import style from "./Style.module.scss"
import iconUpdateNow from "/public/images/icons/upgrade_now.svg?sprite";

const AdminPage = ({ children }) => {
    return (
        <CContainer fluid className={`${style.container_admin}`}>
            <CRow className="row-main">
                <SideBar />
                <CCol className={`${style.main_content} main-content`}>
                    <div className={`${style.header}`}>
                        <div className={style.wr_updat_now}>
                            <Link href="/" className={style.link_now}>
                                <Icon svg={iconUpdateNow} />
                                <span>Upgrade now</span>
                            </Link>
                        </div>
                        <HeadUser />
                    </div>
                    {children}
                </CCol>
            </CRow>
        </CContainer>
    )
}
export default AdminPage;