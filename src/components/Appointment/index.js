import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // allow use of the functions and state from useVisualMode hook; initial mode dependent on presence of prop.interview
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  // function is called when saving form data
  function save(name, interviewer) {
    // creates new interview object from form submission
    const interview = {
      student: name,
      interviewer
    };

    // want users to visually see that request is being processed
    transition(SAVING);

    // call function to book the interview using the appointment id for that specific block and the new interview object; this returns a promise upon which we transition to showing the appointment
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log(error);
        transition(ERROR_SAVE, true);
      })
  }

  // gets called to transition to a confirm request mode upon clicking delete icon
  function onDelete() {
    transition(CONFIRM);
  }
  
  // gets called when confirming the delete
  function confirmDelete() {
    // want to show users a processing delete screen
    transition(DELETING, true);

    // call the cancel interview function with the appointment id to remove appointment from database; returns a promise in which the user then sees an empty appointment slot
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        console.log(error);
        transition(ERROR_DELETE, true);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => onDelete()}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save} 
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => back()} 
          onConfirm={confirmDelete} 
          message="Are you sure you would like to delete?" 
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save} 
          student={props.interview.student} 
          interviewer={props.interview.interviewer.id} 
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment" 
          onClose={() => back()} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not cancel appointment" 
          onClose={() => back()} 
        />
      )}
    </article>
  );
} 