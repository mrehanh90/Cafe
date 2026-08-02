// pulled this out of app.js so it's testable without a browser/DOM
function filterCafes(cafes, { query = '', feature = 'all' } = {}) {
  const q = query.trim().toLowerCase();

  return cafes.filter((cafe) => {
    const matchesQuery =
      !q ||
      cafe.name.toLowerCase().includes(q) ||
      cafe.address.toLowerCase().includes(q) ||
      cafe.description.toLowerCase().includes(q);

    const matchesFeature = feature === 'all' || cafe.features.includes(feature);

    return matchesQuery && matchesFeature;
  });
}

// haversine distance in km, used for the "near me" sort
function distanceKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sortByDistance(cafes, userLat, userLng) {
  return [...cafes]
    .filter((c) => c.lat && c.lng)
    .sort(
      (a, b) =>
        distanceKm(userLat, userLng, a.lat, a.lng) -
        distanceKm(userLat, userLng, b.lat, b.lng)
    );
}

module.exports = { filterCafes, distanceKm, sortByDistance };
