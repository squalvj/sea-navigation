const token = process.env.REACT_APP_SEAROUTES_TOKEN ?? ""

type coord = {
  lng: number;
  lat: number;
};

export async function getSeaRoutes(coords: coord[]) {
  const theCoords = coords.map((c) => `${c.lng},${c.lat}`).join(";");
  const url = `https://api.searoutes.com/route/v2/sea/${theCoords}?continuousCoordinates=true`;
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