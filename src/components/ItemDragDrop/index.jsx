import { CCol } from "@coreui/react";

import Icon from "../Icon"
import deleteIcon from "/public/images/icons/delete.svg??sprite";
import dragIcon from "/public/images/icons/many-dots.svg?sprite";

export const ItemDragDrop = ({
    onDelete = () => { },
    id = null,
    label = "",
    provided,
}) => {
    return (
        <CCol
            xs={6}
            ref={provided.innerRef}
            {...provided.draggableProps}
        >
            <div className="active-item-skills-starts item-drag-drops">
                <div className="active-item-skills-starts__row">
                    <span className="btn-drops" {...provided.dragHandleProps}>
                        <Icon svg={dragIcon} />
                    </span>
                    <div className="active-item-skills-starts__center">
                        <span>{label}</span>
                    </div>
                    <button className="bnt-delet-ite" onClick={() => { onDelete(id) }}>
                        <Icon svg={deleteIcon} />
                    </button>
                </div>
            </div>
        </CCol>
    )
}