
import { useEffect, useState, useRef } from "react"
import { CCol, CRow } from "@coreui/react"
import classnames from 'classnames';

import { DatePicker } from "../../../components/uis/datePicker"
import Input from "../../../components/uis/input"
import Icon from "../../../components/Icon";
import { PhotoAdd } from "../../../components/uis/photoAdd"
import { InputSelect } from "../../../components/uis/inputSelect"
import { ForRegistr } from "../../../components/forRegistr";
import { ModalEmail } from "../../../components/modals/modalEmail";
import { InputEmail } from "../../../components/uis/inputEmail";
import { ButtonSteps } from "../../../components/buttonSteps"

import {
   fetchUpdateContact,
   contactAddNew,
   updateIsErrorEmail,
} from "../../../controllers/contacts"
import {
   updatePictureContact,
   updateItemFieldContact,
   updateFieldEmailForRegister,
   cleanSliseNew,
   cleanSlise
} from "../../../slices/contact"
import {
   fetchGetCities,
   fetchGetDrivers,
   fetchGetNationality,
   getJopsTitle,
   addJopsTitle
} from "../../../controllers/dependencies"

import { isLoader } from "../../../helpers/loadings"
import { sessionStorageRemove } from "../../../helpers/localStorage";
import { getIdOfNameCountrys } from "../../../helpers/countrys";
import { isObjEmptyForm } from "../../../helpers/changeForm";
import { focusFiedlInput } from "../../../helpers/fiedlFocus";
import { sendCodeResume } from "../../../utils/sendCode";

import style from './Contact.module.scss'
import reactComponent from '/public/images/icons/down.svg?sprite'


