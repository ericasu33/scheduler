import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";

import DayList from "components/DayList"
import Appointment from "components/Appointment"


const appointments = [
  {
    id: 1,
    time: "10am",
    interview: {
      student: "John Smith",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 2,
    time: "12pm",
  },
  {
    id: 3,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "Tora Su",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
  },
];


export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    const url = "/api/days"
    axios.get(url)
      .then(res => setDays(res.data))
  }, [])
  
  const appointmentList = 
    appointments.map((appointment) => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
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
          days = {days}
          day = {day}
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
