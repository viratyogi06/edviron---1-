import React, { useContext, useState, useEffect } from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard";
import Select from "../Select/Select";
const SelectClassSection = ({
  onChange,
  className,
}: {
  onChange?: any;
  className?: string;
}) => {
  const { classes, sections } = useContext(dashboardContext);
  const [selectedClass, setSelectedClass] = useState(
    sections && { name: sections[0].class }
  );
  const [selectedSection, setSelectedSection] = useState(
    sections && { ...sections[0], name: sections[0].section }
  );

  useEffect(() => {
    onChange && onChange(selectedSection);
  }, []);

  return (
    <div className={className}>
      <Select
        className="mr-5 my-5 w-56"
        options={classes.map((c: string) => {
          return { name: c };
        })}
        selected={selectedClass}
        setSelected={(c: any) => {
          setSelectedClass(c);
          setSelectedSection(
            sections
              .filter((s: any) => s.class === c.name)
              .map((s: any) => {
                return { ...s, name: s.section };
              })[0]
          );
          onChange &&
            onChange(
              sections
                .filter((s: any) => s.class === c.name)
                .map((s: any) => {
                  return { ...s, name: s.section };
                })[0]
            );
        }}
        label="Select Class"
      ></Select>
      <Select
        className="mx-5 my-5 w-56"
        options={sections
          .filter((s: any) => s.class === selectedClass.name)
          .map((s: any) => {
            return { ...s, name: s.section };
          })}
        selected={selectedSection}
        setSelected={(s: any) => {
          setSelectedSection(s);
          onChange && onChange(s);
        }}
        label="Select Section"
      ></Select>
    </div>
  );
};

export default SelectClassSection;
