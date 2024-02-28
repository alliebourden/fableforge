import { SessionContext } from "./SessionContext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionIcon from "../../assets/icons/SessionListIcon.svg";
import NextSessionIcon from "../../assets/icons/NextSessionIcon.svg";
import SessionEditor from "./SessionEditor";

const SessionList = () => {
  const { sessions, selectedDates } = useContext(SessionContext);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const formatSelectedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
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
          <p className="session-date-display">
            <strong>Next Session Date:</strong>
            <span className="selected-date-display">
              {selectedDates.map(formatSelectedDate).join(", ")}
            </span>
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
            <button className="add-new-btn" onClick={openModal}>
              ADD NEW
            </button>
            <dialog className="modal" ref={modalRef}>
              <SessionEditor closeModal={closeModal} />
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionList;
