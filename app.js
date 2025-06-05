const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;
const allowedOrigins = [
  "https://bao-hom-nay-frontend.vercel.app/",
  "http://localhost:5173" 
];
app.use(cors({
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true)
		}
		else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
	res.send("Backend is running");
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`App started at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err.message);
    process.exit(1); 
  }
};

startServer();

module.exports = app;
