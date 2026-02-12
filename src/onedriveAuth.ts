import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID || "",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: typeof window !== "undefined" ? window.location.origin : "",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
