import { CFormInput } from "@coreui/react"
import React from "react"

const Input = ({
   onChange = () => { },
   value,
   label = null,
   placeholder = "",
   type = "text",
   className = "",
   invalid = false,
   valid = false,
   name = '',
   obj,
}) => {
   return (
      <CFormInput
         onChange={onChange}
         value={value}
         className={`${className}`}
         type={type}
         floatingLabel={label}
         placeholder={placeholder}
         invalid={!!invalid}
         valid={!!valid}
         name={name}
         {...obj}
      />
   )
}
export default React.memo(Input);