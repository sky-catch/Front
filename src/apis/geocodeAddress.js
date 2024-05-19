export const geocodeAddress = async (address) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`
  );
  const data = await response.json();
  console.log("data", data);
  if (data.length > 0) {
    return { lat: data[0].lat, lon: data[0].lon };
  } else {
    throw new Error("Address not found");
  }
};
