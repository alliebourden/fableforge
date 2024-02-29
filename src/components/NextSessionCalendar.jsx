import React, { useContext } from "react";
import Calendar from "react-calendar";
import { SessionContext } from "./SessionContext";

const NextSessionCalendar = ({ closeModal }) => {
  const { selectedDates, setSelectedDates } = useContext(SessionContext);

  const handleDateChange = (date) => {
    setSelectedDates([date]);
    closeModal();
  };

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
