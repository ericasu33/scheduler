import { useEffect, useReducer } from "react";
import axios from 'axios'

import reducer, 
  { SET_DAY, 
    SET_INTERVIEW, 
    SET_APPLICATION_DATA
  } from "../reducers/application";

export default function useApplicationData() {


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
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onmessage = function(event) {
      const interview = JSON.parse(event.data)
      dispatch({ 
        type: interview.type,
        id: interview.id,
        interview: interview.interview,
      })
    }

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