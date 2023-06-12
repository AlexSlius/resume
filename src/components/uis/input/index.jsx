import { CFormInput } from "@coreui/react"
import React from "react"
import { useSelector } from "react-redux";

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
   placeholder = '',
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
   readOnly = true,
}) => {
   const {
      theme: {
         currentResolution
      }
   } = useSelector(state => state);

   let isMob = ['md', 'sm', 'xs'].includes(currentResolution);
   let classDelete = isDelete ? 'btn_delete' : '';
   let classNames = `${className} ${(!!value?.length > 0 || !!defaultValue?.length > 0) ? "text" : ""}`;

   const handleUpdatePhone = (e) => {
      if (isPhone) {
         onChange(e.target.value.replace(/[^-+ ()0-9]/, ''));
      }
   }

   const onFocusHa = (e) => {
      if (readOnly && !isMob) {
         setTimeout(() => {
            e.target.removeAttribute('readonly');
            e.target.focus();
         }, 100);
      }

      onFocus(e);
   }

   const handleBlur = (e) => {
      if (readOnly && !isMob) {
         e.target.setAttribute('readonly', true);
      }

      onBlur(e);
   }

   return (
      <>
         <div className={classDelete}>
            <CFormInput
               id={id}
               onChange={isNumber ? handleUpdatePhone : onChange}
               onBlur={handleBlur}
               onFocus={onFocusHa}
               value={value || ''}
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
               readOnly={isMob ? false : readOnly}
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