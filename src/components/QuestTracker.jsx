import { SessionContext } from "./SessionContext";
import { useContext, useRef, useState } from "react";
import QuestTrackerForm from "./QuestTrackerForm";
import SelectedQuestDetails from "./SelectedQuestDetails";
import QuestIcon from "../../assets/icons/QuestIcon.svg";
import theme from "../Theme";
import { Button, ThemeProvider } from "@mui/material";

const QuestTracker = () => {
  const { quests, handleRemoveQuest } = useContext(SessionContext);
  const modalRef = useRef(null);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
  };

  const handleRemoveQuestClick = (quest) => {
    handleRemoveQuest(quest);
    setSelectedQuest((prevSelectedQuest) => {
      if (prevSelectedQuest && prevSelectedQuest.id === quest.id) {
        return null;
      }
      return prevSelectedQuest;
    });
  };

  const mainQuests = quests.filter((quest) => quest.type === "mainQuest");
  const sideQuests = quests.filter((quest) => quest.type === "sideQuest");

  return (
    <ThemeProvider theme={theme}>
      <div className="quest-tracker-container">
        <div className="quest-tracker-top">
          <img src={QuestIcon} height={20} />
          <p>Quest Tracker</p>
        </div>
        <div className="quest-tracker-main-contain">
          <div className="quest-list">
            <div className="main-quests-list">
              <h3>Main Quests</h3>
              {mainQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`quest-list-item ${
                    selectedQuest && selectedQuest.id === quest.id ? "selected" : ""
                  }`}
                  onClick={() => handleQuestClick(quest)}
                >
                  <p>
                    <strong>{quest.header}</strong>
                  </p>
                  <p
                    className="remove-quest-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveQuestClick(quest);
                    }}
                  >
                    &#10006;
                  </p>
                </div>
              ))}
            </div>
            <div className="side-quests-list">
              <h3>Side Quests</h3>
              {sideQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`quest-list-item ${
                    selectedQuest && selectedQuest.id === quest.id ? "selected" : ""
                  }`}
                  onClick={() => handleQuestClick(quest)}
                >
                  <p>
                    <strong>{quest.header}</strong>
                  </p>
                  <p
                    className="remove-quest-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveQuestClick(quest);
                    }}
                  >
                    &#10006;
                  </p>
                </div>
              ))}
            </div>
            <div className="add-new-quest-btn-container">
              <button className="add-new-quest-btn" onClick={openModal}>
                NEW QUEST
              </button>
              {isModalOpen && (
                <dialog className="modal" open>
                  <QuestTrackerForm closeModal={closeModal} />
                </dialog>
              )}
            </div>
          </div>
          <div className="selected-quest-details">
            <h3>Selected Quest</h3>
            {selectedQuest && <SelectedQuestDetails quest={selectedQuest} />}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default QuestTracker;
