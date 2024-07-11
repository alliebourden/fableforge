import { SessionContext } from "./SessionContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionIcon from "../../assets/icons/SessionListIcon.svg";
import NextSessionIcon from "../../assets/icons/NextSessionIcon.svg";
import SessionEditor from "./SessionEditor";
import NextSessionCalendar from "./NextSessionCalendar";
import SessionIconDetails from "../../assets/icons/SessionIcon.svg";
import theme from "../Theme";
import { Button, ThemeProvider } from "@mui/material";

const SessionList = () => {
  const { sessions, selectedDates } = useContext(SessionContext);
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  const formatSelectedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const openCalendarModal = () => {
    setIsCalendarModalOpen(true);
  };

  const openEditorModal = () => {
    setIsEditorModalOpen(true);
  };

  const closeModal = () => {
    setIsCalendarModalOpen(false);
    setIsEditorModalOpen(false);
  };

  const handleSessionClick = (index) => {
    setSelectedSession(sessions[index]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isCalendarModalOpen || isEditorModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCalendarModalOpen, isEditorModalOpen]);

  return (
    <ThemeProvider theme={theme}>
      <div className="sessions-content">
        <div className="sessions-left">
          <div className="session-details">
            <div className="session-details-top">
              <img src={SessionIconDetails} height={20} />
              <p>Session Details</p>
            </div>
            {selectedSession && (
              <div className="session-details-body">
                <div>
                  <div>
                    <div className="session-details-date">
                      {selectedSession.date}{" "}
                    </div>
                    <strong>{selectedSession.header}</strong>
                  </div>{" "}
                  {selectedSession.tags && (
                    <p className="session-details-tags">
                      <strong>Tags:</strong> {selectedSession.tags.join(", ")}
                    </p>
                  )}
                </div>
                <p className="session-details-body">{selectedSession.body}</p>
              </div>
            )}
          </div>
        </div>
        <div className="sessions-right">
          <div className="session-list-container">
            <div className="session-list">
              <div className="session-list-top">
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
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={openEditorModal}
                >
                  ADD NEW
                </Button>
                {isEditorModalOpen && (
                  <dialog className="modal" open>
                    <SessionEditor closeModal={closeModal} />
                  </dialog>
                )}
              </div>
            </div>
          </div>
          <div className="next-session-container">
            <div className="next-session">
              <div className="next-session-top">
                <img src={NextSessionIcon} height={20} />
                <p>Next Session</p>
              </div>
              <div className="next-session-body">
                <p className="next-session-date-display">
                  <strong>Next Session Date:</strong>
                  <span className="selected-date-display">
                    {selectedDates.map(formatSelectedDate).join(", ")}
                  </span>
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openCalendarModal}
                  sx={{ mb: 1 }}
                >
                  NEXT SESSION
                </Button>
                {isCalendarModalOpen && (
                  <dialog className="modal" open>
                    <NextSessionCalendar closeModal={closeModal} />
                  </dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SessionList;
