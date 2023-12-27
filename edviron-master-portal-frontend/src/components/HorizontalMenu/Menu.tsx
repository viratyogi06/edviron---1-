import React from "react";
import { Link } from "react-router-dom";

export const Menu = ({ children }: any) => {
  const [path, set_path] = React.useState(window.location.pathname);
  return (
    <div className="menu w-full">
      <div className="rounded-md bg-violet-200  px-5 flex gap-12">
        {children.map((child: any, i: number) =>
          React.cloneElement(child, { key: i, path, set_path })
        )}
      </div>
    </div>
  );
};

export const MenuItem = ({ name, path, set_path, to }: any) => {
  const active = path === to;
  return (
    <Link to={to} onClick={() => set_path(to)}>
      <div className={"menu-item cursor-pointer font-medium text"}>
        <div className="menu-item-name pt-2 pb-1 mx-2">{name}</div>
        {active && <div className="rounded-t h-1 bg-violet-500 w-full"></div>}
      </div>
    </Link>
  );
};
