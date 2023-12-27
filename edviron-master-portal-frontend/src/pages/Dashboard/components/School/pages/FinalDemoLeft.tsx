import React from "react";
import FinalDemoCard from "./FinalDemoCard";
import BackButton from "../../../../../components/BackButton/BackButton";

function FinalDemoLeft({ schools }: any) {
  return (
    <div>
      <BackButton label="Final Demo Left" />

      {schools?.map((school: any) => (
        <FinalDemoCard key={school._id} school={school} />
      ))}
    </div>
  );
}

export default FinalDemoLeft;
