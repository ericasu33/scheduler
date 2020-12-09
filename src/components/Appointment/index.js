import React from "react";
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";


export default function Appointment({ time, interview }) {
  return (
    <article className="appointment">
      <Header 
        time={time}
      />

    {interview ? 
      <Show 
        student={interview.student}
        interviewer={interview.interviewer}
      /> : <Empty />}
    </article>
  )
}

