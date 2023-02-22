import {
   CCol,
   CRow,
} from "@coreui/react";
import React from "react";
import { isArray } from "lodash";

import Input from "../../../components/uis/input"
import { LoadWr } from "../../../components/loadWr";
import { InputSelect } from "../../../components/uis/inputSelect"
import { ButtonSteps } from "../../../components/buttonSteps"
import { isLoader } from "../../../helpers/loadings"
import { isObjDatas } from '../../../helpers/datasPage';
import { fetchGetSocials } from "../../../controllers/dependencies";

import { updateItemSocialFiled, updateItemSocialFiledNew } from "../../../slices/socials";
import {
   fetchAddItemLink,
   fetchUpdateItemLink,
   fetchGetAllLinks,
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
         statusList,
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

   React.useEffect(() => {
      // dispatch(fetchGetAllLinks({ idCv }));
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'socialLinks' }));
   }, [])

   return (
      <>
         {/* isLoad={isLoader(statusList)} */}
         <LoadWr >
            {
               isArray(socialObj) && socialObj.map((item, index) => (
                  <CRow
                     className="g-30 r-gap-30"
                     key={index}
                  >
                     <CCol xs={6} className="mb-4">
                        <InputSelect
                           label="Label"
                           placeholder="Label"
                           valueState={item.name || ""}
                           name="name"
                           data={socials.list}
                           // isLoad={isLoader(socials?.status)}
                           handleSaveSelect={(obj) => updateitemFiled({ id: item.id, index, isClickSelect: true, link: item.link, ...obj })}
                           handleServerRequest={handleGetSocial}
                           isOutDataObj={false}
                           isIconArrow={true}
                           isRequire={true}
                        />
                     </CCol>
                     <CCol xs={6} className="mb-4">
                        <Input
                           id={item.id}
                           placeholder="link"
                           value={item.link}
                           name="link"
                           isDelete={true}
                           onDelete={handleDeleteitem}
                           onBlur={(e) => updateitemFiled({ id: item.id, index, isClisk: true, link: e.target.value, nameValue: item.name })}
                           onChange={(e) => updateitemFiled({ index, name: e.target.name, value: e.target.value })}
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
                     name="name"
                     data={socials.list}
                     // isLoad={isLoader(socials?.status)}
                     handleSaveSelect={updateitemFiledNew}
                     handleServerRequest={handleGetSocial}
                     isOutDataObj={false}
                     isIconArrow={true}
                  />
               </CCol>
            </CRow>
         </LoadWr>
         <CRow >
            <CCol>
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormSocials;