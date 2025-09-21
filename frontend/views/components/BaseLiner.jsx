// BaseLiner.js
import React from "react";

export const BaseLiner = ({ className = "", property1=0 }) => {
  let bgColor = "#d1d5db"; // default gray

  if (property1 === 0) bgColor = "#d1d5db"; // light gray
  if (property1 <50) bgColor = "#fbbf24"; // amber
  if (property1 >50) bgColor = "#16a34a"; // green

  return (
    <div
      className={`h-2 rounded-full ${className}`}
      style={{
        background: `linear-gradient(to right, ${bgColor} ${property1}%, #f3f4f6 ${property1}%)`,
      }}
    />
  );
};
