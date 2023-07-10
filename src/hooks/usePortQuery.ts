import { useEffect, useState } from "react";
import { Map } from "mapbox-gl";
import { initMap } from "../utils/initMap";
import { getPortByQuery } from "./../utils/searoute";
import { TCoordinates } from "../types/coordinates";
import { Suggestion } from "../components/SearchBox";

const transformSuggestions = (
  suggestions: Record<string, any>[]
): Suggestion<[string, string]>[] => {
  return suggestions.map((item) => ({
    value: item.geometry?.coordinates,
    label: item.properties?.name,
  }));
};

export const usePortQuery = (query: string = "") => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion<[string, string]>[]>([]);
  const [q, setQ] = useState(query);
  const [error, setError] = useState("");

  const getPort = async (s: string) => {
    setLoading(true);
    setError("");
    try {
      await getPortByQuery(s).then((data) => {
        setSuggestions(transformSuggestions(data.features));
      });
    } catch (_) {
      setError("There is error on query operation");
    }

    setLoading(false);
  };

  return {
    loading,
    suggestions,
    q,
    error,
    getPort,
  };
};
