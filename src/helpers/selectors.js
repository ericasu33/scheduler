export function getAppointmentsForDay(state, day) {
  const result = []

  const selectedDay = state.days.filter(dayDetail =>  dayDetail.name === day);
  if (selectedDay.length < 1) {
    return result;
  }
  
  const appointments = selectedDay[0].appointments;

  for (const appointment of appointments) {
    if (state.appointments[appointment]) {
      result.push(state.appointments[appointment])
    }
  }

  return result;
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }

  const interviewCopy = { ...interview}
  interviewCopy.interviewer = state.interviewers[interview.interviewer];
  
  return interviewCopy;
}

export function getInterviewersForDay (state, day) {
  const result = []

  const selectedDay = state.days.filter(dayDetail => dayDetail.name === day);
  if (selectedDay.length < 1) {
    return result;
  }

  const interviewers = selectedDay[0].interviewers;

  for (const interviewer of interviewers) {
    if (state.interviewers[interviewer]) {
      result.push(state.interviewers[interviewer])
    }
  }

  return result;
}