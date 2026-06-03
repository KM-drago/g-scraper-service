/**
 * Parses an array of reviews and returns a minified JSON string.
 * @param {any[][]} reviews - Array of review data wrappers.
 * @returns {ParsedReview[]} An array of the parsed reviews.
 */
export default function parseReviews(reviews) {
  if (!Array.isArray(reviews)) return [];
  const parsedReviews = reviews
    .map((item) => {
      const review = Array.isArray(item[0]) ? item[0] : item;
      // Safety check for empty or malformed review wrappers
      if (!review) return null;
      return {
        review_id: review[0],
        time: {
          published: review[1]?.[2],
          last_edited: review[1]?.[3],
        },
        review: {
          rating: review[2]?.[0]?.[0],
          text: review[2]?.[15]?.[0]?.[0] || null,
          language: review[2]?.[14]?.[0] || null,
        },
      };
    })
    .filter((r) => r !== null); // Remove any failed parses
  // Use null, 0 or no arguments for minified JSON as per your docstring
  return parsedReviews;
}
