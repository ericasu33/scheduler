import React, {useState} from "react";
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"


//track the following state:
//name:String, interviewer:Number

//actions
//setName, setInterviewer

//props
//name, interviewers:Arr, interviewer, onSave, onCancel

export default function Form({ student, interviewers, interviewerId, onSave, onCancel}) {

  const [name, setName] = useState(student || "")
  const [interviewer, setInterviewer] = useState(interviewerId || null)
  const [error, setError] = useState("")

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  const validateAndSubmit = () => {
    if(!name || !interviewer) {
      
      setError("Please input your name or choose a interviewer")
    } else {
      setError("")
      onSave(name, interviewer)
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
          autoComplete="off"
          onSubmit={event => event.preventDefault()}
        >
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          />

          {error}
        </form>

        <InterviewerList 
          interviewers={interviewers} 
          value={interviewer} 
          onChange={setInterviewer}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button 
            danger
            onClick={cancel}
          >
            Cancel
          </Button>

          <Button 
            confirm
            onClick={validateAndSubmit}
          >
            Save
          </Button>

        </section>
      </section>
    </main>
  )
}