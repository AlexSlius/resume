import {
   CCol,
   CRow,
} from "@coreui/react";
import {useEffect} from "react";
import { isArray } from "lodash";

import Input from "../../../components/uis/input"
import { InputSelect } from "../../../components/uis/inputSelect"
import { ButtonSteps } from "../../../components/buttonSteps"
import { isObjDatas } from '../../../helpers/datasPage';
import { fetchGetSocials } from "../../../controllers/dependencies";

import { updateItemSocialFiled, updateItemSocialFiledNew } from "../../../slices/socials";
import {
   fetchAddItemLink,
   fetchUpdateItemLink,
   fetchDeleteItemLink,
   fetchDeleteAll
} from "../../../controllers/socials";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';


const FormSocials = ({
   dispatch,
   states,
   idCv,
}) => {
   const {
      dependencies: {
         socials,
      },
      socials: {
         socialObj,
         socialObjNew,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = states;

   const isDataPage = (isArray(socialObj) && (socialObj.length > 0)) || isObjDatas(socialObjNew);

   // new
   const updateitemFiledNew = async ({ name, value, isClisk }) => {
      dispatch(updateItemSocialFiledNew({ name, value }));

      if (isClisk) {
         dispatch(fetchAddItemLink({ idCv, data: { name: value, link: "" } }));
         dispatch(updateItemSocialFiledNew({ name: 'name', value: '' }));
         handleGetSocial();
      }
   }

   // edit
   const updateitemFiled = async ({ id, index, name, value, isClisk, isClickSelect, link = '', nameValue = '' }) => {
      await dispatch(updateItemSocialFiled({ index, name, value }));

      if (isClisk) {
         let data = {};

         if (isClickSelect) {
            data = {
               link,
               name: value,
            }
         } else {
            data = {
               link,
               name: nameValue,
            }
         }
         dispatch(fetchUpdateItemLink({ idCv, id, data: data }));
      }
   }

   const handleGetSocial = async (data) => {
      await dispatch(fetchGetSocials(data));
   }

   const handleDeleteitem = (id) => {
      dispatch(fetchDeleteItemLink({ id, idCv }))
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   useEffect(() => {
      dispatch(fetchGetSocials());
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'socialLinks' }));
   }, []);

   return (
      <>
         {
            isArray(socialObj) && socialObj.map((item, index) => (
               <CRow
                  className="g-30 r-gap-30"
                  key={index}
               >
                  <CCol xs={6} className="mb-4">
                     <InputSelect
                        label="Label"
                        valueState={item.name || ""}
                        data={socials.list}
                        handleSaveSelect={(obj) => updateitemFiled({ id: item.id, index, isClickSelect: true, link: item.link, ...obj, name: "name" })}
                        handleServerRequest={handleGetSocial}
                        isOutDataObj={false}
                        isIconArrow={true}
                        isRequire={true}
                        isValidIn={true}
                        validIn={item.name?.trim()?.length > 2}
                     />
                  </CCol>
                  <CCol xs={6} className="mb-4">
                     <Input
                        id={item.id}
                        placeholder="Link"
                        value={item.link}
                        name="link"
                        isDelete={true}
                        onDelete={handleDeleteitem}
                        onBlur={(e) => updateitemFiled({ id: item.id, index, isClisk: true, link: e.target.value, nameValue: item.name })}
                        onChange={(e) => updateitemFiled({ index, name: e.target.name, value: e.target.value })}
                        isValidIn={true}
                        validIn={item.link?.trim()?.length > 4}
                     />
                  </CCol>
               </CRow>
            ))
         }
         <CRow
            className="g-30 r-gap-30"
         >
            <CCol xs={6} className="mb-4">
               <InputSelect
                  label="Label"
                  placeholder="Label"
                  valueState={socialObjNew.name || ""}
                  data={socials.list}
                  handleSaveSelect={(obj) => updateitemFiledNew({ ...obj, name: "name" })}
                  handleServerRequest={handleGetSocial}
                  isOutDataObj={false}
                  isIconArrow={true}
                  isValidIn={true}
                  validIn={socialObjNew.name?.trim()?.length > 4}
               />
            </CCol>
         </CRow>
         <CRow >
            <CCol>
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
                  nameSection="socialLinks"
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormSocials;