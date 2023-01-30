
import { useEffect, useState, useRef } from "react"
import { CForm, CCol, CRow, CButton } from "@coreui/react"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

import { DatePicker } from "../../../components/uis/datePicker"
import Input from "../../../components/uis/input"
import Icon from "../../../components/Icon";
import { PhotoAdd } from "../../../components/uis/photoAdd"
import { InputPhoneNoControler } from "../../../components/uis/inputPhoneNoControler"
import { InputSelect } from "../../../components/uis/inputSelect"
import { LoadWr } from "../../../components/loadWr";

import {
   contactSetNew,
   getBasicContact,
   fetchUpdateContact,
   contactAddNew
} from "../../../controllers/contacts"
import {
   updatePictureContact,
   updateItemFieldContact
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
import { localStorageGet } from "../../../helpers/localStorage";

import style from './Contact.module.scss'
import reactComponent from '/public/images/icons/down.svg?sprite'
import { ButtonSteps } from "../../../components/buttonSteps"
import { getIdOfNameCountrys } from "../../../helpers/countrys"

const FormContact = () => {
   const dispatch = useDispatch()
   const refIdTimeout = useRef(undefined);
   const [visibleAllInputs, setVisibleAllInputs] = useState(false);
   const [idCountry, setIdCountry] = useState(undefined);
   const [pictureFile, setPictureFile] = useState(undefined);
   const classButton = visibleAllInputs ? `${style.show_hidden} ${style.active}` : `${style.show_hidden}`
   const textInButton = visibleAllInputs ? 'Hide additional details' : 'Edit additional details'

   const {
      contacts: {
         contactObj,
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
   } = useSelector(state => state);
   const idCv = localStorageGet('idCv');

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
      const reader = new FileReader();

      reader.onloadend = async () => {
         const content = reader.result;
         await dispatch(updatePictureContact(content));
      }

      if (e.target.files[0]) {
         reader.readAsDataURL(e.target.files[0]);
         await setPictureFile(e.target.files[0]);
         await dispatch(fetchUpdateContact({ idCv, dataImage: e.target.files[0] }));
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
      } else {
         await dispatch(updateItemFieldContact({ name, value }));
      }

      await updateContactServer();
   }

   const handlerSetDateState = async (name, date) => {
      await dispatch(updateItemFieldContact({ name, value: date }));
      await updateContactServer();
   }

   const handleServerRequestNationaly = async () => {
      await dispatch(fetchGetNationality()); // get all nationality
   }

   const handleServerRequestCity = async () => {
      if (!!!idCountry)
         return false;

      await dispatch(fetchGetCities({ id: idCountry, params: contactObj.city }));
   }

   const formSubmit = async () => {
      if (!isAthorized) {
         await dispatch(contactSetNew(pictureFile));
      }
   }

   const onHandleNewAutorization = async () => {
      await dispatch(contactAddNew(pictureFile));
   }

   const updateContactServer = async () => {
      if (!!idCv) {
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
         dispatch(updateItemFieldContact({ name, value: value[name] || '' }));
         updateContactServer();
      });

      return () => subscription.unsubscribe();
   }, [watch]);

   useEffect(() => {
      dispatch(fetchGetCountrys()); // get all countrys
      if (!!idCv) {
         dispatch(getBasicContact(idCv));
      }
   }, []);

   useEffect(() => {
      setIdCountry(getIdOfNameCountrys({ objArr: coutrys.list, nameCountry: contactObj.country }));
   }, [coutrys.list, contactObj.country]);

   useEffect(() => {
      if (idCountry)
         dispatch(fetchGetDrivers(idCountry))
   }, [idCountry]);

   return (
      <LoadWr isLoad={isLoader(status)}>
         <CForm onSubmit={handleSubmit(formSubmit)} className="row r-gap-30">
            <CRow>
               <CCol xs={6} className="gap-3">
                  <div className="mb-3">
                     <Input
                        label="First Name*"
                        placeholder="First Name*"
                        value={contactObj.firstName}
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
                        label="Last Name*"
                        placeholder="Last Name*"
                        value={contactObj.lastName}
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
               <CCol xs={6}>
                  <PhotoAdd handleFileSelect={handleFileSelect} value={contactObj?.picture} />
               </CCol>
            </CRow>
            <CRow className="g-30 r-gap-30">
               <CCol xs={6}>
                  <Input
                     label="E-mail"
                     placeholder="E-mail"
                     value={contactObj.email}
                     invalid={errors?.email}
                     valid={!errors?.email && /\S+@\S+\.\S+/.test(contactObj.email)}
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
                  <InputPhoneNoControler
                     label="Phone"
                     placeholder="Phone"
                     onChange={(value) => handleSaveSelect({ name: "phone", value: value })}
                     value={contactObj.phone}
                  />
               </CCol>
               <CCol xs={6}>
                  <InputSelect
                     label="Job Title"
                     placeholder="Job Title"
                     valueState={contactObj.jobTitle || ""}
                     data={jopsTitle?.list || []}
                     isAddDiv={true}
                     name="jobTitle"
                     isLoad={isLoader(jopsTitle?.status)}
                     isBackgraundLoad={isLoader(jopsTitle?.statusAddNew)}
                     handleSaveSelect={handleSaveSelect}
                     handleServerRequest={handleServerRequestGetJopsTitle}
                     handleAddNew={handleAddNewJobTitle}
                     isOutDataObj={false}
                  />
               </CCol>
               <CCol xs={2}>
                  <InputSelect
                     valueState={contactObj.country || ''}
                     data={coutrys.list}
                     name="country"
                     isLoad={isLoader(coutrys.status)}
                     handleSaveSelect={handleSaveSelect}
                     isOutDataObj={false}
                     isIconArrow={true}
                     isFlag={true}
                     isSearch={false}
                  />
               </CCol>
               <CCol xs={4}>
                  <InputSelect
                     label="City"
                     placeholder="City"
                     valueState={contactObj.city || ''}
                     name="city"
                     data={cities.list}
                     isLoad={isLoader(cities?.status)}
                     handleSaveSelect={handleSaveSelect}
                     handleServerRequest={handleServerRequestCity}
                     isOutDataObj={false}
                  />
               </CCol>
            </CRow>
            {visibleAllInputs && <CRow className="g-30 r-gap-30">
               <CCol xs={6}>
                  <Input
                     label="Adress"
                     placeholder="Adress"
                     value={contactObj.address}
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
                     placeholder="Zip Code"
                     value={contactObj.zipCode}
                     type="number"
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
                     placeholder="Driver license"
                     valueState={contactObj.driverLicense || ''}
                     data={drivers?.list || []}
                     name="driverLicense"
                     isLoad={isLoader(drivers?.status)}
                     handleSaveSelect={handleSaveSelect}
                     keyName="category"
                     keyText="category"
                     isOutDataObj={false}
                  />
               </CCol>
               <CCol xs={6}>
                  <InputSelect
                     label="Nationality"
                     placeholder="Nationality"
                     valueState={contactObj.nationality || ''}
                     data={nationality?.list || []}
                     name="nationality"
                     isLoad={isLoader(nationality?.status)}
                     handleSaveSelect={handleSaveSelect}
                     handleServerRequest={handleServerRequestNationaly}
                     isOutDataObj={false}
                  />
               </CCol>
               <CCol xs={6}>
                  <Input
                     label="Place of birth"
                     placeholder="Place of birth"
                     value={contactObj.placeOfBirth}
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
                     selected={contactObj.dateOfBirth}
                     onChange={(date) => handlerSetDateState('dateOfBirth', date)}
                     placeholderText="Date of birth"
                     name="date_of_birth"
                  />
               </CCol>
            </CRow>}
            <CCol xs={12}>
               <button type="button" onClick={() => setVisibleAllInputs(prev => !prev)} className={`${classButton}`}>
                  {textInButton}
                  <Icon svg={reactComponent} classNames={[style.icon_bnt]} />
               </button>
            </CCol>
            <CCol>
               <ButtonSteps
                  onHandleBtnNext={formSubmit}
                  onHandleNew={onHandleNewAutorization}
                  isAthorized={isAthorized}
                  isFirstStep={true}
                  isNew={!!!idCv && isAthorized}
                  disabledNext={!contactObj.firstName || !contactObj.lastName}
               />
            </CCol>
         </CForm>
      </LoadWr>
   )
}

export default FormContact;