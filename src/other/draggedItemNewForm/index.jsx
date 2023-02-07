import uuid from "react-uuid";
import { isArray } from "lodash";

import deleteIcon from "/public/images/icons/delete.svg??sprite";
import dragIcon from "/public/images/icons/many-dots.svg?sprite";
import arrowLeft from "/public/images/icons/arrow-left.svg?sprite";
import Icon from "../../components/Icon";
// import { useState } from "react";


const DraggedItemNewForm = ({
    isOpen = false,
    moreThanOne = false,
    title = "",
    skillsList = null,
    children,
    setSelected = () => { },
    selected = false,
}) => {
    return (
        <>
            {
                moreThanOne ? (
                    <div
                        className="dragged_main dragged_main_new"
                    >
                        <div
                            className={`dragged__item dragged__item_new p-3 d-flex justify-content-between align-items-center gap-2 ${isOpen ? 'selected' : ''}`}
                            onClick={() => { setSelected(isOpen ? "tr" : "new") }}
                        >
                            {/* <span className="dragged__drag w-20 icon-hover">
                    {
                        isDraf && (
                            <Icon svg={dragIcon} classNames={['icon-28']} />
                        )
                    }
                </span> */}
                            <div className="dragged__content w-100">
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
                            <span className="dragged__arrow icon-hover">
                                <Icon svg={arrowLeft} classNames={['icon-20']} />
                            </span>
                        </div>
                        <div className="dragged_from">
                            {isOpen && children}
                        </div>
                    </div>
                ) : (
                    children
                )
            }
        </>
    );
};

export default DraggedItemNewForm;
