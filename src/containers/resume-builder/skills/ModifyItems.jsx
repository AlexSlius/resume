import SkillItem from "./SkillItem";

const ModifyItems = ({
   arr = [],
   arrActive = [],
   handleClick = () => { },
   handleClickDelete = () => { },
}) => {
   return (
      <div className="skills">
         {
            arr.length ?
               (
                  arr?.map((skill) => {
                     let result = arrActive.find((item) => item.skillId == skill.id);

                     return (
                        <SkillItem
                           key={skill.id}
                           id={skill.id}
                           text={skill.name}
                           selected={!!result}
                           onClick={handleClick}
                           onClickDelete={handleClickDelete}
                        />
                     )
                  })
               ) : null
         }
      </div>
   )
}
export default ModifyItems;