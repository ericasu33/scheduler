import React, { useEffect } from "react";
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode"


export default function Appointment({ id, time, interview, interviewers, bookInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .catch(err => transition(ERROR_SAVE, true))
  };

  const cancel = () => {
    transition(DELETE, true)

    bookInterview(id)
      .then(res => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  }

  useEffect(() => {
    if (mode === EMPTY && interview) {
      transition(SHOW)
    }

    if(mode === SHOW && !interview) {
      transition(EMPTY)
    }
  }, [interview, mode, transition])

  return (
    <article 
      className="appointment"
      data-testid="appointment"
      >
      <Header 
        time={time}
      />

      {mode === EMPTY &&
        <Empty 
          onAdd={() => transition(CREATE)}
        />
      }

      {mode === SHOW && interview &&
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        /> 
      }
    
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      }  

      {mode === EDIT &&
        <Form
          student={interview.student}
          interviewerId={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      }       

      {mode === SAVE &&
        <Status message={"Saving"} />
      }

      {mode === DELETE &&
        <Status message={"Deleting"} />
      }

      {mode === CONFIRM &&
        <Confirm 
          message={"Are you sure you want to delete?"}
          onConfirm={() => cancel()}
          onCancel={() => back()}
        /> 
      }

      {mode === ERROR_SAVE &&
      <Error 
        message={"Unable to save appointment"}
        onClose={() => back()}
      />
        }

      {mode === ERROR_DELETE &&
        <Error
          message={"Unable to delete appointment"}
          onClose={() => back()}
        />
      }
    </article>
  )
}

