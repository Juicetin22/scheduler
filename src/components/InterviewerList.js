import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log(props);

  const listOfInterviewers = props.interviewers.map(interviewer => {
    if (interviewer.id === props.interviewer) {
      return <InterviewerListItem key={interviewer.id} name={interviewer.name} id={interviewer.id} avatar={interviewer.avatar} setInterviewer={props.setInterviewer} selected />
    } else {
      return <InterviewerListItem key={interviewer.id} name={interviewer.name} id={interviewer.id} avatar={interviewer.avatar} setInterviewer={props.setInterviewer} />
    }
  });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listOfInterviewers}</ul>
    </section>

  );
}