import SkillItem from "./SkillItem";
import ReactStars from "react-rating-stars-component";

const ModifyItems = ({
   arr = [],
   changeItem,
}) => {
   return (
      <div className="skills">
         {
            arr.map((skill) => {
               return (
                  <SkillItem
                     key={skill.id}
                     id={skill.id}
                     // selected={skill.selected}
                     text={skill.name}
                     onChange={changeItem}
                  />
               )
            })
         }
      </div>
   )
}
export default ModifyItems;