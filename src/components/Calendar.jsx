import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventForm from "./EventForm";

const SessionCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSaveEvent = (event) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [selectedDate.toISOString()]: event,
    }));
  };

  return (
    <div className="session-calendar">
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <EventForm onSaveEvent={handleSaveEvent} />
      <div>
        <h2>Selected Events</h2>
        {events[selectedDate.toISOString()] && (
          <p>{events[selectedDate.toISOString()]}</p>
        )}
      </div>
    </div>
  );
};

export default SessionCalendar;
