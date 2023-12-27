import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../../assets/logo.svg";
export function NestedSidebarItem({
  icon,
  name,
  onTap,
  className,
  children,
  path,
  set_path,
}: any) {
  const [open, set_open] = useState(false);
  return (
    <div className={className + " nested-sidebar-item "}>
      <div
        className={
          "sidebar-item items-center gap-6 p-3 my-3 rounded-lg cursor-pointer hover:bg-violet-500 text-white font text-sm flex w-100 "
        }
        onClick={() => {
          set_open(!open);
          // onTap();
        }}
      >
        {icon && (
          <div className="icon">
            <img className="w-3 h-3" src={icon} alt="" />{" "}
          </div>
        )}
        <div className="name">{name}</div>
        <i className={"fa-solid fa-angle-up " + (open ? "" : "rotate-180")}></i>
      </div>

      <div className="pl-10">
        {open
          ? children.map((c: any) => {
              return React.cloneElement(c, { path, set_path });
            })
          : null}
      </div>
    </div>
  );
}

export function SidebarItem({
  icon,
  name,
  onTap,
  className,
  to,
  path,
  set_path,
}: any) {
  return (
    <Link to={to} className={className}>
      <div
        className={
          "sidebar-item flex items-center gap-6 p-3 my-3 rounded-lg cursor-pointer hover:bg-violet-500 text-white font text-sm " +
          (path === to ? "bg-violet-500" : "")
        }
        onClick={() => {
          set_path(to);
          if (onTap) onTap();
        }}
      >
        {icon && (
          <div className="icon">
            <img className="w-3 h-3" src={icon} alt="" />{" "}
          </div>
        )}
        <div className="name">{name}</div>
      </div>
    </Link>
  );
}

export function Sidebar({ children }: any) {
  const [path, set_path] = useState(window.location.pathname);

  const location = useLocation();
  useEffect(() => {
    // conssole.log(location);
    set_path(location.pathname);
  }, [location.pathname]);
  //eslint-disable-next-line
  // const [open, set_open] = useState(true);

  return (
    <div className="sidebar-container min-h-screen p-5 flex w-72 sticky top-0">
      <div className={` bg-violet-600 w-full  rounded-3xl flex flex-col`}>
        {/* <img src={user.school.logo_url} alt="" /> */}
        <div className="school_name mx-auto font-medium text-[24px] my-10 capitalize  text-white">
          <img src={Logo} alt="logo" />
        </div>
        <div className="sidebar-items p-3 flex flex-col h-full">
          {children.map((c: any) => {
            return React.cloneElement(c, { path, set_path });
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
