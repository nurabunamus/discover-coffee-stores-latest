"use client";
import React, { useEffect, useState } from "react";
import Banner from "./banner.client";
import { useTrackLocation } from "@/hooks/use-track-location";
import { CoffeeStoreType } from "@/types";
import Card from "./card.server";
import { fetchCoffeeStores } from "@/lib/coffee-stores";

export default function NearbyCoffeeStores() {
  //useTrackLocation
  const { handleTrackLocation, isFindingLocation, longLat, locationError } =
    useTrackLocation();
  const [coffeeStores, setCoffeeStores] = useState<CoffeeStoreType[]>([]);

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function fetchNearbyCoffeeStores() {
      if (longLat) {
        try {
          const limit = 9;
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          );
          const coffeeStores = await response.json();
          setCoffeeStores(coffeeStores);
        } catch (error) {
          console.error("Error while fetching coffee stores", error);
        }
      }
    }
    fetchNearbyCoffeeStores();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
      />
      {locationError && <div>{locationError} </div>}
      <div className="mt-20">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Stores Near Me
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores.map((coffeeStore: CoffeeStoreType) => (
            <Card
              key={`${coffeeStore.name}-${coffeeStore.id}`}
              name={coffeeStore.name}
              imgUrl={coffeeStore.imgUrl}
              href={`/coffee-store/${coffeeStore.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