const FormContact = ({
   dispatch,
   storeDate,
   idCv,
   setStatePictureFile,
   statePictureFile
}) => {
   const refIdTimeout = useRef(undefined);

   const refCountry = useRef(undefined);
   const refCity = useRef(undefined);
   const refAddress = useRef(undefined);
   const refNationality = useRef(undefined);
   const refPleaceOfBirth = useRef(undefined);

   const [visibleAllInputs, setVisibleAllInputs] = useState(false);
   const [idCountry, setIdCountry] = useState(undefined);
   const [pictureFile, setPictureFile] = useState(undefined);
   const [showModalEmail, setShowModalEmail] = useState(false);
   const [emailForRegister, setEmailForRegister] = useState('');
   const classButton = visibleAllInputs ? `${style.show_hidden} ${style.active}` : `${style.show_hidden}`
   const textInButton = visibleAllInputs ? 'Hide additional details' : 'Edit additional details'
   const isNewResume = (idCv == "new");

   const {
      contacts: {
         contactObj,
         contactObjNew,
         emailRegister,
         isErrorEmail,
      },
      dependencies: {
         coutrys,
         cities,
         drivers,
         nationality,
         jopsTitle,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
      users: {
         objFormSettings,
         avatar,
      },
      menuAsideResume,
   } = storeDate;

   let contObj = (isNewResume ? contactObjNew : contactObj);
   let isForEmail = (emailRegister?.length > 0);
   let isEmptyForm = isObjEmptyForm(contObj, [
      "firstName",
      "lastName",
      "job_title",
      "picture",
      "email",
      "phone",
      "country",
      "nationality",
      "city",
      "address",
      "zipCode",
      "driverLicense",
      "placeOfBirth",
      "dateOfBirth",
   ]);

   const handleFileSelect = async (e) => {
      if (e !== null) {
         const reader = new FileReader();

         reader.onloadend = async () => {
            const content = reader.result;
            await dispatch(updatePictureContact(content));
         }

         if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setStatePictureFile(e.target.files[0]);

            if (idCv != "new")
               await dispatch(fetchUpdateContact({ idCv, dataImage: e.target.files[0] }));
         }
      } else {
         await dispatch(updatePictureContact(null));
         await dispatch(fetchUpdateContact({ idCv, dataImage: null }));
      }
   }

   const handleSaveSelect = async ({ name, value }, data = null) => {
      if (!!data) {
         if (name == "country") {
            if (data?.id) {
               setIdCountry(data.id);
               await dispatch(updateItemFieldContact({ name: "city", value: "" }));
               await dispatch(updateItemFieldContact({ name: "driverLicense", value: "" }));
            }
            focusFiedlInput(refCity, contObj.city);
         }

         if (name == "city") {
            focusFiedlInput(refAddress, contObj.address);
         }

         if (name == "driverLicense") {
            focusFiedlInput(refNationality, contObj.nationality);
         }

         if (name == "nationality") {
            focusFiedlInput(refPleaceOfBirth, contObj.placeOfBirth);
         }

         await dispatch(updateItemFieldContact({ name, value }));

         if (name == 'jobTitle') {
            await dispatch(updateItemFieldContact({ name: "jobTitleId", value: data.id }));
            focusFiedlInput(refCountry, contObj.country);
         }
      } else {
         await dispatch(updateItemFieldContact({ name, value }));
      }

      await updateContactServer();
   }

   const handlerSetDateState = async (name, date) => {
      await dispatch(updateItemFieldContact({ name, value: date }));
      await updateContactServer();
   }

   const handleServerRequestNationaly = async (text) => {
      await dispatch(fetchGetNationality()); // get all nationality
   }

   const handleServerRequestCity = async () => {
      if (!!!idCountry)
         return false;

      await dispatch(fetchGetCities({ id: idCountry, params: contObj.city }));
   }

   const formSubmit = async (link = undefined) => {
      if (!isAthorized) {
         sendCodeResume({
            dispatch,
            pictureFile: statePictureFile,
            link
         });
      }
   }

   const onHandleNewAuthorization = async () => {
      await dispatch(contactAddNew({ pictureFile: statePictureFile, isNewResume, isPage: true }));
   }

   const updateContactServer = async () => {
      if (!isNewResume) {
         if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
         }

         refIdTimeout.current = setTimeout(async () => {
            await dispatch(fetchUpdateContact({ idCv, dataImage: statePictureFile }));
            clearTimeout(refIdTimeout.current);
         }, 1000);
      }
   }

   const handleServerRequestGetJopsTitle = async (text) => {
      await dispatch(getJopsTitle(text)); // get all jops title
   }

   const handleAddNewJobTitle = async (text) => {
      let re = await dispatch(addJopsTitle(text));
      return re?.payload?.id;
   }

   const handleCloseModalEmail = () => {
      setShowModalEmail(false);
   }

   const onHanleBtnSaveEmail = async () => {
      await dispatch(updateFieldEmailForRegister(emailForRegister));
      await dispatch(updateIsErrorEmail());
      handleCloseModalEmail();
   }

   const cleanAll = async () => {
      setStatePictureFile(null);

      if (isNewResume) {
         await dispatch(cleanSliseNew());
         return;
      }

      await dispatch(cleanSlise());
      await dispatch(fetchUpdateContact({ idCv, dataImage: undefined }));
   }

   useEffect(() => {
      if (isNewResume && isAthorized) {
         let { firstName, lastName, email } = objFormSettings;

         !(contObj?.firstName?.length > 0) && handlerSetDateState('firstName', firstName);
         !(contObj?.lastName?.length > 0) && handlerSetDateState('lastName', lastName);
         !(contObj?.email?.length > 0) && handlerSetDateState('email', email);
         !(contObj?.picture?.length > 0) && handlerSetDateState('picture', avatar?.image || null);
      }
   }, []);

   useEffect(() => {
      if (!!showModalEmail) {
         setEmailForRegister(emailRegister);
      }
   }, [showModalEmail]);

   useEffect(() => {
      setIdCountry(getIdOfNameCountrys({ objArr: coutrys.list, nameCountry: contObj.country }));
   }, [coutrys.list, contObj.country]);

   useEffect(() => {
      if (idCountry)
         dispatch(fetchGetDrivers(idCountry))
   }, [idCountry]);

   return (
      <>
         <div className="rowse r-gap-30">
            <CRow className={style.firstRow}>
               <CCol xs={6} className={classnames(style.rowWidth, "gap-3")}>
                  <div className="mb-30px">
                     <Input
                        id="textFNAM"
                        label="First Name"
                        value={contObj.firstName}
                        valid={contObj.firstName?.length > 0}
                        onChange={(e) => handlerSetDateState('firstName', e.target.value)}
                        name="FNAM"
                        autoComplete="given-name"
                        readOnly={false}
                     />
                  </div>
                  <div>
                     <Input
                        id="textFNAM"
                        label="Last Name"
                        value={contObj.lastName}
                        valid={contObj.lastName?.length > 0}
                        onChange={(e) => handlerSetDateState('lastName', e.target.value)}
                        name="FLAST"
                        autoComplete="family-name"
                        readOnly={false}
                     />
                  </div>
               </CCol>
               <CCol xs={6} className={classnames(style.rowWidth, style.imageBlock)}>
                  <PhotoAdd handleFileSelect={handleFileSelect} value={contObj?.picture} />
               </CCol>
            </CRow>
            <CRow className={classnames("mobile-rows g-30 r-gap-30")}>
               <CCol xs={6}>
                  <div className="rel">
                     <InputEmail
                        label="E-mail"
                        value={contObj.email}
                        onChange={(val) => handlerSetDateState('email', val)}
                     />
                     {
                        isNewResume && !isAthorized && (
                           <ForRegistr
                              isError={isErrorEmail}
                              isForEmail={isForEmail}
                              emailForRegister={emailForRegister}
                              setShowModalEmail={() => setShowModalEmail(true)}
                              updateFieldEmailForRegister={() => dispatch(updateFieldEmailForRegister(''))}
                           />
                        )
                     }
                  </div>
               </CCol>
               <CCol xs={6}>
                  <Input
                     label="Phone"
                     value={contObj.phone}
                     valid={contObj.phone?.length > 6}
                     type="text"
                     isNumber={true}
                     isPhone={true}
                     onChange={(value) => handlerSetDateState('phone', value)}
                  />
               </CCol>
               <CCol xs={6}>
                  <InputSelect
                     label="Job Title"
                     valueState={contObj.jobTitle || ""}
                     data={jopsTitle?.list || []}
                     isAddDiv={true}
                     handleSaveSelect={({ name, value }, data) => handleSaveSelect({ name: 'jobTitle', value }, data)}
                     handleServerRequest={handleServerRequestGetJopsTitle}
                     handleAddNew={handleAddNewJobTitle}
                     isOutDataObj={false}
                     isRequire={true}
                     isCap={true}
                     isValidIn={true}
                     validIn={contObj.jobTitle?.length > 2}
                  />
               </CCol>
               <CCol xs={3} ref={refCountry}>
                  <InputSelect
                     label="Country"
                     valueState={contObj.country || ''}
                     data={coutrys.list}
                     handleSaveSelect={({ name, value }, data) => handleSaveSelect({ name: 'country', value }, data)}
                     isOutDataObj={false}
                     isIconArrow={true}
                     isFlag={true}
                     isStaticData={true}
                     isValidIn={true}
                     isCap={true}
                     name="CNTY"
                     validIn={contObj.country?.length > 3}
                  />
               </CCol>
               <CCol xs={3} ref={refCity}>
                  <InputSelect
                     label="City"
                     valueState={contObj.city || ''}
                     data={cities.list}
                     handleSaveSelect={({ name, value }, data) => handleSaveSelect({ name: 'city', value }, data)}
                     handleServerRequest={handleServerRequestCity}
                     isOutDataObj={false}
                     name="CITYE"
                     isCap={true}
                     isRequire={true}
                     isValidIn={true}
                     validIn={contObj.city?.length > 3}
                  />
               </CCol>
            </CRow>
            {visibleAllInputs && <CRow className={classnames("mobile-rows g-30 r-gap-30")}>
               <CCol xs={6} ref={refAddress}>
                  <Input
                     label="Adress"
                     value={contObj.address}
                     valid={contObj.address?.length > 10}
                     onChange={(e) => handlerSetDateState('address', e.target.value)}
                  />
               </CCol>
               <CCol xs={6}>
                  <Input
                     label="Zip Code"
                     value={contObj.zipCode}
                     valid={contObj.zipCode?.length > 0}
                     onChange={(e) => handlerSetDateState('zipCode', e.target.value)}
                  />
               </CCol>
               <CCol xs={6}>
                  <InputSelect
                     label="Driver license"
                     valueState={contObj.driverLicense || ''}
                     data={drivers?.list || []}
                     isBackgraundLoad={isLoader(drivers?.status)}
                     handleSaveSelect={({ name, value }, data) => handleSaveSelect({ name: 'driverLicense', value }, data)}
                     keyName="category"
                     keyText="category"
                     isStaticData={true}
                     isOutDataObj={false}
                     isValidIn={true}
                     validIn={contObj.driverLicense?.length > 3}
                     isUpperCase={true}
                  />
               </CCol>
               <CCol xs={6} ref={refNationality}>
                  <InputSelect
                     label="Nationality"
                     valueState={contObj.nationality || ''}
                     data={nationality?.list || []}
                     isBackgraundLoad={isLoader(nationality?.status)}
                     handleSaveSelect={({ name, value }, data) => handleSaveSelect({ name: 'nationality', value }, data)}
                     handleServerRequest={handleServerRequestNationaly}
                     isOutDataObj={false}
                     isStaticData={true}
                     isRequire={true}
                     isValidIn={true}
                     isCap={true}
                     validIn={contObj.nationality?.length > 3}
                  />
               </CCol>
               <CCol xs={6} ref={refPleaceOfBirth}>
                  <Input
                     label="Place of birth"
                     value={contObj.placeOfBirth}
                     valid={contObj.placeOfBirth?.length > 0}
                     onChange={(e) => handlerSetDateState('placeOfBirth', e.target.value)}
                  />
               </CCol>
               <CCol xs={6}>
                  <DatePicker
                     floatingLabel="Date of birth"
                     selected={contObj.dateOfBirth}
                     formatInput='MMM, DD, YYYY'
                     formatData='M, d, Y'
                     onChange={(date) => handlerSetDateState('dateOfBirth', date)}
                     isMindata={false}
                  />
               </CCol>
            </CRow>}
            <CCol xs={12} className={style.formText}>
               <button type="button" onClick={() => setVisibleAllInputs(prev => !prev)} className={`${classButton}`}>
                  {textInButton}
                  <Icon svg={reactComponent} classNames={[style.icon_bnt]} />
               </button>
            </CCol>
            <CCol className={style.buttonWrap}>
               <ButtonSteps
                  onHandleBtnNext={() => formSubmit(menuAsideResume.list[1].link)}
                  onHandleNew={onHandleNewAuthorization}
                  isAthorized={isAthorized}
                  isNew={isNewResume && isAthorized}
                  onClean={cleanAll}
                  disableDelete={!isEmptyForm}
               />
            </CCol>
         </div>
         <ModalEmail
            visible={showModalEmail}
            onClose={handleCloseModalEmail}
            data={emailForRegister}
            setState={setEmailForRegister}
            onHanleBtn={onHanleBtnSaveEmail}
         />
      </>
   )
}

export default FormContact;