import React, { useState, useEffect } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // want to track the states for the following variables
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const [interviewerError, setInterviewerError] = useState("");

  // function that is called within cancel function to reset states
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("");
    setInterviewerError("");
  };

  // function that calls function from props (eventually calls back()) that brings mode back to previous
  const cancel = () => {
    reset();
    props.onCancel();
  }
  
  // function that gets called when saving the form
  const validate = () => {
    
    // prevents form from being submitted if both student input field is empty and interviewer is not selected
    if (student === "" && interviewer === null) {
      setError("Student name cannot be blank");
      setInterviewerError("An interviewer must be selected");
      return;
    }
    
    // prevents form from being submitted if student input field is empty
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    // prevents form from being submitted if interviewer is not selected
    if (interviewer === null) {
      setInterviewerError("An interviewer must be selected");
      return;
    }

    // if the checks pass, return error state to initial and call props.onSave function with the form data
    setError("");
    setInterviewerError("");
    props.onSave(student, interviewer)
  };

  // remove interviewer error message after appearing once an interviewer is selected
  useEffect(() => {
    setInterviewerError("");
  }, [interviewer]);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter student name here"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
              setError("");
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <section className="appointment__validation">{interviewerError}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>

  );
}