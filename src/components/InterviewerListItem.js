import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  // add additional class depending on whether the interviewer is selected - displays name
  const interviewerClass = classNames("interviewers__item", { "interviewers__item--selected": props.selected });

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        data-testid={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}