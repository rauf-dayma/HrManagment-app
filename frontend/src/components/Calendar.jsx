import React from "react";
import "./styles/CalendarComponent.css";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const formatTime = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const CalendarComponent = ({ slots, onDeleteSlot, onUpdateSlot }) => {
  if (!slots || slots.length === 0) {
    return <p className="no-slots">No available slots.</p>;
  }

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Available Slots</h2>
      <ul className="slot-list">
        {slots.map((slot) => (
          <li key={slot._id} className="slot-item">
            <div className="slot-details">
              <p>
                <strong>Candidate:</strong> {slot.candidateName}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(slot.startTime)}
              </p>
              <p>
                <strong>Time:</strong> {formatTime(slot.startTime)} -{" "}
                {formatTime(slot.endTime)}
              </p>
            </div>
            <div className="slot-actions">
              <button
                className="update-btn"
                onClick={() => onUpdateSlot(slot)} // Pass the whole slot to onUpdateSlot
              >
                Update
              </button>

              <button
                className="delete-btn"
                onClick={() => onDeleteSlot(slot._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;
