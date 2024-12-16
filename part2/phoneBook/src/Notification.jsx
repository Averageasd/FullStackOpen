import notificationTypeConstants from "./constants/NotificationType";
import "./index.css";

const Notification = (props) => {
  const { type, message } = props;
  if (message === "") {
    return null;
  }
  if (type == notificationTypeConstants.SUCCESS) {
    return <div className="notification success">{message}</div>;
  }
  return <div className="notification error">{message}</div>;
};

export default Notification;
