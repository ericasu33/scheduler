export function getAppointmentsForDay(stateObj, day) {
  const result = []

  const selectedDay = stateObj.days.filter(dayDetail =>  dayDetail.name === day);
  if (selectedDay.length < 1) {
    return result;
  }
  
  const appointments = selectedDay[0].appointments;

  for (const appointment of appointments) {
    if (stateObj.appointments[appointment]) {
      result.push(stateObj.appointments[appointment])
    }
  }

  return result
}