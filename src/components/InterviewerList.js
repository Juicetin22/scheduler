import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // return an array of InterviewerListItem components using the props sent from Application
  const interviewers = props.interviewers.map(interviewer => {
    return (
    <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      setInterviewer={() => props.onChange(interviewer.id)} 
      selected={interviewer.id === props.value} 
    />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>

  );
}

// making sure that the list of interviewers is an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};