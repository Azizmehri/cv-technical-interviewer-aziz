import React from "react";
import ReactSpeedometer from "react-d3-speedometer"
export const InputTextArea = ({
  value = "",
  onChange,
  className = "",
  placeholder = "Type here",
  active = false,
  alive = false,
}) => {
  return (
    <textarea
      className={`p-4 rounded-lg border outline-none resize-none text-black ${className} ${
        active ? "border-blue-500" : "border-gray-300"
      } ${alive ? "bg-green-50" : "bg-white"}`}
      placeholder={placeholder}
      value={value}                     // controlled value
      onChange={(e) => onChange(e.target.value)} // call parent with new text
    />
  );
};
