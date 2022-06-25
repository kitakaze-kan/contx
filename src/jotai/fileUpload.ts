import { atom, useAtom } from "jotai";

export type UploadStatusType = "completed" | "uploading" | "failed" | undefined;
export const uploadStatus = atom<UploadStatusType>(undefined);

export const useStateUploadStatus = () => useAtom(uploadStatus);

export const uploadedCID = atom<string | undefined>(undefined);

export const useStateUploadedCID = () => useAtom(uploadedCID);
