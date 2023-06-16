import { CFormTextarea } from '@coreui/react'

const Textarea = ({
   value,
   onChange,
   placeholder,
   name,
   textError = "",
}) => {
   return (
      <div className={`textarea__item`}>
         <CFormTextarea
            autoComplete="off"
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            name={name}
         />
          {
            !!textError && (
               <div className="error-text-in">{textError}</div>
            )
         }
      </div>
   )
}
export default Textarea;