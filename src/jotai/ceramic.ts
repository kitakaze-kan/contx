import { ModelTypes } from "@/interfaces";
import { SelfID } from "@self.id/web";
import { atom, useAtom } from "jotai";

export const mySelfID = atom<SelfID<ModelTypes> | null>(null);

export const useStateMySelfID = () => useAtom(mySelfID);

export const did = atom<string>("");

export const useDID = () => useAtom(did);
