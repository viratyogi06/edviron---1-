import React from "react";
import LoadingIcon from "../../assets/loading.svg";

function Button({ name, onTap }: { name: string; onTap: () => void }) {
  const [loading, set_loading] = React.useState(false);
  return (
    <button
      className=" my-2 group inline-flex items-center justify-center rounded-full py-3 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
      type="submit"
      onClick={async () => {
        set_loading(true);
        await onTap();
        set_loading(false);
      }}
    >
      <span>
        {loading ? (
          <img className="h-[20px]" src={LoadingIcon} alt="loading..." />
        ) : (
          name
        )}
      </span>
    </button>
  );
}

export default Button;
