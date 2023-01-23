import {
    CContainer,
    CRow,
    CCol
} from "@coreui/react"
import SideBar from "../../components/sideBar/SideBar"

import style from "./Style.module.scss"
import HeadUser from "../../components/headUser/HeadUser"

const AdminPage = ({ children }) => {
    return (
        <CContainer fluid className={`${style.container_admin}`}>
            <CRow className="row-main">
                <SideBar />
                <CCol className={`${style.main_content} main-content`}>
                    <div className={`${style.header}`}>
                        <HeadUser />
                    </div>
                    {children}
                </CCol>
            </CRow>
        </CContainer>
    )
}
export default AdminPage;