export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(oneDay => oneDay.name === day);
  
  // if filtered array contains no data, return the empty array
  if (selectedDay.length < 1) {
    return selectedDay;
  }

  const listOfAppointments = selectedDay[0].appointments.map(id => {
    for (const appointment in state.appointments) {
      if (id === state.appointments[appointment].id) {
        return state.appointments[appointment];
      }
    }
    return null;
  });

  return listOfAppointments;
};

export function getInterview(state, interview) {
  const selectedInterview = {};
  
  if (!interview) {
    return null;
  }

  Object.keys(state.interviewers).forEach(key => {
    if (state.interviewers[key].id === interview.interviewer) {
      selectedInterview.student = interview.student;
      selectedInterview.interviewer = state.interviewers[key];
    }
  });

  return selectedInterview;
};