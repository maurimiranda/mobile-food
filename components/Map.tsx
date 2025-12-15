"use client";

import {
  locationSearchAtom,
  searchPointAtom,
  selectedPermitsAtom,
  statusFilterAtom,
  typeFilterAtom,
} from "@/store/store";
import { statusStyles, typeIcons } from "@/types/defaults";
import { FacilityType, PermitStatus } from "@/types/enums";
import bbox from "@turf/bbox";
import distance from "@turf/distance";
import { featureCollection, point } from "@turf/helpers";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapRef, Marker, NavigationControl, Popup, Map as ReactMap } from "react-map-gl/maplibre";
import StatusBadge from "./StatusBadge";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function Map({ data }: { data: Permit[] }) {
  const [selectedPermits, setSelectedPermits] = useAtom(selectedPermitsAtom);
  const [locationSearch, setLocationSearch] = useAtom(locationSearchAtom);
  const [searchPoint, setSearchPoint] = useAtom(searchPointAtom);
  const statusFilter = useAtomValue(statusFilterAtom);
  const typeFilter = useAtomValue(typeFilterAtom);

  const [popup, setPopup] = useState<Permit | null>(null);

  const mapRef = useRef<MapRef>(null);

  const collection = useMemo(() => {
    return featureCollection(data.map((permit) => point([permit.longitude, permit.latitude], { id: permit.id })));
  }, [data]);

  useEffect(() => {
    if (!selectedPermits.length) return;
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
      id="map"
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
        const isFilteredOut =
          !statusFilter.includes(permit.status) || !typeFilter.includes(permit.type as FacilityType);

        return (
          <Marker
            key={permit.id}
            longitude={permit.longitude}
            latitude={permit.latitude}
            onClick={(e) => {
              if (!locationSearch) {
                e.originalEvent.stopPropagation();
                setPopup(permit);
              }
            }}
          >
            <div>
              <div
                className={`relative ${isSelected ? "ring-4 ring-blue-500 rounded-full p-2 bg-blue-50 shadow-xl" : ""}`}
              >
                <Icon
                  className={`permit-status-${permit.status} facility-type-${permit.type} h-8 w-8 ${
                    statusStyles[permit.status as PermitStatus].fill
                  } drop-shadow-lg ${isFilteredOut ? "opacity-10" : "opacity-100"}`}
                />
              </div>
            </div>
          </Marker>
        );
      })}

      {searchPoint && (
        <Marker longitude={searchPoint.geometry.coordinates[0]} latitude={searchPoint.geometry.coordinates[1]}>
          <MapPinIcon className="h-12 w-12 text-blue-500" />
        </Marker>
      )}

      {popup && (
        <Popup longitude={popup.longitude} latitude={popup.latitude} closeButton={false} onClose={() => setPopup(null)}>
          <div className="text-black">
            <p className="font-medium text-sm text-gray-900">{popup.applicant}</p>
            <p className="text-xs text-gray-500">{popup.address}</p>
            <p className="text-xs text-gray-400">{popup.food}</p>
            <StatusBadge status={popup.status} />
          </div>
        </Popup>
      )}
    </ReactMap>
  );
}
