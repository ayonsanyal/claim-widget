import {
    createClaimApi,
    fetchClaimsApi,
    updateStatusApi,
    updateClaimApi,
    deleteClaimApi
  } from "./claims.api";
  
  let TOKEN = "";
  let API_URL = "";
  
  
  export function setConfig(token: string, apiUrl: string) {
    TOKEN = token;
    API_URL = apiUrl;
  }
  

  export async function createClaim() {
    if (!TOKEN) return alert("Token missing");
  
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
  
    if (!title || !description) {
      return alert("Fill all fields");
    }
  
    await createClaimApi(API_URL, TOKEN, { title, description });
  
    await fetchClaims();
  
    (document.getElementById("title") as HTMLInputElement).value = "";
    (document.getElementById("description") as HTMLInputElement).value = "";
  }
  
  export async function fetchClaims() {
    const result = await fetchClaimsApi(API_URL, TOKEN);
  
    console.log("API RAW:", result);
  
   
    if (!result) return [];
  
    if (Array.isArray(result)) return result;
  
    if (result.data) return result.data;
  
    return [];
  }
  
  export async function fetchClaimsByStatus(status?: string) {
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
  
    console.log("Updating claim:", id, data);
  
    await updateClaimApi(API_URL, TOKEN, id, data);
  }

  export async function deleteClaim(id: string) {
    await deleteClaimApi(API_URL, TOKEN, id);
    fetchClaims();
  }
  
  
 
  export async function updateStatus(id: string, status: string) {
    if (!TOKEN) return alert("Token missing");
  
    await updateStatusApi(API_URL, TOKEN, id, status);
  
    fetchClaims();
  }
