import React from "react";

const GradientContainer = ({ children }) => {
  return (
    <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 mb-3 max-w-[80%]">
      <div className="h-full w-full bg-white rounded-md p-3 ">{children}</div>
    </div>
  );
};

export default GradientContainer;
