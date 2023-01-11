import { CFormTextarea } from '@coreui/react'

import PrewrittenTextarea from './PrewrittenTextarea';
import Icon from "../../Icon"

import boldIcon from '/public/images/icons/bold-text.svg?sprite'
import italicIcon from '/public/images/icons/italic-text.svg?sprite'
import uIcon from '/public/images/icons/u-text.svg?sprite'
import linkIcon from '/public/images/icons/link-text.svg?sprite'
import list1Icon from '/public/images/icons/list.svg?sprite'
import list2Icon from '/public/images/icons/list2.svg?sprite'
import copyIcon from '/public/images/icons/copy-link.svg?sprite'

const Textarea = ({
   hideButton,
   prewrite,
   prewriteButtonHandler,
   prewritePopupShow,
   prewriteItems,
   value,
   onChange,
   // selectedPrewriteItems, 
   // setSelectedPrewriteItems, 
   currentValueId,
   ...rest }) => {

   let isActivebtnClass = hideButton ? 'no_active_panel' : 'active_panel';

   const clickHandler = (e) => {
      e.preventDefault();
   }

   return (
      <div className={`textarea__item ${isActivebtnClass}`}>
         {prewrite ? (
            <PrewrittenTextarea
               prewriteButtonHandler={prewriteButtonHandler}
               prewritePopupShow={prewritePopupShow}
               prewriteItems={prewriteItems}
               value={value}
               onChange={onChange}
               // selectedPrewriteItems={selectedPrewriteItems}
               // setSelectedPrewriteItems={setSelectedPrewriteItems}
               className="prewrite-textarea"
               currentValueId={currentValueId}
               {...rest}
            />
         ) : (
            <CFormTextarea
               value={value}
               onChange={onChange}
               {...rest}
            >
            </CFormTextarea>)
         }
         {hideButton || <div className="textarea__contols">
            <button onClick={clickHandler} className="textarea__button">
               <Icon svg={boldIcon} classNames={['icon-20']} />
            </button>
            <button onClick={clickHandler} className="textarea__button">
               <Icon svg={italicIcon} classNames={['icon-20']} />
            </button>
            <button onClick={clickHandler} className="textarea__button">
               <Icon svg={uIcon} classNames={['icon-20']} />
            </button>
            <button onClick={clickHandler} className="textarea__button">
               <Icon svg={linkIcon} classNames={['icon-20']} />
            </button>
            <div className="textarea__button-group">
               <button onClick={clickHandler} className="textarea__button">
                  <Icon svg={list1Icon} classNames={['icon-20']} />
               </button>
               <button onClick={clickHandler} className="textarea__button">
                  <Icon svg={list2Icon} classNames={['icon-20']} />
               </button>
            </div>
            <button onClick={clickHandler} className="textarea__button">
               <Icon svg={copyIcon} classNames={['icon-20']} />
            </button>
         </div>}
      </div>
   )
}
export default Textarea;