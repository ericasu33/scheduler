import React from "react";
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode"


export default function Appointment({ id, time, interview, interviewers, bookInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer,
    };

    transition(SAVE)

    bookInterview(id, interview)
      .then(res => transition(SHOW))
  }

  return (
    <article className="appointment">
      <Header 
        time={time}
      />

      {mode === EMPTY &&
        <Empty 
          onAdd={() => transition(CREATE)}
        />
      }

      {mode === SHOW &&
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        /> 
      }

      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      }      

      {mode === SAVE &&
        <Status message={"Saving"} />
      }
    </article>
  )
}

