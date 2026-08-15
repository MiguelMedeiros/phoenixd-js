import axios from "axios";

import Phoenix from "./index";

jest.mock("axios");

describe("Phoenix v0.9 API compatibility", () => {
  it("requests the current swap-in address", async () => {
    const get = jest.fn().mockResolvedValue({
      data: { address: "bc1qswapin", index: 7 },
    });
    (axios.create as jest.Mock).mockReturnValue({ get });
    const phoenix = new Phoenix({ token: "secret" });

    await expect(phoenix.getSwapInAddress()).resolves.toEqual({
      address: "bc1qswapin",
      index: 7,
    });
    expect(get).toHaveBeenCalledWith("/getswapinaddress");
  });
});
