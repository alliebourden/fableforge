import { SessionContext } from "./SessionContext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionIcon from "../../assets/icons/SessionListIcon.svg";
import NextSessionIcon from "../../assets/icons/NextSessionIcon.svg";
import SessionEditor from "./SessionEditor";
import NextSessionCalendar from "./NextSessionCalendar";

const SessionList = () => {
  const { sessions, selectedDates } = useContext(SessionContext);
  const navigate = useNavigate();
  const calendarModal = useRef(null);
  const editorModal = useRef(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const formatSelectedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const openCalendarModal = () => {
    calendarModal.current.showModal();
  };

  const openEditorModal = () => {
    editorModal.current.showModal();
  };

  const closeModal = () => {
    calendarModal.current.close();
    editorModal.current.close();
  };

  const handleSessionClick = (index) => {
    setSelectedSession(sessions[index]);
  };

  return (
    <div className="sessions">
      <div className="recent-session">
        <div className="last-session-top">
          <p>Session Details</p>
        </div>
        {selectedSession && (
          <div className="last-session-body">
            <div className="session-subtitle">
              <div>
                <div className="last-session-top-date">
                  {selectedSession.date}{" "}
                </div>
                <strong>{selectedSession.header}</strong>
              </div>{" "}
              {selectedSession.tags && (
                <p className="last-session-tags">
                  <strong>Tags:</strong> {selectedSession.tags.join(", ")}
                </p>
              )}
            </div>
            <p className="body-text">{selectedSession.body}</p>
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
          <div className="next-session-body">
            <p className="session-date-display">
              <strong>Next Session Date:</strong>
              <span className="selected-date-display">
                {selectedDates.map(formatSelectedDate).join(", ")}
              </span>
            </p>
            <button className="next-session-button" onClick={openCalendarModal}>
              ADD NEXT SESSION
            </button>
            <dialog className="modal" ref={calendarModal}>
              <NextSessionCalendar closeModal={closeModal} />
            </dialog>
          </div>
        </div>
        <div className="all-sessions">
          <div className="all-sessions-top">
            <img src={SessionIcon} height={20} />
            <p>Session List</p>
          </div>
          <div className="list-of-sessions">
            {sessions &&
              sessions.map((session, index) => (
                <div
                  key={index}
                  className="session-list-body"
                  onClick={() => handleSessionClick(index)}
                >
                  <p>
                    <strong>{session.header}</strong> - {session.date}{" "}
                  </p>
                </div>
              ))}
          </div>
          <div className="add-new-btn-container">
            <button className="add-new-btn" onClick={openEditorModal}>
              ADD NEW
            </button>
            <dialog className="modal" ref={editorModal}>
              <SessionEditor closeModal={closeModal} />
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionList;
