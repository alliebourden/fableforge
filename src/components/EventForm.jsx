import React, { useState } from "react";

const EventForm = ({ onSaveEvent }) => {
  const [event, setEvent] = useState("");

  const handleEventChange = (e) => {
    setEvent(e.target.value);
  };

  const handleSaveEvent = () => {
    onSaveEvent(event);
    setEvent("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter event"
        value={event}
        onChange={handleEventChange}
      />
      <button onClick={handleSaveEvent}>Save Event</button>
    </div>
  );
};

export default EventForm;
