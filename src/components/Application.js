import React from "react";
import "components/Application.scss";

import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"
import useApplicationData from "hooks/useApplicationData"


export default function Application() {
  const {
    state, 
    setDay, 
    bookInterview,
  } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day)
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = 
    dailyAppointments.map((appointment) => {
      const interviewDetails = getInterview(state, appointment.interview)

      return (
        <Appointment
          {...appointment}
          key={appointment.id}
          interview={interviewDetails}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
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
