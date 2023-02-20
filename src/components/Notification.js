const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const { body, type } = message

  return <p className={`notification ${type}`}>{body}</p>
}

export default Notification
