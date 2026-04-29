import "./widget.style.css"
import {
  setConfig,
  createClaim,
  fetchClaims,
  fetchClaimsByStatus,
  updateStatus,
  deleteClaim,
  updateClaim,
} from "./claims.controller";

import { fetchFunnelConfig } from "./config.service";


type InitOptions = {
  token: string;
  apiUrl: string;
};

let CONFIG: any = null;

const ACTIONS: any = {
  createClaim,
  fetchClaims,
  fetchClaimsByStatus,
  updateStatus,
  deleteClaim,
  updateClaim,
};



function renderCreateStep(step: any, listStep: any) {
  const box = document.createElement("div");
  box.className = "funnel-step";
  box.id = "create-section";

  let fieldsHtml = "";

  step.fields.forEach((field: any) => {
    fieldsHtml += `
      <div class="form-group">
        <label for="${field.name}">
          ${field.label}
        </label>

        ${
          field.type === "textarea"
            ? `<textarea id="${field.name}" placeholder="${field.label}"></textarea>`
            : `<input id="${field.name}" type="text" placeholder="${field.label}" />`
        }
      </div>
    `;
  });

  box.innerHTML = `
    <h3>${step.title}</h3>

    ${fieldsHtml}

    <div class="form-actions">
      <button id="create-claim-btn">Create Claim</button>
    </div>
  `;

  box.querySelector("#create-claim-btn")!.addEventListener("click", async () => {
    const payload: any = {};

    step.fields.forEach((f: any) => {
      payload[f.name] = (
        document.getElementById(f.name) as HTMLInputElement
      ).value;
    });

    await createClaim(payload);

    
    step.fields.forEach((f: any) => {
      (
        document.getElementById(f.name) as HTMLInputElement
      ).value = "";
    });


    const root = document.getElementById("claim-widget-root")!;
    await renderClaimsStep(root, listStep);
  });

  return box;
}

async function renderClaimsStep(root: HTMLElement, step: any) {
  let box = document.getElementById("claims-section");

  if (!box) {
    box = document.createElement("div");
    box.id = "claims-section";
    box.className = "funnel-step";
    root.appendChild(box);
  }

  const status =
    (document.getElementById("statusFilter") as HTMLSelectElement)?.value || "";

  const claims = status
    ? await fetchClaimsByStatus(status)
    : await fetchClaims();

  let rows = "";

  claims.forEach((c: any) => {
    rows += `
      <tr>
        <td>
          <input id="title-${c.id}" value="${c.title}" />
        </td>

        <td>
          <input id="desc-${c.id}" value="${c.description}" />
        </td>

        <td>
          <select id="status-${c.id}">
            <option value="OPEN" ${c.status === "OPEN" ? "selected" : ""}>OPEN</option>
            <option value="IN_REVIEW" ${c.status === "IN_REVIEW" ? "selected" : ""}>IN REVIEW</option>
            <option value="CLOSED" ${c.status === "CLOSED" ? "selected" : ""}>CLOSED</option>
          </select>
        </td>

        <td>
          <div class="action-group">
            <button class="save-btn" data-id="${c.id}">Save</button>
            <button class="btn-danger delete-btn" data-id="${c.id}">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });

  box.innerHTML = `
    <h3>${step.title}</h3>

    <table class="funnel-table">
      <thead>
        <tr>
          <th style="width:32%">Title</th>
          <th style="width:38%">Description</th>
          <th style="width:15%">Status</th>
          <th style="width:15%">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;


  box.querySelectorAll(".save-btn").forEach((btn: any) => {
    btn.addEventListener("click", async (e: any) => {
      const id = e.target.dataset.id;

      const title = (
        document.getElementById(`title-${id}`) as HTMLInputElement
      ).value;

      const description = (
        document.getElementById(`desc-${id}`) as HTMLInputElement
      ).value;

      const status = (
        document.getElementById(`status-${id}`) as HTMLSelectElement
      ).value;

      await updateClaim(id, { title, description });
      await updateStatus(id, status);

      await renderClaimsStep(root, step);
    });
  });

 
  box.querySelectorAll(".delete-btn").forEach((btn: any) => {
    btn.addEventListener("click", async (e: any) => {
      const id = e.target.dataset.id;

      await deleteClaim(id);

      await renderClaimsStep(root, step);
    });
  });
}

const ClaimWidget = {
  init: async ({ token, apiUrl }: InitOptions) => {
   

    setConfig(token, apiUrl);

    CONFIG = await fetchFunnelConfig(apiUrl, token);

    let root = document.getElementById("claim-widget-root");

    if (!root) {
      root = document.createElement("div");
      root.id = "claim-widget-root";
      document.body.appendChild(root);
    }

    root.innerHTML = "";

   
    const createStep = CONFIG.steps.find((step: any) => step.fields);
    const listStep = CONFIG.steps.find((step: any) => !step.fields);

    
    if (createStep) {
      root.appendChild(renderCreateStep(createStep, listStep));
    }

    
    if (listStep) {
      await renderClaimsStep(root, listStep);
    }
  },


  actions: ACTIONS,
};

(globalThis as any).ClaimWidget = ClaimWidget;

export default ClaimWidget;