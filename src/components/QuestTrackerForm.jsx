import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SessionContext } from "./SessionContext";
import AddSessionIcon from "../../assets/icons/AddSessionIcon.svg";

const QuestTrackerForm = ({ closeModal }) => {
  const { quests, handleAddQuest } = useContext(SessionContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    handleAddQuest(data);

    closeModal();
    reset();
  };

  return (
    <div className="quest-form-content">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="quest-form"
        method="dialog"
      >
        <div className="add-new-quest">
          <img src={AddSessionIcon} height={20} />
          <p>Add New Quest</p>
        </div>
        <div className="quest-form-top-section">
          <div className="quest-title">
            <label htmlFor="header">Quest Title</label>
            <input
              type="text"
              id="header"
              {...register("header", { required: true })}
            />
          </div>
          <div className="quest-type">
            <label htmlFor="type">Quest Type</label>
            <select id="type" {...register("type", { required: true })}>
              <option value="">Select a quest type</option>
              <option value="mainQuest">Main Quest</option>
              <option value="sideQuest">Side Quest</option>
            </select>
          </div>
        </div>
        <div className="quest-details-body">
          <label htmlFor="body">Quest details</label>
          <textarea id="body" {...register("body", { required: true })} />
        </div>
        <div className="submit-btn">
          <button type="submit" className="submit-new-quest">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestTrackerForm;
