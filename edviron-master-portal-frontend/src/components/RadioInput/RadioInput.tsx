import React, { useState, useEffect } from "react";

const RadioInput = ({
  value,
  options,
  name,
  validator,
  required,
  onChange,
  add_error,
  validate,
}: any) => {
  const [selected, set_selected] = React.useState(options[value]);
  const [error, set_error] = useState("");

  const _validator = validator
    ? validator
    : required
    ? (a: any) => (a === "" ? name + " is required" : "")
    : (a: any) => "";

  useEffect(() => {
    if (onChange) onChange(name, selected);
    if (validator) {
      set_error(_validator(selected));
      add_error(name, _validator(selected));
    } //eslint-disable-next-line
  }, []);

  return (
    <div className="checkbox-input text-start my-2 text-sm font-light">
      <label className="block text-sm font-medium leading-6 text-start text-gray-900 my-2">
        {name || ""}
      </label>
      <div className="grid grid-cols-2">
        {options.map((option: string, i: number) => (
          <div key={i}>
            <input
              className="accent-violet-500"
              type="radio"
              name={name}
              id=""
              checked={selected === option}
              onChange={(e) => {
                set_selected(option);
                if (onChange) onChange(name, option);
                if (_validator) {
                  set_error(_validator(e.target.value));
                  add_error(name, _validator(e.target.value));
                }
              }}
            />{" "}
            {option}
          </div>
        ))}
      </div>
      <span className="text-red-500 text-[13px]">{validate ? error : ""}</span>
    </div>
  );
};

export default RadioInput;
