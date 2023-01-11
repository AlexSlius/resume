
import { useEffect, useState } from "react"
import { CForm, CCol, CRow, CButton } from "@coreui/react"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import axios from 'axios'
import FormData from "form-data"

import { DatePicker } from "../../../components/uis/datePicker"
import Input from "../../../components/uis/input"
import Icon from "../../../components/Icon";
import { PhotoAdd } from "../../../components/uis/photoAdd"
import { InputPhone } from "../../../components/uis/inputPhone"
import { InputSelect } from "../../../components/uis/inputSelect"

import { updateItemFieldContact, updatePictureContact } from "../../../slices/contact"
import { fetchGetCountrys, fetchGetCities, fetchGetZipCodes, fetchGetDrivers, fetchGetNationality } from "../../../slices/dependencies"
import { isLoader } from "../../../helpers/loadings"

import style from './Contact.module.scss'
import reactComponent from '/public/images/icons/down.svg?sprite'

const FormContact = () => {
   const dispatch = useDispatch()
   const [visibleAllInputs, setVisibleAllInputs] = useState(false);
   const classButton = visibleAllInputs ? `${style.show_hidden} ${style.active}` : `${style.show_hidden}`
   const textInButton = visibleAllInputs ? 'Hide additional details' : 'Edit additional details'

   const {
      contacts: {
         contactObj
      },
      dependencies: {
         coutrys,
         cities,
         zipsCodes,
         drivers,
         nationality
      },
   } = useSelector(state => state);

   const {
      register,
      handleSubmit,
      formState,
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
      }
   }

   const formSubmit = (value) => {
      console.log(value);

      //    e.preventDefault();
      //    const formData = new FormData();

      //    formData.append('date_of_birth', date);
      //    formData.append('driver_license', driverLicense);
      //    formData.append('zip_code', city);
      //    formData.append('city', date);
      //    formData.append('phone', phone);
      //    formData.append('place_of_birth', place);
      //    formData.append('last_name', lastName);
      //    formData.append('address', adress);
      //    formData.append('country', country);
      //    formData.append('first_name', firstName);
      //    formData.append('nationality', nationality);
      //    formData.append('email', email);
      //    formData.append('picture', selectedFile);

      //    axios.post('http://resume.waytrel.pro/profile/basic/',
      //       formData,
      //       { headers: { 'Content-Type': 'multipart/form-data' }, })
      //       .then(res => {
      //          if (res.data.status === 'session_data_saved') {
      //             navigate('/login', {
      //                state: {
      //                   sessionId: res.data.session_id
      //                }
      //             });
      //          }
      //       }
      //       )
      //       .catch((error) => console.log(error))
   }

   const handleSaveSelect = ({ name, value }) => {
      dispatch(updateItemFieldContact({ name, value }));

      if (name == "country") {
         if (value?.id) {
            dispatch(fetchGetCities(value.id)); // get list cities by id country
            dispatch(fetchGetDrivers(value.id)) // get list drivers by id country
         }
      }

      // if (name = "city") {
      //    if (value?.id)
      //       dispatch(fetchGetZipCodes(value.id)) // get list zip codes by id city
      // }
   }

   const handlerSetDateState = (name, date) => {
      dispatch(updateItemFieldContact({ name, value: date?.toString() }))
   }

   const handleServerRequestNationaly = async () => {
      await dispatch(fetchGetNationality()); // get all nationality
   }

   // Callback version of watch.  It's your responsibility to unsubscribe when done.
   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         dispatch(updateItemFieldContact({ name, value: value[name] || '' }))
      });

      return () => subscription.unsubscribe();
   }, [watch]);

   useEffect(() => {
      dispatch(fetchGetCountrys()); // get all countrys
   }, []);

   return (
      <CForm onSubmit={handleSubmit(formSubmit)} className="row r-gap-30">
         <CRow>
            <CCol xs={6} className="gap-3">
               <div className="mb-3">
                  <Input
                     label="First Name"
                     placeholder="First Name"
                     value={contactObj.firstName}
                     invalid={errors?.firstName}
                     valid={!errors?.firstName && contactObj.firstName.length > 1}
                     obj={
                        register("firstName", {
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
                     placeholder="Last Name"
                     value={contactObj.lastName}
                     invalid={errors?.lastName}
                     valid={!errors?.lastName && contactObj.lastName.length > 1}
                     obj={
                        register("lastName", {
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
                  label="E-mail*"
                  placeholder="E-mail*"
                  value={contactObj.email}
                  invalid={errors?.email}
                  valid={!errors?.email && /\S+@\S+\.\S+/.test(contactObj.email)}
                  obj={
                     register("email", {
                        required: true,
                        pattern: {
                           value: /\S+@\S+\.\S+/,
                        },
                     })
                  }
               />
            </CCol>
            <CCol xs={6}>
               <InputPhone
                  label="Phone"
                  placeholder="Phone"
                  value={contactObj.phone}
                  obj={{ control }}
               />
            </CCol>
            <CCol xs={6}>
               <InputSelect
                  label="Country"
                  placeholder="Country"
                  valueState={contactObj.country || {}}
                  data={coutrys.list}
                  name="country"
                  isLoad={isLoader(coutrys.status)}
                  handleSaveSelect={handleSaveSelect}
               />
            </CCol>
            <CCol xs={6}>
               <InputSelect
                  label="City"
                  placeholder="City"
                  valueState={contactObj.city || {}}
                  name="city"
                  isAddDiv={true}
                  isFirstList={false}
                  data={cities.list}
                  isLoad={isLoader(cities?.status)}
                  handleSaveSelect={handleSaveSelect}
               />
            </CCol>
         </CRow>
         {visibleAllInputs && <CRow className="g-30 r-gap-30">
            <CCol xs={6}>
               <Input
                  label="Adress"
                  placeholder="Adress"
                  value={contactObj.address}
                  invalid={errors?.address}
                  valid={!errors?.address && (contactObj.address.length > 1)}
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
               {/* <InputSelect
                  label="Zip Code"
                  placeholder="Zip Code"
                  valueState={contactObj.zipCode || {}}
                  isAddDiv={true}
                  data={zipsCodes?.list || []}
                  name="zipCode"
                  isLoad={isLoader(zipsCodes?.status)}
                  handleSaveSelect={handleSaveSelect}
               /> */}
               <Input
                  label="Zip Code"
                  placeholder="Zip Code"
                  value={contactObj.zipCode}
                  invalid={errors?.zipCode}
                  valid={!errors?.zipCode && contactObj.zipCode.length > 1}
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
                  valueState={contactObj.driverLicense || {}}
                  data={drivers?.list || []}
                  isAddDiv={true}
                  name="driverLicense"
                  isLoad={isLoader(drivers?.status)}
                  handleSaveSelect={handleSaveSelect}
                  keyName="category"
                  keyText="category"
               />
            </CCol>
            <CCol xs={6}>
               <InputSelect
                  label="Nationality"
                  placeholder="Nationality"
                  valueState={contactObj.nationality || {}}
                  data={nationality?.list || []}
                  isAddDiv={true}
                  name="nationality"
                  isFirstList={false}
                  isLoad={isLoader(nationality?.status)}
                  handleSaveSelect={handleSaveSelect}
                  handleServerRequest={handleServerRequestNationaly}
               />
            </CCol>
            <CCol xs={6}>
               <Input
                  label="Place of birth"
                  placeholder="Place of birth"
                  value={contactObj.placeOfBirth}
                  invalid={errors?.placeOfBirth}
                  valid={!errors?.placeOfBirth && contactObj.placeOfBirth.length > 1}
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
                  selected={contactObj.dateOfBirth ? new Date(contactObj.dateOfBirth) : contactObj.dateOfBirth}
                  onChange={(date) => handlerSetDateState('dateOfBirth', date)}
                  placeholderText="Date of birth"
                  name="date_of_birth"
                  calendarClassName="custom-datepicker"
                  wrapperClassName="custom-datepicker-wrapper-2"
                  dateFormat="MMM, yyyy"
                  showMonthYearPicker
                  showPopperArrow={false}
                  useShortMonthInDropdown={true}
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
            <CButton type="button" color="blue">Continue</CButton>
         </CCol>
      </CForm>
   )
}

export default FormContact;