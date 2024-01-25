import { SessionContext } from "./SessionContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SessionIcon from "../../assets/icons/SessionListIcon.svg";
import NextSessionIcon from "../../assets/icons/NextSessionIcon.svg";

const SessionList = () => {
  const { sessions, selectedDates } = useContext(SessionContext);
  const navigate = useNavigate();

  const formatSelectedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };
  return (
    <div className="sessions">
      <div className="recent-session">
        <div className="last-session-top">
          <p>Last Session</p>
          <div className="last-session-top-date">
            {sessions[sessions.length - 1].date}{" "}
          </div>
        </div>
        {sessions.length > 0 && (
          <div className="last-session-body">
            <div className="session-subtitle">
              <div>
                <strong>{sessions[sessions.length - 1].header}</strong>
              </div>{" "}
              {sessions[sessions.length - 1].tags && (
                <p className="last-session-tags">
                  <strong>Tags:</strong>{" "}
                  {sessions[sessions.length - 1].tags.join(", ")}
                </p>
              )}
            </div>
            <p className="body-text">{sessions[sessions.length - 1].body}</p>
          </div>
        )}
      </div>
      <div>
        <div className="next-session">
          <div className="next-session-top">
            <div className="all-sessions-top">
              <img src={NextSessionIcon} height={20} />
              <p>Next Session</p>
            </div>
          </div>
          <p className="session-date-display">
            <strong>Next Session Date:</strong>{" "}
            {selectedDates.map(formatSelectedDate).join(", ")}
          </p>
        </div>
        <div className="all-sessions">
          <div className="all-sessions-top">
            <img src={SessionIcon} height={20} />
            <p>Session List</p>
          </div>
          <div className="list-of-sessions">
            {sessions &&
              sessions.map((session, index) => (
                <div key={index} className="session-list-body">
                  <p>
                    <strong>{session.header}</strong> -{" "}
                    {session.dates && session.dates.join(", ")}
                  </p>
                </div>
              ))}
          </div>
          <div className="add-new-btn-container">
            <button
              className="add-new-btn"
              onClick={() => navigate("/session-editor")}
            >
              ADD NEW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionList;
