export async function fetchFunnelConfig(apiUrl: string, token: string) {
    const res = await fetch(`${apiUrl}/claims/config`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  
    if (!res.ok) {
      throw new Error(`Failed to load config: ${res.status}${res.headers}`);
    }
  
    return res.json();
  }