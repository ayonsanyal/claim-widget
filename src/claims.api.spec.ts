import {
    createClaimApi,
    fetchClaimsApi,
    updateStatusApi,
    updateClaimApi,
    deleteClaimApi,
  } from "./claims.api";
  
  global.fetch = jest.fn();
  
  describe("claims.api", () => {
    const API_URL = "http://localhost:3000";
    const TOKEN = "test-token";
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should call createClaimApi correctly", async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: true });
  
      await createClaimApi(API_URL, TOKEN, { title: "t", description: "d" });
  
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ title: "t", description: "d" }),
      });
    });
  
    it("should fetch all claims", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve({ data: [] }),
      });
  
      await fetchClaimsApi(API_URL, TOKEN);
  
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/claims`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    });
  
    it("should fetch claims by status", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve({ data: [] }),
      });
  
      await fetchClaimsApi(API_URL, TOKEN, "OPEN");
  
      expect(fetch).toHaveBeenCalledWith(
        `${API_URL}/claims/status?status=OPEN`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    });
  
    it("should update claim status", async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: true });
  
      await updateStatusApi(API_URL, TOKEN, "1", "OPEN");
  
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/claims/1/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ status: "OPEN" }),
      });
    });
  
    it("should update claim", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });
  
      await updateClaimApi(API_URL, TOKEN, "1", {
        title: "t",
        description: "d",
      });
  
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/claims/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ title: "t", description: "d" }),
      });
    });
  
    it("should delete claim", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });
  
      await deleteClaimApi(API_URL, TOKEN, "1");
  
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/claims/1`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    });
  });