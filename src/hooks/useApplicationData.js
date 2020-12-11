import React, { useState, useEffect } from "react";
import axios from 'axios'


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysUrl = "/api/days"
    const appointmentUrl = "/api/appointments"
    const interviewersUrl = "/api/interviewers"

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentUrl),
      axios.get(interviewersUrl),
    ]).then(([days, appointments, interviewers]) => {
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }))
    })
  }, [])

  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id] }
    const appointmentUrlWithId = `/api/appointments/${id}`

    appointment.interview = { ...interview }

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }

    if (!interview) {
      appointment.interview = null;

      return axios.delete(appointmentUrlWithId)
        .then(res => {
          setState({ ...state, appointments })
        })
    }

    return axios.put(appointmentUrlWithId, { interview })
      .then(res => {
        setState({ ...state, appointments })
      })
  }



  return { state, setDay, bookInterview}
}