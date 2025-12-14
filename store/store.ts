import { atom } from "jotai";
import { Feature, Point } from "geojson";
import { FacilityType, PermitStatus } from "@/types/enums";

export const permitsAtom = atom<Permit[]>([]);

export const selectedPermitsAtom = atom<string[]>([]);

export const locationSearchAtom = atom<boolean>(false);

export const searchPointAtom = atom<Feature<Point> | null>(null);

export const statusFilterAtom = atom<PermitStatus[]>(Object.values(PermitStatus));

export const typeFilterAtom = atom<FacilityType[]>(Object.values(FacilityType));
