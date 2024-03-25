// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    starrActive: false,
  }
  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }
  onChageDate = event => {
    this.setState({dateInput: event.target.value})
  }
  onSubmitAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const convertedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: convertedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }
  onStarredAppointments = () => {
    this.setState(prevState => ({starrActive: !prevState.starrActive}))
  }

  starringApp = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appintmentsList.map(appointment => {
        if (appointment.id === id) {
          return {...appointment, isStarred: !appointment.isStarred}
        }
        return appointment
      }),
    }))
  }
  getAppointments = () => {
    const {starrActive, appointmentsList} = this.state
    if (starrActive) {
      const updatedAppointmentsList = appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
      return updatedAppointmentsList
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, appointmentsList} = this.state
    const showAppointments = this.getAppointments()
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmitAppointment}>
            <h1>Add Appointment</h1>
            <input
              onChange={this.onChangeTitle}
              type="text"
              id="text"
              value={titleInput}
            />
            <label htmlFor="text">TITLE</label>
            <input
              onChange={this.onChageDate}
              type="date"
              id="date"
              value={dateInput}
            />
            <label htmlFor="date">DATE</label>
            <button type="submit">ADD</button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </form>
          <hr />
          <div>
            <div>
              <h1>Appointments</h1>
              <button onClick={this.onStarredAppointments}>starred</button>
            </div>
            <ul>
              {showAppointments.map(eachAppointment => (
                <AppointmentItem
                  appointment={eachAppointment}
                  key={eachAppointment.id}
                  starringApp={this.starringApp}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
