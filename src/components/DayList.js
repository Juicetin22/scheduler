import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const listOfDays = props.days.map(day => {
    if (day.name === props.day) {
      return <DayListItem key={day.id} name={day.name} spots={day.spots} setDay={props.setDay} selected /> 
    } else {
      return <DayListItem key={day.id} name={day.name} spots={day.spots} setDay={props.setDay} /> 
    }
  })
  
  return (
    <ul>{listOfDays}</ul>
  );
}