import { atom } from "jotai";
import { Feature, Point } from "geojson";

export const permitsAtom = atom<Permit[]>([]);

export const selectedPermitsAtom = atom<string[]>([]);

export const locationSearchAtom = atom<boolean>(false);

export const searchPointAtom = atom<Feature<Point> | null>(null);
