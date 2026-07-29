import React from "react";
function EmergencyButton({ onEmergency }) {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <button
        onClick={onEmergency}
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          backgroundColor: "red",
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(255,0,0,0.5)"
        }}
      >
        🚨
        <br />
        EMERGENCY
      </button>
    </div>
  );
}

export default EmergencyButton;