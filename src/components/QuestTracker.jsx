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

  const mainQuests = quests.filter((quest) => quest.type === "mainQuest");
  const sideQuests = quests.filter((quest) => quest.type === "sideQuest");

  return (
    <div className="quest-tracker">
      <div className="quest-tracker-top">
        <p>Quest Tracker</p>
      </div>
      <div className="quest-list">
        {mainQuests.length > 0 && (
          <div className="main-quests-list">
            <h2>Main Quests</h2>
            {mainQuests.map((quest, index) => (
              <div key={index} className="quest-list-item">
                <p>
                  <strong>{quest.header}</strong>
                </p>
                <p className="body-text">{quest.body}</p>
              </div>
            ))}
          </div>
        )}
        {sideQuests.length > 0 && (
          <div className="side-quests-list">
            <h2>Side Quests</h2>
            {sideQuests.map((quest, index) => (
              <div key={index} className="quest-list-item">
                <p>
                  <strong>{quest.header}</strong>
                </p>
                <p className="body-text">{quest.body}</p>
              </div>
            ))}
          </div>
        )}
        <div className="add-new-btn-container">
          <button className="add-new-btn" onClick={openModal}>
            NEW QUEST
          </button>
          <dialog className="modal" ref={modalRef}>
            <QuestTrackerForm closeModal={closeModal} />
          </dialog>
        </div>
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
    </div>
  );
};

export default QuestTracker;
