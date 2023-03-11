import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DropdownEdit.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const EditDots = React.forwardRef(({ onClick }, ref) => (
    <i
    className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

export const DropdownEdit = () => {
    return (
      <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={EditDots} />

      <Dropdown.Menu className="text-center" popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item
        className={styles.DropdownItem}
        onClick={() => {}}
        aria-label="edit">
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
        classname={styles.DropdownItem}
        onClick={() => {}}
        aria-label="delete">
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
  
 