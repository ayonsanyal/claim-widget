import {
  createClaimApi,
  fetchClaimsApi,
  updateStatusApi,
  updateClaimApi,
  deleteClaimApi,
} from "./claims.api";

let TOKEN = "";
let API_URL = "";

export function setConfig(token: string, apiUrl: string) {
  TOKEN = token;
  API_URL = apiUrl;
}


export async function createClaim(data: {
  title: string;
  description: string;
}) {
  if (!TOKEN) return alert("Token missing");

  const { title, description } = data;

  if (!title || !description) {
    return alert("Fill all fields");
  }

  await createClaimApi(API_URL, TOKEN, { title, description });

  return fetchClaims(); // return updated list
}


export async function fetchClaims() {
  if (!TOKEN) return [];

  const result = await fetchClaimsApi(API_URL, TOKEN);

  console.log("API RAW:", result);

  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (result.data) return result.data;

  return [];
}

export async function fetchClaimsByStatus(status?: string) {
  if (!TOKEN) return [];

  const result = await fetchClaimsApi(API_URL, TOKEN, status);

  console.log("API RAW:", result);

  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (result.data) return result.data;

  return [];
}

export async function updateClaim(
  id: string,
  data: { title: string; description: string }
) {
  if (!TOKEN) return alert("Token missing");

  await updateClaimApi(API_URL, TOKEN, id, data);

  return fetchClaims();
}


export async function deleteClaim(id: string) {
  if (!TOKEN) return alert("Token missing");

  await deleteClaimApi(API_URL, TOKEN, id);

  return fetchClaims();
}


export async function updateStatus(id: string, status: string) {
  if (!TOKEN) return alert("Token missing");

  await updateStatusApi(API_URL, TOKEN, id, status);

  return fetchClaims();
}