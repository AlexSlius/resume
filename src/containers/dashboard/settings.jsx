import {
    CCol,
    CRow,
    CButton
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/uis/input"
// import { Switch } from "../../components/uis/switch";
// import { ButtonDeleteItem } from "../../components/uis/buttonDelete";
import { LoadChildrenBtn } from "../../components/loadChildrenBtn";
import { Header } from "../../components/header";
import { ModalDelete } from "../../components/modals/modalDelete";
import { TitleAndLoad } from "../../components/titleAndLoad";

import {
    fetchUserDeleteProfile,
    fetchUserUpdateServer,
    getUserDataSettings
} from "../../controllers/users";
import { isLoader } from "../../helpers/loadings"
import { logout } from "../../controllers/auth";
import { isDelete } from "../../helpers/checkingStatuses";
import { updateItemSettingsFiled, updateSettingsFrom } from "../../slices/users";
import { deferredSaving } from "../../helpers/deferredSaving";

import style from "./Style.module.scss";
import { InputEmail } from "../../components/uis/inputEmail";

const Settings = () => {
    const dispatch = useDispatch();
    const {
        users: {
            statusDelete,
            objForm,
            objFormSettings,
            status,
        },
        theme: {
            currentResolution
        }
    } = useSelector(state => state);
    const [showModaldelete, setShowModalDelete] = useState(false);
    const [isLoadDelete, setLoadIsDelete] = useState(false);

    const handleDeleteProfile = async () => {
        setShowModalDelete(true);
    }

    const handleCLoseModalDelete = () => {
        setShowModalDelete(false);
    }

    const onHanleBtnDelete = async () => {
        setLoadIsDelete(true);
        let res = await dispatch(fetchUserDeleteProfile());

        if (isDelete(res?.payload)) {
            await logout(dispatch);
        }
    }

    // const updateSettingField = async ({ name, value }) => {
    //     await dispatch(updateItemSettingsFiled({ name, value }));

    //     await deferredSaving(true, async () => {
    //         await dispatch(fetchUserUpdateServer());
    //     });
    // }

    const updateSettingForm = async ({ name, value }) => {
        await dispatch(updateSettingsFrom({ name, value }));

        await deferredSaving(true, async () => {
            await dispatch(fetchUserUpdateServer());
        });
    }

    useEffect(() => {
        dispatch(getUserDataSettings());
    }, []);

    return (
        <>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) && (
                    <Header />
                )
            }

            <div className={`${style.wr_settings} ${style.wr_pa}`}>
                <TitleAndLoad title="Account Settings" isLoad={isLoader(status)} />
                <CRow className="mt-4 align-items-center">
                    <CCol xl={6}>
                        <div className="mb-4">
                            <Input
                                label="First Name"
                                placeholder="First Name"
                                value={objFormSettings?.firstName || ''}
                                name="firstName"
                                onChange={(e) => updateSettingForm({ name: "firstName", value: e.target.value.trim() })}
                                valid={objFormSettings?.firstName?.length > 2}
                                readOnly={false}
                            />
                        </div>
                    </CCol>
                    <CCol xl={6}>
                        <div className="mb-4">
                            <Input
                                label="Last Name"
                                placeholder="Last Name"
                                name="lastName"
                                value={objFormSettings?.lastName}
                                valid={objFormSettings?.lastName?.length > 2}
                                onChange={(e) => updateSettingForm({ name: "lastName", value: e.target.value.trim() })}
                                readOnly={false}
                            />
                        </div>
                    </CCol>
                    <CCol xl={6}>
                        <div className="mb-4">
                            <InputEmail
                                label="E-mail*"
                                value={objFormSettings.email}
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
                {/* <CRow className="pb-4 bt bb">
                                <CCol xl={6} className="pt-4">
                                    <div className={`${style.item_s}`}>
                                        <div className={`${style.item_s_left}`}>
                                            <img src="/images/icons/fb.png" />
                                            <span>Facebook</span>
                                        </div>
                                        <div className={`${style.item_s_right}`}>
                                            <button className="btn-text-b">Connect</button>
                                        </div>
                                    </div >
                                </CCol >
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
                            </CRow > */}
                {/* <CRow className="mb-4 pb-4 align-items-center bb">
                                <CCol xl={6} className="pt-4">
                                    <div className={`${style.item_par}`}>
                                        <div>Updates and Offers</div>
                                        <p>Discounts, special offers, new features and more</p>
                                    </div>
                                </CCol>
                                <CCol xl={6} className="pt-4">
                                    <Switch
                                        isChecked={objForm.UpdatesAndOffersNotification}
                                        handleOnChange={(value) => updateSettingField({ name: 'UpdatesAndOffersNotification', value })}
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
                                        isChecked={objForm.ResumeAnalyticsNotification}
                                        handleOnChange={(value) => updateSettingField({ name: 'ResumeAnalyticsNotification', value })}
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
                                        isChecked={objForm.ResumeAndJobNotification}
                                        handleOnChange={(value) => updateSettingField({ name: 'ResumeAndJobNotification', value })}
                                    />
                                </CCol>
                            </CRow> */}
                <CRow>
                    <CCol xl={12}>
                        <div className={`${style.info_text}`}>Once you delete your account, it cannot be undone. This is permanent.</div>
                    </CCol>
                    <CCol xl={12} className={`mt-4 ${style.wr_btn_form}`}>
                        <LoadChildrenBtn isLoad={isLoader(statusDelete)}>
                            <CButton type="button" className="btn-red min-220" onClick={handleDeleteProfile}><span>Delete Account</span></CButton>
                        </LoadChildrenBtn>
                    </CCol>
                </CRow>
            </div>

            <ModalDelete
                visible={!!showModaldelete}
                title="Delete Account"
                desc="Are you sure you want to delete this account?"
                onClose={handleCLoseModalDelete}
                onHanleBtnDelete={onHanleBtnDelete}
                isLoadDelete={isLoadDelete}
            />
        </>
    )
}

export default Settings;