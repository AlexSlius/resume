import uuid from "react-uuid";
import { isArray } from "lodash";

import deleteIcon from "/public/images/icons/delete.svg??sprite";
import dragIcon from "/public/images/icons/many-dots.svg?sprite";
import arrowLeft from "/public/images/icons/arrow-left.svg?sprite";
import Icon from "../../components/Icon";
// import { useState } from "react";


const DraggedItem = ({
  id = null,
  isDraf = true,
  lenght = 0,
  title,
  skillsList,
  onDelete,
  children,
  provided,
  index,
  setSelected,
  selected = false,
}) => {
  // const [selected, setSelected] = useState(false);

  return (
    <div
      className="dragged_main"
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div
        className={`dragged__item p-3 d-flex justify-content-between align-items-center gap-2 ${selected ? 'selected' : ''}`}
      >
        <span className="dragged__drag w-20 icon-hover" {...provided.dragHandleProps}>
          {
            isDraf && (
              <Icon svg={dragIcon} classNames={['icon-28']} />
            )
          }
        </span>
        <div className="dragged__content w-100" onClick={() => setSelected(selected ? null : id)}>
          <div className="dragged__title">{title}</div>
          <div className="dragged-items">
            {
              isArray(skillsList) && skillsList.map((skill) => (
                <div className="dragged-item" key={`${skill}_${uuid()}`}>
                  <span>{skill}</span>
                </div>
              ))
            }
          </div>
        </div>
        {selected ? (
          <span onClick={() => setSelected(null)} className="dragged__arrow icon-hover">
            <Icon svg={arrowLeft} classNames={['icon-20']} />
          </span>
        ) : (
          <span onClick={onDelete} className="dragged__delete icon-hover">
            <Icon svg={deleteIcon} classNames={['icon-20']} />
          </span>
        )
        }
      </div>
      <div className="dragged_from">
        {selected && children}
      </div>
    </div>
  );
};

export default DraggedItem;
