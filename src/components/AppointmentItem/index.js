// Write your code here
const AppointmentItem = props => {
  const {appointment, starringApp} = props
  const {id, title, date, isStarred} = appointment
  const starrImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const doFavorite = () => {
    starringApp(id)
  }
  return (
    <li>
      <p>{title}</p>
      <p>Date:{date}</p>
      <button onClick={doFavorite} data-testid="star" type="button">
        <img src={starrImage} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
