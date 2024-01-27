import { SessionContext } from "./SessionContext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestTrackerForm from "./QuestTrackerForm";
import SelectedQuestDetails from "./SelectedQuestDetails";

const QuestTracker = () => {
  const { quests } = useContext(SessionContext);
  const modalRef = useRef(null);
  const [selectedQuest, setSelectedQuest] = useState(null);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
    openModal();
  };

  const mainQuests = quests.filter((quest) => quest.type === "mainQuest");
  const sideQuests = quests.filter((quest) => quest.type === "sideQuest");

  return (
    <div className="quest-tracker">
      <div className="quest-tracker-top">
        <p>Quest Tracker</p>
      </div>
      <div className="quest-list">
        <div className="main-quests-list">
          <h2>Main Quests</h2>
          {mainQuests.map((quest, index) => (
            <div
              key={index}
              className="quest-list-item"
              onClick={() => handleQuestClick(quest)}
            >
              <p>
                <strong>{quest.header}</strong>
              </p>
            </div>
          ))}
        </div>
        <div className="side-quests-list">
          <h2>Side Quests</h2>
          {sideQuests.map((quest, index) => (
            <div
              key={index}
              className="quest-list-item"
              onClick={() => handleQuestClick(quest)}
            >
              <p>
                <strong>{quest.header}</strong>
              </p>
            </div>
          ))}
        </div>
        <div className="add-new-btn-container">
          <button className="add-new-btn" onClick={openModal}>
            NEW QUEST
          </button>
          <dialog className="modal" ref={modalRef}>
            <QuestTrackerForm closeModal={closeModal} />
          </dialog>
        </div>
      </div>
      <div className="selected-quest-details">
        {selectedQuest && <SelectedQuestDetails quest={selectedQuest} />}
      </div>
    </div>
  );
};

export default QuestTracker;
