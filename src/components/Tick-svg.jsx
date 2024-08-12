import React from "react";

const Tick_svg = ({color}) => {
  return (
    <div>
      <svg
        className={`stroke-green-500 fill-none group-hover:fill-green-300 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300`}
        viewBox="0 0 24 24"
        height="50px"
        width="50px"
      >
        <path
          strokeWidth="1.3"
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        ></path>
        <path
          d="M7 12 L10 15 L16 9"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default Tick_svg;
