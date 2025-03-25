function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employeeArray => createEmployeeRecord(employeeArray));
  }
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour)
    });
    return employee;
  }
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour)
    });
    return employee;
  }
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
    return 0;
  }
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
  }
  function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}

  
      
  