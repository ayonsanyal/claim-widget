import { fetchFunnelConfig } from "./config.service";

describe("fetchFunnelConfig", () => {
  const API_URL = "http://localhost:3000";
  const TOKEN = "test-token";

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn() as any;
  });

  it("should fetch config successfully", async () => {
    const mockResponse = {
      steps: [{ id: "create" }],
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchFunnelConfig(API_URL, TOKEN);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/claims/config`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it("should throw error when response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      headers: {},
    });

    await expect(
      fetchFunnelConfig(API_URL, TOKEN)
    ).rejects.toThrow("Failed to load config: 401");
  });

  it("should include Authorization header", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    await fetchFunnelConfig(API_URL, TOKEN);

    const callArgs = (fetch as jest.Mock).mock.calls[0];

    expect(callArgs[1].headers.Authorization).toBe(
      `Bearer ${TOKEN}`
    );
  });
});