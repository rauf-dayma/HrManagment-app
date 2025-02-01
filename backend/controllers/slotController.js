import Slot from '../models/Slot.js';

export const createSlot = async (req, res) => {
    try {
        const { startTime, endTime, candidateName } = req.body;
        const existingSlot = await Slot.findOne({
            $or: [
                { startTime: { $lt: endTime, $gt: startTime } },
                { endTime: { $lt: endTime, $gt: startTime } }
            ]
        });
        if (existingSlot) return res.status(400).json({ message: 'Time slot conflict' });
        
        const newSlot = new Slot({
            hr: req.user.id,
            startTime,
            endTime,
            candidateName
        });
        await newSlot.save();
        res.status(201).json(newSlot);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getSlots = async (req, res) => {
    try {
        const slots = await Slot.find().populate('hr', 'name email');
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateSlot = async (req, res) => {
    try {
        const { startTime, endTime, candidateName } = req.body;
        const slot = await Slot.findById(req.params.id);

        if (!slot) {
            return res.status(404).json({ message: "Slot not found" });
        }

        // Check if the new time slot conflicts with any existing slot (excluding itself)
        const existingSlot = await Slot.findOne({
            _id: { $ne: req.params.id }, // Exclude the current slot from the check
            $or: [
                { startTime: { $lt: endTime, $gt: startTime } },
                { endTime: { $lt: endTime, $gt: startTime } }
            ]
        });

        if (existingSlot) {
            return res.status(400).json({ message: "Time slot conflict" });
        }

        // Update the slot
        slot.startTime = startTime || slot.startTime;
        slot.endTime = endTime || slot.endTime;
        slot.candidateName = candidateName || slot.candidateName;

        const updatedSlot = await slot.save();
        res.json(updatedSlot);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const deleteSlot = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);
        if (!slot) return res.status(404).json({ message: 'Slot not found' });
        await slot.deleteOne();
        res.json({ message: 'Slot removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
