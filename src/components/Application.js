import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // retrieve from hook to use in the component
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // retrieve the appointments for a particular day using the current state and day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // retrieve the interviewers that are available for a particular day
  const interviewersForDay = getInterviewersForDay(state, state.day);

  // create the array of Appointment components for the day - each component receieves info from an individual appointment as props
  const appointmentList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview={interview} 
        interviewers={interviewersForDay} 
        bookInterview={bookInterview} 
        cancelInterview={cancelInterview} 
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
