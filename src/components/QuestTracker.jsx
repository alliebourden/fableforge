import { SessionContext } from "./SessionContext";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SessionIcon from "../../assets/icons/SessionListIcon.svg";
import QuestTrackerForm from "./QuestTrackerForm";

const QuestTracker = () => {
  const { quests } = useContext(SessionContext);
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };
  return (
    <div className="quest-tracker">
      <div className="recent-session">
        <div className="last-session-top">
          <p>Last Session</p>
        </div>
        {quests.length > 0 && (
          <div className="last-session-body">
            <div className="session-subtitle">
              <div>
                <div className="last-session-top-date">
                  {quests[quests.length - 1].type}{" "}
                </div>
                <strong>{quests[quests.length - 1].header}</strong>
              </div>{" "}
            </div>
            <p className="body-text">{quests[quests.length - 1].body}</p>
          </div>
        )}
      </div>
      <div className="list-of-sessions">
        {/* {sessions &&
              sessions.map((session, index) => (
                <div key={index} className="session-list-body">
                  <p>
                    <strong>{session.header}</strong> - {session.date}{" "}
                  </p>
                </div>
              ))} */}
      </div>
      <div className="add-new-btn-container">
        <button className="add-new-btn" onClick={openModal}>
          ADD NEW
        </button>
        <dialog className="modal" ref={modalRef}>
          <QuestTrackerForm closeModal={closeModal} />
        </dialog>
      </div>
    </div>
  );
};

export default QuestTracker;
