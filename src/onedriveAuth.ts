import { useMemo } from "react";
import { PublicClientApplication } from "@azure/msal-browser";

export function useMsalInstance() {
  return useMemo(() => {
    if (!process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID) {
      throw new Error("Missing NEXT_PUBLIC_ONEDRIVE_CLIENT_ID in .env.local");
    }
    return new PublicClientApplication({
      auth: {
        clientId: process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: typeof window !== "undefined" ? window.location.origin : "",
      },
    });
  }, []);
}
