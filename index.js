/* Your Code Here */
const createEmployeeRecord = (employeeArray)=>{
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployees = (multipleEmployeesArray)=>{
    return multipleEmployeesArray.map((employeeArray) =>{
        return createEmployeeRecord(employeeArray)
    })
}

const createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    }); return this
}

const createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    }); return this
}


const hoursWorkedOnDate = function(date){
    let inEvent = this.timeInEvents.find(function(event){
        return event.date === date
    })
    let outEvent = this.timeOutEvents.find(function(event){
        return event.date === date
    }); return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(date){
    let wage = hoursWorkedOnDate.call(this, date)
        * this.payPerHour; return parseFloat(wage.toString())
}

const allWagesFor = function(){
    let allDates = this.timeInEvents.map(function(event){return event.date})

    let total = allDates.reduce(function(sum, date){
        return sum + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0)
    return total
}

const createEmployeeRecords = function(sourceArrays) {
  return sourceArrays.map(function(employeRecord){
    return createEmployeeRecord(employeRecord)
  })
}

const findEmployeebyFirstName = function(srcArray, firstName) {
  return srcArray.find(function(record){
    return record.firstName === firstName
  })
}

const calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(allRecords, record){
        return allRecords + allWagesFor.call(record)}, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }