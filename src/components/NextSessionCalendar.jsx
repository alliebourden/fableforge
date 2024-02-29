import React from "react";
import Calendar from "react-calendar";

const NextSessionCalendar = ({ selectedDates, handleDateChange }) => {
  return (
    <div className="session-calendar">
      <Calendar
        onChange={handleDateChange}
        value={selectedDates}
        selectRange={false}
        onClickDay={(date) => handleDateChange(date)}
      />
    </div>
  );
};

export default NextSessionCalendar;
