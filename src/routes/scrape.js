import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import auth from "../middleware/auth.js";
import { run } from "../service/scraper/scraper-service.js";

const router = Router();

// POST /api/scrape
router.post("/scrape", auth, async (req, res) => {
  const { url, options = {} } = req.body;

  if (!url) {
    return res.status(400).json({ error: "`url` is required" });
  }

  const jobId = uuidv4();
  const startedAt = new Date().toISOString();

  try {
    // Drop in your scraping logic here
    const data = await run(url, options);

    return res.json({
      jobId,
      status: "success",
      startedAt,
      completedAt: new Date().toISOString(),
      url,
      data,
    });
  } catch (err) {
    console.error(`[${jobId}] Scrape failed:`, err.message);
    return res.status(500).json({
      jobId,
      status: "error",
      startedAt,
      url,
      error: err.message,
    });
  }
});

export default router;
