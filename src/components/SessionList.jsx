import { SessionContext } from "./SessionContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SessionList = () => {
  const { sessions } = useContext(SessionContext);
  const navigate = useNavigate();
  return (
    <div className="sessions">
      <div className="recent-session">
        <div className="last-session-top">
          <p>Last Session</p>
        </div>
        {sessions.length > 0 && (
          <div className="last-session-body">
            <strong>{sessions[sessions.length - 1].header}</strong> -{" "}
            {sessions[sessions.length - 1].date}
            <p>{sessions[sessions.length - 1].body}</p>
          </div>
        )}
      </div>
      <button
        className="add-new-btn"
        onClick={() => navigate("/session-editor")}
      >
        ADD NEW
      </button>
      <div className="all-sessions">
        <div className="all-sessions-top">
          <p>Session List</p>
        </div>
        {sessions &&
          sessions.map((session, index) => (
            <div key={index} className="session-list-body">
              <p>
                <strong>{session.header}</strong> - {session.date}{" "}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SessionList;
