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
}