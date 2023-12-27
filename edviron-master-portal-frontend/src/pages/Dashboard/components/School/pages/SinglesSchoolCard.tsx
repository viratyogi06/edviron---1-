import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../../../../components/BackButton/BackButton";
import SchoolDetails from "./SchoolDetails";

function SinglesSchoolCard({ schools }: any) {
  const { id } = useParams();
  const school = schools.filter((school: any) => {
    return school._id === id;
  });
  return (
    <div>
      <BackButton to="/school_profile" label={school[0]?.name} />
      <SchoolDetails school={school} />
    </div>
  );
}

export default SinglesSchoolCard;
