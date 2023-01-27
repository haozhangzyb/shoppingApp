import express from "express";

import connectDB from "./config/connectDB.js";

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// default route
app.get("/", (req, res) => res.send("Project2 API Running"));

// Define Routes

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
