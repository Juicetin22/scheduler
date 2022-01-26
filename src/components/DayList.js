import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // retrieve an array of individual day components using the props sent from Application
  const days = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id} 
        name={day.name} 
        spots={day.spots} 
        setDay={props.onChange} 
        selected={day.name === props.value} 
      />
    ); 
  });
  
  return (
    <ul>{days}</ul>
  );
}