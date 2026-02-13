import { UiUser } from "@/src/types/types";

interface Payload {
  user: UiUser;
}

export function decodeJwtPayload(token: string): Payload | null {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}
