require("dotenv").config();
require("./config/database");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

// middleware
// app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// set multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// authRouter
app.use("/api/auth", require("./routes/auth"));

// userRouter
app.use("/api/users", require("./routes/user"));

// postRouter
app.use("/api/posts", require("./routes/post"));

// categoryRouter
app.use("/api/categories", require("./routes/category"));

app.listen(process.env.PORT, () => {
  console.log(`server is runing on port ${process.env.PORT}`);
});
