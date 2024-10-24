const express = require("express");
const thumbnail = require("./src/routes/thumbnailRoute");
const download = require("./src/routes/downloadRoute");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/thumbnail", thumbnail);
app.use("/download", download);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
