import Icon from '../../../components/Icon'

import addIcon from '/public/images/icons/plus.svg?sprite'
import deleteIcon from '/public/images/icons/remove.svg?sprite'

const SkillItem = ({
   selected,
   id,
   text,
   onChange
}) => {
   return (
      <div
         className="skills__item d-flex gap-2 align-items-center"
         onClick={(e) => onChange(id, e)}
      >
         {text}
         <button className="skills__button">
            {selected ? <Icon svg={deleteIcon} classNames={['icon-20']} /> : <Icon svg={addIcon} classNames={['icon-20']} />}
         </button>
      </div>
   )
}
export default SkillItem;