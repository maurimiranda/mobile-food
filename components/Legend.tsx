"use client";

import { statusFilterAtom, typeFilterAtom } from "@/store/store";
import { statusStyles, typeIcons } from "@/types/defaults";
import { FacilityType, PermitStatus } from "@/types/enums";
import { useAtom } from "jotai";

export default function Legend() {
  const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom);
  const [typeFilter, setTypeFilter] = useAtom(typeFilterAtom);

  return (
    <div
      id="legend"
      className="absolute bottom-4 left-4 z-10 bg-white text-gray-500 bg-opacity-90 rounded-lg shadow-lg p-4"
    >
      {Object.entries(typeIcons).map(([type, Icon]) => (
        <div
          key={type}
          className={`legend-type-item flex items-center space-x-2 mb-2 last:mb-0 ${
            typeFilter.includes(type as FacilityType) ? "opacity-100" : "opacity-40"
          }`}
          onClick={() => {
            if (typeFilter.includes(type as FacilityType)) {
              setTypeFilter(typeFilter.filter((t) => t !== (type as FacilityType)));
            } else {
              setTypeFilter([...typeFilter, type as FacilityType]);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <Icon className="h-6 w-6 text-gray-500" />
          <span className="text-xs">{type}</span>
        </div>
      ))}
      <hr className="my-4 -mx-4 bg-neutral-quaternary border border-gray-200"></hr>
      {Object.values(PermitStatus).map((status) => (
        <div
          key={status}
          className={`legend-status-item flex items-center space-x-2 mb-2 last:mb-0 ${
            statusFilter.includes(status as PermitStatus) ? "opacity-100" : "opacity-40"
          }`}
          onClick={() => {
            if (statusFilter.includes(status as PermitStatus)) {
              setStatusFilter(statusFilter.filter((s) => s !== (status as PermitStatus)));
            } else {
              setStatusFilter([...statusFilter, status as PermitStatus]);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <div className={`w-5 h-5 ${statusStyles[status as PermitStatus].bg} rounded`}></div>
          <span className="text-xs">{status}</span>
        </div>
      ))}
    </div>
  );
}
