import { CFormInput } from "@coreui/react"
import React from "react"

import Icon from "../../../components/Icon"
import deleteIcon from "/public/images/icons/delete.svg??sprite";

const Input = ({
   id = null,
   onChange = () => { },
   onBlur = () => { },
   onDelete = () => { },
   onFocus = () => { },
   value,
   defaultValue,
   label = null,
   placeholder = undefined,
   type = "text",
   className = "",
   invalid = false,
   valid = false,
   isNumber = false,
   isPhone = false,
   name = undefined,
   obj,
   isDelete = false,
   disabled = false,
   textError = "",
   autoComplete = "off",
}) => {
   let classDelete = isDelete ? 'btn_delete' : '';
   let classNames = `${className} ${(!!value?.length > 0 || !!defaultValue?.length > 0) ? "text" : ""}`;

   const handleUpdatePhone = (e) => {
      if (isPhone) {
         onChange(e.target.value.replace(/[^-+ ()0-9]/, ''));
      }
   }

   return (
      <>
         <div className={classDelete}>
            <CFormInput
               onChange={isNumber ? handleUpdatePhone : onChange}
               onBlur={onBlur}
               onFocus={onFocus}
               value={value}
               className={classNames}
               defaultValue={defaultValue}
               type={type}
               floatingLabel={label}
               placeholder={placeholder}
               invalid={!!invalid}
               valid={!!valid}
               name={name}
               disabled={disabled}
               autoComplete={autoComplete}
               {...obj}
            />
            {
               isDelete && (
                  <button className="bnt-delet-ite" onClick={() => { onDelete(id) }}>
                     <Icon svg={deleteIcon} />
                  </button>
               )
            }
         </div>
         {
            !!textError && (
               <div className="error-text-in">{textError}</div>
            )
         }
      </>
   )
}
export default React.memo(Input);