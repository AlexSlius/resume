

import Icon from "../../../components/Icon"
import deleteIcon from "/public/images/icons/delete.svg??sprite";
import dragIcon from "/public/images/icons/many-dots.svg?sprite";
import { StartsComponent } from "../../../components/starts";

export const ActiveItemSkillsAndStarts = ({
    onDelete = () => { },
    ratingChanged = () => { },
    id = null,
    label = "",
    valueStats = 0,
    position,
    provided,
    isStar = true,
}) => {

    return (
        <div
            className="active-item-skills-starts"
            ref={provided.innerRef}
            {...provided.draggableProps}
        >
            <div className="active-item-skills-starts__row">
                <span className="btn-drops"  {...provided.dragHandleProps}>
                    <Icon svg={dragIcon} />
                </span>
                <div className="active-item-skills-starts__center">
                    <span>{label}</span>
                    {
                        isStar && (
                            <div className="active-item-skills-starts__str">
                                <StartsComponent
                                    activeCol={valueStats}
                                    onHandle={(value) => ratingChanged(id, {
                                        name: label,
                                        level: value,
                                        position: position
                                    })} />
                            </div>
                        )
                    }
                </div>
                <button className="bnt-delet-ite" onClick={() => { onDelete(id) }}>
                    <Icon svg={deleteIcon} />
                </button>
            </div>
        </div>
    )
}