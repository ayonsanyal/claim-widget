import * as api from "./claims.api";
import {
  setConfig,
  fetchClaims,
  fetchClaimsByStatus,
  createClaim,
  updateClaim,
  deleteClaim,
  updateStatus,
} from "./claims.controller";

jest.mock("./claims.api");

describe("claims.controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setConfig("token", "http://localhost:3000");
  });

  it("should fetch claims and return data", async () => {
    (api.fetchClaimsApi as jest.Mock).mockResolvedValue({
      data: [{ id: 1 }],
    });

    const result = await fetchClaims();

    expect(result).toEqual([{ id: 1 }]);
  });

  it("should fetch claims by status", async () => {
    (api.fetchClaimsApi as jest.Mock).mockResolvedValue({
      data: [{ id: 2 }],
    });

    const result = await fetchClaimsByStatus("OPEN");

    expect(api.fetchClaimsApi).toHaveBeenCalledWith(
      "http://localhost:3000",
      "token",
      "OPEN"
    );

    expect(result).toEqual([{ id: 2 }]);
  });

  it("should handle empty response safely", async () => {
    (api.fetchClaimsApi as jest.Mock).mockResolvedValue(null);

    const result = await fetchClaims();

    expect(result).toEqual([]);
  });

  it("should call updateClaimApi", async () => {
    (api.updateClaimApi as jest.Mock).mockResolvedValue({});

    await updateClaim("1", {
      title: "t",
      description: "d",
    });

    expect(api.updateClaimApi).toHaveBeenCalledWith(
      "http://localhost:3000",
      "token",
      "1",
      { title: "t", description: "d" }
    );
  });

  it("should call deleteClaimApi", async () => {
    (api.deleteClaimApi as jest.Mock).mockResolvedValue({});

    await deleteClaim("1");

    expect(api.deleteClaimApi).toHaveBeenCalledWith(
      "http://localhost:3000",
      "token",
      "1"
    );
  });

  it("should create claim successfully", async () => {
    
    document.body.innerHTML = `
      <input id="title" value="Test Title" />
      <input id="description" value="Test Description" />
    `;
  
    
    (api.createClaimApi as jest.Mock).mockResolvedValue({});
    (api.fetchClaimsApi as jest.Mock).mockResolvedValue({ data: [] });
  
    await createClaim();
  
    expect(api.createClaimApi).toHaveBeenCalledWith(
      "http://localhost:3000",
      "token",
      {
        title: "Test Title",
        description: "Test Description",
      }
    );
  });

  it("should not create claim if fields are empty", async () => {
    document.body.innerHTML = `
      <input id="title" value="" />
      <input id="description" value="" />
    `;
  
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    await createClaim();
  
    expect(alertMock).toHaveBeenCalledWith("Fill all fields");
    expect(api.createClaimApi).not.toHaveBeenCalled();
  
    alertMock.mockRestore();
  });

  it("should call updateStatusApi", async () => {
    (api.updateStatusApi as jest.Mock).mockResolvedValue({});

    await updateStatus("1", "OPEN");

    expect(api.updateStatusApi).toHaveBeenCalledWith(
      "http://localhost:3000",
      "token",
      "1",
      "OPEN"
    );
  });
});