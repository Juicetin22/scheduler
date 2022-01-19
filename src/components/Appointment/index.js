import React from "react";

import "./styles.scss";

export default function Appointment(props) {
  
  const appointment = (time) => {
    if (!time) {
      return "No Appointments"
    } else {
      return `Appointment at ${time}`
    }
  };

  return (
    <article className="appointment">{appointment(props.time)}</article>
  );
} 