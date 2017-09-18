/**
 * Tiny helper method to make requesting API endpoints a little DRY-er
 * @param {String} method the last.fm api method
 * @param {Object} args the graphql arguments
 * @return {Object} json response
 */
const request = (method, args) => {
  return fetch(
  `${process.env.API_ENDPOINT}${method}&user=${args.username}&limit=${args.limit}&api_key=${process.env.API_KEY}&format=json`
  )
  .then(response => response.json());
}
