import SkillItem from "./SkillItem";
import ReactStars from "react-rating-stars-component";

const ModifyItems = ({
   arr = [{ id: 1, name: 'eeee' }],
   changeItem, ratingChanged = () => { },
   visibleRating = true }) => {
   return (
      arr.map((skill) => {
         const stars = <ReactStars
            onChange={(e) => ratingChanged(e, skill.id)}
            count={5}
            // value={skill.level}
            size={14}
            activeColor={'#ffd700'} />;
         return (
            <SkillItem
               key={skill.id}
               id={skill.id}
               visibleRating={visibleRating}
               // rating={stars}
               selected={skill.selected}
               text={skill.name}
               onChange={changeItem}
            />
         )
      })
   )
}
export default ModifyItems;