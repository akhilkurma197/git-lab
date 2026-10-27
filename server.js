
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(express.static("frontend"));

const client = new MongoClient("mongodb://127.0.0.1:27017");
let students;

// GET all students
app.get("/students", async (req, res) => {
    const list = await students.find().toArray();
    res.json(list);
});

// POST: add a student
app.post("/students", async (req, res) => {
    const { name, usn, semester, branch } = req.body;

    if (!name || !usn) {
        return res.status(400).json({
            message: "name and usn are required"
        });
    }

    await students.insertOne({
        name, usn, semester: Number(semester), branch
    });

    res.status(201).json({
        message: "Student added successfully"
    });
});

// PUT: update a student by USN
app.put("/students/:usn", async (req, res) => {
    const result = await students.updateOne(
        { usn: req.params.usn },
        { $set: req.body }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json({ message: "Student updated" });
});

// DELETE a student by USN
app.delete("/students/:usn", async (req, res) => {
    const result = await students.deleteOne({
        usn: req.params.usn
    });

    if (result.deletedCount === 0) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json({ message: "Student deleted" });
});

async function start() {
    await client.connect();

    students = client.db("CollegeDB").collection("students");

    console.log("Connected to MongoDB");

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

start();
