import express from "express";

import connectDB from "./config/connectDB.js";
import usersRoute from "./routes/api/users.js";
import authRoute from "./routes/api/auth.js";
import productRoute from "./routes/api/product.js";

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// default route
app.get("/", (req, res) => res.send("Project2 API Running"));

// Define Routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
