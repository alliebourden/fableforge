import { SessionContext } from "./SessionContext";
import { useContext } from "react";

const SessionList = () => {
  const { sessions } = useContext(SessionContext);
  return (
    <div className="sessions">
      <div className="recent-session">
        <h2>Sessions</h2>
        <ul>
          {sessions &&
            sessions.map((session, index) => (
              <li key={index}>
                <strong>{session.header}</strong> - {session.date} -{" "}
                {session.body}
              </li>
            ))}
        </ul>
      </div>
      <div className="session-list">
        <h2>Sessions</h2>
        <ul>
          {sessions &&
            sessions.map((session, index) => (
              <li key={index}>
                <strong>{session.header}</strong> - {session.date} -{" "}
                {session.body}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SessionList;
