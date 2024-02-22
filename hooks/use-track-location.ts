"use client";

import { useState } from "react";

export const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setLongLat] = useState("");
  const [locationError, setLocationError] = useState("");

  function success(position: {
    coords: { latitude: number; longitude: number };
  }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLat(`${latitude}, ${longitude}`);

    setIsFindingLocation(false);
    setLocationError("");
    console.log(
      "Latitude is " + latitude + "°, Longitude is " + longitude + "°"
    );
  }

  function error() {
    setIsFindingLocation(false);
    setLocationError("Unable to retrieve your location");
    console.error("Unable to retrieve your location");
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setLocationError("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      setIsFindingLocation(true);
      setLocationError("");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return { handleTrackLocation, isFindingLocation, longLat, locationError };
};
