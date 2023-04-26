
import { useEffect, useState, useRef } from "react"
import { CForm, CCol, CRow } from "@coreui/react"
import { useForm } from "react-hook-form"
import classnames from 'classnames';

import { DatePicker } from "../../../components/uis/datePicker"
import Input from "../../../components/uis/input"
import Icon from "../../../components/Icon";
import { PhotoAdd } from "../../../components/uis/photoAdd"
import { InputSelect } from "../../../components/uis/inputSelect"
import { LoadWr } from "../../../components/loadWr";

import {
   contactSetNew,
   fetchUpdateContact,
   contactAddNew,
} from "../../../controllers/contacts"
import {
   updatePictureContact,
   updateItemFieldContact,
   cleanSliseNew
} from "../../../slices/contact"
import {
   fetchGetCountrys,
   fetchGetCities,
   fetchGetDrivers,
   fetchGetNationality,
   getJopsTitle,
   addJopsTitle
} from "../../../controllers/dependencies"
import { isLoader } from "../../../helpers/loadings"
import { sessionStorageSet, sessionStorageRemove } from "../../../helpers/localStorage";

import style from './Contact.module.scss'
import reactComponent from '/public/images/icons/down.svg?sprite'
import { ButtonSteps } from "../../../components/buttonSteps"
import { getIdOfNameCountrys } from "../../../helpers/countrys"
import { capitalize } from "../../../helpers/strings"

