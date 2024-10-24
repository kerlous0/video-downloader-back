const express = require("express");
const { exec } = require("youtube-dl-exec");

const router = express.Router();

router.get("/", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res
      .status(400)
      .json({ error: "Invalid or missing YouTube video URL" });
  }

  try {
    // Use youtube-dl-exec to get the video title and thumbnail
    const result = await exec(videoUrl, {
      dumpJson: true, // Return video metadata in JSON format
    });

    // Extract title and thumbnail
    const videoInfo = JSON.parse(result.stdout);
    const title = videoInfo.title;

    const thumbnail = videoInfo.thumbnail.split("?")[0];

    // Return the title and thumbnail URL as JSON
    res.status(200).json({
      title,
      thumbnail,
      //   videoInfo,
    });
  } catch (err) {
    console.error("Error fetching video info:", err);
    res.status(500).json({ error: "Failed to fetch video information" });
  }
});

module.exports = router;
