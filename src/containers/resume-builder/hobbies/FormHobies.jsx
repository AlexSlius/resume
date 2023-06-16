import {
   CCol,
   CRow,
} from "@coreui/react";
import React from "react";
import { isArray } from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import { InputSelect } from "../../../components/uis/inputSelect"
import { ItemDragDrop } from "../../../components/ItemDragDrop";
import { ButtonSteps } from "../../../components/buttonSteps"
import { fetchGetHobies } from "../../../controllers/dependencies";
import { reorder } from '../../../helpers/drageDrop';
import { isObjDatas } from '../../../helpers/datasPage';

import {
   updateItemHobiesFiledNew,
   updatePosition
} from "../../../slices/hobies";
import {
   fetchPostAddCvHobie,
   fetchDeleteHobie,
   fetchPostUpdatePositionHobie,
   fetchDeleteAll
} from "../../../controllers/hobies";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';

import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";

const FormHobies = ({
   dispatch,
   states,
   idCv,
}) => {
   const {
      dependencies: {
         hobies,
      },
      hobies: {
         hobiesObj,
         hobieObjNew,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = states;

   const isDataPage = (isArray(hobiesObj) && (hobiesObj.length > 0)) || isObjDatas(hobieObjNew);

   const handleGetHobiesList = (data) => {
      dispatch(fetchGetHobies(data));
   }

   const updateitemFiledNew = ({ name, value, isClisk }, data) => {
      dispatch(updateItemHobiesFiledNew({ name, value }));

      if (isClisk) {
         dispatch(fetchPostAddCvHobie({ idCv, data: { [name]: value, id: data.id, position: newPosition(hobiesObj) } }));
         dispatch(updateItemHobiesFiledNew({ name, value: '' }));
      }
   }

   const onDeleteItemHobies = (id) => {
      dispatch(fetchDeleteHobie({ idCv, id }));
   }

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         hobiesObj,
         result.source.index,
         result.destination.index
      );

      let updateArr = arrPositionUpdateItem(items);

      dispatch(fetchPostUpdatePositionHobie({ idCv, data: updateArr }));
      dispatch(updatePosition(items));
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   React.useEffect(() => {
      dispatch(fetchGetHobies());
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'hobbies' }));
   }, []);

   return (
      <>
         <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="droppable">
               {
                  (provided, snapshot) => (
                     <CRow className="mobile-rows g-30"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                     >
                        {
                           isArray(hobiesObj) && (
                              hobiesObj.map((item, index) => (
                                 <Draggable
                                    key={item.id}
                                    draggableId={String(item.id)}
                                    index={index}
                                 >
                                    {
                                       (provided, snapshot) => (
                                          <ItemDragDrop
                                             id={item?.id}
                                             provided={provided}
                                             label={item?.text}
                                             onDelete={onDeleteItemHobies}
                                          />
                                       )
                                    }
                                 </Draggable>
                              ))
                           )
                        }
                        {provided.placeholder}
                        <CCol xs={6}>
                           <InputSelect
                              placeholder="Search hobby"
                              valueState={hobieObjNew.text || ""}
                              name="text"
                              data={hobies.list}
                              handleSaveSelect={updateitemFiledNew}
                              handleServerRequest={handleGetHobiesList}
                              isOutDataObj={false}
                              isRequire={true}
                              isValidIn={true}
                           />
                        </CCol>
                     </CRow>
                  )
               }
            </Droppable>
         </DragDropContext>
         <CRow className="mt-4">
            <CCol>
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
                  nameSection="hobbies"
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormHobies;