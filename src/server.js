import express, { json } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import scrapeRoutes from "./routes/scrape.js";

const app = express();

// Security headers
app.use(helmet());
app.use(json());

// Rate limiting — 60 requests per minute per API key/IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: "Too many requests, slow down." },
});
app.use(limiter);

// Routes
app.use("/api", scrapeRoutes);

// Health check (no auth needed — useful for DO health probes)
app.get("/health", (req, res) => res.json({ status: "ok" }));

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not found" }));

export default app;
