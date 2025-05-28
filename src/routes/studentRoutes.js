// Student Routes
import express from "express";
import Student from "../models/studentModel.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { regNo, name, email } = req.body;
    const newStudent = new Student({ regNo, name, email });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:regNo", async (req, res) => {
  try {
    const student = await Student.findOne({ regNo: req.params.regNo });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:regNo", async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { regNo: req.params.regNo },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:regNo", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ regNo: req.params.regNo });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
