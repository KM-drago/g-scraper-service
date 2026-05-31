/**
 * Parses raw GetLocalBoqProxy review arrays into the standard ParsedReview format.
 * @param {any[][]} reviews - Array of review data from GetLocalBoqProxy.
 * @returns {ParsedReview[]} An array of parsed reviews.
 */
function _parseReview(review) {
    if (!review || !Array.isArray(review))
        return null;
    return {
        review_id: review[5] || "",
        time: {
            published: review[2] && Array.isArray(review[2]) ? review[2][0] : null,
            last_edited: null,
        },
        review: {
            rating: typeof review[1] === "number" ? review[1] : 0,
            text: review[11] || null,
            language: null,
        },
    };
}
/**
 * Parses raw GetLocalBoqProxy review arrays into the standard ParsedReview format.
 * @param {any[][]} reviews - Array of review data from GetLocalBoqProxy.
 * @returns {ParsedReview[]} An array of parsed reviews.
 */
export default function boqParser(reviews) {
    if (!Array.isArray(reviews))
        return [];
    const parsedReviews = reviews.map(_parseReview).filter((r) => r !== null);
    return parsedReviews;
}
