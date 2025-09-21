import React from "react";

export const LogicPercentage = ({ className = "", property1 = 0, divClassName = "" }) => {
  return (
    <div className={`text-sm font-bold ${className}`}>
      <span className={divClassName}>{Math.round(property1)}%</span>
    </div>
  );
};
