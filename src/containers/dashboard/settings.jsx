import {
    CCol,
    CRow,
    CButton
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

import { TitlePage } from "../../components/titlePage";
import Input from "../../components/uis/input"
import { Switch } from "../../components/uis/switch";
import { ButtonDeleteItem } from "../../components/uis/buttonDelete";
import { LoadChildrenBtn } from "../../components/loadChildrenBtn";

import { fetchUserDeleteProfile } from "../../controllers/users";
import { isLoader } from "../../helpers/loadings"
import { logout } from "../../controllers/auth";
import { isDelete } from "../../helpers/checkingStatuses";

import style from "./Style.module.scss";

const Settings = () => {
    const dispatch = useDispatch();
    const {
        users: {
            statusDelete
        }
    } = useSelector(state => state);

    const handleDeleteProfile = async () => {
        let result = confirm("Confirm profile deletion?");

        if (result) {
            let res = await dispatch(fetchUserDeleteProfile());

            if (isDelete(res?.payload))
                await logout(dispatch);
        }
    }

    return (
        <div className={style.wr_settings}>
            <TitlePage titleText="Account Settings" />
            <CRow className="mt-4 align-items-center">
                <CCol xl={6}>
                    <div className="mb-4">
                        <Input
                            label="First Name"
                            placeholder="First Name"
                        // value={contactObj.firstName}
                        // obj={
                        //     register("firstName", {
                        //         minLength: {
                        //             value: 2
                        //         }
                        //     })
                        // }
                        />
                    </div>
                </CCol>
                <CCol xl={6}>
                    <div className="mb-4">
                        <Input
                            label="Last Name"
                            placeholder="Last Name"
                        // value={contactObj.firstName}
                        // obj={
                        //     register("firstName", {
                        //         minLength: {
                        //             value: 2
                        //         }
                        //     })
                        // }
                        />
                    </div>
                </CCol>
                <CCol xl={6}>
                    <div className="mb-4">
                        <Input
                            label="E-mail*"
                            placeholder="E-mail*"
                            // value={item.email}
                            name="email"
                        // invalid={(item.email.length > 0) && !(/\S+@\S+\.\S+/.test(item.email))}
                        // valid={/\S+@\S+\.\S+/.test(item.email)}
                        // onChange={(e) => handleSaveSelect({ index, name: e.target.name, value: e.target.value })}
                        />
                    </div>
                </CCol>
                <CCol xl={6}>
                    <div className="mb-4">
                        <div className={style.text_info}>
                            <span>Use this email to log in to your ResTemplate
                                account and receive notifications.</span>
                        </div>
                    </div>
                </CCol>
            </CRow>
            <CRow className="pb-4 bt bb">
                <CCol xl={6} className="pt-4">
                    <div className={`${style.item_s}`}>
                        <div className={`${style.item_s_left}`}>
                            <img src="/images/icons/fb.png" />
                            <span>Facebook</span>
                        </div>
                        <div className={`${style.item_s_right}`}>
                            <button className="btn-text-b">Connect</button>
                        </div>
                    </div>
                </CCol>
                <CCol xl={6} className="pt-4">
                    <div className={`${style.item_s}`}>
                        <div className={`${style.item_s_left}`}>
                            <img src="/images/icons/id.png" />
                            <span>LinkedIn</span>
                        </div>
                        <div className={`${style.item_s_right}`}>
                            <ButtonDeleteItem />
                        </div>
                    </div>
                </CCol>
            </CRow>
            <CRow className="mb-4 pb-4 align-items-center bb">
                <CCol xl={6} className="pt-4">
                    <div className={`${style.item_par}`}>
                        <div>Updates and Offers</div>
                        <p>Discounts, special offers, new features and more</p>
                    </div>
                </CCol>
                <CCol xl={6} className="pt-4">
                    <Switch
                    // isChecked={hideExperienceLevel}
                    // handleOnChange={(prev) => { dispatch(fetchUpdateExperienceLevel({ idCv, data: prev })) }}
                    />
                </CCol>
                <CCol xl={6} className="pt-4">
                    <div className={`${style.item_par}`}>
                        <div>Resume Analytics</div>
                        <p>Views, downloads and monthly statistics for each resume</p>
                    </div>
                </CCol>
                <CCol xl={6} className="pt-4">
                    <Switch
                    // isChecked={hideExperienceLevel}
                    // handleOnChange={(prev) => { dispatch(fetchUpdateExperienceLevel({ idCv, data: prev })) }}
                    />
                </CCol>
                <CCol xl={6} className="pt-4">
                    <div className={`${style.item_par}`}>
                        <div>Resume and Job Tips Newsletter</div>
                        <p>Useful resume and job tips! Straight to your inbox every 2 weeks</p>
                    </div>
                </CCol>
                <CCol xl={6} className="pt-4">
                    <Switch
                    // isChecked={hideExperienceLevel}
                    // handleOnChange={(prev) => { dispatch(fetchUpdateExperienceLevel({ idCv, data: prev })) }}
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol xl={12}>
                    <div className={`${style.info_text}`}>Once you delete your account, it cannot be undone. This is permanent.</div>
                </CCol>
                <CCol xl={12} className="mt-4">
                    <LoadChildrenBtn isLoad={isLoader(statusDelete)}>
                        <CButton type="button" className="btn-red min-220" onClick={handleDeleteProfile}>Delete Account</CButton>
                    </LoadChildrenBtn>
                </CCol>
            </CRow>
        </div>
    )
}

export default Settings;