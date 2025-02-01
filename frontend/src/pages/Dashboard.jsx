import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CalendarComponent from "../components/Calendar";
import SlotForm from "../components/SlotForm";
import "./Dashboard.css";

const API_BASE_URL = "https://hrmanagment-app-2.onrender.com";

const Dashboard = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const token = localStorage.getItem("token");

  // Fetch Slots
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if token is missing
      return;
    }

    const fetchSlots = async () => {
      try {
        const response = await fetch(API_BASE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch slots");
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [token, navigate]); // Add token & navigate as dependencies

  // Create Slot
  const handleCreate = async (slotData) => {
    if (!token) return;
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(slotData),
      });
      if (!response.ok) throw new Error("Failed to create slot");

      const newSlot = await response.json();
      setSlots((prevSlots) => [...prevSlots, newSlot]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Update Slot
  const handleUpdate = async (id, updatedData) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {  // Make sure `id` is passed in the URL, not the whole `slot` object.
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData), // Use the updated slot information
      });

      if (!response.ok) throw new Error("Failed to update slot");

      const updatedSlot = await response.json();

      // Update the slots in the state
      setSlots((prevSlots) =>
        prevSlots.map((slot) => (slot._id === id ? updatedSlot : slot))
      );

      // Reset selectedSlot to null after successful update
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Delete Slot
  const handleDelete = async (id) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete slot");

      setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">HR Dashboard</h1>
      {/* Use the SlotForm for creating or updating a slot */}
      <SlotForm
        onSubmit={selectedSlot ? (updatedData) => handleUpdate(selectedSlot._id, updatedData) : handleCreate}
        initialData={selectedSlot} // Pass the selectedSlot data if it's being updated
      />
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <CalendarComponent
          slots={slots}
          onDeleteSlot={handleDelete}
          onUpdateSlot={setSelectedSlot} // Set the selected slot when Update is clicked
        />
      )}
    </div>
  );
};

export default Dashboard;
