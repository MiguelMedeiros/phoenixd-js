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

  it("returns the closing transaction id when phoenixd closes a channel", async () => {
    const closingTxId = "a".repeat(64);
    const post = jest.fn().mockResolvedValue({ data: closingTxId });
    (axios.create as jest.Mock).mockReturnValue({ post });
    const phoenix = new Phoenix({ token: "secret" });

    await expect(
      phoenix.closeChannel({
        channelId: "b".repeat(64),
        address: "bc1qcloseaddress",
        feerateSatByte: 12,
      })
    ).resolves.toEqual({ status: "ok", txId: closingTxId });
  });

  it("preserves phoenixd's close-channel failure response", async () => {
    const post = jest.fn().mockResolvedValue({
      data: "ChannelCloseResponse.Failure(channel not found)",
    });
    (axios.create as jest.Mock).mockReturnValue({ post });
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => undefined);
    const phoenix = new Phoenix({ token: "secret" });

    await expect(
      phoenix.closeChannel({
        channelId: "b".repeat(64),
        address: "bc1qcloseaddress",
        feerateSatByte: 12,
      })
    ).resolves.toEqual({
      status: "error",
      message: "ChannelCloseResponse.Failure(channel not found)",
    });
    expect(consoleError).toHaveBeenCalledWith(
      "ChannelCloseResponse.Failure(channel not found)"
    );
    consoleError.mockRestore();
  });
});
