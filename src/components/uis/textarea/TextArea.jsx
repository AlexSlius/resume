import { CFormTextarea } from '@coreui/react'

const Textarea = ({
   value,
   onChange,
   placeholder,
   name,
}) => {
   return (
      <div className={`textarea__item`}>
         <CFormTextarea
            autocomplete="off"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
         />
      </div>
   )
}
export default Textarea;