const FormContact = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = useRef(undefined);
   const [visibleAllInputs, setVisibleAllInputs] = useState(false);
   const [idCountry, setIdCountry] = useState(undefined);
   const [pictureFile, setPictureFile] = useState(undefined);
   const classButton = visibleAllInputs ? `${style.show_hidden} ${style.active}` : `${style.show_hidden}`
   const textInButton = visibleAllInputs ? 'Hide additional details' : 'Edit additional details'
   const isNewResume = (idCv == "new");

   const {
      contacts: {
         contactObj,
         contactObjNew,
         status,
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
   } = storeDate;

   let contObj = (isNewResume ? contactObjNew : contactObj);

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      watch,
      control
   } = useForm({
      mode: "onBlur",
   });

   const handleFileSelect = async (e) => {
      if (e !== null) {
         const reader = new FileReader();

         reader.onloadend = async () => {
            const content = reader.result;
            await dispatch(updatePictureContact(content));
         }

         if (e.target.files[0]) {
            await reader.readAsDataURL(e.target.files[0]);
            await setPictureFile(e.target.files[0]);

            if (idCv != "new")
               await dispatch(fetchUpdateContact({ idCv, dataImage: e.target.files[0] }));

            if (idCv != "new") {
               sessionStorageSet('picture', e.target.files[0]);
            }
         }
      } else {
         await dispatch(updatePictureContact(null));
         await dispatch(fetchUpdateContact({ idCv, dataImage: null }));
         sessionStorageSet('picture', null);
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
         }
         await dispatch(updateItemFieldContact({ name, value }));

         if (name == 'jobTitle') {
            await dispatch(updateItemFieldContact({ name: "jobTitleId", value: data.id }));
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

   const formSubmit = async () => {
      if (!isAthorized) {
         await dispatch(contactSetNew({ pictureFile, isNewResume }));
      }
   }

   const onHandleNewAuthorization = async () => {
      await dispatch(contactAddNew({ pictureFile, isNewResume }));
   }

   const updateContactServer = async () => {
      if (idCv != "new") {
         if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
         }

         refIdTimeout.current = setTimeout(async () => {
            await dispatch(fetchUpdateContact({ idCv, dataImage: pictureFile }));
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

   // Callback version of watch.  It's your responsibility to unsubscribe when done.
   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         let values = value[name] || '';

         if (['firstName', 'lastName', 'placeOfBirth'].includes(name)) {
            values = capitalize(value[name]);
         }

         dispatch(updateItemFieldContact({ name, value: values }));
         updateContactServer();
      });

      return () => subscription.unsubscribe();
   }, [watch]);

   useEffect(() => {
      dispatch(fetchGetCountrys()); // get all countrys
      // dispatch(cleanSliseNew());
      if (idCv == "new") {
         sessionStorageRemove('picture');
      }
   }, []);

   useEffect(() => {
      setIdCountry(getIdOfNameCountrys({ objArr: coutrys.list, nameCountry: contObj.country }));
   }, [coutrys.list, contObj.country]);

   useEffect(() => {
      if (idCountry)
         dispatch(fetchGetDrivers(idCountry))
   }, [idCountry]);

   return (
      // isLoad={isLoader(status)}
      <LoadWr >
         <CForm onSubmit={handleSubmit(formSubmit)} className="rowse r-gap-30">
            <CRow className={style.firstRow}>
               <CCol xs={6} className={classnames(style.rowWidth, "gap-3")}>
                  <div className="mb-30px">
                     <Input
                        label="First Name"
                        value={contObj.firstName}
                        valid={contObj.firstName?.length > 0}
                        autoComplete="on"
                        obj={
                           register("firstName", {
                              required: true,
                              minLength: {
                                 value: 2
                              }
                           })
                        }
                     />
                  </div>
                  <div>
                     <Input
                        label="Last Name"
                        autoComplete="on"
                        value={contObj.lastName}
                        valid={contObj.lastName?.length > 0}
                        obj={
                           register("lastName", {
                              required: true,
                              minLength: {
                                 value: 2
                              }
                           })
                        }
                     />
                  </div>
               </CCol>
               <CCol xs={6} className={classnames(style.rowWidth, style.imageBlock)}>
                  <PhotoAdd handleFileSelect={handleFileSelect} value={contObj?.picture} />
               </CCol>
            </CRow>
            <CRow className={classnames("mobile-rows g-30 r-gap-30")}>
               <CCol xs={6}>
                  <Input
                     label="E-mail"
                     value={contObj.email}
                     invalid={errors?.email}
                     autoComplete="on"
                     valid={!errors?.email && /\S+@\S+\.\S+/.test(watch("email"))}
                     obj={
                        register("email", {
                           pattern: {
                              value: /\S+@\S+\.\S+/,
                           },
                        })
                     }
                  />
               </CCol>
               <CCol xs={6}>
                  <Input
                     label="Phone"
                     autoComplete="on"
                     value={contObj.phone}
                     valid={contObj.phone?.length > 6}
                     type="number"
                     onChange={(e) => handleSaveSelect({ name: "phone", value: e.target.value })}
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
               <CCol xs={3}>
                  <InputSelect
                     label="Country"
                     valueState={contObj.country || ''}
                     data={coutrys.list}
                     handleSaveSelect={({ name, value }, data) => handleSaveSelect({ name: 'country', value }, data)}
                     isOutDataObj={false}
                     isIconArrow={true}
                     isFlag={true}
                     isValidIn={true}
                     validIn={contObj.country?.length > 3}
                  />
               </CCol>
               <CCol xs={3}>
                  <InputSelect
                     label="City"
                     valueState={contObj.city || ''}
                     data={cities.list}
                     isBackgraundLoad={isLoader(cities?.status)}
                     handleSaveSelect={({ name, value }, data) => handleSaveSelect({ name: 'city', value }, data)}
                     handleServerRequest={handleServerRequestCity}
                     isOutDataObj={false}
                     isRequire={true}
                     isValidIn={true}
                     validIn={contObj.city?.length > 3}
                  />
               </CCol>
            </CRow>
            {visibleAllInputs && <CRow className={classnames("mobile-rows g-30 r-gap-30")}>
               <CCol xs={6}>
                  <Input
                     label="Adress"
                     value={contObj.address}
                     autoComplete="on"
                     valid={contObj.address?.length > 10}
                     obj={
                        register("address", {
                           minLength: {
                              value: 2
                           }
                        })
                     }
                  />
               </CCol>
               <CCol xs={6}>
                  <Input
                     label="Zip Code"
                     value={contObj.zipCode}
                     autoComplete="on"
                     type="number"
                     valid={contObj.zipCode?.length > 0}
                     obj={
                        register("zipCode", {
                           minLength: {
                              value: 2
                           }
                        })
                     }
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
                     isOutDataObj={false}
                     isValidIn={true}
                     validIn={contObj.driverLicense?.length > 3}
                     isUpperCase={true}
                  />
               </CCol>
               <CCol xs={6}>
                  <InputSelect
                     label="Nationality"
                     valueState={contObj.nationality || ''}
                     data={nationality?.list || []}
                     isBackgraundLoad={isLoader(nationality?.status)}
                     handleSaveSelect={({ name, value }, data) => handleSaveSelect({ name: 'nationality', value }, data)}
                     handleServerRequest={handleServerRequestNationaly}
                     isOutDataObj={false}
                     isRequire={true}
                     isValidIn={true}
                     validIn={contObj.nationality?.length > 3}
                  />
               </CCol>
               <CCol xs={6}>
                  <Input
                     label="Place of birth"
                     value={contObj.placeOfBirth}
                     valid={contObj.placeOfBirth?.length > 0}
                     obj={
                        register("placeOfBirth", {
                           minLength: {
                              value: 2
                           }
                        })
                     }
                  />
               </CCol>
               <CCol xs={6}>
                  <DatePicker
                     floatingLabel="Date of birth"
                     selected={contObj.dateOfBirth}
                     onChange={(date) => handlerSetDateState('dateOfBirth', date)}
                     formatInput='MMM, DD, YYYY'
                     formatData='M, d, Y'
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
                  onHandleBtnNext={formSubmit}
                  onHandleNew={onHandleNewAuthorization}
                  isAthorized={isAthorized}
                  isFirstStep={true}
                  isNew={idCv == "new" && isAthorized}
               // disabledNext={!contObj.firstName || !contObj.lastName}
               />
            </CCol>
         </CForm>
      </LoadWr>
   )
}

export default FormContact;