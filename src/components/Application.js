import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";

import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview } from "../helpers/selectors"


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  const setDay = day => setState({...state, day});

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

  
  const dailyAppointments = getAppointmentsForDay(state, state.day);


  const appointmentList = 
    dailyAppointments.map((appointment) => {
      const interviewDetails = getInterview(state, appointment.interview)

      return (
        <Appointment
          {...appointment}
          key={appointment.id}
          interview={interviewDetails}
        />
      )
    })

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
          days = {state.days}
          day = {state.day}
          setDay = {setDay}
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
        <Appointment
          key="last"
          time="5pm"
        />
      </section>
    </main>
  );
}
