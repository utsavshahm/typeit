import React from "react";
import "./TextB.css";

function TextB({
  placeholder,
  required = false,
  name,
  msg,
  register,
  type = "text",
}) {
  return (
    <div>
      <div className="custom-textbox">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="custom-input"
          {...register(name, {
            required: required ? msg : "",
          })}
        />
      </div>
    </div>
  );
}

export default TextB;
