const express = require("express");
const { exec } = require("youtube-dl-exec");
const stream = require("stream");

const router = express.Router();

router.get("/", async (req, res) => {
  const videoUrl = req.query.url;
  const quality = req.query.quality || "best";

  if (!videoUrl) {
    return res
      .status(400)
      .json({ error: "Invalid or missing YouTube video URL" });
  }

  try {
    const videoTitle = await exec(videoUrl, {
      getTitle: true,
    }).then((output) => output.stdout.trim());

    // Sanitize the title to avoid illegal file name characters
    const sanitizedTitle = videoTitle.replace(/[^a-zA-Z0-9]/g, "_");

    // Stream the video directly to the client using youtube-dl-exec
    const videoStream = exec(videoUrl, {
      format: quality, // Set the video quality from the query
      output: "-", // Output the video as a stream
    });

    // Set the headers to indicate a file download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${sanitizedTitle}.mp4"`
    );
    res.setHeader("Content-Type", "video/mp4");

    // Stream the video content directly to the client
    videoStream.stdout.pipe(res);

    videoStream.on("error", (err) => {
      console.error("Error streaming video:", err);
      res.status(500).json({ error: "Failed to stream video" });
    });
  } catch (err) {
    console.error("Error processing video:", err);
    res.status(500).json({ error: "Error occurred while processing video" });
  }
});

module.exports = router;
