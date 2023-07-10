const token = "RFQvdQyHR82SFC5k6Ii621zSzysjW2Fz9fy3cn8d";

type coord = {
  lng: string;
  lat: string;
};

export async function getSeaRoutes(coords: coord[]) {
  const theCoords = coords.map((c) => `${c.lng},${c.lat}`).join(";");
  const url = `https://api.searoutes.com/route/v2/sea/${theCoords}?continuousCoordinates=true&allowIceAreas=false&avoidHRA=false&avoidSeca=false`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": token,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPortByQuery(query: string) {
  const url = `https://api.searoutes.com/geocoding/v2/port/${query}`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": token,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}