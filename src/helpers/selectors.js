export function getAppointmentsForDay(state, day) {
  // filter from list of days to find the specific day
  const selectedDay = state.days.filter(oneDay => oneDay.name === day);
  
  // if filtered array contains no data, return the empty array
  if (selectedDay.length === 0) {
    return selectedDay;
  }

  // map through each appointment for the day, return the appointment object where its id is equal to the appointment id in the day object
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

  // add the student name and interviewer object to the empty object if the id the interviewer object is equal to the selected interviewer
  Object.keys(state.interviewers).forEach(key => {
    if (state.interviewers[key].id === interview.interviewer) {
      selectedInterview.student = interview.student;
      selectedInterview.interviewer = state.interviewers[key];
    }
  });

  return selectedInterview;
};

export function getInterviewersForDay(state, day) {
  // filter from list of days to find the specific day
  const selectedDay = state.days.filter(oneDay => oneDay.name === day);
  
  // if filtered array contains no data, return the empty array
  if (selectedDay.length < 1) {
    return selectedDay;
  }

  // map through each interviewer for the day, return the interviewer object where its id is equal to the interviewer id in the day object
  const listOfInterviewers = selectedDay[0].interviewers.map(id => {
    for (const interviewer in state.interviewers) {
      if (id === state.interviewers[interviewer].id) {
        return state.interviewers[interviewer];
      }
    }
    return null;
  });

  return listOfInterviewers;
};