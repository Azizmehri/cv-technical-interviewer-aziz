import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // <-- React Router hook
import {Report} from "./Report"
export const Timer = ({ initialMinutes = 12, initialSeconds = 50 }) => {
  const [secondsLeft, setSecondsLeft] = useState(
    initialMinutes * 60 + initialSeconds
  );

  const intervalRef = useRef(null);
  const navigate = useNavigate(); // <-- for redirect

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          // Redirect to report page
          navigate("/report"); // <-- replace "/report" with your route
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [navigate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="flex flex-col items-center text-[#e08b01]">
      <div className="flex gap-2 text-[48px] font-bold">
        <span>{String(minutes).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
    </div>
  );
};
