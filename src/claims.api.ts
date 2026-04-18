export function createClaimApi(apiUrl: string, token: string, data: any) {
    return fetch(`${apiUrl}/claims`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
  
  export async function fetchClaimsApi(
    apiUrl: string,
    token: string,
    status?: string
  ) {
    let url = `${apiUrl}/claims`;
  
    
    if (status) {
      url += `/status?status=${status}`;
    }
  
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.json();
  }
  
  
  export function updateStatusApi(
    apiUrl: string,
    token: string,
    id: string,
    status: string
  ) {
    return fetch(`${apiUrl}/claims/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  }

  export async function deleteClaimApi(
    apiUrl: string,
    token: string,
    id: string
  ) {
    const res = await fetch(`${apiUrl}/claims/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Delete failed");
  
    return res.json();
  }

  export async function updateClaimApi(
    apiUrl: string,
    token: string,
    id: string,
    body: any
  ) {
    const res = await fetch(`${apiUrl}/claims/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  
    if (!res.ok) throw new Error("Update failed");
  
    return res.json();
  }