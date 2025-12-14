"use client";

import Legend from "@/components/Legend";
import Loading from "@/components/Loading";
import Map from "@/components/Map";
import SearchBar from "@/components/SearchBar";
import { FacilityType } from "@/types/enums";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<Permit[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_DATA_URL!)
      .then((res) => res.json())
      .then((rawData: ApiPermit[]) => {
        // Parse and transform API data into local Permit objects
        const permits: Permit[] = rawData
          // Filter out permits with invalid coordinates
          .filter((permit) => !(permit.latitude === "0" && permit.longitude === "0"))
          .map((item) => ({
            id: item.objectid,
            applicant: item.applicant,
            type:
              item.facilitytype === "Truck"
                ? FacilityType.TRUCK
                : item.facilitytype === "Push Cart"
                ? FacilityType.CART
                : FacilityType.OTHER,
            cnn: item.cnn,
            address: item.address,
            block: item.block,
            lot: item.lot,
            permit: item.permit,
            status: item.status,
            food: item.fooditems,
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            schedule: item.schedule,
            approved: item.approved ? new Date(item.approved) : undefined,
            received: new Date(item.received),
            expiration: new Date(item.expirationdate),
          }));
        setData(permits);
      });
  }, []);

  if (!data.length) {
    return <Loading />;
  }

  return (
    <div className="relative h-full w-full">
      <Map data={data} />
      <SearchBar data={data} />
      <Legend />
    </div>
  );
}
