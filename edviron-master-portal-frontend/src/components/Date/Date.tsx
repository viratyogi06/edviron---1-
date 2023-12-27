import React, { useEffect, useState } from "react";

const Date = ({ selected, onChange, name, required }: any) => {
  const [date, setDate] = useState();

  useEffect(() => {
    onChange(date);
  }, [date]);

  return (
    <>
      <label className="block text-sm font-medium leading-6 mb-2 text-start text-gray-900">
        {name || ""}
      </label>
      <input
        value={selected}
        className="w-full py-1.5 px-4 bg-whit//when day is clickede border-2 border-gray-300 rounded-md text-sm outline-0"
        type="date"
        onChange={(e: any) => setDate(e.target.value)}
        onSelect={(e: any) => setDate(e.target.value)}
        required={required}
      />
    </>
  );
};

export default Date;
