import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  // group all states into one state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // whenever setDay is called, update the day state
  const setDay = day => setState({ ...state, day });

  // request data from database using axios, once returned, set state to replace initial state with data received
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    }).catch(error => console.log(`Error: ${error.message}`));
  }, []);

  // function to add appointment interview data from form submission into the database
  function bookInterview(id, interview) {
    
    // update specific appointment by replacing the null interview with the interview object passed in
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    // add the new appointment into the list of appointments, replacing the specific appointment from the list
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // filter to find the specific day that was booked and the index of the day, which will be used to place the changed day correctly into days array
    const dayBooked = state.days.filter(day => day.name === state.day)
    const dayIndex = state.days.findIndex(day => day.name === state.day)

    // day that contains the new interview; the day has 1 less appointment with interview: null object; ternary operator to prevent spots change if just editing the appointment
    const updateSpot = {
      ...dayBooked[0],
      spots: (state.appointments[id].interview ? dayBooked[0].spots : dayBooked[0].spots - 1)
    }

    // replace the previous state of that specific day in the array of days with the updated day, to adjust spots remaining
    const days = [
      ...state.days.slice(0, dayIndex),
      updateSpot,
      ...state.days.slice(dayIndex + 1)
    ]

    // return promise to save function in Appointment/index
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {        
        setState(prev => ({...prev, appointments, days}));
      });
  }   
  
  // function to cancel interview for specified appointment
  function cancelInterview(id) {
    
    // update the specific appointment to chang interview to null
    const cancelledAppointment = {
      ...state.appointments[id],
      interview: null
    };

    // add the cancelled appointment into the list of appointments, replacing the specific appointment from the list
    const appointments = {
      ...state.appointments,
      [id]: cancelledAppointment
    };
    
    // filter to find the specific day that was booked and the index of the day, which will be used to place the changed day correctly into days array
    const dayBooked = state.days.filter(day => day.name === state.day)
    const dayIndex = state.days.findIndex(day => day.name === state.day)

    // day that contains the now cancelled interview, which means the day has 1 more appointment with interview: null object
    const updateSpot = {
      ...dayBooked[0],
      spots: (dayBooked[0].spots + 1)
    }

    // replace the previous state of that specific day in the array of days with the updated day, to adjust spots remaining
    const days = [
      ...state.days.slice(0, dayIndex),
      updateSpot,
      ...state.days.slice(dayIndex + 1)
    ]

    // return promise to confirmDelete function in Appointment/index
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {        
        setState(prev => ({...prev, appointments, days}));
      });
  }

  // allows Application to use
  return { state, setDay, bookInterview, cancelInterview };
}