import {
  useStateUploadedCID,
  useStateUploadedFullPath,
  useStateUploadStatus,
} from "@/jotai";

const DWEB_LINK = ".ipfs.dweb.link/";

export const useFileUpload = () => {
  const [status, setStatus] = useStateUploadStatus();
  const [cid, setCID] = useStateUploadedCID();
  const [fullPath, setFullPath] = useStateUploadedFullPath();

  const upload = async (files: File[]) => {
    setStatus("uploading");
    const fileName = files[0].name;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch("/api/web3StorageUploader", options);
      const data = await res.json();
      console.log({ data });
      console.log("cid", data.cid);
      if (data.cid) {
        setCID(data.cid);
        setFullPath(`https://${data.cid}${DWEB_LINK}${fileName}`);
        setStatus("completed");
      } else {
        setStatus("failed");
      }
    } catch (e) {
      console.error(e);
      setStatus("failed");
    }
  };

  const resetUploadStatus = () => {
    setCID(undefined);
    setStatus(undefined);
  };

  return {
    upload,
    status,
    cid,
    fullPath,
    resetUploadStatus,
  };
};
