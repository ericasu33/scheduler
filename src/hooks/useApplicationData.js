import { useEffect, useReducer } from "react";
import axios from 'axios'

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch(action.type) {
      case SET_DAY: {
        return ({...state, day: action.day})
      }
      case SET_APPLICATION_DATA: {
        return({
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
         })
      }
      case SET_INTERVIEW: {
        const appointment = { ...state.appointments[action.id] }
        appointment.interview = action.interview;

        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        }

        const newState = {...state, appointments}

        const getDaysWithNewSpots = (state) => {
          return state.days.map(day => {
            const spots = day.appointments.filter(appointment => !state.appointments[appointment].interview).length

            return { ...day, spots };
          })
        }

        const days = getDaysWithNewSpots(newState);

        return({
          ...state,
          appointments,
          days,
        })
      }

      default: {
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  }) 

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const daysUrl = "/api/days"
    const appointmentUrl = "/api/appointments"
    const interviewersUrl = "/api/interviewers"

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentUrl),
      axios.get(interviewersUrl),
    ]).then(([days, appointments, interviewers]) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      })
    })
  }, [])

  const bookInterview = (id, interview) => {
    const appointmentUrlWithId = `/api/appointments/${id}`

    if (!interview) {
      return axios.delete(appointmentUrlWithId)
        .then(() => {
          dispatch({
            type: SET_INTERVIEW,
            interview: null,
            id,
          })
        })
    }

    return axios.put(appointmentUrlWithId, { interview })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          interview,
          id,
        })
      })
  }



  return { state, setDay, bookInterview}
}