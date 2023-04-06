import { CFormInput } from "@coreui/react"
import React from "react"

import Icon from "../../Icon";
import Input from "../input";

import style from "./Style.module.scss";
import iconSearch from "/public/images/icons/search-grey.svg?sprite";

const InputSearch = ({
   onChange = () => { },
   handleServerRequest = () => { },
   value,
   label = null,
   placeholder = "",
   type = "text",
   className = "",
   name = 'search',
   nTimeMs = 500,
}) => {
   const refIdTimeout = React.useRef(undefined);

   React.useEffect(() => {
      if (value) {
         if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
         }

         refIdTimeout.current = setTimeout(async () => {
            await handleServerRequest(value);
            clearTimeout(refIdTimeout.current);
         }, nTimeMs);
      }
   }, [value])

   return (
      <div className={style.wr}>
         <Input
            onChange={onChange}
            autoComplete="off"
            label={label}
            type={type}
            value={value}
            name={name}
            className={`${className}`}
            placeholder={placeholder}
         />
         <Icon svg={iconSearch} />
      </div>
   )
}
export default React.memo(InputSearch);