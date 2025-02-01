import { useState, useEffect } from "react";
import "./SlotForm.css";
  
const SlotForm = ({ onSubmit, initialData }) => {
  // State management for form fields
  const [startTime, setStartTime] = useState(initialData?.startTime || "");
  const [endTime, setEndTime] = useState(initialData?.endTime || "");
  const [candidateName, setCandidateName] = useState(initialData?.candidateName || "");

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setStartTime(initialData.startTime);
      setEndTime(initialData.endTime);
      setCandidateName(initialData.candidateName);
    }
  }, [initialData]);

  // Handle form submission (both create and update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { startTime, endTime, candidateName };
    onSubmit(formData);  // Will trigger either create or update in parent
  };

  return (
    <form className="slot-form" onSubmit={handleSubmit}>
      <label>Start Time:</label>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />

      <label>End Time:</label>
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />

      <label>Candidate Name:</label>
      <input
        type="text"
        value={candidateName}
        placeholder="Enter candidate name"
        onChange={(e) => setCandidateName(e.target.value)}
        required
      />

      <button type="submit" className="submit-btn">
        {initialData ? "Update Slot" : "Create Slot"}
      </button>
    </form>
  );
};

export default SlotForm;
