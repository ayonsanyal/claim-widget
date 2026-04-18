
import "./index.css";

import {
  setConfig,
  createClaim,
  fetchClaims,
  fetchClaimsByStatus,
  updateStatus,
  deleteClaim,
  updateClaim,
} from "./claims.controller";

type InitOptions = {
  token: string;
  apiUrl: string;
  targetId?: string;
};

const ClaimWidget = {
  init: ({ token, apiUrl, targetId }: InitOptions) => {
   
    setConfig(token, apiUrl);

    let container: HTMLElement | null = null;

    if (targetId) {
      container = document.getElementById(targetId);
    }

    if (!container) {
      container = document.createElement("div");
      container.id = "claim-widget-root";
      document.body.appendChild(container);
    }

    container.innerHTML = "";

    console.log(" Widget initialized with token:", token);
  },

  actions: {
    createClaim,
    fetchClaims,
    updateStatus,
    deleteClaim,
    updateClaim,
    fetchClaimsByStatus
  },
};

export default ClaimWidget;
(globalThis as any).ClaimWidget = ClaimWidget;