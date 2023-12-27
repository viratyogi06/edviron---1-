import React from "react";

import { useNavigate } from "react-router-dom";
function BackButton({ to, label }: any) {
  const navigate = useNavigate();
  return (
    <div className="mt-2 ml-2 flex items-center py-2">
      <div className="pr-4 cursor-pointer" onClick={() => navigate(-1)}>
        <i className="fa-solid text-2xl fa-chevron-left"></i>
      </div>

      <div className=" text-2xl font-semibold text-violet-600">{label}</div>
    </div>
  );
}

export default BackButton;
