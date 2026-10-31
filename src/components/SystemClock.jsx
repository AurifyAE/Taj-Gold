import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const SystemClock = () => {
  const [timeData, setTimeData] = useState({
    day: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const DAYS = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ];

      const dayStr = DAYS[now.getDay()];
      const MONTHS = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];

      const dateStr = `${String(now.getDate()).padStart(2, "0")} ${
        MONTHS[now.getMonth()]
      } ${now.getFullYear()}`;

      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setTimeData({
        day: dayStr,
        date: dateStr,
        time: timeStr,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Glass Container */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.2vw",
          padding: "0.5vw 2vw",
          borderRadius: "2vw",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.82) 0%, rgba(250, 245, 236, 0.75) 50%, rgba(244, 236, 222, 0.82) 100%)",
          border: "1px solid rgba(218, 178, 106, 0.45)",
          boxShadow:
            "0 0.4vw 1.2vw rgba(138, 84, 18, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Date */}
        <Typography
          sx={{
            fontSize: {
              xs: "12px",
              sm: "1.7vw",
            },
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#8A5A18", // Luxury Burnished Gold
            lineHeight: "1",
          }}
        >
          {timeData.date || "-- --- ----"}
        </Typography>
        {/* Day */}
        <Typography
          sx={{
            fontSize: {
              xs: "11px",
              sm: "1vw",
            },
            color: "#181512", // Deep Charcoal Black
            letterSpacing: "2px",
            fontWeight: 600,
            lineHeight: "1",
          }}
        >
          {timeData.day || "-----"}
        </Typography>
      </Box>
    </Box>
  );
};

export default SystemClock;
