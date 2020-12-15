import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss"

import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList( {interviewers, value, onChange }) {
 
  const interviewerList = interviewers.map(interviewerData => 
      <InterviewerListItem
        key={interviewerData.id}
        name={interviewerData.name}
        avatar={interviewerData.avatar}
        selected={interviewerData.id === value}
        setInterviewer={() => onChange(interviewerData.id)}
      />
    )
  

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};