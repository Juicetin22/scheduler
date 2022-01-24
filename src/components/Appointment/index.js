import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING"

export default function Appointment(props) {
  console.log(props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
  // const appointment = (time) => {
  //   if (!time) {
  //     return "No Appointments"
  //   } else {
  //     return `Appointment at ${time}`
  //   }
  // };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function onDelete() {
    transition(CONFIRM);
  }
  
  function confirmDelete() {
    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={confirmDelete} message="Are you sure you would like to delete?"/>}
    </article>
  );
} 