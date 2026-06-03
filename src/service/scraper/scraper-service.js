//call the scraper function here and return the data to the controller
// clean the data and minimize the size of the data before sending it to the controller
import scraper from "../../lib/index.js";

export async function run(url, options = {}) {
  const reviews = await scraper(url, {
    sort_type: "relevant",
    search_query: "",
    pages: "25",
    clean: true,
    experimental: false,
    cookies: { "__Secure-1PSID": "...", "__Secure-1PSIDTS": "..." },
  });
  const cleanedReviews = reviews.map((r) => ({
    review_text: r.review.text,
  }));
  return cleanedReviews;
}

export default { run };
