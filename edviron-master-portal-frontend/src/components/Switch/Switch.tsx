import React from "react";

const Switch = ({ options, selected, set_selected }: any) => {
  return (
    <div className="switch flex my-auto font-light">
      <div className={selected === 0 ? "" : "text-gray-400"}>{options[0]}</div>
      <div
        className="switch-holder flex bg-violet-300 h-5 w-12 mx-5 rounded cursor-pointer"
        onClick={() => {
          set_selected((selected + 1) % 2);
        }}
      >
        <div
          className={
            "transform duration-300 switch-display bg-violet-600 h-5 w-5 shadow rounded " +
            (selected ? "ml-[28px]" : "")
          }
        ></div>
      </div>
      <div className={selected === 1 ? "" : "text-gray-400"}>{options[1]}</div>
    </div>
  );
};

export default Switch;
