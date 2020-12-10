import React from "react";
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

import useVisualMode from "hooks/useVisualMode"


export default function Appointment({ time, interview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

  const { mode, transition, back } = useVisualMode(
    interview? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header 
        time={time}
      />

      {mode === EMPTY &&
        <Empty 
          onAdd={() => console.log("Clicked on Add")}
        />
      }

      {mode === SHOW &&
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        /> 
      }
    </article>
  )
}

