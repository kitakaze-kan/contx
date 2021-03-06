import { formatDID, getImageURL } from "@self.id/framework";
import type { BasicProfile } from "@self.id/framework";

import { IPFS_URL } from "@/constants/common";
import { DisplayProfile } from "@/interfaces";

export function isSupportedDID(did: string): boolean {
  return did.startsWith("did:3") || did.startsWith("did:key");
}

export function getProfileInfo(
  did: string,
  profile?: BasicProfile | null
): DisplayProfile {
  return {
    avatarSrc:
      profile?.image &&
      getImageURL(IPFS_URL, profile?.image, { height: 60, width: 60 }),
    displayName: profile?.name || formatDID(did, 12),
    bio: profile?.description ?? "",
  };
}
