"use client";

import { locationSearchAtom, searchPointAtom, selectedPermitsAtom } from "@/store/store";
import { statusStyles, typeIcons } from "@/types/defaults";
import { FacilityType, PermitStatus } from "@/types/enums";
import bbox from "@turf/bbox";
import distance from "@turf/distance";
import { featureCollection, point } from "@turf/helpers";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapRef, Marker, NavigationControl, Popup, Map as ReactMap } from "react-map-gl/maplibre";

export default function Map({ data }: { data: Permit[] }) {
  const [selectedPermits, setSelectedPermits] = useAtom(selectedPermitsAtom);
  const [locationSearch, setLocationSearch] = useAtom(locationSearchAtom);
  const [searchPoint, setSearchPoint] = useAtom(searchPointAtom);

  const [popup, setPopup] = useState<Permit | null>(null);

  const mapRef = useRef<MapRef>(null);

  const collection = useMemo(() => {
    return featureCollection(data.map((permit) => point([permit.longitude, permit.latitude], { id: permit.id })));
  }, [data]);

  useEffect(() => {
    mapRef.current?.fitBounds(
      bbox(
        featureCollection(
          selectedPermits.map((id) => collection.features.find((feature) => feature.properties.id === id)!)
        )
      ) as [number, number, number, number],
      {
        padding: 100,
        duration: 2000,
      }
    );
  }, [collection.features, selectedPermits]);

  return (
    <ReactMap
      ref={mapRef}
      initialViewState={{
        latitude: 37.76,
        longitude: -122.43,
        zoom: 12,
      }}
      maxZoom={17}
      mapStyle={`https://api.maptiler.com/maps/streets-v4/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
      onClick={(event) => {
        if (locationSearch) {
          setLocationSearch(false);
          const searchPoint = point([event.lngLat.lng, event.lngLat.lat]);
          setSearchPoint(searchPoint);

          const nearestFeatures = collection.features
            .map((feature) => ({
              id: feature.properties.id,
              distance: distance(searchPoint, feature),
              feature,
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);

          setSelectedPermits(nearestFeatures.map((f) => f.id));
        }
      }}
    >
      <NavigationControl position="bottom-right" />

      {data.map((permit) => {
        const Icon = typeIcons[permit.type as FacilityType];
        const isSelected = selectedPermits.includes(permit.id);
        return (
          <Marker
            key={permit.id}
            longitude={permit.longitude}
            latitude={permit.latitude}
            onClick={() => setSelectedPermits([permit.id])}
          >
            <div onMouseOver={() => setPopup(permit)} onMouseOut={() => setPopup(null)}>
              <div
                className={`relative ${isSelected ? "ring-4 ring-blue-500 rounded-full p-2 bg-blue-50 shadow-xl" : ""}`}
              >
                <Icon className={`h-8 w-8 ${statusStyles[permit.status as PermitStatus].fill} drop-shadow-lg`} />
              </div>
            </div>
          </Marker>
        );
      })}

      {searchPoint && (
        <Marker longitude={searchPoint.geometry.coordinates[0]} latitude={searchPoint.geometry.coordinates[1]} />
      )}

      {popup && (
        <Popup longitude={popup.longitude} latitude={popup.latitude} closeButton={false}>
          <div className="text-black">
            <h2 className="font-bold">{popup.applicant} </h2>
            <p>{popup.address}</p>
            <p>{popup.food}</p>
            <span
              className={`${statusStyles[popup.status as PermitStatus].bg} ${
                statusStyles[popup.status as PermitStatus].contrastText
              } text-xs font-medium px-1.5 py-0.5 rounded`}
            >
              {popup.status}
            </span>
          </div>
        </Popup>
      )}
    </ReactMap>
  );
}
