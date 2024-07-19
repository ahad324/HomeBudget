import React from "react";
import { Form, NavLink } from "react-router-dom";
// Assets
import logomark from "../assets/logomark.svg";
// Library "react-icons"
import { IoTrash } from "react-icons/io5";

const nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to={"/"} aria-label="Go to home">
        <img src={logomark} alt="" />
        <span>HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Delete User and All Data?")) {
              event.preventDefault();
            }
          }}
        >
          {" "}
          <button type="submit" className="btn btn--warning">
            Delete User
            <IoTrash />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default nav;
