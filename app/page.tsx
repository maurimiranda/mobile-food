/* eslint-disable @typescript-eslint/no-explicit-any */

import Map from "@/components/Map";
import SearchBar from "@/components/SearchBar";
import { FacilityType } from "@/types/enums";

export default async function Home() {
  const rawData = await fetch(process.env.NEXT_PUBLIC_DATA_URL!).then((res) => res.json());

  // Parse and transform API data into local Permit objects
  const data: Permit[] = rawData
    // Filter out permits with invalid coordinates
    .filter((permit: any) => !(permit.latitude === "0" && permit.longitude === "0"))
    .map(
      (item: any) =>
        ({
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
          expiration: new Date(item.expiration),
        } as Permit)
    );

  return (
    <div className="relative h-full w-full">
      <Map data={data} />
      <SearchBar data={data} />
    </div>
  );
}
