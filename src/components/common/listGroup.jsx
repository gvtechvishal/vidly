import React, { Component } from "react";

const ListGroup = (props) => {
  const { items, textProperty, textValue, onItemSelect, selectedItem } = props;
  // console.log(selectedItem)
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[textValue]}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  textValue: "_id",
};

export default ListGroup;
