import React from "react";
import { useEffect, useState } from "react";
import LoadingIcon from "../../assets/loading-purple.svg";
const LoadAndRender = ({
  promise,
  children,
  height,
  className,
  reload_upon_change,
}: any) => {
  const height_class: any = {
    full: "h-full",
    screen: "min-h-screen",
  };
  useEffect(() => {
    set_loading(true);
    promise().then(() => {
      set_loading(false);
    }); // eslint-disable-next-line
  }, [...(reload_upon_change || [])]);

  const [loading, set_loading] = useState(true);

  return (
    <div
      className={
        className +
        " load-and-render w-full  flex " +
        (height_class[height || "screen"] as string)
      }
    >
      {loading ? (
        <div className="flex mx-auto my-auto loading">
          <img src={LoadingIcon} alt="" srcSet="" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadAndRender;
