"use client";

import { locationSearchAtom, selectedPermitsAtom } from "@/store/store";
import { statusStyles } from "@/types/defaults";
import { PermitStatus } from "@/types/enums";
import { MagnifyingGlassIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";

export default function SearchBar({ data }: { data: Permit[] }) {
  const [selectedPermits, setSelectedPermits] = useAtom(selectedPermitsAtom);
  const [locationSearch, setLocationSearch] = useAtom(locationSearchAtom);

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [statusFilter, setStatusFilter] = useState<PermitStatus[]>(Object.values(PermitStatus));

  const results = useMemo(() => {
    return query.length > 0
      ? data
          .filter(
            (permit) =>
              statusFilter.includes(permit.status) &&
              (permit.applicant.toLowerCase().includes(query.toLowerCase()) ||
                permit.address.toLowerCase().includes(query.toLowerCase()) ||
                permit.food?.toLowerCase().includes(query.toLowerCase()))
          )
          .slice(0, 10)
      : [];
  }, [data, query, statusFilter]);

  return (
    <div className="absolute top-0 left-0 z-10 p-4 w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center px-3 py-2 border-b border-gray-100">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors, food, address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onClick={() => setIsFocused(true)}
            className="w-full px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedPermits([]);
              }}
              onMouseDown={(e) => e.preventDefault()}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <XMarkIcon className="h-4 w-4 text-gray-400" />
            </button>
          )}
          <button
            onClick={() => setLocationSearch(true)}
            className={`ml-2 p-1 rounded border hover:bg-blue-700 cursor-pointer ${
              locationSearch ? "border-blue-700 text-blue-700 animate-pulse" : "bg-blue-500 text-white"
            }`}
            title="Click on the map to search 5 closest facilities to a location"
          >
            <MapPinIcon className="h-5 w-5" />
          </button>
        </div>

        {isFocused && results.length > 0 && (
          <>
            <div className="p-2 bg-gray-100 border-t border-b border-gray-300" onMouseDown={(e) => e.preventDefault()}>
              <h5 className="text-xs text-black">Filter by Status</h5>
              <div className="flex gap-1 py-1 border-b border-gray-100 overflow-x-auto">
                {Object.values(PermitStatus).map((status) => {
                  return (
                    <button
                      key={status}
                      onClick={() =>
                        setStatusFilter((prev) => {
                          if (prev.includes(status)) {
                            return prev.filter((s) => s !== status);
                          } else {
                            return [...prev, status];
                          }
                        })
                      }
                      className={`px-1.5 py-0.5 text-xs rounded whitespace-nowrap cursor-pointer ${
                        statusFilter.includes(status)
                          ? `${statusStyles[status].bg} ${statusStyles[status].contrastText}`
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
            <ul className="max-h-80 overflow-y-auto" onMouseDown={(e) => e.preventDefault()}>
              {results.map((permit) => {
                const isSelected = selectedPermits.includes(permit.id);
                return (
                  <li
                    key={permit.id}
                    className={`px-4 py-3 hover:bg-blue-100 cursor-pointer border-b border-gray-100 last:border-0 ${
                      isSelected ? "bg-blue-200" : ""
                    }`}
                    onClick={() => setSelectedPermits([permit.id])}
                  >
                    <p className="font-medium text-sm text-gray-900">{permit.applicant}</p>
                    <p className="text-xs text-gray-500 truncate">{permit.address}</p>
                    <p className="text-xs text-gray-400 truncate">{permit.food}</p>
                    <StatusBadge status={permit.status} />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
