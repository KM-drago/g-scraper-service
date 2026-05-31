// Validates the X-API-Key header against keys stored in env
const VALID_KEYS = (process.env.API_KEYS || "").split(",").map((k) => k.trim());

export default function auth(req, res, next) {
  const key = req.headers["x-api-key"];

  if (!key || !VALID_KEYS.includes(key)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}
